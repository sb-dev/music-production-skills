import test from "node:test";
import assert from "node:assert/strict";

const routes: Record<string, string> = {
  "wrong-file-format": "delivery",
  "provider-timeout": "model/execution",
  "pronunciation-region": "performance",
  "overcrowded-final-chorus": "arrangement",
};

test("technical delivery failure is not routed to composition", () => {
  assert.equal(routes["wrong-file-format"], "delivery");
});

test("local pronunciation defect is not routed to mastering", () => {
  assert.equal(routes["pronunciation-region"], "performance");
});
