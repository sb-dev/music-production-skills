import test from "node:test";
import assert from "node:assert/strict";

function validatePreservation(locked: readonly string[], changes: readonly string[], reopened: readonly string[]): string[] {
  return changes.filter((decision) => locked.includes(decision) && !reopened.includes(decision));
}

test("drum-only change does not reopen melody lyrics or structure", () => {
  const illegal = validatePreservation(["melody", "lyrics", "structure"], ["drums"], []);
  assert.deepEqual(illegal, []);
});

test("locked melody change requires explicit reopening", () => {
  assert.deepEqual(validatePreservation(["melody"], ["melody"], []), ["melody"]);
  assert.deepEqual(validatePreservation(["melody"], ["melody"], ["melody"]), []);
});
