# Music Production Customisation Packs Specification

## 1. Purpose

Customisation Packs provide reusable music-production profiles for Music Production Skills.

```text
Music Production Skills
→ knows how to compose, produce and evaluate music

customisation pack
→ defines what kind of music production to create
```

A pack may combine:

```text
format + use context + genre + production language + optional performance/vocal profile
```

It may also define arrangement conventions, instrumentation, sound palette, rhythmic feel, production realisation, mixing direction, delivery requirements, downstream handoffs, and pack-aware evaluation criteria.

Packs are distributed as installable Agent Skills and consumed as peer skills by:

```text
music-compose
music-produce
music-evaluate
```

This is a supplemental Music Production Skills specification. It does not replace the three canonical Creative Production Skills specifications or the Testing and Benchmark Specification.

---

## 2. Goals

A pack should:

- make a coherent music-production language reusable across projects;
- specialise the core workflow without replacing it;
- influence relevant artifacts from brief and composition through final evaluation;
- preserve approved and locked musical decisions;
- adapt evaluation to intentional format, genre and production characteristics;
- define downstream handoffs where the use context requires another Creative Production Skills project or runtime;
- remain optional;
- install independently;
- remain useful as one Agent Skill;
- reuse Replicate Agent Skills and deterministic tools rather than reimplementing them;
- express production characteristics operationally rather than as genre labels alone.

---

## 3. Non-Goals

A pack does not:

- replace `music-compose`, `music-produce`, or `music-evaluate`;
- implement a music-model provider API;
- implement a DAW, game-audio runtime, scoring engine, or distribution service;
- silently override explicit user instructions;
- silently override approved or locked music artifacts;
- require one installed skill per format, genre, production style, instrument, or vocal characteristic;
- require a universal style or genre engine;
- require pack inheritance or a composition runtime;
- embed private credentials, licensed stems, copyrighted reference tracks, or private voice assets;
- define a pack only by naming a specific living artist or producer;
- attempt to reproduce a specific existing recording, composition, arrangement, vocal identity, or mix as the entire purpose of a pack;
- claim native stems when the execution path only produced a stereo mix or source-separated estimates.

A pack may define a handoff to another production domain, but the receiving domain continues to own its own production work.

---

## 4. Core Model

```text
CUSTOMISATION PACK

Format
  +
Use context
  +
Genre
  +
Production language
  +
Performance / vocal profile (optional)
  +
Audience (optional)
       ↓
Music production profile
       ↓
music-compose
       ↓
music-produce
       ↓
music-evaluate
       ↓
Music artifacts + optional downstream handoff
```

A pack represents a **coherent music-production recipe**.

Prefer ready-made packs such as:

```text
intimate-singer-songwriter-single
melodic-techno-club-track
cinematic-hybrid-score
adaptive-game-score
premium-brand-music
```

over low-level combinations such as:

```text
format-single
genre-techno
style-analogue-synth
vocal-breathy
delivery-streaming
```

The dimensions remain explicit inside every pack so later modularisation is possible.

Independent format, genre, production-style, vocal-profile and delivery skills are deferred until real use proves that users repeatedly need to recombine those dimensions independently.

---

## 5. Pack Dimensions

### 5.1 Format

Format defines the musical object being produced and therefore has the strongest effect on workflow and artifacts.

Examples:

```text
vocal-single
instrumental-single
club-track
film-cue
television-cue
adaptive-game-music
loop
jingle
sting
brand-theme
ambient-bed
album-track
```

A format may define:

- expected duration or duration range;
- structural units;
- whether vocals are intrinsic, optional, or excluded;
- whether the output is linear or adaptive;
- whether exact loop boundaries matter;
- whether a mockup is required before final realisation;
- whether alternate versions are expected;
- required delivery artifacts.

Format constraints may be hard requirements where the deliverable depends on them.

### 5.2 Use Context

Use context defines where the music must function.

Examples:

