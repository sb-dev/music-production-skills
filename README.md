# Music Production Skills

![Video Production Skills](hero.png)

**Direct AI music productions, not isolated generations.**

Music Production Skills gives AI coding agents a production workflow for turning musical intent into finished music while preserving the decisions worth keeping.

It supports the production process from idea to delivery:

- **Creative definition**: music briefs, reference analysis, musical direction and constraints
- **Composition**: melody, harmony, rhythm, groove, lyrics, hooks, structure and MIDI drafts
- **Arrangement**: instrumentation, section roles, density, register, transitions and energy progression
- **Production**: demos, generated or recorded material, vocals, continuation and targeted local refinement
- **Finishing and delivery**: rough mixes, mixes, masters, genuine stems where available and delivery packages
- **Quality**: stage-aware evaluation, preservation checks, technical QC and corrective routing

The workflow is designed to explore cheaply, select deliberately, approve important musical decisions, increase production fidelity only when justified, evaluate the result, and retry only what failed.

## Approval and cost control

Selection, approval and locking are different commitments.

- **Selected** means “keep developing this direction”. Selection may be made by the agent when autonomy is requested, the choice is low consequence, or one candidate clearly satisfies the constraints better than the others.
- **Approved** means downstream production may rely on the decision.
- **Locked** means downstream work may assume the decision will not change unless it is explicitly reopened.

Human selection is preferred for high-impact creative decisions such as melody, hook, lyrics, major arrangement, vocal interpretation and score direction.

Before expensive production, stabilise the decisions that materially affect it. A melody can be tested as MIDI. An arrangement can be tested with a rough section. A production direction can be tested with a short demo. Full-track generation is justified only when the unresolved question requires full-track fidelity.

Cost control comes primarily from workflow design:

```text
motif instead of full song
section instead of whole track
MIDI instead of audio
local repair instead of regeneration
demo before final production
```

Hard user budgets are never exceeded silently. A local defect should not cause an automatic whole-track regeneration or a move to a more expensive model when the real problem belongs to composition or arrangement.

## Install

The public GitHub owner remains `<org>` until the repository is published and verified.

Install all Music Production Skills for Claude Code:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-produce \
  --skill music-evaluate \
  --agent claude-code
```

For the default generative execution path, also install Replicate's official execution skills:

```bash
npx skills add replicate/skills \
  --skill find-models \
  --skill compare-models \
  --skill run-models \
  --agent claude-code
```

For Codex, use `--agent codex` instead.

Set `REPLICATE_API_TOKEN` when Replicate generation is required.

Project-local installation is the default. Global installation is optional:

```bash
npx skills add <org>/music-production-skills --global
```

See [Installation](docs/installation.md) for selective installation, runtime dependencies, update commands and the Stage 13 validation contract.

## Quick start — Hook to Demo

Start with one musical decision and learn the core production loop before asking for a finished track.

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

A small composition/demo project should stay small:

```text
production/
├── brief.md
├── composition/
│   ├── drafts/
│   └── selected.yaml
├── arrangement.yaml
├── audio/
└── evaluations/
```

The important behaviour is:

```text
cheap checkpoint → select → approve → produce → evaluate → refine only what failed
```

See [Hook to Demo](examples/hook-to-demo/).

## Learn by producing

Progress through increasingly demanding production problems. Each example adds a real music-production responsibility rather than another abstraction.

### Level 1 — Explore before producing

**Hook to Demo**

Learn cheap composition drafts, meaningful alternatives, component-level selection and the point at which an audio demo becomes useful.

```text
brief
→ hook alternatives
→ component selection
→ arrangement
→ short demo
```

See [examples/hook-to-demo](examples/hook-to-demo/).

### Level 2 — Produce a complete track

**Compose and Produce**

Learn the complete vertical workflow from composition through Replicate-backed production and technical QC.

```text
brief
→ composition drafts
→ selection
→ approved composition
→ arrangement
→ demo
→ evaluation
→ targeted refinement
→ final production
→ QC
```

See [examples/compose-and-produce](examples/compose-and-produce/).

### Level 3 — Change one thing without losing the track

**Preserve and Refine**

Learn explicit decision state and bounded refinement.

```text
approved / locked
├── melody
├── lyrics
└── structure

