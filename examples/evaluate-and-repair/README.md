# Evaluate and Repair

**Level 4 — diagnose and repair the smallest failing unit**

Repair one defective vocal phrase in an otherwise approved production without reopening unrelated musical decisions.

## Prompt

```text
Use music-evaluate and music-produce to diagnose and repair a local pronunciation defect in an otherwise approved track.

Known issue:
- Region: chorus 2, 01:12–01:16
- Symptom: one vocal phrase has defective pronunciation
- The rest of the production is approved and should be preserved

Requirements:
- Diagnose the defect before changing anything
- Route it to the production stage that actually owns the problem
- Do not rewrite the composition or lyrics
- Do not remaster the whole track to hide the defect
- Repair only the affected vocal/performance region where the available execution path supports it
- Preserve the surrounding timing, melody, arrangement, production and mix
- Check both edit boundaries after the repair
- Verify that the requested correction succeeded and that no regression was introduced elsewhere

Workflow:
- Run music-evaluate on the reported region and its surrounding context
- Record the owning stage and the smallest corrective action
- Discover a Replicate model capable of the required local repair
- Repair the smallest affected region
- Re-evaluate pronunciation, transition boundaries and preservation
- Report a capability limitation instead of silently regenerating the whole song if bounded repair is unavailable

What to optimise for:
- corrected pronunciation
- invisible edit boundaries
- preserved musical and sonic identity
- smallest possible correction scope
- actionable evaluation evidence
```

## What this tests

```text
defect: local performance/production region
→ diagnose owning stage
→ identify exact region
→ repair the smallest unit
→ check transition boundaries
→ verify preservation
```

This example tests corrective routing and correction scope, not merely defect detection.

## Files

- `finding.json` — example evaluation finding with region, severity, owning stage and recommended correction
