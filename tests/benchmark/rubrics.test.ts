import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseBenchmarkCases } from "../../tools/benchmark.ts";

// `rubrics.json` is referenced by name from taxonomy cases and by dimension from
// semantic review. Nothing else reads its contents, so without these checks a rename
// or a typo on either side of the convention fails silently.

const root = process.cwd();

interface Rubrics {
  creativeScale: string[];
  semanticAxes: string[];
  generalMusic: string[];
  packAuthor: string[];
  packs: Record<string, string[]>;
  levels: Record<string, string[]>;
}

async function rubrics(): Promise<Rubrics> {
  return JSON.parse(await readFile(join(root, "tests", "benchmark", "rubrics.json"), "utf8")) as Rubrics;
}
async function cases() {
  return parseBenchmarkCases(JSON.parse(await readFile(join(root, "tests", "benchmark", "taxonomy.json"), "utf8")));
}

function dimensionSets(value: Rubrics): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const [name, dims] of Object.entries(value.packs)) out.set(name, dims);
  for (const [name, dims] of Object.entries(value.levels)) out.set(name, dims);
  out.set("generalMusic", value.generalMusic);
  out.set("packAuthor", value.packAuthor);
  return out;
}

test("every rubric declares a non-empty list of named dimensions", async () => {
  const value = await rubrics();
  assert.ok(value.creativeScale.length > 0, "creativeScale must be a non-empty ordinal list");
  for (const [name, dims] of dimensionSets(value)) {
    assert.ok(Array.isArray(dims) && dims.length > 0, `rubric ${name} must declare dimensions`);
    for (const dim of dims) assert.ok(typeof dim === "string" && dim.length > 0, `rubric ${name} has an empty dimension`);
    assert.equal(new Set(dims).size, dims.length, `rubric ${name} has duplicate dimensions`);
  }
});

test("every benchmark case rubric resolves against rubrics.json", async () => {
  const known = dimensionSets(await rubrics());
  for (const row of await cases()) {
    if (row.rubric === undefined) continue;
    assert.ok(known.has(row.rubric), `case ${row.id} names unknown rubric: ${row.rubric}`);
  }
});

test("every benchmark case axis is in the declared semantic-axis vocabulary", async () => {
  const declared = new Set((await rubrics()).semanticAxes);
  for (const row of await cases()) {
    for (const axis of row.axes) assert.ok(declared.has(axis), `case ${row.id} uses undeclared axis: ${axis}`);
  }
});

// `axes` and rubric dimensions are deliberately different vocabularies: `axes` are the
// reporting axes of docs/04 section 18, while a rubric names the creative-quality
// dimensions scored *within* the `creative-quality` axis. So a case names a rubric
// exactly when it carries that axis — an axis is never a rubric dimension.
test("a case names a rubric if and only if it is scored on creative quality", async () => {
  for (const row of await cases()) {
    const scored = row.axes.includes("creative-quality");
    assert.equal(row.rubric !== undefined, scored,
      `case ${row.id}: rubric=${String(row.rubric)} but creative-quality axis=${scored}`);
  }
});

test("pack rubrics match the initial extension-pack set exactly", async () => {
  const value = await rubrics();
  const catalogue = await readFile(join(root, "docs", "06-extension-pack-catalogue.md"), "utf8");
  const packs = Object.keys(value.packs).sort();
  assert.deepEqual(packs, [
    "adaptive-game-score",
    "cinematic-hybrid-score",
    "intimate-singer-songwriter-single",
    "melodic-techno-club-track",
    "premium-brand-music"
  ]);
  for (const pack of packs) assert.ok(catalogue.includes(`\`${pack}\``), `pack rubric ${pack} is not in the catalogue`);
});
