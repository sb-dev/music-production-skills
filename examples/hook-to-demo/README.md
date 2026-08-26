# Hook to Demo

**Level 1 — cheap composition exploration before expensive production**

Develop a melancholic electronic instrumental by testing the musical idea cheaply before committing to final audio.

## Prompt

```text
Use music-compose to develop a 90-second melancholic electronic instrumental for a reflective closing montage.

Create three materially different chorus-hook ideas.

Requirements:
- Duration: 90 seconds
- Mood: reflective, nocturnal, slightly hopeful
- Tempo: around 100 BPM
- Meter: 4/4
- Palette: soft synth, restrained bass, sparse electronic drums
- Hook: memorable without sounding triumphant
- Structure: begin sparse and intimate, then build into one clear final section
- Vocals: none

Workflow:
- Keep the first drafts cheap enough to compare quickly
- State what musical question each hook is testing
- Select the strongest melody and the strongest groove independently if they come from different drafts
- Develop the selected material into a concise arrangement
- Treat selection as distinct from approval
- Ask for approval before committing to expensive full-track generation
- Create only a short demo when audio is needed to validate production direction
- Run music-evaluate before committing to final production

What to optimise for:
- melodic identity
- clear contrast between sections
- a coherent energy arc
- economical arrangement
- preservation of selected material
```

## What this tests

```text
brief
→ three hook drafts
→ component selection
→ arrangement
→ short demo request
```

The important behaviour is that musical uncertainty is resolved with the cheapest useful representation. A provider-backed final track is not required for this example.

## Files

- `brief.md` — the persistent music brief
- `selection.yaml` — example component-level selection metadata
