# Compose and Produce

**Level 2 — complete composition-to-production workflow**

Take a musical brief through composition, arrangement, demo approval, Replicate-backed production, targeted refinement and final QC.

## Prompt

```text
Use music-compose, music-produce and music-evaluate to create a complete 90-second melancholic electronic instrumental for a reflective closing montage.

Requirements:
- Duration: 90 seconds
- Mood: reflective, nocturnal, slightly hopeful
- Tempo: around 100 BPM
- Meter: 4/4
- Palette: soft synth, restrained bass, sparse electronic drums
- Structure: begin sparse and intimate, then build into one clear final section
- Vocals: none
- Delivery: final WAV plus production provenance and evaluation

Workflow:
- Start with cheap composition alternatives rather than full-track generations
- Create materially different melodic/groove directions and select the strongest components
- Treat selection, approval and locking as separate decisions
- Develop an arrangement before expensive production
- Create a short demo that is sufficient to validate the production direction
- Run music-evaluate against the brief before producing the full track
- If the demo fails because of composition or arrangement, revise upstream rather than increasing generation cost
- After approval, use music-produce with the Replicate execution skills to create the full production
- If a local defect remains, refine the smallest affected section rather than regenerating the whole track
- Run final musical evaluation and deterministic technical QC

What to optimise for:
- strong melodic identity
- coherent arrangement and energy arc
- production that serves the approved composition
- preservation of approved musical decisions
- targeted refinement rather than restart
- technically valid final audio
```

## What this tests

```text
brief
→ composition drafts
→ selection
→ approved composition
→ arrangement
→ short demo
→ evaluation
→ targeted refinement
→ final production
→ technical QC
```

This is the first complete vertical workflow target. Replicate generation runs only when the consumer project has the official Replicate execution skills and credentials configured.

## Files

- `composition.yaml` — approved composition lineage and decision state
- `arrangement.yaml` — approved arrangement lineage and remaining open production decision
