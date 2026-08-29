# Music Production Skills — Creative Skills Repository and Contracts Specification

## 1. Purpose

This specification defines how Music Production Skills is packaged as an open-source Agent Skills repository.

It owns:

- repository structure;
- skill directories;
- skill-local command contracts;
- complete `SKILL.md` contracts;
- references;
- assets;
- deterministic scripts;
- evals;
- provider-skill requirements;
- TypeScript tooling;
- examples;
- consumer-project expectations;
- extraction-candidate tracking;
- technical acceptance criteria.

The production lifecycle and artifact semantics are defined in **Creative Skills Workflows and Artifacts Specification**.

Testing strategy and benchmark runbooks are defined in **Testing and Benchmark Specification**.

---

## 2. Repository Structure

```text
music-production-skills/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── .gitignore
├── package.json
├── tsconfig.json
│
├── docs/
│   ├── 01-creative-skills-system-spec.md
│   ├── 02-creative-skills-workflows-and-artifacts-spec.md
│   ├── 03-creative-skills-repository-and-contracts-spec.md
│   ├── 04-testing-and-benchmark-spec.md
│   └── extraction-candidates.md
│
├── skills/
│   ├── music-compose/
│   │   ├── SKILL.md
│   │   ├── package.json
│   │   ├── commands/
│   │   │   ├── interpret-brief.md
│   │   │   ├── draft-material.md
│   │   │   ├── select-material.md
│   │   │   ├── develop-composition.md
│   │   │   ├── arrange.md
│   │   │   ├── refine-composition.md
│   │   │   └── prepare-production.md
│   │   ├── references/
│   │   │   ├── composition.md
│   │   │   ├── arrangement.md
│   │   │   ├── drafting-and-selection.md
│   │   │   ├── reference-analysis.md
│   │   │   └── midi.md
│   │   ├── assets/
│   │   │   ├── composition.example.yaml
│   │   │   ├── arrangement.example.yaml
│   │   │   └── selection.example.yaml
│   │   ├── scripts/
│   │   │   ├── inspect-midi.ts
│   │   │   ├── transpose-midi.ts
│   │   │   └── validate-composition.ts
│   │   └── evals/
│   │       └── evals.json
│   │
│   ├── music-produce/
│   │   ├── SKILL.md
│   │   ├── commands/
│   │   │   ├── plan-production.md
│   │   │   ├── resolve-execution.md
│   │   │   ├── produce-demo.md
│   │   │   ├── produce-final.md
│   │   │   ├── refine-region.md
│   │   │   ├── finish-audio.md
│   │   │   └── prepare-delivery.md
│   │   ├── references/
│   │   │   ├── production-workflow.md
│   │   │   ├── replicate-routing.md
│   │   │   ├── prompting.md
│   │   │   ├── refinement.md
│   │   │   └── delivery.md
│   │   ├── assets/
│   │   │   └── production-manifest.example.yaml
│   │   ├── scripts/
│   │   │   ├── inspect-audio.ts
│   │   │   ├── extract-region.ts
│   │   │   ├── join-audio.ts
│   │   │   └── validate-delivery.ts
│   │   └── evals/
│   │       └── evals.json
│   │
│   ├── music-evaluate/
│   │   ├── SKILL.md
│   │   ├── commands/
│   │   │   ├── inspect.md
│   │   │   ├── compare.md
│   │   │   ├── evaluate-draft.md
│   │   │   ├── evaluate-refinement.md
│   │   │   ├── evaluate-final.md
│   │   │   ├── verify-preservation.md
│   │   │   └── route-failure.md
│   │   ├── references/
│   │   │   ├── evaluation-lifecycle.md
│   │   │   ├── composition-rubric.md
│   │   │   ├── arrangement-rubric.md
│   │   │   ├── production-rubric.md
│   │   │   ├── preservation.md
│   │   │   ├── technical-qc.md
│   │   │   └── failure-routing.md
│   │   ├── assets/
│   │   │   ├── preservation.example.json
│   │   │   └── evaluation-evidence.example.json
│   │   ├── scripts/
│   │   │   ├── preflight.ts
│   │   │   ├── inspect-audio.ts
│   │   │   ├── validate-lineage.ts
│   │   │   ├── validate-preservation.ts
│   │   │   └── generate-report.ts
│   │   └── evals/
│   │       └── evals.json
│   │
│   └── music-pack-author/
│       ├── SKILL.md
│       ├── commands/
│       │   ├── assess-pack-need.md
│       │   ├── define-profile.md
│       │   ├── author-pack.md
│       │   ├── create-showcase.md
│       │   ├── validate-pack.md
│       │   └── catalogue-pack.md
│       ├── references/
│       │   ├── pack-contract.md
│       │   ├── authoring-workflow.md
│       │   └── showcase-examples.md
│       ├── assets/
│       │   └── production-profile.example.yaml
│       ├── scripts/
│       │   └── validate-pack.ts
│       └── evals/
│           └── evals.json
│
├── examples/
│   ├── README.md
│   ├── level-1-night-drive/
│   ├── level-1-sunday-static/
│   ├── level-1-northbound/
│   ├── level-2-concrete-halo/
│   ├── level-2-soft-collapse/
│   ├── level-2-high-water/
│   ├── level-3-low-orbit/
│   ├── level-3-half-light/
│   ├── level-3-static-summer/
│   ├── level-4-redline/
│   ├── level-4-no-reply/
│   ├── level-4-winter-road/
│   ├── level-5-after-hours/
│   ├── level-5-last-train-home/
│   └── level-5-checkpoint/
│
├── tests/
│   ├── fixtures/
│   ├── unit/
│   ├── stages/
│   └── benchmark/
│       ├── taxonomy.json
│       ├── rubrics.json
│       ├── example-matrix.json
│       ├── baseline.json
│       └── transcripts/
│
├── tools/
│   ├── validate-repository.ts
│   ├── validate-production.ts
│   ├── run-evals.ts
│   ├── benchmark.ts
│   └── run-benchmark.ts
│
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
```

