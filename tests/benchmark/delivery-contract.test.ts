import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { runCommand } from "../../tools/run-command.ts";

test("delivery validator rejects native stems when only one output is declared",async()=>{
  const dir=await mkdtemp(join(tmpdir(),"music-delivery-bench-"));
  try{
    const audio=join(dir,"mix.wav"); await writeFile(audio,"fixture","utf8");
    const manifest=join(dir,"manifest.json");
    await writeFile(manifest,JSON.stringify({outputs:[{path:audio}],stemSemantics:"native"}),"utf8");
    const result=await runCommand(process.execPath,["--experimental-strip-types",join(process.cwd(),"skills","music-produce","scripts","validate-delivery.ts"),manifest],process.cwd());
    assert.equal(result.code,1);
    assert.match(result.stderr,/Native stems declaration requires multiple declared outputs/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
