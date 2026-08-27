# Prompt — Upgrade Music Production Skills Benchmark to Narrative Production Skills Standards

Update the `music-production-skills` repository so its testing and benchmark system follows the same architectural and operational standards as the current `narrative-production-skills` benchmark.

Do **not** copy Narrative terminology or case counts mechanically. Reuse the benchmark architecture, quality discipline, case lifecycle, command/component testing model, evidence rules, release tiers, and offline scoring approach, then adapt them to Music Production Skills.

The existing Music benchmark contains useful domain-specific work. Preserve and integrate it rather than replacing it with a generic benchmark.

## Goal

Turn the Music benchmark into a first-class product-quality system that can answer four different questions independently:

```text
command correctness
→ does one bounded production operation obey its contract?

skill orchestration
→ does the owning skill choose and sequence the right commands?

production correctness
→ does the workflow preserve approved work, use the right scope, respect boundaries and deliver valid artifacts?

music quality
→ is the resulting music actually production-ready for the requested brief and production grammar?
```

The benchmark must make failures diagnosable at the lowest useful layer:

```text
command
→ skill orchestration
→ cross-skill production contract
→ end-to-end generated music quality
```

Do not allow a strong final track to hide a preservation, routing, command-selection, pack, or delivery regression.

---

## 1. Study the Current Repository Before Editing

Read the current normative documents and implementation first:

```text
docs/01-creative-skills-system-spec.md
docs/02-creative-skills-workflows-and-artifacts-spec.md
docs/03-creative-skills-repository-and-contracts-spec.md
docs/04-testing-and-benchmark-spec.md
docs/05-customisation-packs-spec.md
docs/06-extension-pack-catalogue.md
docs/extraction-candidates.md
```

Inspect:

```text
skills/
examples/
tests/benchmark/
tests/stages/
evals/
tools/benchmark.ts
tools/run-benchmark.ts
package.json
```

Also inspect all command contracts if they have already been implemented under:

```text
skills/<skill>/commands/
```

If command contracts are specified but not yet implemented, do **not** invent benchmark-only command semantics. Build the harness so missing command contracts and missing command evals are reported explicitly as coverage gaps or blocked work.

The installed production skills remain:

```text
music-compose
music-produce
music-evaluate
```

The optional authoring/support skill remains:

```text
music-pack-author
```

Do not create more installable skills merely for benchmarking.

---

## 2. Preserve Music-Specific Strengths

The migration must retain the useful capabilities already present in the Music benchmark:

```text
15 public progressive examples
5 levels × 3 genre/use-context examples

5 initial extension-pack grammars

audio technical QC
MIDI / symbolic deterministic checks
delivery-duration checks
native-stem semantics
preservation / locked-decision checks
targeted-refinement checks
pack-specific music rubrics
artifact SHA-256 evidence identity
semantic transcript staleness detection
3-repeat semantic measurement
PASS / FAIL / FLAKY / NOT_RUN semantics
UNMEASURED initial baseline
cost-aware release profiles
```

Do not simplify Music down to Narrative's five production examples.

Instead distinguish:

```text
canonical release production set
→ one representative example per level

broad production regression pool
→ all 15 public examples
```

The benchmark should advertise and measure the same examples the README advertises.

---

## 3. Adopt the Narrative-Standard Quality Model

Update `docs/04-testing-and-benchmark-spec.md` so Music quality is reported on separate visible surfaces.

Use this model:

```text
1. Command correctness
   one bounded command obeys inputs, outputs, invariants,
   forbidden behaviour, failure semantics and preservation rules

2. Skill orchestration
   the skill selects and sequences commands correctly,
   without replaying unnecessary work

3. Production correctness
   lifecycle, selection, approval/locking, lineage,
   preservation, smallest-unit refinement, boundaries,
   provider/tool discipline and delivery semantics

4. Music quality
   intent fit, composition, arrangement, performance,
   production, mix/finish appropriateness and musical coherence

5. Extension-pack fidelity
   format, use context, genre, production language,
   performance/vocal profile where relevant,
   pack-aware evaluation and downstream handoff

6. Pack-authoring quality
   necessity, production-grammar justification,
   operational specificity, packaging, showcase,
   evals, boundaries and catalogue integration
```

Never collapse these surfaces into one aggregate "music quality" score.

---

## 4. Replace the Old Benchmark Layout with a Narrative-Style Layout

