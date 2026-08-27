# Music Production Skills — Testing and Benchmark Specification

## 1. Purpose

This specification defines how Music Production Skills measures and protects quality.

The repository now exposes four installable skills:

```text
music-compose
music-produce
music-evaluate
music-pack-author
```

and five initial customisation-pack production grammars:

```text
intimate-singer-songwriter-single
melodic-techno-club-track
cinematic-hybrid-score
adaptive-game-score
premium-brand-music
```

The benchmark must therefore prove more than repository correctness or generic audio quality. It must measure:

```text
production decision quality
workflow discipline
preservation of approved work
smallest-unit refinement
corrective routing
technical and delivery correctness
creative quality of produced music
pack fidelity
cross-domain boundaries
pack-authoring quality
```

The governing rule is:

> **Measure the product claim at the cheapest layer capable of falsifying it.**

Do not run a paid full-track generation merely to test metadata, routing, duration, packaging, or another property that can be disproved earlier.

This is a supplemental normative operational specification. The three primary engineering specifications continue to own system, workflow/artifact, and repository contracts.

This document also owns the executable testing runbook: sections 2–6 describe how to run the suite
and what each layer can and cannot prove. Sections 7 onwards define the capability benchmark itself.

---

## 2. Testing Layers

| Layer | Question it answers | Provider | Command |
|---|---|---|---|
| typecheck / validate | Is the repository structurally valid? | no | `npm run typecheck`, `npm run validate` |
| unit | Do deterministic scripts reject invalid inputs and produce stable outputs? | no | `npm run test:unit` |
| stage | Does each production-stage rule behave correctly in isolation? | no | `npm run test:stages` |
| evals | Do declared skill behaviours have falsifiable checks? | no structural; optional provider behavioural | `npm run test:evals` |
| benchmark — deterministic | Are declared structural/technical defect classes detected without false positives on controls? | no | `npm run test:benchmark` |
| benchmark — reporting | What does the taxonomy cover, and what are the semantic questions? | no | `npm run benchmark:report`, `npm run benchmark:prompts` |
| benchmark — semantic, scoring | Does the scorer correctly score already-recorded reviewer answers? | no | `npm run test:semantic:rescore` |
| benchmark — semantic, collection | Can an audio-capable reviewer detect, route, and scope music-production defects? | external reviewer workflow, opt-in | `RUN_SEMANTIC_BENCHMARK=1 node --experimental-strip-types tools/run-benchmark.ts --repeat 3` |
| smoke | Can every skill be discovered and installed independently? | no | `npm run test:smoke` |

### Run everything

```bash
npm test
```

Runs:

```text
typecheck
→ validate
→ unit
→ stages
→ evals
→ deterministic benchmark
→ semantic re-score of committed transcripts
→ smoke
```

`npm run check` is the same sequence without the smoke layer, and is what CI runs.

Exit `0` is the only pass.

Paid semantic collection is **never** part of `npm test` and does not gate normal CI.

If committed transcripts exist but are stale, semantic re-score exits non-zero rather than ignoring them.

### Run one layer

```bash
npm run test:unit
npm run test:stages
npm run test:evals
npm run test:benchmark
npm run test:smoke
```

Current stage files:

```text
tests/stages/
├── selection.test.ts
├── preservation.test.ts
├── failure-routing.test.ts
├── midi.test.ts
└── audio-qc.test.ts
```

Stage tests should map to production behaviour rather than implementation modules.

---

## 3. What Each Layer Cannot Do

Stating limits is mandatory because a green result from the wrong layer is misleading.

- **typecheck / validate** proves structure, not production behaviour.
- **unit tests** prove deterministic code paths, not musical quality.
- **stage tests** can exercise declared workflow state and synthetic audio/MIDI defects; they cannot decide whether a chorus is emotionally effective.
- **evals** are manual prose unless they name an executable `check`. Coverage must report executable versus manual cases.
- **deterministic benchmark** sees measurable or declared properties. It cannot hear an undeclared melodic mutation solely because a manifest says the melody was preserved.
- **semantic benchmark collection** can judge supplied audio/context but is non-deterministic and costs money. One sample is not a measurement.
- **semantic scoring** can be rerun offline only for previously recorded answers. It cannot create new evidence.
- **transcripts** prove what was asked and answered. They do not prove the referenced artifact bytes have not changed unless artifact hashes are part of transcript identity.
- **smoke tests** prove packaging/installability, not production quality.