```text
streaming-release
album
dj-club
film
television
video
video-game
advertising
social
podcast
installation
background-focus
```

Use context may influence:

- duration;
- arrangement density;
- intro/outro behaviour;
- dialogue space;
- loopability;
- transition behaviour;
- loudness and dynamics priorities;
- cutdown requirements;
- stems and alternate mixes;
- timing metadata;
- handoff requirements.

Use context is often more operationally important than audience for music production.

### 5.3 Genre

Genre defines musical expectations without imposing a formula.

Examples:

```text
pop
r&b
hip-hop
house
techno
drum-and-bass
ambient
indie-rock
folk
jazz
classical
orchestral
cinematic
chiptune
synthwave
metal
reggae
latin
```

Genre may influence:

- rhythm and groove;
- harmonic language;
- form;
- instrumentation;
- sound palette;
- vocal expectations;
- arrangement density;
- mix priorities;
- listener expectations.

Genre guidance should normally be soft.

A techno pack may favour repetition and gradual transformation without requiring one fixed build/drop template. A singer-songwriter pack may favour lyric and vocal focus without requiring acoustic guitar on every production.

### 5.4 Production Language

Production language defines how the musical material is realised sonically.

Useful dimensions include:

```text
live / programmed / hybrid
acoustic / electronic / hybrid
clean / saturated / distressed
minimal / dense
close / spacious
quantised / humanised
sample-driven / synthesis-driven / performance-driven
polished / raw / intentionally lo-fi
mono-compatible / wide / immersive where supported
```

A production language must be operational rather than only descriptive.

Example:

```yaml
production_language:
  foundation: electronic
  rhythm:
    timing: tight-but-not-mechanical
    kick: dominant-low-end-anchor
    percussion: sparse-syncopation
  synthesis:
    bass: mono-focused
    melodic: evolving-analogue-style
  arrangement:
    evolution: gradual-layer-transformations
    contrast: energy-led-not-song-section-led
  mix:
    low_end: kick-and-bass-separation-critical
    stereo: width-above-low-bass
    dynamics: club-forward-without-destroying-transients
```

### 5.5 Performance and Vocal Profile

A pack may define:

```text
instrumental-only
vocal direction only
lead + backing-vocal roles
ensemble-performance direction
authorised provider voice reference
human performer reference
```

A vocal profile may define:

- role;
- language;
- register;
- delivery;
- articulation;
- phrasing;
- intimacy or projection;
- harmony/backing-vocal strategy;
- pronunciation requirements;
- consistency requirements;
- provider and authorised voice identifier where explicitly permitted.

Example:

```yaml
vocals:
  lead:
    required: true
    direction: intimate, restrained, conversational
    range: mid
    phrasing: behind-the-beat-where-natural
    doubles: selective
    tuning: transparent
  backing:
    use: chorus-emphasis-only
```

Specific voice identity is optional. Packs should normally describe performance direction rather than depend on one provider voice.

A pack must not embed or require unauthorised cloned voices or imitate a named person's vocal identity as its entire production definition.

### 5.6 Delivery Profile

Delivery is part of the production contract when the use context materially changes required outputs.

Examples:

```text
streaming master
instrumental
acapella
performance mix
TV mix
cue stems
rhythm / harmony / melody stems
60s / 30s / 15s / 6s cutdowns
loopable segment
intro / loop / outro set
state layers
stinger
alternate ending
```

A pack may require only outputs the current production actually has enough source material to produce honestly.

```text
native production stems
≠
source-separated estimates
```

When genuine stems are unavailable, the pack must surface the limitation rather than falsify the artifact type.

### 5.7 Audience

Audience is optional and should be defined only when it materially changes production decisions.

Examples:

```text
children
family
teen
general-adult
club-audience
premium-consumer
professional / trade
```

Audience may influence:

- lyric/content boundaries;
- complexity;
- intensity;
- accessibility;
- hook immediacy;
- vocal presentation;
- mix translation priorities.

