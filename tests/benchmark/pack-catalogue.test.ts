import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root=process.cwd();
const packs=["intimate-singer-songwriter-single","melodic-techno-club-track","cinematic-hybrid-score","adaptive-game-score","premium-brand-music"];

test("catalogue and showcase examples cover the initial pack set",async()=>{
  const catalogue=await readFile(join(root,"docs","06-extension-pack-catalogue.md"),"utf8");
  const dirs=(await readdir(join(root,"examples","packs"),{withFileTypes:true})).filter(x=>x.isDirectory()).map(x=>x.name);
  for(const pack of packs){
    assert.ok(catalogue.includes(`\`${pack}\``));
    assert.ok(dirs.includes(pack));
    const examples=(await readdir(join(root,"examples","packs",pack),{withFileTypes:true})).filter(x=>x.isDirectory());
    assert.ok(examples.length>=1);
    const readme=await readFile(join(root,"examples","packs",pack,examples[0]!.name,"README.md"),"utf8");
    assert.match(readme,/^## Prompt$/m);
    assert.match(readme,/## Prompt\s+```text[\s\S]+?```/m);
  }
});

test("pack showcases do not claim generated results before evidence exists",async()=>{
  for(const pack of packs){
    const examples=(await readdir(join(root,"examples","packs",pack),{withFileTypes:true})).filter(x=>x.isDirectory());
    const readme=await readFile(join(root,"examples","packs",pack,examples[0]!.name,"README.md"),"utf8");
    assert.ok(!/^## What happened$/m.test(readme));
  }
});