---

## 4. Standing Rules

1. **A test that cannot run skips loudly or blocks. Never silently pass it.**
2. **Coverage is reported, not implied.** Manual evals lower executable coverage rather than appearing green.
3. **Every production defect that reaches a deliverable becomes a regression fixture when it can be represented safely.**
4. **Every detector needs a clean control.** Detection without negative controls measures eagerness, not discrimination.
5. **Synthetic fixtures are preferred for deterministic defects.** Generate them at runtime from code/FFmpeg/MIDI definitions rather than committing large media binaries.
6. **Fixture caches are content-addressed.** Changing the fixture generator invalidates the cached fixture.
7. **Paid semantic answers are retained.** Re-scoring should not require paying to recollect unchanged evidence.
8. **Artifact bytes participate in transcript identity.** A regenerated file at the same path invalidates semantic evidence.
9. **Editing a semantic question invalidates its transcripts.** Context, criteria, referenced artifacts, reviewer model, and prompt version are part of the question identity.
10. **One semantic sample is not a measurement.** Use repeated collection and majority verdicts.
11. **Partial instability is `FLAKY`, not a deterministic regression.** Report the observed rate.
12. **Open-ended review runs before closed criteria.** The closed pass organises/verifies findings rather than being trusted as the only discovery mechanism.
13. **Corrective routing is measured.** Detecting a defect without naming the owning production stage is insufficient for this project.
14. **Correction scope is measured.** A reviewer that finds a local defect but recommends whole-track regeneration has not demonstrated targeted refinement.
15. **Preservation is measured separately from correction success.** A successful drum change that mutates locked melody still fails.

---

## 5. Prerequisites

Core test environment:

- modern Node.js capable of the repository's TypeScript execution strategy;
- FFmpeg;
- ffprobe.

Optional semantic collection:

- `REPLICATE_API_TOKEN`;
- `MUSIC_BENCHMARK_REVIEWER=<owner/model>` selecting an audio-capable reviewer suitable for the benchmark;
- network access.

Optional tooling must never be substituted silently.

Check environment first:

```bash
node --experimental-strip-types skills/music-evaluate/scripts/preflight.ts
```

Example result:

```text
node: available [required]
ffmpeg: available [required]
ffprobe: available [required]
replicate token: MISSING [optional semantic benchmark]
semantic reviewer: MISSING [optional semantic benchmark]
semantic collection: NOT AVAILABLE
```

The command exits non-zero when a required tool is missing, so it can gate a local run.

---

## 6. Deterministic Fixture Generation

Use:

```text
tests/fixtures/make-fixtures.ts
```

to create small synthetic artifacts at runtime. It currently emits a clean sine-tone control
(`tone.wav`) and a clipped counterpart (`clipped.wav`) through FFmpeg `lavfi`, which is the minimum
pair required by rule 4 — a detector and its clean control.

Generated fixtures are written under `tests/fixtures/generated/`, which is gitignored. Large
generated music tracks are not required for deterministic tests.

### Audio fixture techniques

FFmpeg `lavfi` or generated PCM can create:

- sine-tone controls;
- silence/dropout regions;
- clipping;
- invalid duration;
- abrupt amplitude/phase changes at edit boundaries;
- channel-layout cases;
- loudness extremes;
- deterministic section markers.

### MIDI fixtures

Programmatically generate:

- valid composition MIDI;
- invalid/truncated MIDI;
- known tempo/key examples;
- transposition cases;
- selected-component lineage cases.

### Metadata fixtures

Create:

- locked/open contradictions;
- missing parent references;
- stale final artifact hashes;
- approval without approver where approval policy requires one;
- source-separated artifact incorrectly declared as native stems;
- missing selection source;
- incompatible lifecycle transitions.

---

## 7. Quality Model

Quality is not one number.

Music Production Skills has four fundamentally different quality surfaces.

### 2.1 Command behaviour

A bounded command must satisfy its own production contract independently of whole-skill orchestration.

Measure:

```text
input/precondition handling
required output shape / artifact effect
invariants
forbidden behaviour
failure semantics
preservation obligations
boundary compliance
```

A command case answers:

> **Given that this is the correct production operation, does the operation itself behave correctly?**

### 2.2 Agent behaviour

Before and around generation, the skills must make good production decisions.

Examples:

```text
choose a cheap representation before expensive generation
create genuinely different alternatives
preserve approved decisions
use deterministic tools for deterministic work
target the smallest failing unit
route failures to the correct production stage
respect pack precedence
respect domain boundaries
```

A beautiful final track does not excuse a workflow that silently rewrote locked lyrics or regenerated an entire song for a local defect.

### 2.3 Produced artifact quality

When real music is generated, the resulting artifact must satisfy the brief and relevant production grammar.

General dimensions:

```text
intent fit
composition
arrangement
performance
production
preservation
technical integrity
delivery correctness
```

Pack-specific dimensions are defined in `tests/benchmark/rubrics.json`.

### 2.4 Evaluation and repair quality

`music-evaluate` must not merely notice that something is wrong.

It must demonstrate:

```text
detection
precision
correct owning stage
smallest justified correction scope
preservation awareness
technical versus creative discrimination
```

These axes are reported separately.

---

## 8. Benchmark Layers

| Layer | Measures | Provider cost | Normal CI |
|---|---|---:|---:|
| repository validation | packaging, contracts, required files | none | yes |
| deterministic unit/stage tests | metadata, MIDI, audio mechanics, delivery invariants | none | yes |
| deterministic benchmark | hard product invariants and benchmark-contract integrity | none | yes |
| command-contract tests | individual bounded production operations | none / host-model dependent | deterministic subset |
| agent-behaviour benchmark | production reasoning and boundary behaviour | host-model dependent | no until configured |
| artifact-semantic benchmark | musical/production quality of real outputs | reviewer dependent | re-score only |
| provider generation benchmark | real model execution against canonical examples | paid/variable | intentional runs only |
| human listening calibration | validates semantic reviewer/rubric assumptions | human time | release/review as needed |

A green result from one layer must never be presented as proof of another layer.

---

## 9. Release Gates

### 4.1 Hard deterministic gate

Every commit must pass:

```text
typecheck
repository validation
unit tests
stage tests
eval declaration validation
command contract validation
deterministic benchmark
semantic transcript staleness/re-score
```

Hard invariants include:

```text
no locked/open contradiction
no invalid selection lineage
no silent selected → locked collapse
no fake native stems
no missing pack showcase prompt
no missing benchmark source
no stale semantic evidence accepted
no invalid pack structure accepted
no missing/invalid command contract
no command that escapes its owning skill at runtime
```

### 4.2 Agent-behaviour gate

Before release, canonical behaviour cases should be exercised with the intended Agent Skills host. Skill orchestration is evaluated separately from command execution.

A hard agent case fails the release when the skill:

```text
silently overrides an approved or locked decision
uses whole-track regeneration as the default local repair
silently switches a pinned model
claims unsupported native stems
lets a pack override explicit instructions
crosses into video/game implementation ownership
creates a redundant pack when an existing pack only needs adaptation
selects a materially wrong command for the requested production responsibility
```

Agent-behaviour evidence is not yet measured in the initial baseline.

### 4.3 Artifact-quality gate

A canonical generated showcase is acceptable only when:

1. all hard brief/delivery constraints pass;
2. no preservation hard failure exists;
3. every required creative rubric dimension reaches at least `acceptable` by majority review;
4. no critical pack-specific failure exists;
5. technical QC passes.

Use the ordinal scale:

```text
unacceptable
weak
acceptable
strong
```

Do not publish an opaque aggregate music-quality score.

### 4.4 Regression gate after the first baseline

Once a measured baseline exists:

- a hard-gate regression is blocking;
- a creative dimension dropping from `acceptable/strong` to `weak/unacceptable` is blocking for a canonical showcase;
- mixed repeated semantic results are `FLAKY`, not silently averaged away;
- a changed prompt/case is a new measurement and cannot inherit the old baseline.

---

## 10. Canonical Benchmark Assets

The executable benchmark contract lives under:

```text
tests/benchmark/
├── taxonomy.json
├── rubrics.json
├── example-matrix.json
├── profiles.json
├── baseline.json
├── transcripts/
└── *.test.ts
```

### `taxonomy.json`

Defines what capabilities are measured and which cases are hard gates.

### `rubrics.json`

Defines general and pack-specific creative quality dimensions.

### `example-matrix.json`

Defines the 15 public progressive examples used as the broad production regression pool.

It intentionally contains:

```text
5 levels
×
3 distinct genres/use cases per level
=
15 examples
```

### `profiles.json`

Defines cost-aware benchmark breadth:

```text
ci
→ deterministic only

release-core
→ one public example per level + all five pack showcases

full-production
→ all 15 public examples + all five pack showcases
```

### `baseline.json`

Contains only measured results.

Until real evidence is collected:

```text
status: UNMEASURED
results: []
```

### `transcripts/`

Stores re-scoreable semantic evidence. No transcript may survive a changed question or changed artifact bytes silently.

---

## 11. Capability Coverage

The current taxonomy must cover these suites.

### 6.1 Composition control

```text
cheap drafting
meaningful alternatives
component selection
selection versus approval/locking
```

### 6.2 Production control

```text
model-routing behaviour
deterministic-tool preference
targeted refinement
whole-regeneration fallback discipline
stem semantics
final QC
```

### 6.3 Evaluation and repair

```text
clean-control precision
preservation detection
arrangement routing
edit-boundary routing
intent mismatch
technical routing
```

### 6.4 Extension packs

Every initial pack must have at least:

```text
one agent-behaviour case
+
one artifact-semantic showcase case
```

This prevents the catalogue from becoming documentation-only.

### 6.5 Pack authoring

```text
existing-pack overlap detection
new-production-grammar justification
operational profile quality
showcase contract
creator-imitation boundary
```

### 6.6 Technical delivery

```text
stem provenance
exact duration where required
required output existence
format/decodability
```

### 6.7 Cross-domain handoffs

```text
music → video timing/delivery handoff without owning video production
music → game runtime handoff without implementing the game runtime
```

---

## 11A. Command-Level Coverage

The benchmark taxonomy may identify a command explicitly:

```json
{
  "skill": "music-produce",
  "command": "refine-region",
  "capability": "targeted-refinement"
}
```

`command` is required for command-level cases and optional for skill/workflow/production cases.

Every shipped command should have:

1. at least one positive contract case;
2. at least one boundary/forbidden-behaviour case when the command has a meaningful misuse mode;
3. deterministic assertions for machine-checkable invariants;
4. semantic/agent evaluation only for behaviour that cannot be established deterministically.

The benchmark must distinguish:

```text
wrong command selected
→ skill orchestration failure

right command selected, contract violated
→ command failure

commands individually pass, sequence is wrong
→ workflow orchestration failure

workflow passes, generated music is weak
→ artifact / execution quality failure
```

Recommended test hierarchy:

```text
command
→ one bounded behaviour

skill
→ command selection + orchestration

workflow
→ multiple skills and artifact handoffs

production
→ actual generated musical quality
```

Do not count low-level tool helpers (`run-ffmpeg`, `read-json`, provider calls) as command coverage.

---

## 12. Public Example Regression Matrix

The 15 public examples are not decorative tutorials. They form a broad production regression pool.

### Level 1 — Controlled Output

```text
Night Drive      — synthwave
Sunday Static    — neo-soul / R&B
Northbound       — indie folk
```

Measures whether the agent can keep the initial workspace and production commitment appropriately small.

### Level 2 — Selection & Preservation

```text
Concrete Halo    — boom-bap
Soft Collapse    — dream pop / shoegaze
High Water       — blues / roots rock
```

Measures alternatives, selection lineage, approval boundaries, and preserved decisions.

### Level 3 — Full Production

```text
Low Orbit        — melodic techno
Half Light       — alternative R&B
Static Summer    — indie / dream rock
```

Measures end-to-end production, finalisation and evaluation across materially different music grammars.

### Level 4 — Repair Workflow

```text
Redline          — drum & bass
No Reply         — alternative pop / R&B
Winter Road      — indie folk
```

Measures failure diagnosis and local repair without unnecessary upstream destruction.

### Level 5 — Cross-Domain Delivery

```text
After Hours      — house / advertising
Last Train Home  — ambient electronic / video
Checkpoint       — chiptune-synthwave / game
```

Measures handoffs, delivery constraints and project-family boundaries.

Normal CI validates the example contracts and prompts. Provider-backed generation of all 15 examples is a deliberate broader regression run, not a per-commit requirement.

### Benchmark profiles

Use three breadth profiles:

```text
ci
→ free deterministic checks only

release-core
→ Night Drive
→ Concrete Halo
→ Low Orbit
→ Redline
→ Last Train Home
→ all five pack showcases

full-production
→ all 15 public examples
→ all five pack showcases
```

`release-core` deliberately samples one example from every production level while always exercising every initial extension pack.

---

