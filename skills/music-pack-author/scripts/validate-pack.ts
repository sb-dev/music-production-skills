import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

async function exists(path: string): Promise<boolean> {
  try { await stat(path); return true; } catch { return false; }
}

const target = process.argv[2];
if (!target) {
  console.error("Usage: node --experimental-strip-types scripts/validate-pack.ts <pack-directory>");
  process.exit(2);
}

const root = resolve(target);
const required = ["SKILL.md", "references/production-profile.md", "evals/evals.json"];
const errors: string[] = [];
for (const rel of required) if (!(await exists(join(root, rel)))) errors.push(`Missing ${rel}`);

if (await exists(join(root, "SKILL.md"))) {
  const text = await readFile(join(root, "SKILL.md"), "utf8");
  if (!/^---\n[\s\S]*?\n---\n/.test(text)) errors.push("SKILL.md lacks YAML frontmatter");
  for (const term of ["music-compose", "music-produce", "music-evaluate"]) {
    if (!text.includes(term)) errors.push(`SKILL.md does not describe integration with ${term}`);
  }
}

if (await exists(join(root, "evals/evals.json"))) {
  try {
    const value = JSON.parse(await readFile(join(root, "evals/evals.json"), "utf8"));
    if (!Array.isArray(value)) errors.push("evals/evals.json must be an array");
    else {
      const cats = new Set(value.map((x: { category?: string }) => x.category));
      for (const cat of ["normal", "draft", "refinement", "final", "boundary"]) if (!cats.has(cat)) errors.push(`Missing ${cat} eval`);
    }
  } catch { errors.push("evals/evals.json is invalid JSON"); }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}
console.log("Pack structure validation PASS");
