# Music Production Skills — Testing and Benchmark Specification

## 1. Purpose

This specification defines how Music Production Skills is tested and serves as the runbook for running those tests.

The project makes several claims that ordinary typechecking cannot prove:

- cheap drafts should expose problems before expensive final production;
- selected musical decisions should survive downstream production;
- refinements should change the smallest responsible unit;
- evaluation should identify the correct owning production stage;
- a technical problem should not be misdiagnosed as a composition/model problem;
- a missing check must never appear as a passing check.

This is a supplemental normative operational specification. The project's three primary engineering specs retain system, workflow/artifact, and repository/contract ownership; this document owns the executable testing and benchmark runbook.

The governing principle is:

> **No defect class should require a full production run to discover when a cheaper representative check can expose it earlier.**

This document complements the eval and technical acceptance requirements in `docs/03`; it does not duplicate the skill contracts.

---

## 2. Testing Layers

| Layer | Question it answers | Provider | Command |
|---|---|---|---|
| typecheck / validate | Is the repository structurally valid? | no | `npm run typecheck`, `npm run validate` |
| unit | Do deterministic scripts reject invalid inputs and produce stable outputs? | no | `npm run test:unit` |
| stage | Does each production-stage rule behave correctly in isolation? | no | `npm run test:stages` |
| evals | Do declared skill behaviours have falsifiable checks? | no structural; optional provider behavioural | `npm run test:evals` |
| benchmark — deterministic | Are declared structural/technical defect classes detected without false positives on controls? | no | `npm run test:benchmark` |
| benchmark — semantic, scoring | Does the scorer correctly score already-recorded reviewer answers? | no | `node tools/run-benchmark.ts --rescore` |
| benchmark — semantic, collection | Can an audio-capable reviewer detect, route, and scope music-production defects? | Replicate, opt-in | `RUN_SEMANTIC_BENCHMARK=1 node tools/run-benchmark.ts --repeat 3` |
| smoke | Can every skill be discovered and installed independently? | no | `npm run test:smoke` |

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
- `MUSIC_BENCHMARK_REVIEWER=<owner/model>` selecting an audio-capable Replicate reviewer suitable for the benchmark;
- network access.

Optional tooling must never be substituted silently.

Check environment first:

```bash
node skills/music-evaluate/scripts/preflight.ts
```

Example result:

```text
node: available [required]
ffmpeg: available [required]
ffprobe: available [required]
replicate token: MISSING [optional semantic benchmark]
semantic reviewer: MISSING [optional semantic benchmark]

semantic collection: NOT AVAILABLE
all deterministic stages: available
```

---

## 6. Run Everything

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

Exit `0` is the only pass.

Paid semantic collection is **never** part of `npm test` and does not gate normal CI.

If committed transcripts exist but are stale, semantic re-score exits non-zero rather than ignoring them.

---

## 7. Run One Layer

```bash
npm run test:unit
npm run test:stages
npm run test:evals
npm run test:benchmark
npm run test:smoke
```

Example stage files:

```text
tests/stages/
├── artifact-lifecycle.test.ts
├── selection.test.ts
├── preservation.test.ts
├── midi.test.ts
├── audio-qc.test.ts
├── edit-boundary.test.ts
├── delivery.test.ts
└── production-lint.test.ts
```

Stage tests should map to production behaviour rather than implementation modules.

---

## 8. Deterministic Fixture Generation

Use:

```text
tests/fixtures/make-fixtures.ts
```

to create small synthetic artifacts at runtime.

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

Large generated music tracks are not required for deterministic tests.

---

## 9. Core Deterministic Checks

### 9.1 Production governance

```bash
node tools/validate-production.ts <production-dir>
```

Should report defects such as:

| Finding | Meaning |
|---|---|
| `missing-parent` | artifact lineage points at a missing parent |
| `missing-selection-source` | selected component has no resolvable draft source |
| `locked-open-contradiction` | same decision is declared locked and open |
| `approval-without-approver` | human approval is claimed without the required approver |
| `stale-final` | final artifact no longer matches its recorded source/hash |
| `invalid-promotion` | artifact lifecycle jumps without the required parent/selection state |
| `native-stem-mislabel` | separated/recovered audio is declared as native production stems |

Exit codes:

```text
0 clean
1 findings
2 usage/environment error
```

### 9.2 MIDI integrity

```bash
node skills/music-compose/scripts/inspect-midi.ts <file.mid>
```

Checks only deterministic MIDI properties. It does not judge whether the melody is good.

### 9.3 Audio integrity

```bash
node skills/music-evaluate/scripts/inspect-audio.ts <file.wav>
```

Can check:

- decodability;
- duration;
- channel layout;
- sample rate;
- clipping/peak evidence;
- configured loudness constraints;
- gross silence/dropout where the fixture declares it invalid.

