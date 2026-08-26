import test from "node:test";
import assert from "node:assert/strict";
import { validateRepository } from "../../tools/repository.ts";

test("repository contract validates", async () => {
  const result = await validateRepository(process.cwd());
  assert.deepEqual(result.errors, []);
  assert.equal(result.stats.skills, 3);
  assert.equal(result.stats.evalCases, 15);
});