Audience does not replace explicit project constraints.

---

## 6. Production Profile

A pack translates its dimensions into music-production behaviour.

It may define:

```text
format
use context
genre
composition language
arrangement language
instrumentation
production realisation
performance / vocal direction
mix priorities
delivery requirements
evaluation criteria
cross-project handoffs
```

Example:

```yaml
pack: adaptive-game-score

format:
  type: adaptive-game-music
  output: modular-music-set

use_context: video-game

genre:
  primary: electronic
  secondary: cinematic

composition:
  thematic_identity: one-core-motif
  harmony: state-compatible
  tempo: stable-per-music-system

structure:
  requires:
    - loopable-exploration-segment
    - higher-intensity-state
    - transition-safe-boundaries
    - optional-stinger

arrangement:
  layers:
    - pulse
    - harmony
    - melody
    - intensity
  compatibility: simultaneous-layer-playback-where-declared

production:
  tails: preserve-where-loop-design-requires
  transitions: bar-or-beat-aware
  one_shot_master: not-sufficient

delivery:
  require:
    - loop-points
    - tempo
    - meter
    - transition-notes
  stems: only-when-native-production-material-exists

evaluation:
  preserve:
    - thematic-identity-across-states
    - seamless-loop-behaviour
  do_not_penalise:
    - deliberate-repetition
    - sparse-state-layers
  reject:
    - audible-loop-clicks
    - incompatible-state-layers
    - transition-points-that-break-meter
    - linear-only-delivery-when-adaptive-output-was-requested
```

The production profile is a production contract, not descriptive metadata.

---

## 7. Decision Precedence

A pack provides defaults and constraints but does not override stronger production decisions.

```text
1. explicit project/user instructions
2. approved and locked music artifacts / production decisions
3. selected customisation pack
4. Music Production Skills defaults
```

Within the pack:

```text
hard format / use-context / delivery constraints
→ may override softer genre and production-style defaults

genre conventions
→ normally soft

production language
→ normally soft unless declared a required identity trait

performance / vocal direction
→ applies only where relevant
```

If a pack conflicts with approved work, surface the conflict rather than silently rewriting either side.

A pack may not reopen a locked melody, lyric, arrangement, vocal performance, mix decision, or timing commitment merely because another convention would be more typical for the selected genre.

---

## 8. Integration with Core Music Skills

Music Production Skills remains fully usable without a pack.

```text
core skills
   │
   ├── no pack
   │   → derive production direction from the brief and artifacts
   │
   └── customisation pack
       → inherit predefined production language
```

Only relevant guidance should apply.

A club pack should not invent vocals. A singer-songwriter pack should not require club-length intros. A film-score pack should not impose a streaming-song chorus. An adaptive-game pack should not create a middleware runtime.

### 8.1 `music-compose`

A pack may influence:

```text
brief interpretation
reference-analysis priorities
form
melodic / harmonic / rhythmic language
groove
lyric constraints where relevant
motif strategy
arrangement
instrument roles
draft representation
candidate diversity
selection criteria
```

It must not silently choose high-impact unresolved creative decisions that the user should approve.

A pack changes the search space, not approval ownership.

### 8.2 `music-produce`

A pack may influence:

```text
instrumentation / timbre
production realisation
performance direction
vocal production
model capability requirements
demo fidelity
section-level refinement strategy
mix priorities
mastering priorities
delivery variants
stems / alternate mixes when genuinely available
```

The pack does not own provider execution.

Replicate Agent Skills continue to own model discovery, comparison and execution. FFmpeg/ffprobe, Tonal, `@tonejs/midi`, DAWs and specialist tools keep their existing execution boundaries.

### 8.3 `music-evaluate`

Evaluation must understand intentional format, genre and production characteristics.

Examples:

