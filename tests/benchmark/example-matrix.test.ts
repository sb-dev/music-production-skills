import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

type Row={level:number;id:string;genre:string;path:string;primaryCapability:string};

test("public example benchmark has three genre-distinct cases per level",async()=>{
  const rows=JSON.parse(await readFile(join(process.cwd(),"tests","benchmark","example-matrix.json"),"utf8")) as Row[];
  assert.equal(rows.length,15);
  for(let level=1;level<=5;level++){
    const group=rows.filter(x=>x.level===level);
    assert.equal(group.length,3);
    assert.equal(new Set(group.map(x=>x.genre)).size,3);
    for(const row of group){
      const readme=await readFile(join(process.cwd(),row.path),"utf8");
      assert.match(readme,/^## Prompt$/m);
      assert.match(readme,/## Prompt\s+```text[\s\S]+?```/m);
    }
  }
});