### 9.4 Preservation metadata

```bash
node skills/music-evaluate/scripts/validate-preservation.ts <before.json> <after.json>
```

Checks declared locked/open and parent/selection relationships.

It cannot prove from metadata alone that the audible melody is unchanged. Semantic/audio-aware preservation tests cover that claim.

### 9.5 Edit-boundary integrity

Synthetic fixtures should verify that local extraction/reassembly does not introduce deterministic clicks, gaps, overlaps, or duration drift at the edit boundary.

---

## 10. Eval Coverage

`tools/run-evals.ts` must report:

```text
music-compose: 5 total / 4 executable / 1 manual
music-produce: 5 total / 3 executable / 2 provider-backed
music-evaluate: 5 total / 5 executable
```

The exact counts will evolve; the rule does not.

A case without an executable check is labelled `MANUAL`.

A provider-backed case that is not enabled is labelled `NOT RUN`, not `PASS`.

---

## 11. Defect Taxonomy

Cases live under:

```text
tests/benchmark/taxonomy.json
```

Every case declares:

```json
{
  "id": "...",
  "class": "preservation",
  "tier": "semantic",
  "artifacts": ["..."],
  "context": "...",
  "criteria": ["..."],
  "expectedFinding": "...",
  "owningStage": "arrangement",
  "correctiveAction": "revise-final-chorus-arrangement",
  "maximumCorrectionScope": "final-chorus"
}
```

Initial defect classes:

```text
governance
intent
composition
arrangement
performance
production
preservation
editing
technical
delivery
routing
model/execution
```

Clean controls carry equal importance.

---

## 12. Initial Deterministic Benchmark Cases

The deterministic benchmark should begin with cases that can be proved cheaply.

### Governance

- missing parent reference;
- missing selection source;
- contradictory locked/open state;
- stale final artifact;
- invalid approval metadata.

### MIDI

- invalid MIDI;
- requested transposition succeeds on a known fixture;
- unrelated timing/events remain stable after transposition where required.

### Audio technical

- clipped control is detected;
- clean control is not flagged;
- invalid duration is detected;
- silent dropout case is detected when the case declares continuous signal expected;
- edit-boundary click/gap fixture is detected;
- clean edit boundary is not flagged.

### Delivery

- required output missing;
- source-separated audio mislabeled as native stems;
- valid delivery package passes.

---

## 13. Semantic Benchmark Purpose

Deterministic checks cannot establish claims such as:

```text
approved melody audibly survived production
chorus arrangement fails to lift
vocal phrasing contradicts the brief
production refinement changed an unrelated section
the evaluator routed the defect to the correct upstream stage
```

The semantic benchmark measures those behaviours using recorded answers from an explicitly configured audio-capable Replicate reviewer.

It is **evaluation infrastructure**, not the production model itself.

The reviewer model used for a baseline must be pinned and recorded with the baseline so model drift is visible.

---

## 14. Semantic Review Passes

Each semantic case is reviewed in two passes.

### Open pass

Prompt concept:

> Describe any material problems in this artifact relative to the supplied brief, parent artifact, and approved/locked decisions. Distinguish what changed from what should have remained stable.

This measures unprompted defect discovery.

### Closed pass

The reviewer receives explicit criteria and returns for each:

```text
PASS
FAIL
NA
```

plus:

```text
owningStage
recommendedCorrection
correctionScope
```

The closed pass organises and verifies findings. It must not replace the open pass.

---

## 15. Semantic Scoring Axes

Unlike the video reference benchmark, Music Production Skills must score corrective routing because routing is a core product claim.

### 15.1 Detection

Did the reviewer identify the expected defect/criterion?

### 15.2 Precision

When detection succeeded, did the reviewer avoid unsupported additional failures?

Precision must be interpreted cautiously when a fixture has only one declared expected defect; additional findings may be real. Record that limitation rather than tuning the scorer after seeing results.

### 15.3 Routing

Did the reviewer identify the correct owning production stage?

Examples:

```text
weak chorus lift → arrangement / production, not mastering
clipping → technical finishing, not composition
melody mutation during drum edit → preservation/refinement failure
```

### 15.4 Correction scope

Did the recommended correction stay within the maximum justified unit?

Example:

```text
defect: one chorus transition
acceptable: repair transition / chorus region
not acceptable by default: regenerate entire song
```

### 15.5 Preservation

For refinement cases, did the reviewer correctly determine whether locked decisions survived?

### 15.6 Strict

A case is strict-pass only when all axes applicable to that case pass.

Report axes separately so one failure does not hide what the reviewer actually did correctly.

---

## 16. Semantic Collection

Without both `REPLICATE_API_TOKEN` and `MUSIC_BENCHMARK_REVIEWER`, semantic collection reports:

```text
NOT RUN
```

It never fabricates a score.

Before paid collection, print the number of calls:

```bash
RUN_SEMANTIC_BENCHMARK=1 node tools/run-benchmark.ts --repeat 3
```

Example:

```text
collecting 36 paid calls
(3 repeats × 2 passes × 6 uncached cases)
```

Already-recorded answers are reused unless `--refresh` is explicitly requested.

Interrupted runs resume from cached evidence.

---

## 17. Transcript Storage and Staleness

Store semantic evidence under:

```text
tests/benchmark/transcripts/
```

Each transcript identity includes at minimum:

- case ID;
- open/closed pass;
- exact context;
- exact criteria;
- prompt version;
- reviewer model and version/reference;
- artifact list;
- cryptographic hash of every referenced artifact;
- repeat number.

A transcript is stale if any of those change.

Stale evidence is refused:

```text
STALE TRANSCRIPT: preservation-drum-only: artifact hash changed
re-collect with --refresh, or restore the original artifact
```

Do not score stale evidence.

---

## 18. Re-Scoring for Free

Recorded answers can be re-scored without calling a provider:

```bash
node tools/run-benchmark.ts --rescore
node tools/run-benchmark.ts --print-prompts
```

This allows scorer bugs to be corrected transparently without paying to recreate unchanged evidence.

Changing the scorer does not justify changing prompts/cases in the same measurement pass. Measure one change at a time where practical.

---

## 19. Repeats, Baselines, Regressions, and Flakes

Semantic behaviour is non-deterministic.

Use majority verdict across repeats.

Ties fail to demonstrate the capability.

Report the observed rate, for example:

```text
routing: PASS 3/3
preservation: PASS 2/3 FLAKY
strict: PASS 2/3 FLAKY
```

Definitions:

- **REGRESSION** — a previously passing case now fails every repeat under the same benchmark identity and comparable baseline conditions;
- **FLAKY** — at least one repeat still passes and at least one fails;
- **NEW FAILURE** — no comparable prior baseline exists;
- **NOT RUN** — evidence was not collected;
- **STALE** — previous evidence no longer corresponds to the current question/artifacts.

A `FLAKY` case is visible but should not be treated like a deterministic regression gate.

---

## 20. Baseline Policy

Update a semantic baseline only deliberately:

```bash
RUN_SEMANTIC_BENCHMARK=1 \
  node tools/run-benchmark.ts --repeat 3 --update-baseline
```

A normal passing run never rewrites the baseline.

The baseline records:

- date;
- repository revision;
- reviewer model;
- repeat count;
- case/prompt identities;
- per-axis results;
- total paid calls;
- known blind spots.

### Initial status

At specification generation time:

```text
semantic baseline: UNMEASURED
```

Do not invent scores before real fixtures and paid collection exist.

---

## 21. Initial Semantic Benchmark Cases

These cases should be created only when representative audio/MIDI artifacts exist.

### Clean control

A production that satisfies the brief and locked decisions.

Expected:

```text
no material defect invented
```

### Preservation — drum-only refinement

Context:

```text
LOCKED: melody, lyrics, structure
OPEN: drum production
```

Seed a result where the drum change succeeds but the melody also changes.

Expected:

```text
detect preservation failure
owningStage: refinement / production
correctionScope: affected region, not full composition
```

### Arrangement — weak final chorus lift

The final chorus contradicts the approved arrangement's intended energy increase.

Expected:

```text
detect arrangement/production issue
route upstream from mastering
recommend final-chorus correction
```

### Editing — bad local repair boundary

A repaired phrase/section has an audible discontinuity at its boundary.

Expected:

```text
detect local edit defect
route to editing/refinement
scope to boundary/region
```

### Intent — technically clean but wrong brief

A valid audio file contradicts the intended emotional direction.

Expected:

```text
detect intent mismatch
avoid calling it a technical failure
```

### Routing control — clipping

A deliberately clipped final artifact.

Expected:

```text
route to technical finishing / delivery
not composition or arrangement
```

---

## 22. Production-Lint Cases

`tools/validate-production.ts` should enforce governance independent of semantic review.

Examples:

- locked artifact without required approval metadata;
- refinement claims preservation but has no parent artifact;
- final production no longer matches recorded source hash;
- delivery package references missing files;
- stems declared `native` but provenance says `source_separation`;
- component selection references a missing draft;
- final artifact has no path back to the original brief.

These are cheap checks and should run before provider-backed evaluation.

---

## 23. Failure Triage