```text
melodic techno
→ repetition and gradual transformation can be intentional

singer-songwriter
→ sparse arrangement and small timing variation can be intentional

sample-textured hip-hop
→ controlled grit and swing can be intentional

cinematic score
→ dialogue space may matter more than standalone loudness

adaptive game music
→ repeated loops and segmented delivery are intentional

brand sting
→ structural simplicity may be necessary because duration is the hard constraint
```

A pack may define:

```yaml
evaluation:
  preserve:
    - core-hook
    - sparse-vocal-focus

  do_not_penalise:
    - intentional-room-noise
    - slight-human-timing

  reject:
    - lyric-intelligibility-loss
    - production-density-that-buries-the-lead
```

`music-evaluate` must still detect unintended failures such as weak composition, masking, poor transitions, broken loops, vocal mutation, generation artefacts, clipping, preservation failures, incorrect delivery, or deviations from approved pack constraints.

The pack changes the quality target, not the requirement for quality.

---

## 9. Cross-Project Handoffs

Use-context packs can define explicit artifact projections into other Creative Production Skills projects.

### 9.1 Film / Television / Video

```text
Narrative / Video context
       ↓
scene purpose
edit timeline
spotting / timing requirements
       ↓
Music Production Skills
       ↓
cues
mockups
approved music
mix / master
cue stems where genuine
timing metadata
       ↓
Video Production Skills / post-production
```

Music owns composition and music production. Video owns picture editorial and final programme integration.

Professional scoring workflows commonly use spotting, mockups, synchronized cues and stems; those concepts are therefore valid music-specific pack constraints rather than generic video metadata.

### 9.2 Advertising

```text
Advertising Production Skills
       ↓
brand / audience / proposition / campaign constraints
       ↓
Music Production Skills
       ↓
brand music
full version
cutdowns
sting / mnemonic
instrumental variants where required
```

Advertising owns campaign strategy. Music owns the music.

### 9.3 Video Games

```text
game design / implementation context
       ↓
states
intensity model
loop / transition requirements
       ↓
Music Production Skills
       ↓
segments
loops
state layers
stingers
transition notes
       ↓
Wwise / FMOD / game runtime
```

Music Production Skills does not become a Wwise or FMOD implementation system merely because a pack prepares assets for one.

Adaptive music commonly uses looping segments, transitions, layers, markers and state-driven changes. The pack may therefore define those delivery semantics without owning runtime integration.

---

## 10. Reference and Identity Policy

Packs may define reference-analysis goals such as:

```text
arrangement density
instrument roles
groove
harmonic colour
mix perspective
sound palette
section contrast
production era characteristics
```

A reference is evidence for production characteristics, not a target for direct imitation.

Prefer:

```text
warm 1970s-style dry drums, close vocal, restrained stereo width
```

over:

```text
make it exactly like <specific recording>
```

A pack should not use the name of a living artist, producer, singer, band, or composer as its entire production definition.

Where a specific performer or provider voice is used, the pack must reference material the author and consumer are permitted to use.

Credentials and private reference assets must never be embedded in a public pack.

---

## 11. Agent Skills Packaging

Example repository:

```text
music-customisation-packs/
├── README.md
├── LICENSE
├── skills/
│   ├── intimate-singer-songwriter-single/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── production-profile.md
│   │   │   ├── composition.md
│   │   │   ├── production.md
│   │   │   └── evaluation.md
│   │   └── evals/
│   │
│   ├── melodic-techno-club-track/
│   ├── cinematic-hybrid-score/
│   ├── adaptive-game-score/
│   └── premium-brand-music/
│
└── evals/
    └── end-to-end/
```

Only create files a pack actually needs.

A simple pack may be only:

```text
SKILL.md
references/production-profile.md
```

Each `SKILL.md` should define:

```text
pack identity
intended use
format
use context
genre
production language
performance / vocal profile where relevant
audience where relevant
delivery requirements
what must remain consistent
integration with music-compose
integration with music-produce
integration with music-evaluate
cross-project handoffs where relevant
external provider/tool requirements
pack-aware evaluation behaviour
```

