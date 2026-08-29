# No Reply

**Level 4 — alternative pop / R&B — diagnose and repair**

Repair a local vocal mutation while proving that exact approved words, melody and surrounding performance survive.

## Prompt

```text
Use music-evaluate and music-produce to repair an existing alternative-pop / R&B track called "No Reply".

Given:
- The song, arrangement and final production are otherwise approved
- At 01:14–01:18 the generated lead vocal changes one approved lyric word and bends the last note away from the approved melody
- The surrounding vocal performance, backing track and timing are locked
- Exact lyric preservation matters more than introducing a new expressive interpretation

Task:
- Verify the failure against the approved lyric and melody artifacts
- Classify it as a local performance/generation defect rather than a songwriting request
- Identify the smallest repairable phrase/region
- Prefer a local edit/inpainting path when a compatible Replicate model supports it
- Do not regenerate the whole chorus or track unless no bounded correction is technically possible
- After repair, verify exact lyric restoration, melodic preservation and transition continuity at both boundaries

What to optimise for:
- exact approved-word preservation
- natural phrase continuity
- no audible edit seam
- unchanged surrounding vocal character
- no regression elsewhere in the chorus
```

## What this example tests

- exact semantic preservation
- phrase-local vocal repair
- boundary and regression checks

## Production evidence

This example currently defines the production challenge and copyable prompt. After the example is executed, keep the selected artifacts, provenance, evaluation findings, technical QC evidence and final deliverables here rather than inventing results in advance.