open
└── drum production
```

The task succeeds only if the production changes while approved musical identity survives.

See [examples/preserve-and-refine](examples/preserve-and-refine/).

### Level 4 — Diagnose and repair

**Evaluate and Repair**

Learn to route a defect to the stage that owns it and repair the smallest affected unit.

```text
existing production
→ diagnose defect
→ identify owning stage
→ isolate region
→ repair
→ check edit boundaries
→ verify preservation
```

See [examples/evaluate-and-repair](examples/evaluate-and-repair/).

## Project structure grows with the work

**One composition or short demo**  
Use `brief`, `composition`, `arrangement` and `audio`.

**Alternatives need explicit selection**  
Add `composition/drafts`, a selected artifact and `evaluations`.

**The work becomes full production**  
Add `references`, `demos`, `production`, `delivery` and evaluation artifacts.

**A local defect needs repair**  
Add a repair workspace for the affected section, phrase or region. Reference the original artifact instead of copying the entire project tree.

**Stems or multitrack material genuinely exist**  
Add them only when the execution path actually produces them. Do not label source-separated estimates as native production stems.

**Other creative domains contribute**  
Compose through artifacts under `production/{advertising,narrative,video,music}` rather than creating shared runtime dependencies.

Keep the structure lean:

- use the smallest musical or production unit that contains the uncertainty;
- selections point to their source candidates instead of duplicating them into status folders;
- lifecycle state and decision state live in artifact metadata rather than `draft/approved/final` directory trees;
- approved and locked decisions are preserved unless explicitly reopened;
- masters, delivery packages and optional stems remain distinct artifacts;
- do not introduce a DAW, provider router or artifact database until a real workflow requires one.

See [Consumer Project Structure](docs/consumer-projects.md).

## Skills

### `music-compose`

Develop the musical work before final production commitment.

Use it for briefs, reference interpretation, melody, harmony, rhythm, groove, lyrics, hooks, structure, arrangement, MIDI drafts, alternatives, selection and preservation of approved musical decisions.

### `music-produce`

Turn approved musical direction into produced audio while preserving approved work.

Use it for demos, Replicate-backed generation, vocals, continuation, local section repair, deterministic audio operations, technical QC and delivery.

### `music-evaluate`

Diagnose what is working, what failed, which stage owns the problem, and the smallest corrective action.

Evaluation is actionable rather than just a score:

```text
weak hook                     → revise composition
strong song, flat chorus      → revise arrangement
local pronunciation defect    → repair affected performance/production region
production change mutated hook→ fail preservation check
clipping or invalid media     → fail technical QC
bad source mix                → route upstream, do not hide it in mastering
```

## Execution

The skills decide **what music-production work is needed**. Existing tools execute it.

- **Replicate Agent Skills** — primary music-model discovery, comparison and execution
- **Tonal** — deterministic music-theory operations
- **`@tonejs/midi`** — MIDI parsing and writing
- **FFmpeg / ffprobe** — audio inspection, deterministic media operations and technical QC
- **Secondary providers or specialist tools** — optional only when a proven production gap justifies them

Replicate is the primary generative provider, but Music Production Skills does not maintain a static model catalogue, static pricing database, generic provider abstraction or custom Replicate SDK. Model choice is driven by the current production capability requirement.

Deterministic repository tooling is TypeScript and targets **Node.js 22+**.

> **Use the cheapest and smallest representation that can resolve the current musical uncertainty.**
>
> **Preserve approved decisions and change only what needs to change.**

## Repository checks

For contributors:

```bash
npm install
npm run check
```

The deterministic gate runs:

```text
typecheck
→ repository validation
→ deterministic unit tests
→ production-stage tests
→ eval coverage validation
→ deterministic benchmark
→ semantic transcript re-score when transcripts exist
```

The local Skills CLI installation gate is intentionally separate:

```bash
npm run test:smoke
```

Stage 12 configures installation. Stage 13 supplies the clean-project installation evidence.

## Documentation

### Specifications

- [Creative Skills System Specification](docs/01-creative-skills-system-spec.md)
  - [Architectural Principles](docs/01-creative-skills-system-spec.md#5-architectural-principles)
  - [System Architecture](docs/01-creative-skills-system-spec.md#6-system-architecture)
  - [Core Skills](docs/01-creative-skills-system-spec.md#7-core-skills)
  - [Primary Execution Layer](docs/01-creative-skills-system-spec.md#8-primary-execution-layer)
  - [Cost Policy](docs/01-creative-skills-system-spec.md#11-cost-policy)
  - [Retry and Escalation](docs/01-creative-skills-system-spec.md#15-retry-and-escalation)
  - [Build Order](docs/01-creative-skills-system-spec.md#19-build-order)
  - [System Acceptance Criteria](docs/01-creative-skills-system-spec.md#20-system-acceptance-criteria)

- [Creative Skills Workflows and Artifacts Specification](docs/02-creative-skills-workflows-and-artifacts-spec.md)
  - [Production Axes](docs/02-creative-skills-workflows-and-artifacts-spec.md#2-production-axes)
  - [Governing Production Rule](docs/02-creative-skills-workflows-and-artifacts-spec.md#3-governing-production-rule)
  - [Shared Workflow Backbone](docs/02-creative-skills-workflows-and-artifacts-spec.md#4-shared-workflow-backbone)
  - [First-Class Artifacts](docs/02-creative-skills-workflows-and-artifacts-spec.md#5-first-class-artifacts)
  - [Draft Sets](docs/02-creative-skills-workflows-and-artifacts-spec.md#24-draft-sets)
  - [Selection, Approval, and Locking](docs/02-creative-skills-workflows-and-artifacts-spec.md#25-selection-approval-and-locking)
  - [Targeted Retry](docs/02-creative-skills-workflows-and-artifacts-spec.md#29-targeted-retry)
  - [Evaluation Lifecycle](docs/02-creative-skills-workflows-and-artifacts-spec.md#30-evaluation-lifecycle)
  - [Failure Taxonomy](docs/02-creative-skills-workflows-and-artifacts-spec.md#37-failure-taxonomy)

- [Creative Skills Repository and Contracts Specification](docs/03-creative-skills-repository-and-contracts-spec.md)
  - [Repository Structure](docs/03-creative-skills-repository-and-contracts-spec.md#2-repository-structure)
  - [Required Peer Skills](docs/03-creative-skills-repository-and-contracts-spec.md#4-required-peer-skills)
  - [`music-compose/SKILL.md`](docs/03-creative-skills-repository-and-contracts-spec.md#10-music-composeskillmd)
  - [`music-produce/SKILL.md`](docs/03-creative-skills-repository-and-contracts-spec.md#12-music-produceskillmd)
  - [`music-evaluate/SKILL.md`](docs/03-creative-skills-repository-and-contracts-spec.md#14-music-evaluateskillmd)
  - [Eval Requirements](docs/03-creative-skills-repository-and-contracts-spec.md#16-eval-requirements)
  - [Canonical Installation](docs/03-creative-skills-repository-and-contracts-spec.md#21-canonical-installation)
  - [Technical Acceptance Criteria](docs/03-creative-skills-repository-and-contracts-spec.md#27-technical-acceptance-criteria)

- [Testing and Benchmark Specification](docs/04-testing-and-benchmark-spec.md)
  - [Testing Layers](docs/04-testing-and-benchmark-spec.md#2-testing-layers)
  - [Run Everything](docs/04-testing-and-benchmark-spec.md#6-run-everything)
  - [Core Deterministic Checks](docs/04-testing-and-benchmark-spec.md#9-core-deterministic-checks)
  - [Semantic Scoring Axes](docs/04-testing-and-benchmark-spec.md#15-semantic-scoring-axes)
  - [Baseline Policy](docs/04-testing-and-benchmark-spec.md#20-baseline-policy)
  - [Initial Semantic Benchmark Cases](docs/04-testing-and-benchmark-spec.md#21-initial-semantic-benchmark-cases)
  - [Testing Acceptance Criteria](docs/04-testing-and-benchmark-spec.md#28-testing-acceptance-criteria)

### Installation and project guidance

- [Installation](docs/installation.md)
- [Consumer Project Structure](docs/consumer-projects.md)
- [Extraction Candidates](docs/extraction-candidates.md)

## Project boundary

Music Production Skills owns **music-production intelligence**, not a DAW, provider SDK or universal creative framework.

It can consume story, picture, campaign or game context through artifacts and return compositions, approved music, mixes, masters, timing information and genuine stems where available. Other Creative Production Skills projects remain independently installable and independently evolvable.

## Status

Stage 12 installation configuration is complete. Stage 13 will validate local discovery and selective installation from clean consumer projects before GitHub publication.

## Licence

MIT. See [LICENSE](LICENSE).