Every installable pack must be self-contained inside its own skill directory.

Repository-level documentation is not a runtime dependency.

---

## 12. Candidate Catalogue

The initial design considered a broader set of useful packs:

```text
vocal-pop-single
intimate-singer-songwriter-single
alternative-rnb-vocal-single
melodic-techno-club-track
house-club-track
drum-and-bass-club-track
sample-driven-hip-hop
indie-rock-band-single
ambient-focus-soundscape
cinematic-hybrid-score
orchestral-score
adaptive-game-score
retro-game-loop-set
premium-brand-music
short-form-jingle
podcast-theme-package
```

The shortlist should not optimise for genre popularity alone.

It should maximise differences in:

```text
composition grammar
arrangement grammar
production realisation
draft strategy
delivery artifact shape
cross-project handoff
evaluation target
```

---

## 13. Recommended Initial Pack Set

### 13.1 `intimate-singer-songwriter-single`

```text
Format: vocal single
Use context: streaming / album
Genre: singer-songwriter / indie folk
Production language: intimate acoustic / lightly produced
Performance: one expressive lead vocal
```

Focus:

```text
lyric and melody first
small arrangement
human timing
natural dynamics
close vocal perspective
acoustic instrument identity
transparent vocal production
```

Pack-aware evaluation should not penalise slight human timing or sparse production merely for lacking density.

Still require:

```text
strong song
clear lyric delivery
coherent vocal performance
arrangement support
no accidental noise / edit defects
```

Why initial:

> Proves that a pack can prioritise song, lyric and performance rather than treating every production as model-generated maximal instrumentation.

### 13.2 `melodic-techno-club-track`

```text
Format: club track
Use context: DJ / club / streaming
Genre: melodic techno
Production language: synth-driven electronic
Performance: instrumental by default
```

Focus:

```text
stable tempo
groove before harmonic complexity
kick / bass relationship
gradual layer evolution
long-form energy control
mix translation
functional intro / outro
controlled build and release
```

Pack-aware evaluation should not penalise repetition when the musical material evolves functionally.

Still require:

```text
low-end separation
energy progression
transition quality
motif identity
no accidental density spikes
technical delivery integrity
```

Why initial:

> Proves a loop/evolution production grammar that is materially different from verse/chorus songwriting.

### 13.3 `cinematic-hybrid-score`

```text
Format: cue / score
Use context: film / television / video
Genre: cinematic hybrid
Production language: orchestral + electronic
Performance: instrumental by default
```

Focus:

```text
spotting
narrative function
thematic development
sync points
cue sketch → mockup progression
dialogue space
orchestral/electronic balance
cue stems and delivery where available
```

Pack-aware evaluation should evaluate the cue against picture/narrative purpose rather than only standalone musical satisfaction.

Still require:

```text
coherent thematic logic
sync suitability
readable dramatic progression
clean cue boundaries
technical delivery
```

Why initial:

> Proves that scoring uses cue/mockup/sync semantics instead of a song pipeline. Berklee scoring workflows explicitly include spotting, mockups, synchronization and stem preparation.

### 13.4 `adaptive-game-score`

```text
Format: adaptive music set
Use context: video game
Genre: electronic / hybrid by default
Production language: modular and transition-aware
Performance: instrumental by default
```

Focus:

```text
loopable segments
state-compatible layers
intensity variants
transition points
re-entry behaviour
stingers
stable tempo / meter metadata
runtime-oriented delivery notes
```

Pack-aware evaluation should test:

```text
seamless loops
state compatibility
thematic continuity
transition integrity
layer compatibility
absence of clicks / tails cut incorrectly
```

Why initial:

> Proves non-linear music delivery. Wwise and FMOD workflows use music segments, transitions, looping, layers and state-driven playback, so this pack changes both artifacts and evaluation rather than just style.

The pack must not implement the Wwise/FMOD runtime itself.

### 13.5 `premium-brand-music`

