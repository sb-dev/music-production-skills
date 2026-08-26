import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runCommand } from "./run-command.ts";
import { expectedSkills } from "./repository.ts";

if (process.env.RUN_SKILLS_CLI_SMOKE !== "1") {
  console.error("BLOCKED: Skills CLI smoke validation belongs to Stage 13. Stage 12 installation configuration is complete; set RUN_SKILLS_CLI_SMOKE=1 only when running the clean-project validation gate.");
  process.exit(2);
}

const root = process.cwd();
const list = await runCommand("npx", ["skills", "add", ".", "--list"], root);
if (list.code !== 0) { console.error(list.stderr || list.stdout); process.exit(1); }
for (const skill of expectedSkills) {
  const dir = await mkdtemp(join(tmpdir(), `music-skills-${skill}-`));
  try {
    const init = await runCommand("git", ["init", "-b", "main"], dir);
    if (init.code !== 0) { console.error(init.stderr); process.exit(1); }
    const result = await runCommand("npx", ["skills", "add", root, "--skill", skill, "--agent", process.env.SKILLS_SMOKE_AGENT ?? "claude-code", "--yes"], dir);
    if (result.code !== 0) { console.error(`Install failed for ${skill}:\n${result.stderr || result.stdout}`); process.exit(1); }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
console.log("Skills CLI smoke PASS for all intended skills.");
