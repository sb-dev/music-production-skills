import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// This assertion is deliberately hard-coded rather than tolerant. No real generated
// artifacts or repeated reviews exist yet, so the baseline must stay UNMEASURED; the
// test is here to force a conscious edit when the first real baseline lands, instead
// of letting a measured status slip in unnoticed. It is not a stale assertion.
test("semantic baseline is explicitly unmeasured until real evidence exists",async()=>{
  const value=JSON.parse(await readFile(join(process.cwd(),"tests","benchmark","baseline.json"),"utf8")) as {status?:unknown;results?:unknown};
  assert.equal(value.status,"UNMEASURED");
  assert.deepEqual(value.results,[]);
});