Migrate the benchmark to one canonical structure:

```text
benchmarks/
├── README.md
├── manifest.json
├── rubrics/
│   ├── diagnostic.json
│   ├── music-quality.json
│   ├── pack-adherence.json
│   └── pack-authoring.json
├── cases/
│   ├── diagnostic/
│   ├── production/
│   ├── packs/
│   └── pack-authoring/
└── fixtures/
    ├── scorer-pass.json
    └── scorer-fail.json

skills/<skill>/
├── commands/
└── evals/
    └── commands/

tools/
├── run-benchmark.ts
└── run-command-evals.ts
```

Do not leave a second competing benchmark definition under:

```text
tests/benchmark/
```

Migrate useful Music-specific data from:

```text
taxonomy.json
rubrics.json
example-matrix.json
profiles.json
baseline.json
```

into the new structure.

Keep deterministic benchmark tests under the normal test tree where appropriate, but benchmark **definitions** must have one canonical source of truth.

Do not create committed result directories or measured baseline directories until real evidence exists.

---

## 5. Benchmark Suites

Create four release benchmark suites analogous to Narrative.

### 5.1 `diagnostic`

Create a deliberately small diagnostic suite with isolated seeded failures and clean controls.

At minimum cover:

```text
clean control

locked melody changed during drum repair
locked lyric changed during production refinement
selected material silently treated as approved/locked

local defect receives whole-track regeneration recommendation
arrangement defect misrouted to mastering
technical clipping misrouted to composition
edit-boundary defect misrouted upstream incorrectly

native stems requested but only source separation exists
pack-intentional trait incorrectly classified as defect
real pack violation incorrectly excused as intentional style

provider/model capability mismatch
delivery duration / format failure
```

Do not simply maximise the number of diagnostic cases.

Choose the smallest deliberate set that covers distinct defect classes and include non-defective controls.

Each diagnostic case must be able to measure separately:

```text
detection
evidence
routing
correction scope
preservation
boundary compliance
precision
```

A correct defect detection with the wrong owning stage or an unnecessarily broad correction is not a strict pass.

### 5.2 `production`

Define one canonical release case for each of the five public progression levels.

Use the real prompt from the corresponding example `README.md`.

The case runner must extract the fenced `## Prompt` block from the example rather than duplicating the prompt in benchmark JSON.

The five canonical cases should cover:

```text
Level 1 — Controlled Output
Level 2 — Selection & Preservation
Level 3 — Full Production
Level 4 — Repair Workflow
Level 5 — Cross-Domain Production
```

The broader 15-example set remains available through the full-production profile.

### 5.3 `packs`

Every current extension-pack showcase must have one benchmark case:

```text
intimate-singer-songwriter-single
melodic-techno-club-track
cinematic-hybrid-score
adaptive-game-score
premium-brand-music
```

The pack case must use the actual showcase README prompt.

A pack case must measure operational pack effects, not genre-label similarity.

### 5.4 `pack-authoring`

Create a small pack-authoring suite covering `music-pack-author`.

At minimum cover:

```text
adapt existing pack instead of creating a redundant genre-only pack

justify a genuinely new production grammar

translate labels into operational production rules

create a valid showcase with a complete generation prompt

reject creator-name-only imitation / provider-boundary violation
```

Structural package validity and creative usefulness must remain separate.

---

## 6. Command Conformance Matrix

Follow Narrative's model: command-level evals are **not** counted as release benchmark cases.

They are a separate component matrix derived from installed skill contracts.

For every implemented command require, at minimum:

```text
1 normal case
+
1 meaningful boundary / misuse case
```

Do not create hundreds of unnecessary permutations.

Implement:

```bash
npm run test:commands
```

This must validate deterministically:

```text
every declared command file is structurally valid
every command belongs to an owning skill
every command has minimum required eval coverage
case IDs are unique
fixtures exist
expected behaviour is present
forbidden behaviour is present
command fingerprints are stable
zero-case commands are reported as coverage gaps
```

Implement:

```text
tools/run-command-evals.ts
```

Required capabilities:

```bash
node dist/tools/run-command-evals.js --list
node dist/tools/run-command-evals.js --list --skill music-produce
node dist/tools/run-command-evals.js --command <actual-command-id>
node dist/tools/run-command-evals.js --score path/to/result.json
```

