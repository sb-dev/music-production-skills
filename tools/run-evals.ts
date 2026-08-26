import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseEvalCases } from "./contracts.ts";
import { expectedSkills } from "./repository.ts";
const root=process.cwd(); let total=0,executable=0;
for(const skill of expectedSkills){const cases=parseEvalCases(JSON.parse(await readFile(join(root,"skills",skill,"evals","evals.json"),"utf8")));total+=cases.length;const count=cases.filter(x=>x.check!==undefined).length;executable+=count;console.log(`${skill}: ${cases.length} declared evals, ${count} executable declarations, ${cases.length-count} manual`);}
console.log(`Eval coverage: ${executable}/${total} declared cases executable through eval checks; ${total-executable} manual semantic cases.`);console.log("Manual cases are reported as manual, not PASS. Deterministic production invariants are exercised by unit/stage/benchmark tests.");
