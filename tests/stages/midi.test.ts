import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("music-compose declares the external MIDI library rather than reimplementing MIDI", async()=>{
  const pkg=JSON.parse(await readFile("skills/music-compose/package.json","utf8")) as {dependencies?:Record<string,string>};
  assert.ok(pkg.dependencies?.["@tonejs/midi"]);
  const source=await readFile("skills/music-compose/scripts/inspect-midi.ts","utf8");
  assert.match(source,/from \"@tonejs\/midi\"/);
});