Only create optional directories when they contain real material. The scaffold must not contain empty symmetry directories.

---

## 3. Three Primary Specs + Supplemental Specifications

The repository preserves the family model of three primary engineering specifications:

```text
01 — what system are we building?
02 — how does music production happen?
03 — how is behaviour packaged into Agent Skills?
```

It also includes supplemental normative specifications:

```text
04 — how do we prove the behaviour and prevent regressions?
05 — how can optional customisation packs specialise music-production behaviour?
```

`04-testing-and-benchmark-spec.md` is the executable testing and benchmark runbook.

`05-customisation-packs-spec.md` defines the optional customisation-pack extension layer. `06-extension-pack-catalogue.md` is its public catalogue and showcase-prompt surface. Neither makes packs mandatory runtime dependencies.

---

## 3A. Skill-Local Command Contracts

The installable Agent Skill remains the public capability boundary. A skill may decompose its behaviour into bounded command contracts under:

```text
skills/<skill-name>/commands/<command-id>.md
```

Commands are packaged with their owning skill and are never installed independently. They are local runtime knowledge in the same sense as skill-local references.

A command is a **production operation**, not a tool invocation or implementation function.

### 4.1 Required command contract

Each command file must define:

```text
command id
purpose
when it runs
inputs
preconditions
outputs
invariants
failure / routing semantics
forbidden behaviour
dependencies
evaluation hooks
```

Keep the contract concise. A command may link to skill-local references for detailed domain knowledge.

### 4.2 Command orchestration

`SKILL.md` owns command selection and sequencing. It must explain enough orchestration behaviour for the agent to choose the appropriate command without introducing a generic workflow engine.

```text
user request
→ owning skill
→ choose command
→ execute command contract
→ persist artifact/provenance
→ choose next command only if required
```

A command may call deterministic scripts or peer provider skills as implementation capabilities, but the command contract stays provider/tool independent where the production behaviour is independent.

### 4.3 Canonical command sets

`music-compose`:

```text
interpret-brief
draft-material
select-material
develop-composition
arrange
refine-composition
prepare-production
```

`music-produce`:

```text
plan-production
resolve-execution
produce-demo
produce-final
refine-region
finish-audio
prepare-delivery
```

`music-evaluate`:

```text
inspect
compare
evaluate-draft
evaluate-refinement
evaluate-final
verify-preservation
route-failure
```

`music-pack-author`:

```text
assess-pack-need
define-profile
author-pack
create-showcase
validate-pack
catalogue-pack
```

### 4.4 Command granularity rule

Create a command only when the operation has a meaningful independent contract, failure mode or evaluation boundary.

Do not create commands such as:

```text
call-replicate
run-ffmpeg
read-json
write-yaml
parse-midi
```

Those are implementation mechanics behind commands.

Do not split one coherent production decision into multiple commands merely to increase test counts.

### 4.5 Commands are not artifacts or lifecycle states

Command execution uses the artifact and state model from Spec 02. It must not create parallel `command_result`, `repair_state`, or similar schemas unless an independent production artifact is later justified.

---

## 4. Required Peer Skills

The host environment must provide the official Replicate Agent Skills:

```text
find-models
compare-models
run-models
```

These are Agent Skill prerequisites, not npm dependencies.

Music Production Skills must not implement its own Replicate API client or model catalogue.

Image/video prompting skills are not mandatory dependencies unless a later music workflow explicitly uses them.

---

## 5. Skill Composition

Do not assume proprietary function interfaces such as:

```text
musicCompose.execute(...)
musicProduce.generate(...)
musicEvaluate.score(...)
```

Composition occurs through:

- agent instructions;
- current working context;
- persistent production artifacts;
- approved/locked decisions;
- files produced by earlier workflow stages;
- official Replicate skills for model operations.

