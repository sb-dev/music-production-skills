import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { parseEvalCases } from "./contracts.ts";

export const expectedSkills = ["music-compose", "music-produce", "music-evaluate"] as const;
export const requiredDocs = ["01-creative-skills-system-spec.md","02-creative-skills-workflows-and-artifacts-spec.md","03-creative-skills-repository-and-contracts-spec.md","04-testing-and-benchmark-spec.md","extraction-candidates.md","installation.md"] as const;
export interface ValidationResult { readonly errors: readonly string[]; readonly warnings: readonly string[]; readonly stats: { readonly skills: number; readonly evalCases: number; readonly executableEvalCases: number } }
async function exists(path: string): Promise<boolean> { try { await stat(path); return true; } catch { return false; } }
function parseFrontmatter(markdown: string): {name:string;description:string} {
  const match=markdown.match(/^---\n([\s\S]*?)\n---\n/); if(!match?.[1]) throw new Error("Missing YAML frontmatter");
  const fields:Record<string,string>={};
  for(const line of match[1].split("\n")){ const i=line.indexOf(":"); if(i>0) fields[line.slice(0,i).trim()]=line.slice(i+1).trim(); }
  if(!fields.name || !fields.description || fields.description.length<20) throw new Error("frontmatter requires name and descriptive description");
  return {name:fields.name,description:fields.description};
}
async function walkFiles(dir:string):Promise<string[]>{ const out:string[]=[]; for(const e of await readdir(dir,{withFileTypes:true})){ const p=join(dir,e.name); if(e.isDirectory()) out.push(...await walkFiles(p)); else if(e.isFile()) out.push(p); } return out; }
export async function validateRepository(root:string):Promise<ValidationResult>{
  const errors:string[]=[],warnings:string[]=[]; let evalCases=0, executableEvalCases=0;
  for(const doc of requiredDocs) if(!await exists(join(root,"docs",doc))) errors.push(`Missing required doc: docs/${doc}`);
  for(const skill of expectedSkills){
    const dir=join(root,"skills",skill), skillPath=join(dir,"SKILL.md"), evalPath=join(dir,"evals","evals.json");
    if(!await exists(skillPath)){errors.push(`Missing skill contract: skills/${skill}/SKILL.md`);continue;}
    try{
      const markdown=await readFile(skillPath,"utf8"), fm=parseFrontmatter(markdown); if(fm.name!==skill) errors.push(`Skill frontmatter name mismatch for ${skill}`);
      const refs=[...markdown.matchAll(/`(references\/[^`]+)`/g)].map(m=>m[1]).filter((x):x is string=>Boolean(x));
      for(const ref of refs) if(!await exists(join(dir,ref))) errors.push(`Missing local reference for ${skill}: ${ref}`);
      if(/\.\.\/(?:\.\.\/)?docs\//.test(markdown)||/\/docs\//.test(markdown)) errors.push(`Installed skill ${skill} references repository-level docs`);
    }catch(error){errors.push(`Invalid SKILL.md for ${skill}: ${error instanceof Error?error.message:String(error)}`);}
    if(!await exists(evalPath)) errors.push(`Missing eval file for ${skill}`); else try{
      const cases=parseEvalCases(JSON.parse(await readFile(evalPath,"utf8"))); evalCases+=cases.length; executableEvalCases+=cases.filter(x=>x.check!==undefined).length;
      const cats=new Set(cases.map(x=>x.category)); for(const cat of ["normal","draft","refinement","final","boundary"] as const) if(!cats.has(cat)) errors.push(`Skill ${skill} lacks ${cat} eval`);
    }catch(error){errors.push(`Invalid evals for ${skill}: ${error instanceof Error?error.message:String(error)}`);}
    for(const file of await walkFiles(dir)){ if(!/\.(md|ts|json|ya?ml)$/.test(file)) continue; const content=await readFile(file,"utf8"); if(content.includes("../../docs/")||content.includes("../../../docs/")) errors.push(`Skill-local runtime file references repository docs: ${relative(root,file)}`); }
  }
  const examplesDir=join(root,"examples"); if(!await exists(examplesDir)) errors.push("Missing examples directory"); else for(const e of (await readdir(examplesDir,{withFileTypes:true})).filter(x=>x.isDirectory())) if((await readdir(join(examplesDir,e.name))).length===0) errors.push(`Empty example directory: ${e.name}`);
  if(evalCases>0&&executableEvalCases===0) warnings.push("All declared skill evals are manual; deterministic repository tests provide executable coverage separately.");
  return {errors,warnings,stats:{skills:expectedSkills.length,evalCases,executableEvalCases}};
}