## 13. Extension Pack Quality Benchmark

Every initial extension pack has its own production-quality target.

### `intimate-singer-songwriter-single`

Rubric:

```text
song coherence
lyric prosody
vocal intimacy
arrangement restraint
dynamic authenticity
```

Hard failures include production spectacle that destroys the intended intimacy or materially weakens locked lyrics/melody.

### `melodic-techno-club-track`

Rubric:

```text
groove stability
kick/bass relationship
long-form energy
transition function
club structure
```

Do not judge it primarily using verse/chorus pop expectations.

### `cinematic-hybrid-score`

Rubric:

```text
dramatic function
sync accuracy
dialogue space
cue development
handoff readiness
```

A technically polished cue that misses a critical sync point fails.

### `adaptive-game-score`

Rubric:

```text
loop seamlessness
layer compatibility
state contrast
transition function
runtime handoff readiness
```

A strong linear track can still fail this pack if it does not function as adaptive music.

### `premium-brand-music`

Rubric:

```text
brand fit
mnemonic distinctiveness
identity preservation
exact-duration variants
short-form impact
```

A 6-second variant is not an unrelated new composition. It must preserve the approved musical identity.

---

## 14. `music-pack-author` Benchmark

Command-level coverage must include:

```text
assess-pack-need
define-profile
author-pack
create-showcase
validate-pack
catalogue-pack
```

Pack-author orchestration cases must also verify that `assess-pack-need` is selected before authoring a new pack when catalogue overlap is plausible.


The authoring skill has its own quality rubric:

```text
production-grammar justification
operational specificity
core-skill integration
pack-aware evaluation
showcase quality
minimality
boundary safety
```

### Hard cases

The skill must:

- adapt an existing pack when the requested difference is only a minor genre/style variation;
- justify a new pack through materially different workflow/artifact/delivery behaviour;
- convert labels into operational production rules;
- include a showcase README with a full generation prompt;
- avoid provider/API reimplementation;
- reject a pack whose sole purpose is reproducing a named living creator's recordings.

Structural pack validation is deterministic. Creative coherence of a new pack is semantic and must not be falsely reported as schema validation.

---

## 15. Deterministic Benchmark Cases

The deterministic benchmark currently verifies, among other things:

```text
valid preservation metadata control
locked/open contradiction detection
benchmark taxonomy validity
benchmark question identity hashing
semantic transcript schema
flakiness classification
five-pack catalogue/showcase coverage
showcase prompt presence
no fabricated showcase results
pack-author structural acceptance/rejection
native-stem declaration rejection
15-example / 5-level / 3-genre coverage
UNMEASURED baseline integrity
```

These tests are executable today.

They do not prove that generated music sounds good.

---

## 16. Agent-Behaviour Benchmark

Agent cases evaluate the behaviour of the installed skill in a clean consumer project.

Each case records:

```text
case ID
skill(s)
input prompt
installed peer skills
expected artifacts/decisions
required behaviours
forbidden behaviours
produced output/artifact hashes
agent + version
run number
```

Important hard cases include:

### Cheapest sufficient representation

A composition uncertainty should not immediately become a full final-generation request.

### Component-level selection

The agent must be able to preserve selected melody from one draft while selecting harmony or groove from another where the workflow supports that choice.

### Pinned model

An incompatible pinned model must fail or request an explicit decision. Silent switching fails.

### Local repair

A local chorus, phrase or transition defect should produce a local correction plan before whole-track regeneration.

### Pack precedence

```text
explicit user instruction
>
approved/locked artifact
>
selected pack
>
core default
```

### Pack overlap

A request for “dark progressive techno” that only changes harmony/density from the existing melodic-techno pack should not automatically create a new pack.

Agent benchmark automation remains host-specific and is not faked by deterministic tests. Until Stage 13/host-runner evidence exists, these cases remain unmeasured.

---

## 17. Artifact-Semantic Benchmark

Artifact-semantic cases use real generated music plus the originating brief/artifacts.

The reviewer runs two passes.

### Open pass

Ask for material problems without first revealing the seeded failure.

This measures genuine discovery.

### Closed pass

Evaluate declared criteria and return:

```text
PASS / FAIL / NA per hard criterion
creative rubric grade per applicable dimension
owning production stage
recommended correction
maximum correction scope
preservation result
```

The closed pass organises and verifies. It does not replace the open pass.

---

## 18. Semantic Axes

Report these separately:

### Detection