Correct pattern:

```text
music-compose
    ↓
approved composition + arrangement
    ↓
music-produce
    ↓
use Replicate peer skills
    ↓
produced artifact
    ↓
music-evaluate
```

---

## 6. Self-Contained Skill Rule

Every installable skill must be self-contained inside:

```text
skills/<skill-name>/
```

Any runtime references, assets, scripts, or package metadata needed by that skill must live within its directory.

An installed skill must not depend on:

- repository-level `docs/`;
- repository-level `examples/`;
- another skill's private files;
- a root-only script not installed with the skill.

If two skills temporarily duplicate a small reference, prefer local duplication until a stable shared contract and installation mechanism is justified.

---

## 7. TypeScript Tooling Rules

Repository and deterministic skill tooling must use modern TypeScript and Node.js practices.

Requirements:

- strict static checking;
- no implicit `any` in production tooling;
- runtime validation at external boundaries;
- safe subprocess invocation without shell interpolation of untrusted values;
- structured exit codes;
- deterministic tests;
- actionable errors;
- no silent dependency substitution.

FFmpeg and ffprobe are external executables, not npm libraries.

Tonal and `@tonejs/midi` may be used by `music-compose` deterministic scripts.

Do not introduce Python into the core bootstrap path.

---

## 8. Artifact Storage Convention

A consumer project owns its production workspace. Skills must not require one large canonical directory tree.

A minimal project may use:

```text
production/
├── brief.md
├── composition.yaml
├── arrangement.yaml
├── drafts/
├── audio/
└── evaluations/
```

As production complexity grows, the workspace may add:

```text
production/
├── references/
├── composition/
├── arrangement/
├── demos/
├── production/
├── mixes/
├── delivery/
└── evaluations/
```

Installed agent behaviour remains separate:

```text
.claude/skills/ or .agents/skills/
→ installed skills

production/
→ creative and production artifacts
```

Skills must adapt to the project's existing structure when practical rather than forcing a repository-owned layout onto consumers.

---

## 9. Artifact Metadata Contract

Persistent production artifacts should support lightweight metadata sufficient for lineage and preservation.

Conceptual minimum:

```yaml
id: composition-001
type: composition
workflowState: draft
decisionState: open
parents: []
lockedDecisions: []
openDecisions: []
selectionSources: {}
execution: null
```

Model-backed artifacts may add:

```yaml
execution:
  provider: replicate
  model: owner/model
  predictionId: optional
  parameters: optional
```

Do not require every artifact to use YAML. JSON or another structured sidecar is acceptable when the workflow needs machine validation.

---

# 10. `music-compose/SKILL.md`

```markdown
---
name: music-compose
description: Compose, develop, arrange, compare, select, and refine musical material before final production. Use for music briefs, references, melody, harmony, rhythm, groove, lyrics, hooks, motifs, song structure, arrangements, MIDI drafts, composition alternatives, and preservation of approved musical decisions.
---

# Music Compose

Develop the musical work before final production commitment.

## Scope

Own:

- brief interpretation for composition;
- reference analysis;
- composition;
- arrangement;
- structured and MIDI drafts;
- draft sets;
- whole-artifact and component-level selection;
- approved musical decisions;
- composition/arrangement lineage.

Do not own final audio production, mastering, provider infrastructure, or general-purpose audio editing.

## Determine the unresolved decision

Before creating output, identify what is actually uncertain.

Examples:

- melody;
- harmony;
- rhythm/groove;
- lyrics;
- hook;
- structure;
- arrangement;
- instrumentation;
- energy progression.

Use the smallest representation capable of testing it.

## Draft

1. Generate alternatives only where meaningful creative uncertainty exists.
2. Make alternatives materially different.
3. Prefer structured text, Tonal, or MIDI before generated full audio when sufficient.
4. Record what each draft is testing.
5. Preserve parent and variant lineage.

Do not generate complete finished songs merely to compare local composition ideas.

## Selection

Support:

- complete candidate selection;
- component-level selection across candidates.

When a component is selected, record its source.

Selection means continue developing the choice. Do not treat selection as approval or locking. Record approval and locking explicitly when they occur.

## Refine

1. Start from the selected/approved composition or arrangement.
2. Identify each relevant decision state.
3. Change only open or explicitly reopened decisions.
4. Preserve approved and locked musical decisions.
5. Update lineage.

## Final

A composition or arrangement is final when it is stable enough to hand to production.

Final-as-composition does not mean final mastered audio.

## Deterministic tools

Use Tonal for deterministic music-theory mechanics.

Use `@tonejs/midi` and local scripts for MIDI mechanics.

Do not ask a generative model to perform deterministic file operations when a local tool can do them reliably.

## Audio sketches

Use Replicate only when audio materially improves evaluation of the current composition/arrangement decision.

When using Replicate:

1. determine hard capabilities;
2. use `find-models`;
3. use `compare-models`;
4. translate the musical requirement into the selected model's native inputs;
5. use `run-models`;
6. preserve execution provenance.

## Evaluation

For drafts, check whether the artifact answers the intended question and provides meaningful alternatives.

For refinement, verify the requested change and preservation of locked decisions.

Before production handoff, ensure unresolved musical issues are explicit.

## Do not

- create a static model catalogue;
- silently rewrite locked melody, lyrics, harmony, rhythm, or structure;
- treat every music-theory concept as a separate top-level artifact;
- force audio generation when structured/MIDI representation is sufficient;
- perform final production work that belongs to `music-produce`.

## References

Read the relevant local reference only when needed:

- `references/composition.md`
- `references/arrangement.md`
- `references/drafting-and-selection.md`
- `references/reference-analysis.md`
- `references/midi.md`
```

