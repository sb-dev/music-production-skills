import test from "node:test";
import assert from "node:assert/strict";
import { parseArtifactMetadata } from "../../tools/contracts.ts";
test("component selection can combine sources without locking automatically",()=>{const a=parseArtifactMetadata({id:"composition-selected",type:"composition",workflowState:"refine",decisionState:"selected",parents:["draft-a","draft-b","draft-c"],lockedDecisions:[],openDecisions:["instrumentation"],selectionSources:{melody:"draft-a",harmony:"draft-b",groove:"draft-c"}});assert.equal(a.decisionState,"selected");assert.equal(a.lockedDecisions.length,0);assert.equal(a.selectionSources.groove,"draft-c")});