```text
Format: brand track + sting + cutdowns
Use context: advertising / social / product film
Genre: brief-dependent, electronic/minimal default
Production language: polished, immediate, recognisable
Performance: instrumental by default; vocal only when the campaign requires it
```

Focus:

```text
identity in the opening seconds
memorable sonic motif
exact duration control
60s / 30s / 15s / 6s adaptation where required
short sting / mnemonic
clean edit points
brand-safe production
instrumental variants
```

Pack-aware evaluation should not penalise structural simplicity where exact duration and immediate recognition are the real production constraints.

Still require:

```text
recognisable identity
clean cutdowns
consistent motif across variants
no rushed or broken endings
technical compliance
```

Why initial:

> Proves strict duration, variant generation and cross-domain campaign handoff without making Advertising Production Skills responsible for music composition.

---

## 14. Why These Five First

The initial set deliberately spans five different production grammars:

| Pack | Primary grammar it proves |
|---|---|
| `intimate-singer-songwriter-single` | lyric/melody/performance-led song |
| `melodic-techno-club-track` | loop/evolution/club mix-led track |
| `cinematic-hybrid-score` | spotting/sync/mockup cue |
| `adaptive-game-score` | non-linear loops/layers/transitions |
| `premium-brand-music` | exact-duration identity + variants |

Together they cover:

```text
vocal + instrumental
linear + non-linear
song + track + cue + adaptive set + sting
streaming + club + picture + game + advertising
performance-led + synthesis-led + hybrid scoring
single master + stems/metadata + multiple cutdowns
```

This is stronger evidence for a customisation-pack contract than five genre variants of the same streaming-song workflow.

---

## 15. Follow-Up Pack Candidates

After the first five prove the contract, strong follow-up candidates are:

```text
sample-driven-hip-hop
alternative-rnb-vocal-single
indie-rock-band-single
drum-and-bass-club-track
ambient-focus-soundscape
jazz-live-ensemble
orchestral-score
retro-game-loop-set
podcast-theme-package
children-family-song
```

Revisit based on observed demand and actual production gaps.

Do not create packs merely to complete a genre catalogue.

---

## 16. Installation and Use

Install a pack independently:

```bash
npx skills add <org>/music-customisation-packs \
  --skill melodic-techno-club-track \
  --agent claude-code
```

A consumer project may install both Music Production Skills and a pack:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-produce \
  --skill music-evaluate \
  --agent claude-code

npx skills add <org>/music-customisation-packs \
  --skill melodic-techno-club-track \
  --agent claude-code
```

For Replicate-backed generation:

```bash
npx skills add replicate/skills \
  --skill find-models \
  --skill compare-models \
  --skill run-models \
  --agent claude-code
```

For Codex, use:

```text
--agent codex
```

Example use:

```text
Use Music Production Skills with the melodic-techno-club-track customisation pack to produce this brief.
```

The pack is a peer capability, not an embedded runtime dependency.

Project-local installation remains the default recommendation.

---

## 17. Authoring Rules

A pack should:

- describe production characteristics, not merely name a genre;
- be coherent enough to use as one installed Agent Skill;
- define format and use-context constraints where they materially affect artifacts or delivery;
- define genre expectations without reducing the genre to a formula;
- express production language operationally;
- preserve approved and locked musical decisions;
- define intentional traits that evaluation must preserve;
- define downstream handoffs without absorbing downstream production responsibilities;
- keep optional voice/performance identity separate from core musical behaviour;
- reference only performer/voice assets the author and consumer are permitted to use;
- avoid provider execution logic unless explicitly required;
- avoid unnecessary files and configuration layers;
- remain useful even when the current best Replicate music model changes.

A pack should not use an individual creator's name as its entire style definition or attempt to reproduce a specific recording note-for-note, arrangement-for-arrangement, vocal-for-vocal, or mix-for-mix.

---

## 18. Evals

Every pack should prove that an agent can:

```text
recognise when the pack is relevant
apply format constraints
apply use-context constraints
apply genre guidance without formulaic copying
apply operational production language
preserve pack constraints across composition and production
adapt evaluation correctly
avoid applying the pack when not requested
respect explicit project overrides
respect approved and locked music artifacts
maintain draft / selection / approval / locking semantics
preserve smallest-unit refinement
produce correct downstream handoff artifacts where relevant
avoid duplicating provider execution
```

Pack evals should cover:

### Normal

Apply the pack to a compatible brief and produce a coherent production plan.

### Draft

Use the cheapest representation consistent with the pack's current uncertainty.

### Refinement

Apply a local correction while preserving locked musical decisions and pack identity.

### Final

Verify all relevant production and delivery constraints.

### Boundary

Do not apply the pack when it was not selected, and do not force irrelevant rules into a different format.

### Pack-Specific Hard Cases

Examples:

```text
singer-songwriter
→ preserve lyric/melody while changing production density

