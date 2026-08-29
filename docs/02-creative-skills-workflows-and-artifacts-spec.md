# Music Production Skills — Creative Skills Workflows and Artifacts Specification

## 1. Purpose

This specification defines the production lifecycle, first-class artifacts, draft strategy, selection rules, promotion/refinement semantics, provenance, evaluation lifecycle, and end-to-end workflows used by Music Production Skills.

It answers:

> **What artifacts exist, how do they evolve, and how does music production preserve approved musical and sonic decisions?**

---

## 2. Production Axes

Music Production Skills uses two independent axes.

### Workflow State

```text
draft
refine
final
```

Workflow state describes where an artifact is in its own lifecycle.

### Generation Policy

```text
economy
balanced
quality
```

Generation policy describes how cost and capability should be traded when selecting execution.

Do not collapse them.

An approved composition may be `final` as a composition while remaining far upstream from the final mastered recording.

---

## 3. Governing Production Rule

> **Use the cheapest and smallest representation capable of answering the current musical or production question. Increase fidelity only when the next decision requires it.**

Examples:

```text
melody question → MIDI / short audio sketch
arrangement question → section map / rough MIDI arrangement
integrated song question → demo
orchestration question → mockup
technical delivery question → final audio + deterministic QC
```

A draft is not simply lower-quality final audio.

---

## 4. Shared Workflow Backbone

```text
Music Brief
    ↓
Reference Analysis
    ↓
Composition Development
    ↓
Arrangement
    ↓
Demo
    ↓
Preproduction Review
    ↓
Production Realisation
    ↓
Editing / Local Refinement
    ↓
Production Audio / Multitrack where available
    ↓
Rough Mix where relevant
    ↓
Production Review
    ├── revise upstream
    └── approve
          ↓
         Mix
          ↓
        Master
          ↓
     Deliverables
          ↓
      Evaluation
```

This is a workflow graph, not a mandatory waterfall.

A problem found downstream may reopen the smallest responsible upstream decision.

---

## 4A. Command View of the Workflow

Command decomposition is an execution view over this workflow, not another workflow model.

```text
workflow/artifact semantics
        ↓
skill orchestration
        ↓
bounded command
        ↓
existing artifacts and state transitions
```

Commands may consume or produce the artifacts defined by this specification, but commands are **not** first-class production artifacts and do not create additional lifecycle states.

For example:

```text
select-material
→ updates selection lineage / decision state
→ does not create a `selection-command` artifact

refine-region
→ produces a revised production artifact + provenance
→ does not create a new `repair` lifecycle state

route-failure
→ produces or contributes to an evaluation report
→ does not become a new evaluation artifact type
```

The workflow remains authoritative for artifact semantics, promotion, preservation and provenance. The command layer exists only to make bounded behaviour explicit and independently testable.

---

## 5. First-Class Artifacts

Initial core vocabulary:

```text
music_brief
reference_analysis
composition
arrangement
demo
production_audio
production_multitrack
rough_mix
mix
stems
master
delivery_package
evaluation_report
```

Scoring extension:

```text
spotting_plan
cue
mockup
score       # optional
parts       # optional
```

Cross-cutting metadata:

```text
provenance
workflow state
decision state
component-level decision states where needed
```

Not every workflow produces every artifact.

---

## 6. Artifact Promotion Rule

Promotion preserves the artifact's identity and relevant approved decisions while changing its workflow state. Creative commitment changes through the independent decision-state axis.

Examples:

```text
composition
workflowState: draft → refine → final
decisionState: open → selected → approved → locked
```

```text
mix
workflowState: draft → refine → final
decisionState: open → selected → approved
```

The two axes do not need to advance together. Do not create separate artifact types such as `approved_composition` or `final_mix` solely to encode state.

---

## 7. `music_brief`

### Purpose

Defines why the music exists and what it must achieve.

May contain:

- purpose;
- creative intent;
- emotional direction;
- use context;
- audience/context;
- duration;
- format constraints;
- required musical characteristics;
- supplied references;
- delivery requirements.

### Created by

- user;
- agent from supplied context;
- upstream Creative Production Skills project.

### Consumed by

All downstream stages.

### Preserves

The original production intent and hard constraints.

### Lifecycle

Refinable while ambiguity remains. Once approved, later evaluation must continue to reference it.

---

## 8. `reference_analysis`

### Purpose

Captures what should actually be transferred from reference material.

Example:

```yaml
references:
  - id: reference-a
    use:
      - groove
      - bass treatment
    doNotCopy:
      - melody
      - lyrics
  - id: reference-b
    use:
      - instrumentation
      - energy arc
```

The artifact prevents reference usage from collapsing into vague imitation.

### Consumed by

- composition;
- arrangement;
- production;
- evaluation.

### Lifecycle

Usually lightweight and refinable. It becomes stable once the interpretation is approved.

---

## 9. `composition`

### Purpose

Represents the underlying musical work independently from final production.

It may contain or reference:

```text
melody
harmony
chord progression
rhythm
groove
lyrics
motifs
hooks
themes
form / structure
```

The representation may be:

- structured text;
- MIDI;
- notation;
- lead-sheet-like data;
- lyrics + chords;
- audio sketch;
- a combination.

The contract describes musical decisions rather than requiring one file format.

### Draft workflow

```text
Music Brief
   ↓
Composition Draft Set
├── A
├── B
├── C
└── D
   ↓
Selection
   ↓
Composition Refinement
   ↓
Approved Composition
```

### Component selection

Selection may combine decisions from several drafts:

```yaml
selected:
  melody: composition-a
  harmony: composition-c
  groove: composition-b
```

The resulting lineage must be preserved.

---

## 10. Composition Components Are Not Separate Artifacts by Default

Do not initially require top-level contracts for:

```text
melody
harmony
lyrics
groove
hook
motif
song_structure
```

They become first-class only when production evidence demonstrates an independent lifecycle, approval, evaluation, or handoff.

Lyrics are a likely future candidate but remain part of `composition` initially.

---

## 11. `arrangement`

### Purpose

Defines how the composition unfolds over time and across musical roles.

May contain:

```text
instrumentation
section roles
entries / exits
texture
register
density
dynamic arc
transitions
energy progression
```

### Workflow

```text
Approved Composition
       ↓
Arrangement Draft Set
├── A
├── B
└── C
       ↓
Selection
       ↓
Arrangement Refinement
       ↓
Approved Arrangement
```

### Preservation

Changing arrangement must not silently rewrite locked composition decisions.

---

## 12. Preproduction

Preproduction is initially a **workflow stage**, not a first-class artifact.

It reviews:

- composition;
- arrangement;
- tempo;
- key/tonal centre;
- structure;
- demo;
- production direction.

The purpose is to stabilise decisions before expensive production.

Do not add `production_plan` unless later workflows demonstrate a real independent lifecycle or handoff.

---

## 13. `demo`

### Purpose

The demo is the primary integration draft for general music production.

It answers:

> **Do the major musical and production decisions work together well enough to justify full production?**

A demo may validate:

- composition;
- arrangement;
- tempo;
- key;
- groove;
- instrumentation direction;
- vocal direction;
- structure;
- emotional intent.

It does not need to prove:

- final mix translation;
- mastering;
- release-level detail;
- perfect performance editing.

### Workflow

```text
Composition + Arrangement
          ↓
       Demo Draft
          ↓
   Preproduction Evaluation
   ├── composition problem → composition
   ├── arrangement problem → arrangement
   ├── production problem → refine demo
   └── approved → production
```

### Fidelity

Demo fidelity should increase only when the next production decision requires it.

---

## 14. Production Realisation

Production may combine:

```text
live/recorded performance
MIDI sequencing
programming
synthesis
sampling
audio manipulation
AI generation
AI transformation
existing recorded material
```

