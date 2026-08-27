# Checkpoint

**Level 5 — chiptune / synthwave — game-project handoff**

Produce a reusable game-menu/theme package for a game project without turning Music Production Skills into a game-audio runtime.

## Prompt

```text
Use music-compose, music-produce and music-evaluate to create a game music package called "Checkpoint" from a supplied game-project brief.

Upstream game context:
- Use: main menu and safe-hub screens
- Visual tone: crisp pixel art, night-time city, optimistic but slightly lonely
- The music may loop for several minutes in use
- A short confirmation sting is also needed for entering the hub

Music requirements:
- Genre: chiptune / synthwave hybrid
- Tempo: around 108 BPM
- Instrumental
- Core palette: chip-style lead, warm pad, simple bass, restrained electronic percussion
- Main loop: 60–75 seconds with a musically clean loop boundary
- Sting: 3–5 seconds derived from the same motif

Workflow:
- Treat game context as upstream creative constraints; Music owns the composition and production
- Develop one core motif that can support both the loop and sting
- Produce and evaluate the loop as music first
- Check the loop boundary explicitly so repeated playback does not expose a jump or unresolved tail
- Derive the sting from the approved motif rather than inventing a separate identity
- Deliver timing/loop metadata to the game project
- Do not introduce an adaptive-music engine, middleware integration or game runtime dependency

Deliverables:
- loopable approved master
- 3–5 second motif-derived sting
- loop start/end metadata
- basic timing metadata

What to optimise for:
- recognisable shared motif
- fatigue-resistant arrangement
- clean seamless loop
- clear but not abrasive sting
- simple artifact handoff to the game project
```

## What this example tests

- game project → music artifact handoff
- loopability as delivery constraint
- shared motif across master + sting without game runtime coupling

## Production evidence

This example currently defines the production challenge and copyable prompt. After the example is executed, keep the selected artifacts, provenance, evaluation findings, technical QC evidence and final deliverables here rather than inventing results in advance.