melodic-techno
→ preserve groove and low-end function while changing melodic layer

cinematic-score
→ preserve sync points while revising orchestration

adaptive-game-score
→ preserve loop/transition compatibility while changing one layer

premium-brand-music
→ preserve sonic motif across 60s / 15s / 6s variants
```

Provider-backed generation evals may run separately where they incur cost.

Negative cases are required so a pack is not rewarded merely for aggressively applying its conventions everywhere.

---

## 19. Acceptance Criteria

```text
✓ installs independently as an Agent Skill
✓ has a coherent music-production identity
✓ defines format and use context
✓ defines genre and production language operationally
✓ performance/vocal direction is optional unless intrinsic to the format
✓ audience is defined only when materially relevant
✓ delivery requirements are explicit where required
✓ core Music Production Skills remain usable without the pack
✓ music-compose applies relevant pack guidance
✓ music-produce applies relevant pack guidance
✓ music-evaluate distinguishes intentional traits from defects
✓ explicit project instructions override pack defaults
✓ approved and locked artifacts are not silently rewritten
✓ downstream handoffs respect project boundaries
✓ provider execution logic is not duplicated
✓ private credentials and unauthorised reference/voice assets are not embedded
✓ genuine stems are distinguished from separated estimates
✓ at least one realistic example demonstrates the pack
✓ behavioural evals pass
```

---

## 20. Deferred Extensions

Do not implement these until real usage proves the need:

```text
independent format skills
independent use-context skills
independent genre skills
independent production-style skills
independent vocal-profile skills
independent delivery-profile skills
pack inheritance
pack composition engine
pack conflict resolver
pack marketplace metadata
automatic pack recommendation
automatic pack mixing
provider-specific prompt optimisation
provider-specific model routing per pack
central genre / style ontology
automatic reference-track imitation
automatic creator-style matching
```

The first implementation should prove coherent ready-made packs before introducing a compositional framework.

---

## 21. Extraction Candidate

The customisation-pack concept is now independently present in Video, Narrative and Music Production Skills.

Potential shared concepts include:

```text
pack identity
production profile
precedence rules
pack-aware evaluation
optional provider references
self-contained Agent Skill packaging
```

Do not extract them yet merely because three specifications now resemble each other.

Reconsider extraction only after real implementations demonstrate substantially equivalent behaviour and a shared contract would reduce rather than increase coupling.

Music-specific dimensions such as format, use context, production language, performance/vocal profile, loops, cue stems and delivery variants should remain music-owned unless equivalent semantics are proven elsewhere.

---

## 22. Initial Implementation Order

```text
1. define the Music customisation-pack contract
2. create the first five ready-made packs
3. integrate pack consumption into music-compose
4. integrate pack consumption into music-produce
5. integrate pack-aware evaluation into music-evaluate
6. add behavioural evals
7. test each pack against at least one real production
8. compare pack behaviour across the five production grammars
9. refine the contract from observed failures
10. only then reconsider modular composition or family extraction
```

Recommended initial pack set:

```text
intimate-singer-songwriter-single
melodic-techno-club-track
cinematic-hybrid-score
adaptive-game-score
premium-brand-music
```

This set deliberately spans different output forms and use contexts so the implementation proves that **music format and production context change workflow, artifacts, delivery and evaluation**, rather than merely demonstrating five genre presets.

---

## 23. Catalogue Contract

The public extension-pack catalogue lives in:

```text
docs/06-extension-pack-catalogue.md
```

Every catalogue pack must include at least one canonical showcase example. Each showcase README must contain the complete generation prompt under `## Prompt`.