Use the actual command IDs defined by the Music specs/repository rather than inventing benchmark-only aliases.

Preparing one command case must expose:

```text
skill
command
case ID
command contract
prompt / fixture
expected behaviour
forbidden behaviour
case fingerprint
```

Semantic execution remains provider-neutral:

```text
prepare case
→ run through installed skill / host agent
→ retain structured result
→ score offline
```

Do not embed a new LLM/provider runtime merely for command testing.

---

## 7. Skill-Orchestration Tests

Command correctness does not prove that a skill chooses the correct command.

Retain or add skill-level evals that specifically test orchestration.

Examples:

```text
music-compose
→ chooses cheap symbolic drafting before expensive audio when sufficient

music-produce
→ chooses local refinement instead of final production for a local repair

music-evaluate
→ routes an arrangement defect upstream rather than to mastering

music-pack-author
→ performs pack-need assessment before authoring when overlap is plausible
```

Report command correctness separately from skill orchestration.

---

## 8. Testing Layers and Layer Limits

Document and implement the same discipline as Narrative.

The benchmark specification must distinguish:

```text
typecheck
repository validation
unit tests
stage tests
command-definition validation
command semantic eval
skill orchestration eval
benchmark-definition validation
install smoke
diagnostic semantic
production semantic
pack semantic
pack-authoring semantic
audio technical QC
```

For every layer explicitly state what it cannot prove.

Examples:

```text
repository validation
→ proves packaging, not music quality

audio QC
→ proves signal/delivery properties, not musical quality

command semantic eval
→ proves one operation, not correct command selection

skill orchestration
→ proves routing/sequencing, not end-to-end music quality

production semantic
→ measures creative output but cannot override hard preservation failures
```

No layer may claim coverage for a failure it cannot observe.

---

## 9. Music Quality Scoring

Keep the anchored four-level scale:

```text
0 = unacceptable / contradicts requirement
1 = materially weak / not production-ready
2 = acceptable production quality
3 = strong, deliberate execution
```

You may retain the human-readable labels:

```text
unacceptable
weak
acceptable
strong
```

A production repeat is ready only when:

```text
no hard-gate failure
+
every required rubric dimension >= acceptable
```

Do not sum dimensions into an authoritative total score.

General music-quality dimensions may include:

```text
instruction adherence
intent fit
composition
arrangement
performance
production
mix / finish appropriateness
preservation
technical integrity
delivery correctness
```

Only apply dimensions relevant to the case.

---

## 10. Pack-Specific Rubrics

Preserve distinct rubrics for the five pack grammars.

### `intimate-singer-songwriter-single`

```text
song coherence
lyric prosody
vocal intimacy
arrangement restraint
dynamic authenticity
```

### `melodic-techno-club-track`

```text
groove stability
kick/bass relationship
long-form energy
transition function
club structure
```

### `cinematic-hybrid-score`

```text
dramatic function
sync accuracy
dialogue space
cue development
handoff readiness
```

### `adaptive-game-score`

```text
loop seamlessness
layer compatibility
state contrast
transition function
runtime handoff readiness
```

### `premium-brand-music`

```text
brand fit
mnemonic distinctiveness
identity preservation
exact-duration variants
short-form impact
```

Pack-specific hard constraints must be allowed to fail a track that sounds strong in isolation.

---

## 11. Public Example Coverage

Preserve all 15 public examples as the broad regression pool.

The benchmark must validate:

```text
5 levels
×
3 examples with materially different genre/use context
=
15 examples
```

The benchmark validator must fail if:

```text
a public example loses its ## Prompt
a public example disappears from the benchmark manifest
a new public example is added without benchmark registration
an example prompt changes without changing the case fingerprint
```

Do not require generation of all 15 on every commit.

---

## 12. Release Tiers

Use explicit release tiers following Narrative's discipline.

### `ci`

```text
typecheck
repository validation
unit/stage tests
command-definition validation
benchmark-definition validation
audio deterministic checks
re-score of existing evidence
```

No paid generation.

### `core-release`

```text
diagnostic suite
+
5 canonical production cases
+
relevant command conformance when core commands changed
```

### `catalogue-release`

```text
all 5 pack showcases
+
pack-authoring suite
+
relevant command conformance when pack consumption/authoring changed
```

### `full-production`

```text
all 15 progressive examples
+
all 5 pack showcases
+
diagnostic suite
+
pack-authoring suite
```

