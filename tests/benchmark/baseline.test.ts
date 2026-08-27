import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

test("semantic baseline is explicitly unmeasured until real evidence exists",async()=>{
  const value=JSON.parse(await readFile(join(process.cwd(),"tests","benchmark","baseline.json"),"utf8")) as {status?:unknown;results?:unknown};
  assert.equal(value.status,"UNMEASURED");
  assert.deepEqual(value.results,[]);
});