---

## 11. `music-compose` Deterministic Scripts

### `inspect-midi.ts`

Responsibilities:

- parse MIDI safely;
- report tracks, tempo, duration, note range, and basic structure;
- fail clearly on invalid input.

### `transpose-midi.ts`

Responsibilities:

- transpose requested MIDI material deterministically;
- preserve timing and non-note events where practical;
- validate requested interval/target key.

### `validate-composition.ts`

Responsibilities:

- validate structured composition metadata;
- verify referenced draft/selection IDs resolve where provided;
- check locked/open decision declarations for contradictions.

These scripts support workflow behaviour. They do not attempt to judge creative quality.

---

# 12. `music-produce/SKILL.md`

```markdown
---
name: music-produce
description: Turn approved musical direction into produced audio using Replicate as the primary model provider. Use for demos, full music generation, production refinement, continuation, local section repair, vocals, final audio, technical finishing, delivery, and music production handoffs.
---

# Music Produce

Produce audio from approved musical direction while preserving approved decisions.

## Scope

Own:

- demos;
- production realisation;
- Replicate model routing;
- model-native music input construction;
- local continuation/inpainting/refinement where supported;
- production provenance;
- deterministic audio processing;
- technical QC;
- delivery packaging;
- mixes/masters/stems only where the execution path genuinely supports them.

Do not own composition changes unless the workflow explicitly reopens composition.

## Inputs

Use available:

- music brief;
- reference analysis;
- composition;
- arrangement;
- existing demo/audio;
- locked/open decisions;
- delivery requirements;
- budget;
- optional pinned model.

Do not require every artifact for simple fast-path tasks.

## Determine lifecycle state

Use:

- draft;
- refine;
- final.

## Determine generation policy

Use independently:

- economy;
- balanced;
- quality.

Do not equate lifecycle with model cost.

## Draft / Demo

1. Produce only enough fidelity/duration to answer the current production question.
2. Prefer partial sections when they can validate the production direction.
3. Preserve composition and arrangement lineage.
4. Do not over-finish demos.

## Replicate routing

For every generative operation:

1. define the production requirement;
2. define hard capabilities;
3. honour a compatible pinned model if present;
4. otherwise use `find-models`;
5. use `compare-models`;
6. prefer compatible Replicate official models;
7. inspect the selected model's current schema;
8. construct model-native inputs;
9. use `run-models`;
10. store execution provenance.

Capability comes before cost.

Do not maintain static pricing, model scores, or a custom Replicate client.

## Prompt / input construction

Express only relevant musical intent, potentially including:

- purpose;
- tempo/meter;
- tonal character;
- instrumentation;
- structure;
- section behaviour;
- lyrics/vocal direction;
- groove/energy;
- production aesthetic;
- duration;
- reference material;
- preserved properties;
- editable region/properties.

Follow the selected model's native schema rather than a universal request object.

## Refine

1. identify the defect;
2. identify the responsible production decision;
3. identify the smallest affected region/unit;
4. prefer local edit, continuation, inpainting, or reference-conditioned generation when supported;
5. if the current model lacks the capability, rediscover Replicate candidates;
6. use external secondary execution only when explicitly configured and genuinely necessary;
7. verify locked decisions and surrounding material after the change.

Whole-track regeneration requires justification when a smaller repair is possible.

## Deterministic audio tools

Use local scripts and FFmpeg/ffprobe for:

- inspection;
- trim/extract;
- concatenation;
- conversion;
- resampling;
- technical measurements;
- delivery validation.

Do not claim these operations constitute professional creative mixing/mastering.

## Stems

Only label outputs as stems when they are genuine grouped production submixes.

If source separation is used by an optional workflow, label the results explicitly as separated estimates.

## Final

1. preserve approved musical direction;
2. satisfy delivery requirements;
3. run technical QC;
4. request/run final music evaluation;
5. retain provenance.

## Do not

- create a custom Replicate SDK;
- build a generic multi-provider router;
- silently switch to an external provider;
- regenerate a whole track for a local defect without justification;
- claim true multitrack/stems when only stereo audio exists;
- use mastering to hide an upstream musical defect.

## References

Read as needed:

- `references/production-workflow.md`
- `references/replicate-routing.md`
- `references/prompting.md`
- `references/refinement.md`
- `references/delivery.md`
```