| Symptom | Owning layer | Likely cause | Action |
|---|---|---|---|
| TypeScript fails | repository | invalid code/types | fix repository tooling |
| preflight fails | environment | missing required dependency | install/fix dependency; do not substitute silently |
| MIDI parse fails | deterministic | corrupt/unsupported file | repair input or reject |
| clipping detected | technical | production/finishing defect | repair technical stage |
| edit-boundary click | editing/refinement | bad local assembly | repair boundary/region |
| locked metadata changed | governance/preservation | invalid refinement lineage | restore/reopen explicitly |
| semantic melody drift | preservation | model/refinement changed locked material | repair smallest region or change edit strategy/model |
| chorus lacks approved lift | arrangement/production | upstream musical decision not realised | revise owning artifact/stage |
| semantic reviewer finds defect but routes to mastering | evaluation routing | diagnosis failure | improve/evaluate failure-routing behaviour, not music prompt |
| provider generation fails transiently | model execution | prediction/network issue | bounded retry |
| selected model lacks edit capability | routing | capability mismatch | rediscover compatible Replicate model |
| native stems requested but unavailable | capability | workflow lacks true stems | report limitation; do not mislabel separation |
| eval coverage drops | eval harness | executable check lost | restore check or accept/report manual coverage |

Work diagnosis in order. Do not default to model escalation because it is the easiest action.

---

## 24. Adding Coverage

When a defect reaches a deliverable:

1. **Name the defect class.**
2. **Identify the cheapest layer that could have caught it.**
3. **Add a synthetic fixture** when the defect can be represented deterministically.
4. Otherwise add a read-only real artifact fixture and skip loudly if unavailable.
5. **Add a clean control.**
6. **Add a stage test** for deterministic behaviour where applicable.
7. **Add an eval case** with `expect` and `forbid`.
8. **Wire an executable check** where the behaviour can be falsified deterministically.
9. If semantic judgement is required, add the case to the benchmark taxonomy.
10. Collect repeated semantic answers once and commit transcripts before the case counts as measured.
11. Run `npm test`.

Do not rewrite a benchmark question until it passes. A changed question is a new measurement and invalidates old transcripts.

---

## 25. Benchmark Reporting

A benchmark report should clearly separate:

```text
deterministic results
semantic open detection
semantic closed detection
semantic precision
routing
correction scope
preservation
strict
variance / flakiness
cost
known blind spots
```

Never report one aggregate quality score that hides which capability failed.

---

## 26. Known Blind Spots to Record

The initial benchmark is expected to have blind spots. Record them rather than hiding them.

Likely examples:

- semantic reviewers may judge subjective genre/style fit inconsistently;
- musical quality criteria may not transfer cleanly across instrumental, vocal, electronic, and orchestral material;
- a reviewer may detect a problem but route it to the wrong stage;
- exact melody preservation may be difficult to judge from complex mixed audio without symbolic references;
- precision scoring may penalise additional correct findings when fixtures declare only one expected defect;
- model updates may change reviewer behaviour even when prompts remain stable;
- synthetic technical audio does not represent every real generative artefact;
- deterministic loudness/peak checks do not establish creative mix quality.

A known blind spot is not permission to report unsupported confidence.

---

## 27. CI Policy

Normal CI runs only free/deterministic layers plus re-scoring of already committed semantic transcripts.

Minimum:

```text
typecheck
validate
unit
stage tests
structural evals
deterministic benchmark
semantic transcript re-score
skill discovery/install smoke
```

Provider-backed generation evals and semantic collection run separately when intentionally requested.

CI must fail if:

- a required deterministic check fails;
- a transcript that is expected to be scoreable is stale;
- repository validation fails;
- a required skill cannot be installed independently.

CI must not fail merely because optional paid semantic collection was not requested.

---

## 28. Testing Acceptance Criteria

The testing system is correctly designed when:

1. deterministic and semantic tests are visibly separated;
2. every layer states what it cannot prove;
3. missing required checks never appear as passing;
4. executable eval coverage is reported;
5. synthetic fixtures cover cheap structural/technical defect classes;
6. clean controls exist for detectors and benchmark classes;
7. artifact hashes prevent semantic transcripts from silently surviving changed media;
8. paid answers can be re-scored offline;
9. semantic results use repeated samples and report variance;
10. baselines change only deliberately;
11. detection, precision, routing, correction scope, and preservation are separate semantic axes;
12. targeted-refinement behaviour is benchmarked, not merely documented;
13. preservation of locked musical decisions is benchmarked, not merely documented;
14. benchmark prompts/cases cannot be silently tuned while retaining old evidence;
15. no fabricated benchmark score appears before real measurement;
16. every real shipped defect is considered for the cheapest appropriate regression layer;
17. skill installation and repository validation are included alongside production-behaviour tests.

---

## 29. Related Documents

- `docs/01-creative-skills-system-spec.md` — project scope, execution architecture, system acceptance.
- `docs/02-creative-skills-workflows-and-artifacts-spec.md` — artifact lifecycle, failure taxonomy, targeted refinement.
- `docs/03-creative-skills-repository-and-contracts-spec.md` — skill eval requirements, scripts, packaging, technical acceptance.

---

**Music Production Skills — Testing and Benchmark Specification v2**
