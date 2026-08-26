import { readFile } from "node:fs/promises";
import { parseArtifactMetadata } from "./contracts.ts";
const input=process.argv[2]; if(!input){console.error("Usage: validate-production.ts <artifact.json>");process.exit(2);} let parsed:unknown;
try{parsed=JSON.parse(await readFile(input,"utf8"));}catch(error){console.error(`Could not parse JSON artifact: ${error instanceof Error?error.message:String(error)}`);process.exit(1);}
try{const a=parseArtifactMetadata(parsed);console.log(JSON.stringify({valid:true,id:a.id,type:a.type,workflowState:a.workflowState,decisionState:a.decisionState},null,2));}catch(error){console.error(error instanceof Error?error.message:String(error));process.exit(1);}