---

## 13. `music-produce` Deterministic Scripts

### `inspect-audio.ts`

Report:

- codec/container where relevant;
- duration;
- sample rate;
- channel layout;
- loudness/signal measurements where configured;
- obvious invalid or unreadable media.

### `extract-region.ts`

Extract a requested time range for local review/refinement without shell injection risk.

### `join-audio.ts`

Join approved regions when deterministic assembly is valid and verify boundaries.

It must not pretend a structurally invalid edit is creatively seamless.

### `validate-delivery.ts`

Validate required files, formats, references, and declared stem semantics.

---

# 14. `music-evaluate/SKILL.md`

```markdown
---
name: music-evaluate
description: Evaluate music-production artifacts by lifecycle stage, compare drafts, verify refinements, check preservation of approved decisions, run technical audio QC, identify the responsible production stage, and recommend the smallest useful correction.
---

# Music Evaluate

Evaluate what the current artifact is supposed to prove.

## Scope

Own:

- draft comparison;
- intent evaluation;
- composition evaluation;
- arrangement evaluation;
- performance/production evaluation where evidence supports it;
- refinement verification;
- locked-decision preservation checks;
- technical audio QC;
- delivery checks;
- failure routing;
- persistent evaluation reports.

Do not invent observations unavailable from the supplied artifacts.

## Determine artifact and lifecycle

Identify:

- artifact type;
- workflow state;
- brief/criteria;
- parent artifact;
- requested refinement;
- locked decisions;
- available evidence.

Only apply criteria that the artifact can support.

## Draft evaluation

Check:

- does the draft answer the intended question?;
- is it materially different from alternatives?;
- does it violate the brief?;
- are there catastrophic musical or technical defects?;
- is it useful to continue?

Do not judge a MIDI composition draft as though it were a final master.

## Refinement evaluation

Check in this order:

1. did the requested change succeed?;
2. were locked decisions preserved?;
3. did the changed region introduce boundary/regression problems?;
4. do prior approvals still hold?

## Final evaluation

Run applicable dimensions:

- intent;
- composition;
- arrangement;
- performance;
- production;
- preservation;
- technical QC;
- delivery.

## Failure routing

For every material finding, identify the most likely owning stage:

- brief / intent;
- composition;
- arrangement;
- performance;
- production;
- editing/refinement;
- mix;
- mastering/technical finishing;
- delivery;
- model/execution.

Then recommend the smallest correction.

Do not automatically recommend a more expensive model.

## Open-ended first

For semantic review, inspect the artifact openly before walking a closed checklist. Use the checklist to organise and verify findings rather than assuming it will discover every defect.

## Technical QC

Use deterministic scripts/FFmpeg for objective properties before semantic judgement.

Never claim a technical property was checked if the required dependency or artifact is unavailable.

## Reporting

Produce an `evaluation_report` containing:

- artifact;
- lifecycle stage;
- evidence used;
- findings;
- severity;
- owning stage;
- preservation result;
- recommended correction;
- pass/warn/fail recommendation;
- checks not run and why.

Avoid unsupported universal quality scores.

## Do not

- invent audio observations from text-only inputs;
- declare PASS when a required check did not run;
- treat source-separated audio as native stems;
- route every defect to prompting/model choice;
- silently approve artifacts on behalf of a human when human approval is required.

## References

Read as needed:

- `references/evaluation-lifecycle.md`
- `references/composition-rubric.md`
- `references/arrangement-rubric.md`
- `references/production-rubric.md`
- `references/preservation.md`
- `references/technical-qc.md`
- `references/failure-routing.md`
```

---

## 14A. `music-pack-author/SKILL.md`

`music-pack-author` is an optional authoring/support skill. It must be independently installable and self-contained.

Minimum local resources:

```text
skills/music-pack-author/
├── SKILL.md
├── references/
│   ├── pack-contract.md
│   ├── authoring-workflow.md
│   └── showcase-examples.md
├── assets/
│   └── production-profile.example.yaml
├── scripts/
│   └── validate-pack.ts
└── evals/
    └── evals.json
```

Its contract must require an overlap check, production-grammar justification, pack-aware evaluation, at least one showcase README with a complete generation prompt, and no fabricated generation results.

It does not become a provider wrapper or a general Skill creator.

## 15. `music-evaluate` Deterministic Scripts

### `preflight.ts`

Checks required and optional local dependencies and reports unusable scripts loudly.

### `inspect-audio.ts`

Provides objective technical evidence via ffprobe/FFmpeg.

### `validate-lineage.ts`

Checks:

- parent references resolve;
- selection sources resolve;
- final artifacts retain lineage;
- no artifact is marked derived from a missing parent.

### `validate-preservation.ts`

Checks declared preservation metadata:

- locked/open declarations are not contradictory;
- requested change does not falsely claim unrelated decisions were reopened;
- expected parent/selection references remain attached.

This structural check does not prove semantic audio preservation by itself.

### `generate-report.ts`

Combines deterministic evidence and structured semantic findings into an `evaluation_report`.

---

## 16. Eval Requirements

Each skill must have `evals/evals.json` covering at least:

```text
normal
draft
refinement
final
failure / boundary
```

Each case should include:

```json
{
  "name": "...",
  "input": "...",
  "expect": ["..."],
  "forbid": ["..."],
  "check": "optional-executable-check"
}
```

A prose-only eval is manual. It must not be reported as executable coverage.

### `music-compose` minimum cases

- create composition + arrangement from a brief;
- generate materially different hook drafts;
- preserve locked melody/lyrics while changing one open component;
- hand approved composition to production without speculative rewrite;
- reject a mastering request as outside composition scope.

### `music-produce` minimum cases

- create demo then final production through Replicate;
- use a partial draft for a local production question;
- repair a local region before whole-track regeneration;
- produce final output + QC;
- refuse to claim native stems from stereo-only source.

### `music-evaluate` minimum cases

- evaluate a demo against brief/composition/arrangement;
- compare draft hooks using draft-appropriate criteria;
- verify a drum-only refinement preserves melody/lyrics/structure;
- run final creative + technical evaluation;
- refuse unsupported stereo-width judgement from text-only input.

---

## 17. End-to-End Evals

Initial repository-level cases:

```text
brief
→ composition draft set
→ select components
→ arrangement
→ demo
→ evaluate
→ targeted refinement
→ final production
→ final evaluation
```

```text
approved composition + arrangement
→ demo
→ preserve locked melody/lyrics
→ change production only
→ verify preservation
```

```text
existing production
→ local defect
→ smallest-unit repair
→ boundary check
→ final evaluation
```

End-to-end success is not merely `audio file exists`.

The workflow must prove:

- meaningful alternatives;
- selection persistence;
- approved-decision preservation;
- correct Replicate ownership of model execution;
- targeted refinement before restart;
- lineage integrity;
- technical QC;
- evaluation against the original brief.

---

## 18. Examples

Examples teach the five consumer-production levels with **three genre-distinct examples per level**. Each example README must contain the complete copyable production prompt. Generated artifacts and measured findings are added only after that production has actually run.

### Level 1 — Controlled Output

```text
Night Drive      — synthwave / electronic instrumental
Sunday Static    — neo-soul / R&B
Northbound       — indie folk
```

Proves:

```text
brief
→ composition
→ arrangement
→ short demo
→ evaluation
```

### Level 2 — Selection and Preservation

```text
Concrete Halo    — boom-bap hip-hop
Soft Collapse    — dream pop / shoegaze
High Water       — blues / roots rock
```

Proves:

```text
draft alternatives
→ component selection
→ approval / locking
→ refined demo
→ preservation evaluation
```

### Level 3 — Full Production

```text
Low Orbit        — melodic techno
Half Light       — alternative R&B
Static Summer    — indie rock / dream rock
```

Proves the complete vertical production slice:

```text
approved composition + arrangement
→ demo
→ evaluation
→ Replicate-backed production
→ targeted refinement
→ technical QC
→ final evaluation
```

### Level 4 — Repair Workflow

```text
Redline          — drum & bass
No Reply         — alternative pop / R&B
Winter Road      — indie folk
```

Proves:

```text
existing production
→ diagnose owning stage
→ smallest-unit repair
→ boundary / regression check
→ preservation verification
```

### Level 5 — Cross-Domain Production

```text
After Hours      — house / advertising handoff
Last Train Home  — ambient electronic / video handoff
Checkpoint       — chiptune-synthwave / game-project handoff
```

Proves artifact composition across domains without shared runtime dependencies. Music Production Skills consumes upstream context, owns music decisions, and returns music artifacts such as approved masters, delivery variants, timing metadata, loop metadata, or genuine stems when they actually exist.

Avoid examples that demonstrate only one provider call or differ only by genre label.

---

## 19. Consumer-Project Progression

Examples should teach increasing production capability without presenting a huge starting tree.

### Level 1 — Controlled Output

```text
brief
→ composition
→ short demo
```

### Level 2 — Selection and Preservation

```text
draft alternatives
→ component selection
→ locked decisions
→ refined demo
```

### Level 3 — Full Production

```text
approved composition + arrangement
→ production
→ QC
→ final evaluation
```

### Level 4 — Repair Workflow

```text
existing production
→ local defect
→ targeted repair
→ regression evaluation
```

### Level 5 — Cross-Domain Production

```text
video / advertising / game context
→ music brief
→ music production
→ master / stems / timing handoff
```

Scoring/DAW workflows are follow-up examples after core behaviour is proven.

---

## 20. Extraction Candidate Register

Maintain:

```text
docs/extraction-candidates.md
```

Each candidate records:

```text
candidate
implemented behaviour
music-specific semantics
possible second domain
known differences
status
```

Initial `observe only` candidates:

- draft-set semantics;
- lightweight artifact lineage;
- selection / approval / locking semantics;
- preserve/change refinement semantics;
- promotion/refinement;
- staged evaluation;
- a minimal evaluation-report envelope.

Testing/benchmark harness structure is a possible **family tooling/process** reuse candidate, not a Creative Production Skills runtime abstraction.

Explicit non-candidates include:

```text
music composition ≠ video visual composition
music arrangement ≠ video edit_timeline / narrative outline
music demo ≠ video animatic / motion_prototype
music mix ≠ video audio_mix
music master ≠ video_master
music technical QC ≠ video / game / comic technical QC contracts
```

Do not extract `demo` and `mockup` merely because both precede expensive production.

---

## 21. Canonical Installation

Use the open Agent Skills CLI. Stage 12 configures installation; Stage 13 proves clean-project installation.

The canonical unpublished source placeholder is:

```text
<org>/music-production-skills
```

Do not infer the public GitHub owner before publication verifies it.

Inspect available Music Production Skills:

```bash
npx skills add <org>/music-production-skills --list
```

Install every repository skill, including optional pack-authoring support:

```bash
npx skills add <org>/music-production-skills
```

Install only the three core production skills:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-produce \
  --skill music-evaluate
```

Install the optional pack-authoring support skill separately when needed:

```bash
npx skills add <org>/music-production-skills \
  --skill music-pack-author \
  --agent claude-code
```

Install selected skills for Claude Code:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-evaluate \
  --agent claude-code
```

Install selected skills for Codex:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-evaluate \
  --agent codex
```

Project-local installation is the default. Global installation is optional:

```bash
npx skills add <org>/music-production-skills --global
```

For non-interactive automation, add `--yes`.

### 21.1 Replicate peer skills

`music-produce` does not reimplement Replicate execution. Its primary generative path requires the official peer skills:

```bash
npx skills add replicate/skills \
  --skill find-models \
  --skill compare-models \
  --skill run-models \
  --agent claude-code
