import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

// The benchmark fixtures describe the example set on disk, but they are hand-maintained.
// `example-matrix.test.ts` reads each declared path, so it catches a *deleted* example;
// nothing catches an *added* one, and `examples/README.md` is read by no test at all.
// These checks assert set equality between disk, matrix and index so all three stay
// self-correcting rather than merely internally consistent.

const root = process.cwd();

interface Row { level: number; id: string; genre: string; path: string; primaryCapability: string }

async function matrix(): Promise<Row[]> {
  return JSON.parse(await readFile(join(root, "tests", "benchmark", "example-matrix.json"), "utf8")) as Row[];
}
async function directories(...parts: string[]): Promise<string[]> {
  return (await readdir(join(root, ...parts), { withFileTypes: true })).filter((x) => x.isDirectory()).map((x) => x.name).sort();
}
async function examplesIndex(): Promise<string> {
  return readFile(join(root, "examples", "README.md"), "utf8");
}
function linkTargets(markdown: string): string[] {
  return [...markdown.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).filter((x): x is string => Boolean(x));
}

test("public examples on disk, in the benchmark matrix, and in the index are the same set", async () => {
  const rows = await matrix();
  const onDisk = (await directories("examples")).filter((name) => name.startsWith("level-"));
  const inMatrix = rows.map((row) => row.path.split("/")[1]!).sort();
  const indexed = linkTargets(await examplesIndex())
    .filter((target) => target.startsWith("level-"))
    .map((target) => target.replace(/\/(README\.md)?$/, ""))
    .sort();

  assert.deepEqual(inMatrix, onDisk, "benchmark matrix does not match examples/level-* on disk");
  assert.deepEqual(indexed, onDisk, "examples/README.md does not match examples/level-* on disk");
});

test("each public example directory name encodes its declared level and id", async () => {
  for (const row of await matrix()) {
    assert.equal(row.path, `examples/level-${row.level}-${row.id}/README.md`,
      `matrix row ${row.id} path does not match its level and id`);
  }
});

test("extension-pack showcases on disk, in the catalogue, and in the index are the same set", async () => {
  const catalogue = await readFile(join(root, "docs", "06-extension-pack-catalogue.md"), "utf8");
  const onDisk = await directories("examples", "packs");
  const indexed = [...new Set(linkTargets(await examplesIndex())
    .filter((target) => target.startsWith("packs/"))
    .map((target) => target.split("/")[1]!))].sort();

  assert.deepEqual(indexed, onDisk, "examples/README.md does not match examples/packs/* on disk");
  for (const pack of onDisk) assert.ok(catalogue.includes(`\`${pack}\``), `pack ${pack} has a showcase but is not in the catalogue`);

  // Every showcase directory is linked from the index, not just its pack.
  const showcaseLinks = new Set(linkTargets(await examplesIndex()).filter((target) => target.startsWith("packs/")));
  for (const pack of onDisk) {
    for (const showcase of await directories("examples", "packs", pack)) {
      assert.ok(showcaseLinks.has(`packs/${pack}/${showcase}/README.md`),
        `showcase examples/packs/${pack}/${showcase} is not linked from examples/README.md`);
    }
  }
});

test("benchmark profiles reference only real examples and real packs", async () => {
  const profiles = JSON.parse(await readFile(join(root, "tests", "benchmark", "profiles.json"), "utf8")) as
    Record<string, { examples: string[]; packs: string[] }>;
  const ids = new Set((await matrix()).map((row) => row.id));
  const packs = new Set(await directories("examples", "packs"));
  for (const [name, profile] of Object.entries(profiles)) {
    for (const id of profile.examples) assert.ok(ids.has(id), `profile ${name} references unknown example: ${id}`);
    for (const pack of profile.packs) assert.ok(packs.has(pack), `profile ${name} references unknown pack: ${pack}`);
  }
});

test("benchmark case sources point at files that exist", async () => {
  const rows = JSON.parse(await readFile(join(root, "tests", "benchmark", "taxonomy.json"), "utf8")) as Array<{ id: string; source?: string }>;
  for (const row of rows) {
    if (!row.source) continue;
    await assert.doesNotReject(readFile(join(root, row.source), "utf8"), `case ${row.id} references missing source: ${row.source}`);
  }
});
