import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const args = new Set(process.argv.slice(2));
if (!args.has("--rescore") && !args.has("--repeat")) {
  console.error("Usage: run-benchmark.ts --rescore | --repeat <n>");
  process.exit(2);
}

const transcriptDir = join(process.cwd(), "tests", "benchmark", "transcripts");
let files: string[] = [];
try { files = (await readdir(transcriptDir)).filter((name) => name.endsWith(".json")); } catch { files = []; }

if (args.has("--rescore")) {
  if (files.length === 0) {
    console.log("Semantic benchmark re-score: NOT RUN (no committed transcripts). This is not reported as PASS; semantic collection is optional and paid.");
    process.exit(0);
  }
  let valid = 0;
  for (const file of files) {
    const value = JSON.parse(await readFile(join(transcriptDir, file), "utf8")) as { verdict?: unknown; artifactHash?: unknown; questionHash?: unknown };
    if (!["pass", "fail"].includes(String(value.verdict)) || typeof value.artifactHash !== "string" || typeof value.questionHash !== "string") {
      console.error(`Stale/invalid transcript: ${file}`);
      process.exit(1);
    }
    valid += 1;
  }
  console.log(`Semantic benchmark re-score: ${valid} transcript(s) structurally valid.`);
  process.exit(0);
}

if (process.env.RUN_SEMANTIC_BENCHMARK !== "1") {
  console.error("BLOCKED: semantic collection requires RUN_SEMANTIC_BENCHMARK=1, REPLICATE_API_TOKEN and MUSIC_BENCHMARK_REVIEWER.");
  process.exit(2);
}
if (!process.env.REPLICATE_API_TOKEN || !process.env.MUSIC_BENCHMARK_REVIEWER) {
  console.error("BLOCKED: missing REPLICATE_API_TOKEN or MUSIC_BENCHMARK_REVIEWER.");
  process.exit(2);
}
console.error("BLOCKED: Stage 11 scaffolds the semantic benchmark contract but does not implement paid provider collection. Add collection only when the selected reviewer contract is verified.");
process.exit(2);
