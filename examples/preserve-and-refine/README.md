# Preserve and Refine

**Level 3 — change one production decision without losing the track**

Prove that refinement preserves approved musical identity instead of treating every request as a fresh generation.

## Prompt

```text
Use music-produce and music-evaluate to refine an existing approved production.

The current production has these decision states:
- Locked: melody, lyrics, structure
- Open: drum production

Change the drums so they feel heavier and more syncopated without changing the musical identity of the track.

Requirements:
- Preserve the approved melody exactly in musical function and contour
- Preserve the approved lyrics
- Preserve the approved song structure and section order
- Change only the drum production unless another change is technically unavoidable
- Prefer local, section-level or reference-conditioned refinement over restarting the track
- Do not silently switch to whole-track regeneration because local editing is inconvenient
- If the available Replicate models cannot make the requested change while preserving the locked decisions, report the limitation instead of pretending preservation succeeded

Workflow:
- Identify the smallest production region that needs to change
- Determine the Replicate capabilities required for that refinement
- Use a compatible Replicate model if local or reference-conditioned refinement is available
- Compare the result with the parent production
- Run music-evaluate with preservation as an explicit criterion
- Reject the refinement if melody, lyrics or structure mutate materially

What to optimise for:
- heavier drum weight
- more syncopated rhythmic feel
- unchanged melody, lyrics and structure
- clean transitions around edited regions
- minimal correction scope
```

## What this tests

```text
locked: melody, lyrics, structure
open:   drum production
        ↓
smallest viable refinement
        ↓
preservation evaluation
```

A successful-sounding production change still fails this example if the locked musical decisions mutate.

## Files

- `preservation.yaml` — refinement request, locked/open decisions and lineage
