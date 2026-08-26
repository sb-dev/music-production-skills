import test from "node:test";
import assert from "node:assert/strict";
import { parseArtifactMetadata } from "../../tools/contracts.ts";
test("benchmark control: valid preservation metadata is not falsely rejected",()=>{assert.doesNotThrow(()=>parseArtifactMetadata({id:"production-control",type:"master",workflowState:"final",decisionState:"approved",parents:["arrangement-1"],lockedDecisions:["melody","lyrics"],openDecisions:[],selectionSources:{}}))});
test("benchmark defect: contradictory preservation metadata is detected",()=>{assert.throws(()=>parseArtifactMetadata({id:"production-defect",type:"master",workflowState:"refine",decisionState:"approved",parents:[],lockedDecisions:["melody"],openDecisions:["melody"],selectionSources:{}}),/both locked and open/)});
