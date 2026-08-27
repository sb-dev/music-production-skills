import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { caseQuestionHash, majority, parseBenchmarkCases, parseSemanticTranscript } from "../../tools/benchmark.ts";

const root=process.cwd();
async function cases(){return parseBenchmarkCases(JSON.parse(await readFile(join(root,"tests","benchmark","taxonomy.json"),"utf8")));}

test("benchmark taxonomy covers every product capability suite",async()=>{
  const rows=await cases();
  const suites=new Set(rows.map(x=>x.suite));
  for(const required of ["composition-control","production-control","evaluation-repair","extension-packs","pack-authoring","technical-delivery"]) assert.ok(suites.has(required));
  assert.ok(rows.length>=30);
});

test("every initial extension pack has agent and artifact-semantic coverage",async()=>{
  const rows=await cases();
  for(const pack of ["intimate-singer-songwriter-single","melodic-techno-club-track","cinematic-hybrid-score","adaptive-game-score","premium-brand-music"]){
    const owned=rows.filter(x=>x.capability===pack);
    assert.ok(owned.some(x=>x.measurement==="agent"));
    assert.ok(owned.some(x=>x.measurement==="artifact-semantic"));
  }
});

test("question hash changes when benchmark meaning changes",async()=>{
  const row=(await cases())[0]!;
  const a=caseQuestionHash(row);
  const b=caseQuestionHash({...row,criteria:[...row.criteria,"new criterion"]});
  assert.ok(a!==b);
});

test("semantic transcript contract is strict and majority exposes flakiness",async()=>{
  const row=(await cases()).find(x=>x.measurement==="artifact-semantic")!;
  const t=parseSemanticTranscript({caseId:row.id,repeat:1,pass:"closed",reviewer:"reviewer/model",questionHash:caseQuestionHash(row),artifactHashes:{},axes:{detection:"pass",routing:"fail"}});
  assert.equal(t.caseId,row.id);
  assert.equal(majority(["pass","pass","fail"]),"FLAKY");
  assert.equal(majority(["pass","pass","pass"]),"PASS");
  assert.equal(majority(["fail","fail","fail"]),"FAIL");
});