Was the expected issue found?

### Precision

Did the reviewer avoid unsupported failures?

### Routing

Was the owning stage identified correctly?

Examples:

```text
weak final-chorus lift → arrangement / production
clipping → technical finishing
melody mutation during drum edit → refinement / preservation
```

### Correction scope

Was the recommended fix limited to the smallest justified unit?

### Preservation

Did the reviewer recognise whether locked material survived?

### Pack fidelity

Did the production preserve the selected pack's operational characteristics rather than merely resemble its genre label?

### Creative quality

Use the ordinal rubric only on dimensions applicable to the artifact.

### Delivery

Did the artifact meet required duration, output, stem/runtime-handoff and format constraints?

---

## 19. Clean Controls

Every detector class needs a clean control.

Examples:

```text
clean preservation control
clean edit boundary
clean unclipped audio
correct final-chorus lift
pack-compliant showcase
correct exact-duration variant
valid pack that should be accepted
existing pack variation that should be adapted rather than duplicated
```

Without negative controls, high detection may simply measure eagerness to criticise.

---

## 20. Evidence Identity and Staleness

A semantic transcript identity includes:

```text
case ID
exact benchmark case/question hash
review pass
reviewer identity
repeat number
artifact paths and SHA-256 hashes
```

If the case meaning changes, `questionHash` changes.

If referenced artifact bytes change, their hashes change.

In either case, previous evidence is stale and must not be scored.

This is implemented by `tools/benchmark.ts` and `tools/run-benchmark.ts`.

---

## 21. Repeats and Flakiness

One semantic judgement is not a measurement.

Default semantic collection target:

```text
3 repeats
```

Report:

```text
PASS   — every measured repeat passes
FAIL   — every measured repeat fails, or an even tie fails to demonstrate capability
FLAKY  — mixed pass/fail repeats
NOT_RUN — no applicable measured evidence
```

Do not hide flakiness behind averages.

---

## 22. Benchmark Runbook

### Full deterministic repository gate

```bash
npm run check
```

### Command coverage/status

The benchmark runner should report coverage grouped by `skill` and `command`, including commands with zero cases.

```text
music-compose / draft-material       covered
music-produce / refine-region       covered
music-evaluate / route-failure      covered
music-pack-author / catalogue-pack  uncovered
```

Zero-case commands are coverage gaps, not passes.

### Deterministic benchmark only

```bash
npm run test:benchmark
```

### Coverage/status report

```bash
node --experimental-strip-types tools/run-benchmark.ts --report
```

### Print semantic/agent case criteria

```bash
node --experimental-strip-types tools/run-benchmark.ts --print-prompts
```

### Re-score committed semantic evidence

```bash
node --experimental-strip-types tools/run-benchmark.ts --rescore
```

### Semantic collection

The repository does not embed a provider API client merely for benchmarking.

Collection must use an explicitly configured Agent Skills/reviewer workflow and write transcripts matching the benchmark contract.

Attempting collection through the repository runner without such a workflow reports `BLOCKED` rather than pretending to run.

---

## 23. Baseline Policy

The initial baseline remains:

```text
UNMEASURED
```

The first measured baseline may be written only after:

```text
benchmark taxonomy reviewed
+
canonical agent cases executed
+
real showcase artifacts exist
+
clean controls exist
+
semantic reviews collected with repeats
+
reviewer identity recorded
```

A baseline records:

```text
date
repository revision
agent/reviewer identity
case/question hashes
artifact hashes
repeat count
hard-gate results
per-axis semantic results
per-dimension creative grades
known blind spots
```

Never backfill invented historical scores.

---

## 24. CI Policy

Normal CI runs free/deterministic checks plus re-scoring of already committed evidence.

CI must fail when:

```text
a deterministic hard gate fails
benchmark taxonomy is invalid
a benchmark source disappears
required example/pack coverage drops
committed transcript identity is stale
repository validation fails
```

CI must not fail merely because paid generation/review was not requested.

Provider-backed generation belongs in intentional benchmark runs, releases, or scheduled quality checks once implemented.

---

## 25. Failure Triage

