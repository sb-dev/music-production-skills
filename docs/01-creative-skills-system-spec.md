# Music Production Skills — Creative Skills System Specification

## 1. Purpose

**Music Production Skills** is an open-source Agent Skills project for directing AI-assisted music production through reusable, production-oriented workflows.

It owns the production intelligence required to move from creative intent to approved composition and arrangement, produced audio, targeted refinement, final delivery, and evaluation.

It does not replace model providers, DAWs, or deterministic audio/MIDI tools.

For the initial implementation, Replicate is the primary model-execution provider. Official Replicate Agent Skills own model discovery, comparison, and execution. Local TypeScript tooling owns deterministic symbolic and media operations.

The governing boundary is:

> **Music Production Skills owns music-production workflow and creative intelligence. Replicate owns primary model intelligence and execution. Deterministic tools own mechanical music/audio operations.**

---

## 2. Project Goal

The project should help an AI agent behave as a music-production collaborator rather than a thin prompt interface to a song generator.

It should:

- develop musical ideas progressively;
- explore alternatives before expensive production;
- preserve approved musical decisions;
- refine the smallest useful unit instead of regenerating complete tracks by default;
- coordinate Replicate and deterministic tools;
- evaluate music according to the current production stage;
- produce coherent finished music and reusable production artifacts;
- hand music artifacts to other Creative Production Skills projects without coupling their runtimes.

The project supports experienced creators while remaining usable by people who do not personally perform every traditional music-production role.

---

## 3. Project Scope

Music Production Skills owns:

- music-brief interpretation;
- reference-analysis strategy;
- composition development;
- melody, harmony, rhythm, groove, lyrics, motifs, hooks, and structure as composition concerns;
- arrangement development;
- MIDI and structured musical drafting where useful;
- draft sets and creative selection;
- component-level selection across drafts;
- approval and locking of musical decisions;
- demo development;
- Replicate-backed music generation;
- model-native music prompt/input construction;
- local continuation, inpainting, or section refinement where supported;
- production provenance and lineage;
- technical audio inspection and deterministic finishing;
- stage-aware musical and production evaluation;
- delivery packaging;
- optional scoring workflows such as cue sketches and mockups where supported.

---

## 4. Non-Goals

Music Production Skills does not own:

- a generic music-generation API;
- a custom Replicate SDK;
- a static Replicate model registry;
- a static model-pricing catalogue;
- a permanent quality ranking of music models;
- a generic multi-provider abstraction;
- a DAW replacement;
- a general-purpose audio editor;
- a custom DSP framework;
- a full automated mixing engine;
- a full automated mastering engine;
- a stem-separation model;
- a notation engine;
- a music-distribution service;
- a rights-management service;
- a music-theory course;
- game audio/SFX production as a general discipline;
- advertising campaign strategy;
- video production;
- a universal Creative Production framework.

Professional mixing, mastering, orchestral notation, source separation, and DAW automation may be added as optional production paths when proven necessary. They are not bootstrap requirements.

---

## 5. Architectural Principles

### 5.1 Domain First

Music-production concepts determine the workflow. Current model capabilities do not define the production grammar.

### 5.2 Composition Is Not the Recording

The musical work and its produced recording are related but distinct.

A production refinement must not silently rewrite composition that has already been approved.

### 5.3 Draft Before Expensive Production

Use the cheapest and smallest representation capable of resolving the current uncertainty.

Examples:

```text
melodic question → MIDI / short motif
arrangement question → rough section / MIDI arrangement
integrated song question → demo
orchestration question → mockup
```

### 5.4 Preserve Approved Work

Selected musical decisions become constraints for downstream refinement until deliberately reopened.

### 5.5 Retry the Smallest Responsible Unit

A defect in one phrase, section, cue, or production decision should not trigger whole-track regeneration unless local correction is unavailable or inappropriate.

### 5.6 Capability Before Cost

Filter models by hard production requirements before cost or preference.

### 5.7 Thin Provider Layer

Replicate owns provider execution. The project should not recreate provider infrastructure.

### 5.8 Vertical First

Prove a complete core music-production workflow before adding DAW abstraction, scoring infrastructure, provider routing, or shared cross-domain frameworks.

---

## 6. System Architecture