A targeted case or targeted pack may run during development.

Do not make the full production suite a per-commit requirement.

---

## 13. Benchmark Runner

Implement:

```text
tools/run-benchmark.ts
```

Required CLI behaviour:

```bash
npm run benchmark:list

npm run build
node dist/tools/run-benchmark.js --case <case-id>

node dist/tools/run-benchmark.js --score path/to/result.json

node dist/tools/run-benchmark.js --rescore path/to/result.json
```

Case preparation must include:

```text
case ID
suite
case fingerprint
source prompt
measurement contract
hard gates
rubric dimensions
expected artifact inputs/outputs where relevant
```

Do not execute paid music generation inside the benchmark runner.

Semantic/provider execution protocol:

```text
prepare benchmark case
→ install/run requested skills in a clean consumer project
→ generate/retain artifacts
→ perform structured review
→ retain review evidence
→ score offline
```

---

## 14. Evidence Identity and Staleness

Keep and strengthen Music's existing evidence-hashing behaviour.

A semantic measurement fingerprint must bind at least:

```text
case definition
source prompt text
rubric definition
hard gates
reviewer identity
review pass
repeat number
artifact path(s)
artifact SHA-256 hash(es)
relevant command/skill contract fingerprint where applicable
```

If any meaningful input changes, old evidence becomes stale.

Do not silently reuse stale transcripts.

Support:

```text
PASS
FAIL
FLAKY
NOT_RUN
BLOCKED
```

Default semantic baseline target:

```text
3 repeats
```

One run is evidence, not a baseline.

---

## 15. Baseline Policy

The initial baseline remains:

```text
UNMEASURED
```

Do not fabricate quality results.

The first measured baseline may be written only after:

```text
benchmark definitions reviewed
+
canonical cases executed
+
real generated artifacts retained
+
clean controls present
+
semantic reviews collected with repeats
+
reviewer identity recorded
+
artifact hashes recorded
```

Coverage counts are not quality results.

Clearly separate:

```text
definition coverage
measured cases
blocked cases
quality baseline
```

---

## 16. Clean Controls

Every detector/failure class must have a clean or valid comparison somewhere in the suite.

Required examples include:

```text
clean preservation control
valid local refinement
correct arrangement routing
clean technical audio
valid native-stem declaration
pack-compliant production
valid exact-duration variant
valid new pack
existing-pack variation that should be adapted
```

Without controls, high detection can simply measure eagerness to criticise.

---

## 17. Deterministic Audio / Technical Coverage

Do not lose Music's technical benchmark depth.

Retain deterministic tests for relevant properties such as:

```text
duration
sample rate
channel count
format/container
peak/clipping checks
edit-boundary mechanics
MIDI validity
selection/lineage metadata
preservation metadata
delivery manifest correctness
native stems vs separated estimates
runtime/adaptive delivery metadata where deterministic
```

Use synthetic fixtures where possible.

Do not claim these tests establish creative mix/master quality.

---

## 18. Benchmark Definition Validation

`npm run test:benchmark` must validate at minimum:

```text
manifest schema
case schema
rubric references
unique case IDs
suite membership
prompt source existence
## Prompt extraction
pack showcase coverage
15-example coverage
canonical 5-level production coverage
pack-authoring coverage
clean-control presence
hard-gate definitions
case fingerprint stability
fixture references
no fabricated measured baseline
no stale result acceptance
```

If a new extension pack is added without a pack case, validation must fail.

If a new public example is added without benchmark registration, validation must fail.

---

## 19. Documentation

Create:

```text
benchmarks/README.md
```

It must be an operating guide, not a design essay.

Include:

```text
what each suite measures
which release tier to run
how to list cases
how to prepare one case
how to execute semantic cases
how to score recorded results
how to run command evals
how fingerprints work
how to add a regression case
how to add a new pack case
how to add a new public example
what remains UNMEASURED
```

Update the root README only enough to expose benchmark commands and the quality philosophy.

---

## 20. Package Scripts

Add or normalise scripts similar to:

```json
{
  "build": "...",
  "validate": "...",
  "test:commands": "...",
  "test:benchmark": "...",
  "test:all": "...",
  "benchmark:list": "..."
}
```

Do not blindly copy Narrative's build tooling if Music currently uses a different TypeScript execution approach.

Use the simplest reliable implementation compatible with the existing repository.

