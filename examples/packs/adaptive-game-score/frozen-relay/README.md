# Frozen Relay

**Adaptive game music set**

This is the canonical showcase example for the `adaptive-game-score` extension pack.

## Prompt

```text
Use music-compose, music-produce and music-evaluate with the adaptive-game-score extension pack.

Create an adaptive music set called "Frozen Relay" for a science-fiction game level set in an abandoned communications facility buried under ice.

Game states:
1. Exploration: quiet movement through empty machinery spaces
2. Tension: the player has evidence that something is active nearby but combat has not started
3. Combat: fast, dangerous engagement in the same environment
4. Stinger: a short success/recovery event after the encounter

Shared musical identity:
- Tempo: 110 BPM
- Meter: 4/4
- Core motif: one short, recognisable motif shared across all states
- Harmonic language: cold, open, restrained dissonance
- Palette: granular ice-like textures, muted electronic pulse, low synthetic bass, sparse metallic percussion
- No vocals

Structure and compatibility:
- exploration loop: 32 bars, seamless
- tension state: must be able to enter cleanly at bar-aware boundaries and clearly increase uncertainty without becoming full combat
- combat state: higher rhythmic density and intensity while retaining motif identity
- stinger: 2-4 seconds, decisive but not celebratory
- keep tempo and meter compatible across the main states
- if using vertical layers, declare which layers are designed to play simultaneously

Workflow:
- design the state relationship before producing final audio
- validate loop points and transition behaviour early
- approve the shared motif before building all states
- create low-cost state sketches first
- produce/refine each state without mutating the approved motif unnecessarily

Delivery:
- exploration loop
- tension state or layer
- combat state or layer
- recovery stinger
- BPM and meter metadata
- loop-point and transition notes
- stems/layers only when genuinely produced as independent compatible material

Evaluation priorities:
- seamless loops
- thematic identity across states
- meaningful intensity differentiation
- transition-safe boundaries
- state/layer compatibility where declared
- no clicks or tail truncation at loops
- no linear-only master presented as an adaptive deliverable
```

## What this showcases

This example is designed to expose the pack's production grammar, preservation rules, delivery requirements and pack-aware evaluation target. It is a production prompt, not a recorded benchmark result. Generated artifacts and findings should be added only after the example has actually been run.

## Expected evidence after a real run

- production artifacts that reflect the selected pack;
- explicit approvals/locks where the prompt requires them;
- provider/tool provenance for generated audio;
- evaluation against the pack-aware criteria;
- no claims for stems, variants or adaptive layers that were not genuinely produced.
