import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

test("benchmark profiles preserve cost-aware coverage",async()=>{
  const root=process.cwd();
  const profiles=JSON.parse(await readFile(join(root,"tests","benchmark","profiles.json"),"utf8")) as Record<string,{examples:string[];packs:string[]}>;
  const matrix=JSON.parse(await readFile(join(root,"tests","benchmark","example-matrix.json"),"utf8")) as Array<{id:string;level:number}>;
  const allIds=new Set(matrix.map(x=>x.id));
  assert.equal(profiles['ci']!.examples.length,0);
  const release=profiles['release-core']!;
  assert.equal(release.examples.length,5);
  assert.equal(new Set(release.examples.map(id=>matrix.find(x=>x.id===id)!.level)).size,5);
  assert.equal(release.packs.length,5);
  const full=profiles['full-production']!;
  assert.equal(full.examples.length,15);
  assert.ok(full.examples.every(id=>allIds.has(id)));
  assert.equal(full.packs.length,5);
});