The catalogue should describe:

```text
pack identity
format + use context
production grammar
core-skill effects
pack-aware evaluation
showcase example
what the example proves
```

Do not publish fabricated production results. Prompts may be committed before generation; `What happened`, provenance, costs, output claims and benchmark findings require real evidence.

---

## 24. `music-pack-author`

`music-pack-author` is an optional authoring/support Agent Skill for creating and adapting customisation packs.

It is not a fourth core music-production skill. It does not participate in ordinary composition/production/evaluation unless the user is authoring a reusable pack.

It must:

1. check the existing catalogue before creating a new pack;
2. require a material production-grammar difference rather than a genre/style label;
3. preserve the normal decision-precedence model;
4. create the smallest self-contained pack package that is sufficient;
5. define integration with `music-compose`, `music-produce`, and `music-evaluate`;
6. define pack-aware evals;
7. create at least one showcase example with a full generation prompt;
8. avoid provider/API reimplementation;
9. reject creator-name-only imitation packs;
10. avoid pack inheritance/composition infrastructure until real use proves it necessary.

The authoring skill may provide deterministic structural validation, but creative coherence remains an evaluation responsibility rather than a schema-validation claim.

---

## 25. `music-pack-author` Command Decomposition

`music-pack-author` uses bounded local commands so pack creation can be tested without treating the whole authoring workflow as one opaque operation.

```text
assess-pack-need
→ decide whether a new reusable production grammar is justified

define-profile
→ translate the justified need into an operational music-production profile

author-pack
→ create the smallest self-contained Agent Skill package

create-showcase
→ create the canonical example and full generation prompt

validate-pack
→ check structure, precedence, boundaries, eval coverage and catalogue compatibility

catalogue-pack
→ add an accepted pack to the catalogue and benchmark surfaces
```

The skill must run or reason through `assess-pack-need` before `author-pack` when an existing catalogue pack may already cover the requested production grammar.

Each command remains governed by the precedence rule:

```text
explicit project instructions
> approved / locked decisions
> selected pack defaults
> core Music Production defaults
```

Extension packs themselves do **not** need command directories merely because the authoring skill has commands. A pack is primarily a reusable production profile. Add pack-local commands only if future real use demonstrates independently testable operational behaviour beyond profile application.

Command-level evals should prove both positive behaviour and meaningful misuse boundaries. Examples:

```text
assess-pack-need
→ rejects a redundant genre-only pack

create-showcase
→ always includes a complete fenced generation prompt

validate-pack
→ rejects silent override of approved decisions

catalogue-pack
→ refuses an accepted pack whose showcase/benchmark coverage is missing
```

---

## 26. Related Documents

- `docs/01-creative-skills-system-spec.md` — project scope, core skills and boundaries.
- `docs/02-creative-skills-workflows-and-artifacts-spec.md` — music lifecycle and first-class artifacts.
- `docs/03-creative-skills-repository-and-contracts-spec.md` — Agent Skill packaging and technical contracts.
- `docs/04-testing-and-benchmark-spec.md` — testing, regression and benchmark policy.
- `docs/06-extension-pack-catalogue.md` — the public catalogue of initial packs and showcase prompts.
- `docs/extraction-candidates.md` — candidates that may later become family-level abstractions.

---

**Music Production Customisation Packs Specification**  
**Version 4 — 26 August 2026**
