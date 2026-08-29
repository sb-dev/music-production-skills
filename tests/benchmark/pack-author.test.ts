import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { runCommand } from "../../tools/run-command.ts";

async function makePack(valid:boolean,evalStyle:"full"|"stub"="full"):Promise<string>{
  const root=await mkdtemp(join(tmpdir(),"music-pack-bench-"));
  await mkdir(join(root,"references"),{recursive:true});
  await mkdir(join(root,"evals"),{recursive:true});
  const skill=valid?`---\nname: test-pack\ndescription: Test pack with enough description for benchmark validation.\n---\n\nIntegrates with music-compose, music-produce and music-evaluate.\n`:`---\nname: test-pack\ndescription: Too short\n---\n\nGenre only.\n`;
  await writeFile(join(root,"SKILL.md"),skill,"utf8");
  await writeFile(join(root,"references","production-profile.md"),"# Production profile\nOperational arrangement, production and evaluation rules.\n","utf8");
  const cats=["normal","draft","refinement","final","boundary"];
  const evals=evalStyle==="stub"
    ?cats.map(category=>({category}))
    :cats.map((category,i)=>({name:`case-${i}`,category,input:"test",expect:["observable behaviour"],forbid:[]}));
  await writeFile(join(root,"evals","evals.json"),JSON.stringify(evals,null,2),"utf8");
  return root;
}

test("pack-author structural validator accepts a coherent self-contained pack",async()=>{
  const dir=await makePack(true);
  try{
    const result=await runCommand(process.execPath,["--experimental-strip-types",join(process.cwd(),"skills","music-pack-author","scripts","validate-pack.ts"),dir],process.cwd());
    assert.equal(result.code,0);
    assert.match(result.stdout,/PASS/);
  }finally{await rm(dir,{recursive:true,force:true});}
});

test("pack-author structural validator rejects missing core-skill integration",async()=>{
  const dir=await makePack(false);
  try{
    const result=await runCommand(process.execPath,["--experimental-strip-types",join(process.cwd(),"skills","music-pack-author","scripts","validate-pack.ts"),dir],process.cwd());
    assert.equal(result.code,1);
    assert.match(result.stderr,/integration with music-compose/);
  }finally{await rm(dir,{recursive:true,force:true});}
});

test("pack-author structural validator rejects eval cases that are category-only stubs",async()=>{
  const dir=await makePack(true,"stub");
  try{
    const result=await runCommand(process.execPath,["--experimental-strip-types",join(process.cwd(),"skills","music-pack-author","scripts","validate-pack.ts"),dir],process.cwd());
    assert.equal(result.code,1);
    assert.match(result.stderr,/missing input/);
    assert.match(result.stderr,/non-empty expect list/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
