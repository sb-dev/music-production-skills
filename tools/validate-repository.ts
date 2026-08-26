import { validateRepository } from "./repository.ts";

const root = process.cwd();
const result = await validateRepository(root);
for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
if (result.errors.length > 0) {
  for (const error of result.errors) console.error(`ERROR: ${error}`);
  console.error(`Repository validation FAILED (${result.errors.length} error(s))`);
  process.exit(1);
}
console.log(`Repository validation PASS: ${result.stats.skills} skills, ${result.stats.evalCases} eval cases (${result.stats.executableEvalCases} executable declarations).`);
