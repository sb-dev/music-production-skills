export const workflowStates = ["draft", "refine", "final"] as const;
export const decisionStates = ["open", "selected", "approved", "locked"] as const;
export type WorkflowState = typeof workflowStates[number];
export type DecisionState = typeof decisionStates[number];

export interface ArtifactMetadata {
  id: string;
  type: string;
  workflowState: WorkflowState;
  decisionState: DecisionState;
  parents: string[];
  lockedDecisions: string[];
  openDecisions: string[];
  selectionSources: Record<string, string>;
  execution?: null | { provider: string; model: string; predictionId?: string; parameters?: Record<string, unknown> };
}

export interface EvalCase {
  name: string;
  category: "normal" | "draft" | "refinement" | "final" | "boundary";
  input: string;
  expect: string[];
  forbid: string[];
  check?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function strings(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : null;
}

export function parseArtifactMetadata(value: unknown): ArtifactMetadata {
  if (!isRecord(value)) throw new Error("artifact metadata must be an object");
  const id = value.id;
  const type = value.type;
  const workflowState = value.workflowState;
  const decisionState = value.decisionState;
  if (typeof id !== "string" || id.length === 0) throw new Error("id is required");
  if (typeof type !== "string" || type.length === 0) throw new Error("type is required");
  if (!workflowStates.includes(workflowState as WorkflowState)) throw new Error("invalid workflowState");
  if (!decisionStates.includes(decisionState as DecisionState)) throw new Error("invalid decisionState");
  const parents = value.parents === undefined ? [] : strings(value.parents);
  const locked = value.lockedDecisions === undefined ? [] : strings(value.lockedDecisions);
  const open = value.openDecisions === undefined ? [] : strings(value.openDecisions);
  if (!parents || !locked || !open) throw new Error("parents/lockedDecisions/openDecisions must be string arrays");
  for (const decision of locked) if (open.includes(decision)) throw new Error(`Decision cannot be both locked and open: ${decision}`);
  const selectionSources: Record<string, string> = {};
  if (value.selectionSources !== undefined) {
    if (!isRecord(value.selectionSources)) throw new Error("selectionSources must be an object");
    for (const [key, source] of Object.entries(value.selectionSources)) {
      if (typeof source !== "string") throw new Error(`selectionSources.${key} must be a string`);
      selectionSources[key] = source;
    }
  }
  let execution: ArtifactMetadata["execution"] = undefined;
  if (value.execution === null) execution = null;
  else if (value.execution !== undefined) {
    if (!isRecord(value.execution) || typeof value.execution.provider !== "string" || typeof value.execution.model !== "string") throw new Error("execution requires provider and model");
    execution = { provider: value.execution.provider, model: value.execution.model };
    if (typeof value.execution.predictionId === "string") execution.predictionId = value.execution.predictionId;
    if (isRecord(value.execution.parameters)) execution.parameters = value.execution.parameters;
  }
  return { id, type, workflowState: workflowState as WorkflowState, decisionState: decisionState as DecisionState, parents, lockedDecisions: locked, openDecisions: open, selectionSources, ...(execution === undefined ? {} : { execution }) };
}

export function parseEvalCases(value: unknown): EvalCase[] {
  if (!Array.isArray(value) || value.length < 5) throw new Error("eval file must contain at least five cases");
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`eval ${index} must be an object`);
    const name = item.name, category = item.category, input = item.input;
    const expect = strings(item.expect), forbid = item.forbid === undefined ? [] : strings(item.forbid);
    if (typeof name !== "string" || !name) throw new Error(`eval ${index} missing name`);
    if (!["normal","draft","refinement","final","boundary"].includes(String(category))) throw new Error(`eval ${name} invalid category`);
    if (typeof input !== "string" || !input) throw new Error(`eval ${name} missing input`);
    if (!expect || expect.length === 0 || !forbid) throw new Error(`eval ${name} expect/forbid invalid`);
    if (item.check !== undefined && (typeof item.check !== "string" || !item.check)) throw new Error(`eval ${name} invalid check`);
    return { name, category: category as EvalCase["category"], input, expect, forbid, ...(typeof item.check === "string" ? {check:item.check} : {}) };
  });
}