AI generation is one execution method, not the definition of production.

A full production should still be developed incrementally where that reduces uncertainty.

Example:

```text
approved demo
→ critical section prototype
→ validate production language
→ expand across track
```

A separate `production_prototype` artifact is not required initially.

---

## 15. `production_audio`

### Purpose

Represents produced audio when the workflow does not expose true multitrack material.

This is important for end-to-end generative models that return a finished stereo/combined production.

### Rules

- do not pretend a stereo generation is a multitrack project;
- preserve upstream composition/arrangement lineage;
- allow local refinement where the selected model supports it;
- use this artifact in the first vertical slice when true multitrack output is unavailable.

---

## 16. `production_multitrack`

### Purpose

Represents a resolved collection of musical production elements ready for mixing.

May contain or reference:

```text
recorded performances
edited takes
MIDI performances
synth outputs
samples
generated elements
automation
production edits
```

Different realisation methods converge here:

```text
recording ─┐
MIDI ──────┤
AI ────────┼→ production_multitrack
sampling ──┤
synthesis ─┘
```

### Availability

This artifact is optional. Do not make it a first-slice acceptance requirement when the selected music model only produces combined audio.

---

## 17. Takes and Comping

Recording-oriented workflows may use:

```text
Take A
Take B
Take C
   ↓
Selection / Comp
   ↓
Approved Performance
```

Selection may be regional:

```text
verse: take B
chorus: take A
bridge: take C
```

`take_set` is not a mandatory first-class artifact initially. Take lineage may live beneath `production_multitrack` until recording-heavy workflows justify a dedicated contract.

---

## 18. Editing and Local Refinement

Editing begins from approved material whenever possible.

Prefer:

```text
approved material
→ identify defect
→ edit / repair local unit
```

over:

```text
approved material
→ generate a different complete performance
```

Possible local units:

- phrase;
- note;
- transition;
- timing region;
- pitch region;
- noise region;
- MIDI passage;
- section;
- cue.

---

## 19. `rough_mix`

### Purpose

A production checkpoint used to hear the current production as a combined recording before final mixing.

It may expose:

- arrangement conflicts;
- masking;
- lead intelligibility problems;
- energy problems;
- overcrowding;
- section imbalance.

### Workflow

```text
production_audio / production_multitrack
                ↓
            rough_mix
                ↓
             evaluate
        ┌───────┼────────┐
        ↓       ↓        ↓
      mix    production arrangement
      fix       fix       fix
```

Do not polish a rough mix while major upstream problems remain unresolved.

`rough_mix` is optional when an end-to-end model already produces combined audio and there is no independent mixing stage.

---

## 20. `mix`

### Purpose

Represents the completed production balance before mastering.

It may preserve decisions about:

- level balance;
- spatial relationship;
- dynamics;
- effects;
- automation;
- frequency relationships.

### Lifecycle

```text
workflowState: draft → refine → final
decisionState: open → selected → approved
```

Do not use mastering to conceal an unresolved mix or arrangement problem.

---

## 21. `stems`

### Purpose

Grouped submixes that preserve meaningful downstream control.

Examples:

```text
vocals
drums
bass
synths
orchestra
percussion
```

An individual kick track is not automatically a drum stem.

### Rules

- prefer genuine stems exported by the production source;
- source-separated approximations must be labelled as separation outputs, not native stems;
- stems are optional and must not be fabricated to satisfy a schema;
- stems are important cross-project handoffs when genuinely available.

---

## 22. `master`

### Purpose

Represents the approved final mastered recording.

### Workflow

```text
Approved Mix
   ↓
Master Candidate(s)
   ↓
Compare / QC
   ↓
Approved Master
```

Different delivery targets may produce master variants without creating new artifact types.

A master should not repair unresolved composition, arrangement, performance, or mix problems.

---

## 23. `delivery_package`

### Purpose

Defines the approved set of outputs for the intended consumer.

Example:

