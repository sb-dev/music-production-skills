import test from "node:test";
import assert from "node:assert/strict";
import { runCommand } from "../../tools/run-command.ts";

test("passes arguments without shell interpolation", async () => {
  const hostile = "$(printf SHOULD_NOT_EXECUTE)";
  const result = await runCommand(process.execPath, ["-e", "console.log(process.argv[1])", hostile]);
  assert.equal(result.code, 0);
  assert.equal(result.stdout.trim(), hostile);
});
