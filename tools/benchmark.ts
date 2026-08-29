import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

export const measurements = ["deterministic", "agent", "artifact-semantic"] as const;
export type Measurement = typeof measurements[number];
export const transcriptVerdicts = ["pass", "fail", "na"] as const;
export type TranscriptVerdict = typeof transcriptVerdicts[number];

export interface BenchmarkCase {
  id: string;
  suite: string;
  capability: string;
  measurement: Measurement;
  hardGate: boolean;
  source?: string;
  artifactStatus?: "pending" | "ready";
  rubric?: string;
  criteria: string[];
  forbid: string[];
  axes: string[];
}

export interface SemanticTranscript {
  caseId: string;
  repeat: number;
  pass: "open" | "closed";
  reviewer: string;
  questionHash: string;
  artifactHashes: Record<string, string>;
  axes: Record<string, TranscriptVerdict>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function strings(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((x) => typeof x === "string") ? value : null;
}

export function parseBenchmarkCases(value: unknown): BenchmarkCase[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error("benchmark taxonomy must be a non-empty array");
  const ids = new Set<string>();
  return value.map((item, i) => {
    if (!isRecord(item)) throw new Error(`benchmark case ${i} must be an object`);
    const id = item.id, suite = item.suite, capability = item.capability, measurement = item.measurement;
    const criteria = strings(item.criteria), forbid = strings(item.forbid), axes = strings(item.axes);
    if (typeof id !== "string" || !id) throw new Error(`benchmark case ${i} missing id`);
    if (ids.has(id)) throw new Error(`duplicate benchmark case id: ${id}`); ids.add(id);
    if (typeof suite !== "string" || !suite) throw new Error(`benchmark case ${id} missing suite`);
    if (typeof capability !== "string" || !capability) throw new Error(`benchmark case ${id} missing capability`);
    if (!measurements.includes(measurement as Measurement)) throw new Error(`benchmark case ${id} invalid measurement`);
    if (typeof item.hardGate !== "boolean") throw new Error(`benchmark case ${id} missing hardGate`);
    if (!criteria || criteria.length === 0) throw new Error(`benchmark case ${id} needs criteria`);
    if (!forbid || !axes || axes.length === 0) throw new Error(`benchmark case ${id} forbid/axes invalid`);
    if (item.source !== undefined && (typeof item.source !== "string" || !item.source)) throw new Error(`benchmark case ${id} invalid source`);
    if (item.artifactStatus !== undefined && !["pending","ready"].includes(String(item.artifactStatus))) throw new Error(`benchmark case ${id} invalid artifactStatus`);
    if (measurement === "artifact-semantic" && item.artifactStatus === undefined) throw new Error(`artifact-semantic case ${id} must declare artifactStatus`);
    if (item.rubric !== undefined && (typeof item.rubric !== "string" || !item.rubric)) throw new Error(`benchmark case ${id} invalid rubric`);
    return {
      id, suite, capability, measurement: measurement as Measurement, hardGate: item.hardGate,
      criteria, forbid, axes,
      ...(typeof item.source === "string" ? { source: item.source } : {}),
      ...(item.artifactStatus === "pending" || item.artifactStatus === "ready" ? { artifactStatus: item.artifactStatus } : {}),
      ...(typeof item.rubric === "string" ? { rubric: item.rubric } : {})
    };
  });
}

export function caseQuestionHash(value: BenchmarkCase): string {
  const identity = JSON.stringify({
    id: value.id,
    suite: value.suite,
    capability: value.capability,
    measurement: value.measurement,
    criteria: value.criteria,
    forbid: value.forbid,
    axes: value.axes,
    rubric: value.rubric ?? null,
    source: value.source ?? null
  });
  return createHash("sha256").update(identity).digest("hex");
}

export async function fileSha256(path: string): Promise<string> {
  const bytes = await readFile(path);
  return createHash("sha256").update(bytes).digest("hex");
}

export function parseSemanticTranscript(value: unknown): SemanticTranscript {
  if (!isRecord(value)) throw new Error("transcript must be an object");
  if (typeof value.caseId !== "string" || !value.caseId) throw new Error("transcript missing caseId");
  if (!Number.isInteger(value.repeat) || Number(value.repeat) < 1) throw new Error("transcript repeat must be positive integer");
  if (!['open','closed'].includes(String(value.pass))) throw new Error("transcript pass must be open or closed");
  if (typeof value.reviewer !== "string" || !value.reviewer) throw new Error("transcript missing reviewer");
  if (typeof value.questionHash !== "string" || !/^[a-f0-9]{64}$/.test(value.questionHash)) throw new Error("transcript invalid questionHash");
  if (!isRecord(value.artifactHashes)) throw new Error("transcript artifactHashes must be an object");
  const artifactHashes: Record<string,string> = {};
  for (const [path, hash] of Object.entries(value.artifactHashes)) {
    if (typeof hash !== "string" || !/^[a-f0-9]{64}$/.test(hash)) throw new Error(`invalid artifact hash for ${path}`);
    artifactHashes[path] = hash;
  }
  if (!isRecord(value.axes)) throw new Error("transcript axes must be an object");
  const axes: Record<string,TranscriptVerdict> = {};
  for (const [axis, verdict] of Object.entries(value.axes)) {
    if (!transcriptVerdicts.includes(verdict as TranscriptVerdict)) throw new Error(`invalid verdict for ${axis}`);
    axes[axis] = verdict as TranscriptVerdict;
  }
  return {caseId:value.caseId,repeat:Number(value.repeat),pass:value.pass as "open"|"closed",reviewer:value.reviewer,questionHash:value.questionHash,artifactHashes,axes};
}

export type MajorityResult = "PASS" | "FAIL" | "FLAKY" | "NOT_RUN";
export function majority(values: TranscriptVerdict[]): MajorityResult {
  const measured = values.filter((v) => v !== "na");
  if (measured.length === 0) return "NOT_RUN";
  const pass = measured.filter((v) => v === "pass").length;
  const fail = measured.length - pass;
  if (pass === measured.length) return "PASS";
  if (fail === measured.length || pass === fail) return "FAIL";
  return "FLAKY";
}
