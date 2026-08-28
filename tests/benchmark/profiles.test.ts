import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Membership of profile ids and pack names is asserted in example-inventory.test.ts;
// this file covers the cost-aware shape of each profile.

test("benchmark profiles preserve cost-aware coverage",async()=>{
  const root=process.cwd();
  const profiles=JSON.parse(await readFile(join(root,"tests","benchmark","profiles.json"),"utf8")) as Record<string,{examples:string[];packs:string[]}>;
  const matrix=JSON.parse(await readFile(join(root,"tests","benchmark","example-matrix.json"),"utf8")) as Array<{id:string;level:number}>;
  const allIds=new Set(matrix.map(x=>x.id));
  const packs=Object.keys(JSON.parse(await readFile(join(root,"tests","benchmark","rubrics.json"),"utf8")).packs as Record<string,unknown>).sort();

  assert.equal(profiles['ci']!.examples.length,0);
  assert.equal(profiles['ci']!.packs.length,0);

  const release=profiles['release-core']!;
  assert.equal(release.examples.length,5);
  const levels=release.examples.map(id=>{
    const row=matrix.find(x=>x.id===id);
    assert.ok(row,`release-core references unknown example: ${id}`);
    return row.level;
  });
  assert.deepEqual([...levels].sort(),[1,2,3,4,5],"release-core must cover one example per level");
  assert.deepEqual([...release.packs].sort(),packs,"release-core must cover every pack showcase");

  const full=profiles['full-production']!;
  assert.equal(full.examples.length,15);
  assert.deepEqual([...full.examples].sort(),[...allIds].sort(),"full-production must cover every public example");
  assert.deepEqual([...full.packs].sort(),packs,"full-production must cover every pack showcase");
});
