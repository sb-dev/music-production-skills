import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { caseQuestionHash, fileSha256, majority, parseBenchmarkCases, parseSemanticTranscript, type SemanticTranscript } from "./benchmark.ts";

const root = process.cwd();
const args = process.argv.slice(2);
const flags = new Set(args);
const taxonomyPath = join(root, "tests", "benchmark", "taxonomy.json");
const baselinePath = join(root, "tests", "benchmark", "baseline.json");
const profilesPath = join(root, "tests", "benchmark", "profiles.json");
const transcriptDir = join(root, "tests", "benchmark", "transcripts");

const cases = parseBenchmarkCases(JSON.parse(await readFile(taxonomyPath, "utf8")));
const caseById = new Map(cases.map((x) => [x.id, x]));
const baseline = JSON.parse(await readFile(baselinePath, "utf8")) as {status?:unknown;results?:unknown};
const profiles = JSON.parse(await readFile(profilesPath, "utf8")) as Record<string,{description?:unknown;examples?:unknown;packs?:unknown}>;
if (!['UNMEASURED','MEASURED'].includes(String(baseline.status)) || !Array.isArray(baseline.results)) {
  console.error("Invalid benchmark baseline file");
  process.exit(1);
}

async function transcriptFiles(): Promise<string[]> {
  try { return (await readdir(transcriptDir)).filter((name) => name.endsWith(".json")).sort(); }
  catch { return []; }
}

function printReport(): void {
  const byMeasurement = new Map<string, number>();
  const bySuite = new Map<string, number>();
  let hard = 0, pendingArtifacts = 0;
  for (const c of cases) {
    byMeasurement.set(c.measurement, (byMeasurement.get(c.measurement) ?? 0) + 1);
    bySuite.set(c.suite, (bySuite.get(c.suite) ?? 0) + 1);
    if (c.hardGate) hard += 1;
    if (c.artifactStatus === "pending") pendingArtifacts += 1;
  }
  console.log(`Benchmark taxonomy: ${cases.length} cases / ${hard} hard gates`);
  console.log("Measurements:");
  for (const [name, count] of [...byMeasurement.entries()].sort()) console.log(`  ${name}: ${count}`);
  console.log("Suites:");
  for (const [name, count] of [...bySuite.entries()].sort()) console.log(`  ${name}: ${count}`);
  console.log(`Artifact-semantic cases awaiting real artifacts: ${pendingArtifacts}`);
  console.log(`Semantic baseline: ${String(baseline.status)}`);
  console.log("Profiles:");
  for (const [name, profile] of Object.entries(profiles)) {
    const examples=Array.isArray(profile.examples)?profile.examples.length:0;
    const packs=Array.isArray(profile.packs)?profile.packs.length:0;
    console.log(`  ${name}: ${examples} example(s), ${packs} pack showcase(s)`);
  }
}

if (flags.has("--report")) {
  printReport();
  process.exit(0);
}

if (flags.has("--print-prompts")) {
  for (const c of cases.filter((x) => x.measurement !== "deterministic")) {
    console.log(`\n## ${c.id}`);
    console.log(`suite: ${c.suite}`);
    console.log(`measurement: ${c.measurement}`);
    if (c.source) console.log(`source: ${c.source}`);
    console.log("criteria:"); for (const x of c.criteria) console.log(`- ${x}`);
    console.log("forbid:"); for (const x of c.forbid) console.log(`- ${x}`);
  }
  process.exit(0);
}

if (flags.has("--rescore")) {
  const files = await transcriptFiles();
  if (files.length === 0) {
    printReport();
    console.log("Semantic benchmark re-score: NOT RUN (no committed transcripts). This is not reported as PASS.");
    process.exit(0);
  }
  const transcripts: SemanticTranscript[] = [];
  for (const file of files) {
    let t: SemanticTranscript;
    try { t = parseSemanticTranscript(JSON.parse(await readFile(join(transcriptDir, file), "utf8"))); }
    catch (error) { console.error(`Invalid transcript ${file}: ${error instanceof Error ? error.message : String(error)}`); process.exit(1); }
    const c = caseById.get(t.caseId);
    if (!c) { console.error(`STALE TRANSCRIPT ${file}: unknown case ${t.caseId}`); process.exit(1); }
    if (t.questionHash !== caseQuestionHash(c)) { console.error(`STALE TRANSCRIPT ${file}: question identity changed`); process.exit(1); }
    for (const [path, expectedHash] of Object.entries(t.artifactHashes)) {
      try {
        const actual = await fileSha256(join(root, path));
        if (actual !== expectedHash) { console.error(`STALE TRANSCRIPT ${file}: artifact hash changed for ${path}`); process.exit(1); }
      } catch { console.error(`STALE TRANSCRIPT ${file}: missing artifact ${path}`); process.exit(1); }
    }
    transcripts.push(t);
  }
  const grouped = new Map<string, SemanticTranscript[]>();
  for (const t of transcripts.filter((x) => x.pass === "closed")) grouped.set(t.caseId, [...(grouped.get(t.caseId) ?? []), t]);
  for (const [caseId, rows] of [...grouped.entries()].sort()) {
    const c = caseById.get(caseId)!;
    const parts: string[] = [];
    for (const axis of c.axes) {
      const result = majority(rows.map((x) => x.axes[axis] ?? "na"));
      parts.push(`${axis}=${result}`);
    }
    console.log(`${caseId}: ${parts.join(" ")}`);
  }
  console.log(`Semantic benchmark re-score: ${transcripts.length} transcript(s) valid and current.`);
  process.exit(0);
}

if (flags.has("--repeat")) {
  const index = args.indexOf("--repeat");
  const repeats = Number(args[index + 1]);
  if (!Number.isInteger(repeats) || repeats < 1) { console.error("--repeat requires a positive integer"); process.exit(2); }
  if (process.env.RUN_SEMANTIC_BENCHMARK !== "1") {
    console.error("BLOCKED: semantic collection requires RUN_SEMANTIC_BENCHMARK=1 and an explicitly configured reviewer workflow.");
    process.exit(2);
  }
  console.error("BLOCKED: this repository defines provider-neutral benchmark cases and transcript contracts but does not embed a provider API client. Collect semantic evidence through the configured Agent Skills/reviewer workflow, then commit transcripts for offline re-scoring.");
  process.exit(2);
}

console.error("Usage: run-benchmark.ts --report | --rescore | --print-prompts | --repeat <n>");
process.exit(2);
