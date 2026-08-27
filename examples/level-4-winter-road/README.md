# Winter Road

**Level 4 — indie folk — diagnose and repair**

Repair an audible edit boundary after an otherwise successful local replacement without reopening the approved performance.

## Prompt

```text
Use music-evaluate and music-produce to repair an existing indie-folk track called "Winter Road".

Given:
- The song and acoustic performance are approved
- A previously replaced refrain is musically correct
- The join around 02:01–02:03 has an audible ambience/tail discontinuity and a slight timing bump
- The new refrain itself is approved and must not be regenerated simply to hide the edit

Task:
- Inspect the transition into and out of the replacement region
- Distinguish an editing/boundary defect from a composition or performance defect
- Correct the smallest possible transition region using deterministic editing where sufficient
- Preserve the approved refrain, surrounding vocal/guitar performance and overall timing
- Re-run technical inspection and music-evaluate on the repaired boundaries

What to optimise for:
- invisible transition
- natural room/ambience continuity
- no duplicated or missing transient at the splice
- preservation of the already-approved replacement
- minimal correction scope
```

## What this example tests

- edit-boundary diagnosis
- deterministic repair before regeneration
- smallest sufficient correction

## Production evidence

This example currently defines the production challenge and copyable prompt. After the example is executed, keep the selected artifacts, provenance, evaluation findings, technical QC evidence and final deliverables here rather than inventing results in advance.