```text
User / Upstream Project
        ↓
Music Production Skill
        ↓
Music Production Workflow
        ↓
Approved / Draft Artifacts
        │
        ├───────────────────────────────┐
        ↓                               ↓
Replicate Agent Skills           Deterministic Tools
├── find-models                  ├── Tonal
├── compare-models               ├── @tonejs/midi
└── run-models                   └── FFmpeg / ffprobe
        ↓
Replicate
        ↓
Selected Music Model
        ↓
Generated / Refined Music Artifact
        ↓
Music Evaluation
```

Secondary models within Replicate may be selected dynamically when another model better satisfies the required capability.

External secondary providers remain optional and require a demonstrated production gap.

---

## 7. Core Skills

The initial project contains three skills:

```text
music-compose
music-produce
music-evaluate
```

Do not create additional skills merely to mirror traditional music-production job titles.

### 7.1 `music-compose`

Owns the musical work before final production commitment.

Responsibilities:

- interpret the music brief for composition;
- analyse references for transferable musical/production characteristics;
- create and develop musical ideas;
- generate composition draft sets;
- develop melody, harmony, rhythm, lyrics, groove, hooks, motifs, and form;
- develop arrangement;
- use Tonal for deterministic theory mechanics;
- use `@tonejs/midi` for MIDI mechanics;
- select complete drafts or components across drafts;
- lock approved musical decisions;
- refine only open decisions;
- hand approved composition and arrangement to production.

### 7.2 `music-produce`

Owns transformation of approved musical direction into produced audio.

Responsibilities:

- create demos;
- determine production requirements;
- use Replicate model discovery/comparison/execution;
- translate music-production intent into the selected model's native inputs;
- generate complete or partial production audio;
- refine existing audio locally when supported;
- preserve locked musical decisions;
- use FFmpeg/ffprobe for deterministic media operations and QC;
- create mixes, masters, stems, or delivery packages only when the workflow genuinely supports them;
- record production provenance;
- avoid claiming professional DAW-level mixing/mastering where the execution path does not provide it.

### 7.3 `music-evaluate`

Owns stage-aware music-production evaluation.

Responsibilities:

- compare drafts;
- assess brief alignment;
- assess composition;
- assess arrangement;
- assess performance and production where applicable;
- verify requested refinement;
- verify preservation of locked decisions;
- run technical audio QC;
- distinguish creative defects from technical defects;
- identify the responsible production stage;
- recommend the smallest corrective action;
- produce persistent evaluation reports.

---

## 8. Primary Execution Layer

Replicate is the canonical primary model provider.

Required peer Agent Skills:

```text
find-models
compare-models
run-models
```

Music Production Skills must not assume a permanent default music model.

The stable decision is:

```text
provider = Replicate
model = dynamic unless deliberately pinned
```

### Preference order

```text
1. compatible Replicate official model
2. compatible Replicate non-official model
3. explicitly configured external secondary execution
```

Capability requirements override this preference order.

---

## 9. Model Routing

Every generative operation follows:

```text
Production Requirement
        ↓
Artifact + Lifecycle State
        ↓
Unresolved Decision
        ↓
Hard Capabilities
        ↓
find-models
        ↓
Viable Candidates
        ↓
compare-models
        ↓
Generation Policy
        ↓
Model-Native Music Inputs
        ↓
run-models
```

Hard capabilities may include:

- text-to-music;
- lyrics;
- vocals;
- instrumental-only output;
- duration;
- reference-audio conditioning;
- melody conditioning;
- continuation;
- inpainting/regional editing;
- section controls;
- tempo control;
- structural controls;
- language;
- commercial-use constraints;
- required audio format characteristics.

Do not normalise every model into a universal lowest-common-denominator request schema.

---

## 10. Workflow State and Generation Policy

Workflow state and generation policy are independent.

### Workflow state

```text
draft
refine
final
```

### Generation policy

```text
economy
balanced
quality
```

Examples:

```yaml
workflowState: draft
generationPolicy: quality
```

A sophisticated orchestral mockup may be a draft while requiring a high-capability model.

```yaml
workflowState: final
generationPolicy: economy
```

A lower-cost model may satisfy the approved final requirement.

Do not encode lifecycle state as model quality.

---

## 11. Cost Policy

The strongest cost control is workflow design, not model-price micro-optimisation.

Prefer:

```text
motif instead of full song
section instead of whole track
MIDI instead of audio
local repair instead of regeneration
demo before final production
```

Rules:

1. capability filtering precedes cost optimisation;
2. do not maintain static provider pricing;
3. do not exceed a hard user budget silently;
4. use cheap representations aggressively for unresolved creative decisions;
5. increase fidelity only when the next decision requires it;
6. retry only the affected unit where possible.

---

## 12. Deterministic Execution Layer

Local deterministic tooling uses TypeScript orchestration.

### Tonal

Use for deterministic symbolic operations such as:

- notes;
- intervals;
- scales;
- chords;
- keys;
- transposition;
- progressions.

Tonal supports composition mechanics. It does not own creative composition.

### `@tonejs/midi`

Use for MIDI mechanics such as:

- read/write MIDI;
- tracks and notes;
- tempo changes;
- transposition;
- structured MIDI drafts.

### FFmpeg / ffprobe

Use for:

- media inspection;
- duration/format/channel checks;
- trimming/extraction;
- concatenation;
- conversion/resampling;
- loudness and signal measurements;
- technical QC;
- deterministic delivery operations.

Do not recreate these capabilities in custom DSP code without a demonstrated need.

---

## 13. Production Modes

The shared backbone supports several production modes without forcing identical artifact chains.

### Song / Record

```text
brief
→ composition
→ arrangement
→ demo
→ production
→ refinement
→ final audio
→ evaluation
```

### Electronic / In-the-Box

```text
brief
→ musical material / sound exploration
↔ composition
↔ arrangement
→ demo
→ production
→ final audio
```

### Media Scoring Extension

```text
picture / narrative context
→ spotting plan
→ cue
→ cue sketch
→ mockup
→ approved production
→ cue mix / stems / delivery
```

The scoring extension is not part of the first implementation slice.

---

## 14. Evaluation Policy

Evaluation intensity depends on lifecycle state.

### Draft

Check only what is necessary to decide whether the draft is useful:

- validity;
- brief relevance;
- meaningful difference from alternatives;
- whether it answers the intended production question;
- catastrophic musical or technical defects.

### Refine

Check:

- requested change succeeded;
- locked decisions were preserved;
- no major regression was introduced;
- the refinement still satisfies prior approvals.

### Final

Run all applicable:

- intent fit;
- composition;
- arrangement;
- performance;
- production coherence;
- preservation;
- technical QC;
- delivery completeness.

Avoid fake precision. Prefer structured findings and `pass` / `warn` / `fail` over invented universal quality scores.

---

## 15. Retry and Escalation

Use this diagnosis order:

```text
failure
  ↓
responsible production decision
  ↓
smallest affected unit
  ↓
can current model/tool fix locally?
  ├─ yes → refine locally
  └─ no
       ↓
can another Replicate model satisfy the capability?
  ├─ yes → use it
  └─ no → consider optional secondary execution
```

Do not escalate model cost when the problem actually belongs to composition, arrangement, or another upstream artifact.

---

## 16. External Artifact Handoffs

Music Production Skills composes with other project-family members through artifacts before runtime APIs.

### May consume from Narrative Production Skills

```text
story brief
character profile
world bible
screenplay
scene plan
dialogue
```

These are upstream story constraints. Music Production Skills may derive musical intent, themes, cue requirements, and emotional direction from them, but it does not redefine story, character arcs, world logic, or screenplay structure.

### May consume from Video Production Skills

```text
brief
storyboard
shot plan
animatic
edit timeline
video master
```

Use only the artifacts required by the music task. Timing and sync requirements should normally come from `shot_plan`, `animatic`, or `edit_timeline` rather than creating a parallel video-timing model inside Music Production Skills.

### May consume from Advertising Production Skills

```text
campaign brief
audience
positioning
proposition
approved claims
creative concept
CTA
duration
```

Advertising owns campaign strategy and messaging. Music Production Skills owns the resulting music production.

### May consume external game-project context

```text
game / level context
looping requirement
interactive-state requirement
duration / transition constraints
```

Video Game Asset Production Skills is not a required intermediary. Visual/world artifacts from that project may be used as optional references when supplied, but music remains a separate production domain.

### May produce for other projects