---

## 21. Migration Rules

This is a migration, not a parallel implementation.

Do not leave both:

```text
tests/benchmark/taxonomy.json
```

and:

```text
benchmarks/manifest.json
```

as competing definitions.

Migrate useful data and delete obsolete duplicate sources.

Do not delete Music-specific deterministic stage tests merely because Narrative organises its semantic benchmark differently.

Preserve:

```text
tests/unit/
tests/stages/
tests/fixtures/
```

where they remain the correct home for deterministic behaviour.

Only benchmark-definition material moves to the new benchmark contract.

---

## 22. Prior Art and Blind Spots

Retain explicit sections in `docs/04-testing-and-benchmark-spec.md` for:

```text
known blind spots
prior art / design rationale
measured results
```

Do not over-engineer future stress tests before the core benchmark is measured.

Initial blind spots should include, where still true:

```text
human preference across genres/traditions
reviewer bias
mix/master aesthetic judgement
vocal-performance nuance
long-form musical coherence
reference similarity / originality judgement
multilingual lyrics
complex stem-level preservation
real DAW session correctness
downstream video/game runtime quality after handoff
model/provider updates changing output distribution
command-level semantic stability across different host agents
```

Do not introduce multi-agent juries, vector databases, graph databases, or dedicated model routers merely to make the benchmark appear sophisticated.

---

## 23. Acceptance Criteria

The benchmark upgrade is complete when:

```text
✓ one canonical benchmarks/ source of truth exists
✓ obsolete parallel benchmark definitions are removed
✓ benchmark suites are explicitly diagnostic / production / packs / pack-authoring
✓ command conformance is a separate component matrix
✓ every implemented command has at least one normal and one boundary case
✓ zero-case commands are reported as gaps
✓ command correctness and skill orchestration are separate measurements
✓ benchmark definitions validate deterministically
✓ every canonical production level has a release case
✓ all 15 public examples remain registered as the broad regression pool
✓ every current extension-pack showcase has benchmark coverage
✓ pack authoring has necessity / normal / boundary coverage
✓ diagnostic cases include clean controls
✓ diagnostic scoring separates detection / evidence / routing / scope / preservation / boundary / precision
✓ music quality uses anchored dimensions rather than one aggregate score
✓ pack-specific music rubrics remain distinct
✓ hard production invariants can fail a musically strong output
✓ deterministic audio QC remains separate from creative judgement
✓ semantic repeats and flakiness remain visible
✓ case/result fingerprints reject stale evidence
✓ recorded semantic results can be scored offline
✓ benchmark runner does not embed paid provider execution
✓ no fabricated quality baseline is published
✓ README/runbook explains how to run and extend the benchmark
✓ existing repository tests remain green
```

---

## 24. Required Validation Before Finishing

Run the actual repository checks.

At minimum:

```bash
npm install
npm run check
npm run validate
npm run test:commands
npm run test:benchmark
npm run test:all
```

If the repository intentionally blocks installation smoke until Stage 13, preserve that semantics and report it as `BLOCKED`, not failed and not passed.

Also run:

```bash
npm run benchmark:list
```

and show the resulting suite counts.

Run the command coverage listing and show:

```text
covered commands
uncovered commands
minimum-case violations
```

Do not claim semantic or generated-music quality has passed unless real cases were executed and measured.

---

## 25. Deliverables

Return:

```text
1. updated repository source
2. updated docs/04-testing-and-benchmark-spec.md
3. new benchmarks/README.md
4. new benchmarks/manifest.json
5. benchmark rubrics
6. benchmark case definitions
7. run-benchmark.ts
8. run-command-evals.ts
9. package-script updates
10. deterministic validation/tests
11. migration/removal of obsolete benchmark definitions
12. concise benchmark coverage report
13. explicit remaining UNMEASURED / BLOCKED items
```

Do not stop after updating the specification. Implement the benchmark system and run its deterministic validation.

---

## Final Principle

The benchmark should make this diagnosis possible:

```text
"The music benchmark got worse"
```

must be reducible to something like:

```text
music-produce / refine-region violated preservation
```

or:

```text
music-produce chose final production instead of local refinement
```

or:

```text
workflow passed, but melodic-techno pack failed long-form energy
```

or:

```text
production was musically strong but failed exact-duration delivery
```

That diagnostic precision is the standard to match from Narrative Production Skills.