```text
master.wav
instrumental.wav
stems/                 # when genuine
credits / metadata
delivery manifest
```

For another Creative Production Skills project:

```text
full mix
stems
timing information
music notes
```

A delivery package is normally regenerated from approved upstream artifacts rather than independently creatively refined.

---

## 24. Draft Sets

Draft sets are used only where alternatives represent meaningful creative uncertainty.

Good uses:

- composition concepts;
- hooks;
- grooves;
- arrangements;
- production directions;
- performances;
- cue concepts;
- mix directions where materially different.

Do not generate variants for deterministic corrections such as removing a known click.

Every candidate worth comparing should retain:

- artifact ID;
- parent artifact(s);
- purpose/question being tested;
- changed decisions;
- preserved decisions;
- representation/file references;
- model/tool provenance where applicable;
- lifecycle state;
- generation policy.

---

## 25. Selection, Approval, and Locking

Selection may happen at two levels.

### Whole-artifact selection

```text
winner = draft B
```

### Component-level selection

```yaml
selected:
  melody: draft-a
  harmony: draft-c
  groove: draft-b
```

The resulting artifact must retain the lineage of every selected component.

Selection means:

> **Continue developing this option.**

Approval means:

> **Downstream production may rely on this decision.**

Locking means:

> **Downstream work may assume this decision will not change unless explicitly reopened.**

Selection does not automatically approve or lock a decision.

Agent selection is acceptable when:

- autonomy is explicitly requested;
- the choice is low consequence;
- candidates clearly violate constraints;
- objective evaluation establishes a clear winner.

Human selection should be preferred for high-impact creative decisions such as melody, hook, lyrics, major arrangement, vocal interpretation, and score direction.

---

## 26. Decision States and Refinement

Refinement may involve decisions at different commitment levels:

```text
OPEN      → may change
SELECTED  → chosen direction; still refinable
APPROVED  → downstream may rely on it
LOCKED    → must not change without explicit reopening
```

Example:

```text
composition
├── melody          LOCKED
├── lyrics          APPROVED
├── harmony         APPROVED
└── bridge rhythm   OPEN
```

Or:

```text
production
├── vocal treatment LOCKED
├── structure       APPROVED
└── drum sound      OPEN
```

Rule:

> **Refinement changes open or explicitly reopened decisions and treats approved/locked decisions as preservation constraints.**

If the execution method cannot reliably preserve an approved or locked property, record the limitation rather than claiming success.

---

## 27. Promotion Criteria

Promote a draft when:

1. the question it was created to answer is resolved;
2. the selected option satisfies the current quality bar;
3. approved properties are explicit;
4. unresolved issues do not require reopening those properties;
5. the next stage materially benefits from greater fidelity;
6. provenance and selection lineage are preserved.

Promotion means the decision is stable enough to continue. It does not mean the artifact is globally perfect.

---

## 28. Provenance

Every significant generated or transformed artifact should retain enough provenance to answer:

```text
What did this derive from?
What was it testing?
What changed?
What was preserved?
What was selected?
Which model/tool produced it?
Why was it promoted or rejected?
```

Minimum conceptual fields:

```yaml
id: ...
type: ...
workflowState: draft|refine|final
parents: []
lockedDecisions: []
openDecisions: []
selectionSources: {}
execution:
  provider: replicate|deterministic|other
  model: optional
  predictionId: optional
  parameters: optional
```

Provenance may be embedded or stored alongside artifacts. It should not become a competing workflow.

---

## 29. Targeted Retry

Use this correction sequence:

```text
finding
  ↓
responsible production stage
  ↓
responsible decision
  ↓
smallest affected unit
  ↓
local correction if available
  ↓
re-evaluate changed unit + boundaries
```

Examples:

```text
bad chorus pronunciation
→ vocal phrase / chorus region
```

```text
weak final chorus lift
→ arrangement / production decision
```

```text
clipping in final file
→ technical finishing
```

Do not default to a more expensive model when the defect belongs upstream.