| Symptom | Owning layer | Action |
|---|---|---|
| TypeScript/repository check fails | repository | fix code/contract |
| benchmark source missing | benchmark contract | restore or deliberately replace case |
| selected becomes locked without approval | governance | fix decision-state behaviour |
| melody mutates during drum-only repair | preservation/refinement | local repair or change edit strategy |
| local defect triggers whole-track regeneration | production reasoning | fix scope/routing behaviour |
| pack overrides explicit user requirement | pack precedence | fix core-skill integration |
| techno pack produces generic verse/chorus pop plan | pack fidelity | fix pack production profile/application |
| adaptive-game pack emits only linear master | pack fidelity/delivery | fix modular production grammar |
| brand variants lose mnemonic | preservation/pack fidelity | derive variants from approved identity |
| clipped output | technical finishing | repair technical stage |
| evaluator routes clipping to composition | evaluation routing | fix evaluation behaviour |
| pack-author creates redundant genre variation | pack authoring | improve overlap/adaptation decision |

Do not automatically respond to quality failures by selecting a more expensive model.

---

## 26. Adding Coverage

When a real defect escapes:

1. name the defect class;
2. identify the cheapest layer capable of catching it;
3. add a deterministic fixture when possible;
4. add a clean control;
5. add/extend the taxonomy case;
6. add an agent case if the failure was a decision/workflow error;
7. add an artifact-semantic case if listening is required;
8. preserve the exact failing artifact where licensing/size permits, otherwise use a safe representative fixture;
9. collect repeated evidence;
10. update the baseline deliberately only after review.

Do not tune the benchmark question after seeing a failure and keep the old score. A changed question is a new measurement.

---

## 27. Current Measured Status

Command decomposition is **specified but not yet implemented** in this revision. Existing benchmark results therefore do not claim command-level coverage. The first command-aware baseline must be collected only after the command contracts and cases exist in the repository.


At this version:

```text
deterministic benchmark implementation: ACTIVE
agent-behaviour baseline: UNMEASURED
artifact-semantic baseline: UNMEASURED
provider-generation baseline: UNMEASURED
human calibration baseline: UNMEASURED
```

The repository deliberately reports missing evidence rather than manufacturing a quality score.

---

## 28. Known Blind Spots Before First Baseline

The current design does not yet prove:

- which audio-capable semantic reviewer is sufficiently reliable across all production grammars;
- how reviewer quality varies between vocal, electronic, orchestral/hybrid and adaptive assets;
- whether exact melody preservation can always be judged from dense stereo mixes;
- how well provider models preserve identity during local editing across long tracks;
- whether club translation can be judged reliably without controlled monitoring/human review;
- whether adaptive game layers remain convincing after actual runtime mixing;
- whether brand mnemonic distinctiveness is stable across independent human listeners;
- long-run model drift after providers update models behind stable names.

These are reasons to collect evidence, not reasons to add a database, multi-agent review system or generic benchmark platform prematurely.

---

## 29. Testing Acceptance Criteria

The benchmark system is correctly designed when:

1. repository correctness, agent behaviour and produced-artifact quality are measured separately;
2. hard constraints and creative judgement are separate;
3. no single aggregate music-quality score becomes the release gate;
4. the taxonomy covers all four installable skills;
5. every initial extension pack has agent and artifact-semantic coverage;
6. all 15 public progressive examples remain represented as a genre-diverse regression pool;
7. pack precedence is a hard benchmark invariant;
8. targeted refinement and preservation are hard benchmark claims;
9. cross-domain ownership boundaries are benchmarked;
10. pack-author overlap/minimality is benchmarked;
11. every detector has clean controls where practical;
12. semantic evidence is hash-bound to question meaning and artifact bytes;
13. repeated semantic review exposes flakiness;
14. unmeasured capabilities are reported as `UNMEASURED`/`NOT RUN`, not `PASS`;
15. real escaped defects are promoted into the cheapest appropriate regression layer;
16. benchmark complexity grows from observed failures rather than hypothetical infrastructure needs.

---

## 30. Related Documents

- `docs/01-creative-skills-system-spec.md` — project scope, skills and execution boundaries.
- `docs/02-creative-skills-workflows-and-artifacts-spec.md` — lifecycle, artifacts, preservation and retry semantics.
- `docs/03-creative-skills-repository-and-contracts-spec.md` — packaging, eval and technical contracts.
- `docs/05-customisation-packs-spec.md` — pack contract and pack-aware evaluation.
- `docs/06-extension-pack-catalogue.md` — initial pack catalogue and showcase prompts.
- `docs/extraction-candidates.md` — cross-domain reuse candidates.

---

**Music Production Skills — Testing and Benchmark Specification v4**  
**26 August 2026**
