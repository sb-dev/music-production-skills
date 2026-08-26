import test from "node:test";
import assert from "node:assert/strict";
import { parseArtifactMetadata } from "../../tools/contracts.ts";
test("accepts independent workflow and decision state",()=>{const a=parseArtifactMetadata({id:"composition-1",type:"composition",workflowState:"refine",decisionState:"approved",parents:[],lockedDecisions:["melody"],openDecisions:["instrumentation"],selectionSources:{melody:"draft-b"}});assert.equal(a.workflowState,"refine");assert.equal(a.decisionState,"approved")});
test("rejects contradictory locked/open decisions",()=>{assert.throws(()=>parseArtifactMetadata({id:"composition-1",type:"composition",workflowState:"draft",decisionState:"selected",lockedDecisions:["melody"],openDecisions:["melody"]}),/both locked and open/)});
