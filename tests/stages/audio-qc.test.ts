import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { makeFixtures } from "../fixtures/make-fixtures.ts";
import { runCommand } from "../../tools/run-command.ts";

test("synthetic audio fixture is readable by ffprobe", async () => {
  const dir = await mkdtemp(join(tmpdir(), "music-audio-qc-"));
  try {
    const fixture = await makeFixtures(dir);
    const result = await runCommand("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", fixture.audio]);
    assert.equal(result.code, 0);
    const duration = Number(result.stdout.trim());
    assert.ok(duration > 0.3 && duration < 0.5);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