---

## 30. Evaluation Lifecycle

### Draft

Evaluate only what the draft exists to prove:

- usefulness;
- brief relevance;
- meaningful difference from alternatives;
- catastrophic musical/technical defects;
- whether it answers the intended question.

### Refine

Evaluate:

- requested change succeeded;
- locked decisions preserved;
- no new regression;
- prior approvals still hold.

### Final

Evaluate all applicable dimensions:

- intent;
- composition;
- arrangement;
- performance;
- production;
- preservation;
- technical audio;
- delivery.

---

## 31. Evaluation Dimensions

### Intent

- brief alignment;
- emotional purpose;
- style/context fit.

### Composition

- melody;
- harmony;
- rhythm;
- lyrics where applicable;
- structure;
- development;
- memorability.

### Arrangement

- instrument roles;
- density;
- register;
- contrast;
- energy arc;
- transitions.

### Performance

- timing;
- intonation;
- phrasing;
- articulation;
- expression;
- consistency.

### Production

- sound selection;
- sonic identity;
- texture;
- layering;
- coherence;
- generation artefacts.

### Preservation

- locked decisions retained;
- unexpected mutation;
- requested change isolated.

### Technical

- duration;
- format;
- channels;
- clipping;
- loudness where relevant;
- obvious signal defects.

### Delivery

- required outputs present;
- file requirements satisfied;
- stem semantics accurate;
- package complete.

Avoid unsupported universal numerical quality scores.

---

## 32. Song / Record Workflow

```text
music_brief
    ↓
reference_analysis
    ↓
composition[draft*]
    ↓ select / refine
composition[approved]
    ↓
arrangement[draft*]
    ↓ select / refine
arrangement[approved]
    ↓
demo[draft]
    ↓ preproduction review
demo[approved]
    ↓
production realisation
    ↓
production_audio / production_multitrack
    ↓
local editing / refinement
    ↓
rough_mix where relevant
    ↓
mix where relevant
    ↓
master / final production audio
    ↓
delivery_package
    ↓
evaluation_report
```

`*` means multiple variants where useful, not mandatory variant generation.

---

## 33. Electronic / In-the-Box Workflow

```text
music_brief
    ↓
reference_analysis
    ↓
musical material / sound exploration
    ↕
composition
    ↕
arrangement
    ↓
demo
    ↓
selected production direction
    ↓
production_audio / production_multitrack
    ↓
rough_mix where relevant
    ↓
final audio
```

Composition, sound design, and production may loop rather than remain sequential.

Musical sound design belongs inside music production when it functions as musical material. General foley/environment/game SFX remain out of scope.

---

## 34. Media Scoring Extension

### Additional artifacts

```text
spotting_plan
cue
mockup
score
parts
```

### `spotting_plan`

Preserves:

- cue boundaries;
- timecode/sync points;
- dramatic purpose;
- dialogue considerations;
- music-in/music-out decisions.

### `cue`

A bounded music-production unit associated with a defined media context.

A failure in one cue should not force regeneration of the complete score.

### `mockup`

A sufficiently representative simulation of the intended final cue for creative approval and final-production commitment.

It is not semantically identical to a song demo.

### Optional notation

```text
approved mockup
→ score
→ parts
→ recording
```

Score and parts remain optional until a live-ensemble workflow requires them.

### Scoring workflow

```text
Picture / Narrative Context
        ↓
spotting_plan
        ↓
cue
        ↓
composition
        ↓
arrangement
        ↓
cue sketch
        ↓
mockup[draft*]
        ↓
mockup[approved]
        ↓
optional score / parts
        ↓
production realisation
        ↓
production audio / multitrack
        ↓
cue mix / stems
        ↓
synced delivery
```

This extension is a follow-up vertical slice, not an initial implementation gate.

---

## 35. Fast Paths

Do not force the full workflow when uncertainty and cost do not justify it.

Examples:

```text
approved mix supplied
→ mastering / delivery only
```

