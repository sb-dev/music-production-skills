import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root=process.cwd();
const packs=["intimate-singer-songwriter-single","melodic-techno-club-track","cinematic-hybrid-score","adaptive-game-score","premium-brand-music"];

// Each pack has exactly one showcase today, so reading only the first entry would pass
// while leaving any later addition unchecked. Iterate over all of them.
async function showcases(pack:string):Promise<string[]>{
  return (await readdir(join(root,"examples","packs",pack),{withFileTypes:true})).filter(x=>x.isDirectory()).map(x=>x.name).sort();
}

test("catalogue and showcase examples cover the initial pack set",async()=>{
  const catalogue=await readFile(join(root,"docs","06-extension-pack-catalogue.md"),"utf8");
  const dirs=(await readdir(join(root,"examples","packs"),{withFileTypes:true})).filter(x=>x.isDirectory()).map(x=>x.name);
  for(const pack of packs){
    assert.ok(catalogue.includes(`\`${pack}\``),`pack ${pack} is missing from the catalogue`);
    assert.ok(dirs.includes(pack),`pack ${pack} has no showcase directory`);
    const examples=await showcases(pack);
    assert.ok(examples.length>=1,`pack ${pack} has no showcase example`);
    for(const example of examples){
      const readme=await readFile(join(root,"examples","packs",pack,example,"README.md"),"utf8");
      assert.match(readme,/^## Prompt$/m,`showcase ${pack}/${example} lacks a Prompt section`);
      assert.match(readme,/## Prompt\s+```text[\s\S]+?```/m,`showcase ${pack}/${example} lacks a fenced generation prompt`);
    }
  }
});

test("pack showcases do not claim generated results before evidence exists",async()=>{
  for(const pack of packs){
    for(const example of await showcases(pack)){
      const readme=await readFile(join(root,"examples","packs",pack,example,"README.md"),"utf8");
      assert.ok(!/^## What happened$/m.test(readme),`showcase ${pack}/${example} claims generated results`);
    }
  }
});