```text
music brief
composition / musical direction where useful
demo
music track             # normally an approved mix/master handoff
mix
master
stems when genuine
timing map / timing metadata where required
delivery package
evaluation report
```

A `timing map` is initially delivery metadata, not a new first-class music artifact.

Music used by a game remains owned by Music Production Skills; the game project consumes the resulting assets.

---

## 17. Extraction Policy

Potential shared abstractions belong in:

```text
docs/extraction-candidates.md
```

A concept may move into Creative Production Skills only when:

1. at least two production domains independently implement it;
2. the semantics are substantially equivalent;
3. a stable reusable contract exists;
4. extraction removes more complexity than it adds.

Initial observe-only candidates may include:

- draft sets;
- selection/provenance;
- approval/locking semantics;
- promotion/refinement;
- staged evaluation.

Keep `demo`, `mockup`, `composition`, and other music-native concepts local unless semantic equivalence is proven elsewhere.

### Stage 10 review status

Cross-project review found design overlap with Video and Narrative in draft sets, lineage, decision states, preserve/change refinement, and staged evaluation. These remain `observe only`; design similarity is not repeated implementation and no shared contract is extracted during bootstrap.

Explicitly keep these concepts separate:

```text
music composition ≠ video visual composition
music arrangement ≠ video edit timeline / narrative outline
music demo ≠ video animatic / motion prototype
music mix ≠ video audio_mix
music master ≠ video_master
music evaluation criteria ≠ video / narrative evaluation criteria
```

The repository uses three primary engineering specs plus a supplemental normative Testing and Benchmark Specification. This preserves the family three-spec ownership model while keeping the executable testing runbook separate.

---

## 18. Deferred Architecture

Do not implement during the first bootstrap slice:

- generic multi-provider abstraction;
- automatic provider optimiser;
- static model registry or price database;
- workflow engine;
- graph database or central artifact database;
- DAW abstraction;
- mandatory REAPER/Ableton integration;
- built-in stem separation;
- custom DSP framework;
- automated full mixing/mastering platform;
- automatic audio-to-MIDI transcription;
- full notation/orchestral infrastructure;
- multi-agent producer/composer/mixer architecture;
- model fine-tuning infrastructure.

These are follow-up improvements only after the core workflow demonstrates value.

---

## 19. Build Order

Implement vertically:

```text
1. artifact metadata + lifecycle/provenance
2. music-compose structured/MIDI drafting
3. music-evaluate structural + deterministic checks
4. music-produce Replicate demo generation
5. selection + locked-decision preservation
6. targeted refinement
7. final technical QC + evaluation
8. realistic end-to-end example
```

The first complete vertical slice must prove:

```text
Brief
 ↓
Composition Draft Set
 ↓
Selection
 ↓
Arrangement
 ↓
Demo
 ↓
Evaluate
 ↓
Targeted Refinement
 ↓
Final Production
 ↓
Final Evaluation
```

Follow-up slices may prove:

```text
native stems / multitrack
→ DAW-assisted production
→ scoring / cues / mockups
→ notation / orchestral delivery
→ specialist secondary providers
```

---

## 20. System Acceptance Criteria

The system is correctly designed when:

1. `music-compose`, `music-produce`, and `music-evaluate` have independently useful activation boundaries;
2. Replicate is the primary model-execution provider;
3. official Replicate skills own model discovery, comparison, and execution;
4. no custom Replicate SDK or static music-model registry exists;
5. model choice is dynamic unless intentionally pinned;
6. lifecycle state and generation policy remain independent;
7. composition and produced recording remain distinct concepts;
8. drafts use the smallest useful representation;
9. selection can preserve complete drafts or components across drafts;
10. selection, approval, and locking remain distinct decision states; approved/locked decisions become constraints for refinement;
11. retries target the smallest responsible unit where supported;
12. deterministic music/MIDI/audio mechanics reuse existing tools;
13. evaluation changes by artifact and lifecycle stage;
14. technical QC is not misrepresented as professional creative mixing/mastering;
15. stems are only labelled as stems when they are genuine production stems or explicitly identified separation outputs;
16. cross-project composition happens through artifacts;
17. deferred architecture remains deferred until production evidence justifies it;
18. testing and benchmarks can detect the project's declared defect classes without requiring a full production run for every failure.

---

**Music Production Skills — Creative Skills System Specification v2**