```text
approved composition + arrangement supplied
→ production directly
```

```text
two-second musical sting
→ direct generation + QC where appropriate
```

The minimum useful structure is preferred.

---

## 36. Cross-Project Handoffs

Cross-project composition happens through artifacts before runtime dependencies.

### Narrative → Music

Canonical upstream narrative artifacts may include:

```text
story brief
character profile
world bible
screenplay
scene plan
dialogue
```

These become musical context and constraints. Music Production Skills may derive a `music_brief`, themes, cue requirements, or emotional direction from them without taking ownership of narrative development.

### Video → Music

Potential upstream video artifacts include:

```text
brief
storyboard
shot plan
animatic
edit timeline
video master
```

Use only what is required. Timing/sync requirements should normally come from `shot_plan`, `animatic`, or `edit_timeline` rather than duplicating video editorial semantics.

Music may return:

```text
music track
mix / master
stems where genuine
timing map / timing metadata
delivery package
```

`music track` is a handoff label for an approved music output, normally an approved mix/master; it is not a separate first-class artifact. `timing map` is initially delivery metadata rather than a new first-class music artifact.

### Advertising → Music

Potential inputs:

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

Advertising owns campaign strategy and messaging. Music Production Skills owns music composition and production.

### Game Project → Music

Potential external inputs:

```text
game / level context
looping requirement
interactive-state requirement
transition / duration constraints
```

Possible outputs:

```text
master
loopable version
alternate arrangement
stems where genuine
cue
delivery package
```

Video Game Asset Production Skills is not a required intermediary. Its visual/world artifacts may be consumed as optional references when supplied, but music remains owned by Music Production Skills and is handed to the game project.

---

## 37. Failure Taxonomy

### Intent

- wrong emotional direction;
- wrong use/context fit;
- wrong stylistic territory.

### Composition

- weak melody/hook;
- ineffective harmony;
- monotonous rhythm;
- weak lyrics;
- structural weakness;
- insufficient development.

### Arrangement

- overcrowding;
- poor contrast;
- weak transitions;
- competing parts;
- poor energy progression.

### Performance

- timing;
- pitch;
- phrasing;
- articulation;
- feel;
- vocal intelligibility.

### Production

- generic sonic identity;
- inappropriate sound palette;
- incoherent layering;
- AI generation artefacts;
- unintended section mutation.

### Preservation

- locked melody changed;
- lyrics mutated during production refinement;
- arrangement changed while fixing local audio;
- approved section replaced without reopening it.

### Editing

- audible edit;
- bad crossfade;
- discontinuity;
- unnatural correction;
- broken section boundary.

### Mix / Technical

- poor balance;
- masking;
- clipping;
- uncontrolled dynamics;
- incorrect format;
- invalid duration.

### Delivery

- missing outputs;
- invalid file references;
- stale master;
- source-separated audio mislabeled as native stems.

---

## 38. Workflow Acceptance Criteria

The workflow model is correct when:

1. composition and produced recording remain distinct;
2. drafts are persistent, purposeful, and comparable;
3. draft representations are proportional to the uncertainty being tested;
4. component-level selection is supported;
5. selection, approval, and locking are distinct from workflow state and from each other;
6. refinements preserve approved/locked decisions unless explicitly reopened;
7. final artifacts retain parent and selection lineage;
8. demo is the normal integration draft for general music production;
9. mockup remains a scoring-specific artifact rather than being prematurely merged with demo;
10. production can use combined audio without falsely claiming multitrack semantics;
11. true multitrack/stem artifacts are optional rather than fabricated;
12. retries operate on the smallest responsible unit where execution permits;
13. evaluation routes defects to the responsible production stage;
14. final technical QC does not replace creative evaluation;
15. cross-project inputs and outputs use artifact handoffs;
16. scoring/DAW/notation complexity remains optional until proven necessary.

---

**Music Production Skills — Creative Skills Workflows and Artifacts Specification v3**