```

`music-compose` needs these peers only when the composition workflow escalates to Replicate-backed audio generation. Symbolic/text/MIDI composition does not require them.

`music-evaluate` does not require Replicate merely to evaluate supplied artifacts.

### 21.2 Installed skill tracking

Useful current Skills CLI commands include:

```bash
npx skills list
npx skills update --project
npx skills update music-compose music-produce music-evaluate music-pack-author --project --yes
```

The CLI may maintain project installation metadata such as `skills-lock.json`. A consumer project may commit it when useful, but experimental lock restoration is not a core runtime or recovery dependency. Explicit `npx skills add ...` commands remain canonical.

### 21.3 Canonical guidance

Detailed installation guidance lives in:

```text
docs/installation.md
```

The README should remain concise and link there rather than duplicate every installation combination.

## 22. Consumer Requirements

Document:

### Required provider credential

```text
REPLICATE_API_TOKEN
```

### Required local executable

```text
ffmpeg
ffprobe
```

### Skill-specific Node dependencies

`music-compose` deterministic scripts may require:

```text
@tonaljs/* / tonal
@tonejs/midi
```

Package exact dependencies within the skill directory when required for selective installation.

External secondary-provider credentials must never be required for the primary workflow.

---

## 23. Repository Validation

Before publication verify:

- skill frontmatter is valid;
- each skill installs independently;
- all referenced local files ship with that skill;
- deterministic TypeScript compiles/checks strictly;
- FFmpeg commands use safe subprocess invocation;
- required dependencies fail loudly when absent;
- eval coverage is reported;
- benchmark deterministic tier passes;
- benchmark taxonomy, rubrics, example matrix, and baseline contracts validate;
- benchmark case source paths resolve;
- realistic end-to-end example works;
- no repository-relative runtime reference breaks after selective installation.

---

## 24. CI Expectations

Minimum CI:

```text
typecheck
validate repository
unit tests
stage tests
structural evals
deterministic benchmark
skill discovery: npx skills add . --list
local install smoke test for each skill
broken-runtime-reference detection
```

Provider-backed generation or semantic benchmark collection may run separately because it incurs cost.

A required check that cannot run is `BLOCKED` or `NOT RUN`, never `PASS`.

---

## 25. README Contract

The README should lead through:

```text
what the project enables
→ installation
→ first useful result
→ progressive examples
→ skills / provider requirements
→ deeper docs
```

It should show:

```bash
# Inspect
npx skills add <org>/music-production-skills --list

# Install
npx skills add <org>/music-production-skills

# Install one skill
npx skills add <org>/music-production-skills --skill music-compose

# Explicit agent
npx skills add <org>/music-production-skills --skill music-compose --agent claude-code
```

Also document:

- Replicate credentials;
- FFmpeg/ffprobe;
- recommended skill combinations;
- global installation as optional;
- official Replicate peer-skill installation for generative production;
- update commands;
- consumer workspace guidance;
- what is intentionally deferred.

Avoid wide tables when stacked sections work better on narrow screens.

---

## 26. Open-Source Boundaries

The repository is canonical for:

- skills;
- specs;
- workflow rules;
- artifact contracts;
- references;
- evals;
- tests/benchmarks;
- examples;
- extraction candidates.

Examples and README copy must not silently redefine normative skill behaviour.

Detailed methodology can move into guides later when real material exists.

---

## 27. Technical Acceptance Criteria

The repository contract is correct when:

1. the three primary engineering specs plus supplemental testing and customisation-pack specifications live directly under `/docs`;
2. `music-compose`, `music-produce`, and `music-evaluate` each have valid Agent Skills frontmatter;
3. each skill installs independently with all runtime resources it needs;
4. official Replicate skills remain the primary model execution layer;
5. no custom Replicate client, static model catalogue, static price catalogue, or generic provider router exists;
6. `music-compose` contains composition/arrangement/draft-selection behaviour rather than final production logic;
7. `music-produce` owns Replicate-backed demo/final generation and targeted refinement;
8. `music-evaluate` owns stage-aware evaluation, preservation checks, failure routing, and technical QC;
9. Tonal and `@tonejs/midi` are used only for deterministic symbolic/MIDI mechanics;
10. FFmpeg/ffprobe are used for deterministic media operations and technical evidence;
11. TypeScript tooling is strict, runtime-validated at boundaries, safely invokes subprocesses, and has deterministic tests;
12. skill evals cover normal/draft/refinement/final/boundary cases;
13. end-to-end evals prove selection, preservation, refinement, provenance, and evaluation;
14. no stereo-only artifact is mislabeled as true multitrack/stems;
15. examples demonstrate real production workflows rather than isolated API calls;
16. consumer-project structure grows progressively rather than starting from an oversized canonical tree;
17. semantic benchmark collection is opt-in and paid evidence is cached/retained where the benchmark design requires it;
18. benchmark coverage separates agent behaviour, produced-artifact quality, and evaluation/repair quality;
19. every initial extension pack has agent-behaviour and artifact-semantic benchmark coverage;
20. the 15 public examples remain a five-level, three-genre-per-level regression pool;
21. benchmark questions and artifact bytes participate in semantic evidence identity;
22. CI never reports a required but unexecuted check as passing;
23. deferred architecture remains outside the bootstrap implementation unless Stage 10+ evidence changes the decision;
24. customisation packs are optional peer skills and the three core skills remain usable without them;
25. customisation-pack precedence is explicit instructions → approved/locked artifacts → selected pack → core defaults;
26. customisation packs do not own Replicate/provider execution or silently reopen approved work;
27. `music-pack-author` remains optional authoring support and is benchmarked for overlap control, operational specificity, showcase completeness, and boundary safety;
28. core skill evals include pack-consumption boundary behaviour while pack-specific behavioural suites belong with the pack repository;
29. every bounded production command is packaged under its owning skill rather than exposed as another installable skill;
30. every command contract defines purpose, activation, inputs, preconditions, outputs, invariants, failure semantics, forbidden behaviour, dependencies and evaluation hooks;
31. command IDs represent production responsibilities rather than implementation mechanics;
32. each `SKILL.md` owns command selection and orchestration without introducing a generic workflow engine;
33. benchmark/eval metadata can identify command-level cases separately from whole-skill cases;
34. command coverage reports zero-case commands as gaps rather than passes;
35. command execution continues to use the existing artifact/lifecycle model rather than creating command-result artifacts or command-specific lifecycle states.


### Command-decomposition implementation status

This specification now defines the target command layout and contracts. The current repository implementation must add the `commands/` directories, command-aware skill orchestration and command-level benchmark cases **before Stage 13 is treated as ready to run**.

A green pre-command repository check does not prove this new contract. Command-aware validation becomes part of the next implementation change.


## 28. Stage 12 Completion

Stage 12 is complete when installation is configured without claiming clean-project success:

```text
✓ Agent Skills CLI is the canonical installer
✓ project-local installation is the default
✓ global installation is documented as optional
✓ the three core Music Production Skills can be selected explicitly
✓ `music-pack-author` remains separately selectable as optional authoring support
✓ Claude Code and Codex targeting are documented
✓ official Replicate peer skills are documented for generative production
✓ per-skill runtime requirements are documented
✓ current list/update commands are documented
✓ explicit add commands remain the canonical recovery path
✓ Stage 13 local-source smoke commands are configured
□ Stage 13 clean-project discovery/install evidence is not yet claimed
```

`docs/installation.md` is the canonical detailed installation guide. README installation content stays intentionally shorter.

---

**Music Production Skills — Creative Skills Repository and Contracts Specification v6**
