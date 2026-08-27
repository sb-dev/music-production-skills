# Implementation Prompt — Generate the Music Extension Pack Catalogue

Implement the Music Production extension-pack catalogue as a **real repository catalogue**, generated from the current Music Customisation Packs and Extension Pack Catalogue specifications.

The catalogue must become a first-class repository surface rather than remaining only as prose inside `docs/`.

## Goal

Materialise every currently approved Music Production extension pack as:

```text
catalogue entry
+
showcase production
+
copy-ready generation prompt
+
installable Agent Skill package
+
behavioural eval coverage
+
benchmark coverage
```

Keep the concerns separate:

```text
extension-packs/
→ human discovery
→ catalogue metadata
→ showcase production
→ authoritative generation prompt

skills/<pack>/
→ installable Agent Skill implementation

benchmarks/
→ quality measurement of the catalogue

music-pack-author
→ authoring new catalogue entries and pack packages
```

Naming rule:

```text
Concept / product name
→ Extension Pack Catalogue

Repository folder
→ extension-packs/
```

Do not use `catalogue/` as the repository folder name.

Do not turn the catalogue into a marketplace, pack-composition framework, genre ontology, or provider-routing layer.

---

# Start by inspecting the repository

Before changing anything:

1. inspect `README.md`;
2. inspect:
   - `docs/01-creative-skills-system-spec.md`
   - `docs/02-creative-skills-workflows-and-artifacts-spec.md`
   - `docs/03-creative-skills-repository-and-contracts-spec.md`
   - `docs/04-testing-and-benchmark-spec.md`;
3. inspect the current Music Customisation Packs specification;
4. inspect the current Music Extension Pack Catalogue specification;
5. inspect `music-pack-author`;
6. inspect all existing `skills/*`;
7. inspect all existing progressive examples and current extension-pack showcase material;
8. inspect `benchmarks/manifest.json` if benchmark standardisation has already been implemented;
9. otherwise inspect the current benchmark implementation and preserve its existing pack-coverage contract during migration;
10. inspect repository validation and install-smoke tooling;
11. inspect command contracts under `skills/<skill>/commands/` if command decomposition has already been implemented;
12. run the current deterministic repository checks before editing.

Record the pre-change result.

Use the repository's **current catalogue specification** as the source of truth.

Do not hard-code a pack count from this prompt if the specification has changed.

The currently expected initial set is:

```text
intimate-singer-songwriter-single
melodic-techno-club-track
cinematic-hybrid-score
adaptive-game-score
premium-brand-music
```

but the implementation must derive the authoritative pack list from the current repository specification.

---

# 1. Repository Structure

Create a first-class extension-pack surface:

```text
extension-packs/
├── README.md
├── manifest.json
│
├── intimate-singer-songwriter-single/
│   └── README.md
├── melodic-techno-club-track/
│   └── README.md
├── cinematic-hybrid-score/
│   └── README.md
├── adaptive-game-score/
│   └── README.md
├── premium-brand-music/
│   └── README.md
└── ...
```

The exact pack directories must be derived from the current Extension Pack Catalogue specification.

Keep the actual installable Agent Skills under the standard skill surface:

```text
skills/
├── music-compose/
├── music-produce/
├── music-evaluate/
├── music-pack-author/
├── intimate-singer-songwriter-single/
├── melodic-techno-club-track/
├── cinematic-hybrid-score/
├── adaptive-game-score/
├── premium-brand-music/
└── ...
```

Do **not** move installable skills under:

```text
extension-packs/<pack>/skills/
```

or:

```text
extension-packs/skills/
```

The `extension-packs/` folder is the discovery/showcase surface for the Extension Pack Catalogue.

The `skills/` directory remains the Agent Skills distribution surface.

---

# 2. Catalogue Manifest

Create:

```text
extension-packs/manifest.json
```

It is the machine-readable authority for the implemented Extension Pack Catalogue.

For each pack include only useful fields such as:

```text
slug
name
format
useContext
genre
productionLanguage
performanceProfile
audience
skillPath
cataloguePath
benchmarkCase
status
```

Use optional fields where appropriate.

A `family` or grouping field may be used only if the current Music catalogue specification has a meaningful stable grouping.

Do not invent speculative marketplace metadata such as:

```text
ranking
downloads
price
rating
featuredScore
publisherReputation
popularity
modelScore
```

unless a real future distribution system requires them.

The manifest must be validated against the actual catalogue directories, installable skills, and benchmark definitions.

---

# 3. Catalogue Grouping

Do **not** copy Video Production's visual-style family taxonomy.

Music catalogue grouping should reflect the production differences that justify the packs.

Prefer grouping by meaningful format/use-context or production grammar, for example:

```text
Songs / Artist Releases
→ intimate-singer-songwriter-single

Electronic / Club
→ melodic-techno-club-track

Film / Media Scoring
→ cinematic-hybrid-score

Interactive / Game Music
→ adaptive-game-score

Brand / Advertising Music
→ premium-brand-music
```

Use the current specification if its grouping differs.

Do not invent artificial families merely to balance the number of packs.

Genre alone is not sufficient grouping logic.

---

# 4. Catalogue Entry Contract

Every:

```text
extension-packs/<pack-slug>/README.md
```

must contain a concise, consistent catalogue entry.

Required structure:

```markdown
# <Pack Name>

**Pack:** `<pack-slug>`

<one short paragraph explaining the production identity and use context>

## Production profile

**Format:** ...
**Use context:** ...
**Genre:** ...
**Production language:** ...
**Performance / vocal profile:** ...
**Audience:** ...

## What this pack changes

- ...
- ...
- ...

## Showcase

### <Showcase title>

<short production concept>

## Prompt

```text
<exact copy-ready generation prompt>
```

## Expected production traits

- ...
- ...

## Evaluation focus

- ...
- ...

## Install

```bash
npx skills add <actual-repository> \
  --skill <pack-slug> \
  --agent claude-code
```
```

Use only profile fields relevant to the pack.

For example, an instrumental game-score pack does not need an invented vocal profile.

Use the repository's actual verified identity.

Do not invent or guess repository URLs.

If repository identity cannot be established from the working repository, use the project's established placeholder convention such as:

```text
<org>/music-production-skills
```

rather than inserting an unrelated repository.

---

# 5. Authoritative Showcase Prompt

The extension-pack catalogue entry is the authoritative showcase for an extension pack.

Use:

```text
extension-packs/<pack>/README.md
```

as the single source of truth for that pack's showcase prompt.

Do not maintain an identical duplicate prompt under:

```text
examples/packs/<pack>/README.md
examples/extension-packs/<pack>/README.md
```

unless the existing example contains materially different production evidence that justifies retaining it.

If current Music extension-pack examples duplicate the same showcase:

```text
migrate useful content into extension-packs/<pack>/README.md
→ update references
→ update benchmark promptSource
→ remove the duplicate only when safe
```

The 15 progressive core Music Production examples remain under `examples/`.

Extension-pack showcases belong under `extension-packs/`.

Do not move the main progressive example curriculum into `extension-packs/`.

---

# 6. Generation Prompt Standard

Every pack must contain an exact fenced `## Prompt` block.

The prompt must be directly usable.

It should:

```text
name the relevant Music Production skill workflow
name the extension pack
state the intended musical production
state duration / format / delivery constraints where relevant
state the defining pack-specific production challenge
state what must be preserved
request evaluation / QC where appropriate
request the production workflow rather than a raw provider call
```

Preferred pattern:

```text
Use Music Production Skills with the <pack-slug> extension pack to produce ...

Requirements:
- ...

Workflow:
- ...

Preserve:
- ...

What to optimise for:
- ...
```

The prompt may name the specific core skills when useful:

```text
music-compose
music-produce
music-evaluate
```

but should normally describe the intended end-to-end production rather than forcing users to micromanage every command.

Do not make prompts generic.

Bad:

```text
Make a good techno track.
```

Better:

```text
Use Music Production Skills with the melodic-techno-club-track extension pack
to create a long-form melodic techno track with a stable club groove,
controlled energy development, functional transitions, and a DJ-friendly
intro/outro. Preserve the selected melodic identity while refining only the
section that fails evaluation.
```

The showcase prompt must be strong enough to expose both:

```text
pack adherence
+
pack-specific failure modes
```

---

# 7. Preserve the Current Showcase Concepts

If the current Music Extension Pack Catalogue specification still defines the initial showcases, preserve their identity and prompt intent.

Expected current showcase concepts include:

```text
intimate-singer-songwriter-single
→ Kitchen Light

melodic-techno-club-track
→ Glass Meridian

cinematic-hybrid-score
→ Blackout Protocol

adaptive-game-score
→ Frozen Relay

premium-brand-music
→ Aperture One
```

Do not silently rename or replace these if they remain authoritative in the current specification.

If the specification has changed, follow the current specification instead.

Do not fabricate:

```text
generated audio
production results
model provenance
costs
evaluation outcomes
What happened sections
```

until real production evidence exists.

---

# 8. Pack Skill Package

For every catalogue pack, create or validate:

```text
skills/<pack-slug>/
├── SKILL.md
├── references/
│   └── production-profile.md
└── evals/
    └── evals.json
```

Create additional files only when useful.

Possible optional references include:

```text
composition-language.md
arrangement.md
production-language.md
performance-vocals.md
mix-delivery.md
scoring-handoff.md
adaptive-delivery.md
brand-identity.md
```

Do not create these for symmetry.

A simple coherent pack is better than a directory full of empty decomposition.

Every installable pack must remain self-contained.

Repository-level catalogue files are not runtime dependencies.

---

# 9. Pack `SKILL.md`

Each pack `SKILL.md` must define:

```text
pack identity
activation / intended use
format
use context
genre guidance
production language
audience where relevant
performance / vocal profile where relevant
composition behaviour
arrangement behaviour
production behaviour
delivery behaviour
must-preserve traits
intentional traits evaluation must tolerate
genuine failure conditions
integration with music-compose commands
integration with music-produce commands
integration with music-evaluate commands
explicit user-instruction precedence
approved / locked artifact precedence
cross-project handoffs where relevant
provider/tool requirements only when genuinely necessary
boundaries
```

A genre label is not enough.

Do not stop at:

```text
Genre: melodic techno
```

Translate it into operational production behaviour such as:

```text
stable four-on-the-floor pulse
kick / bass relationship is load-bearing
long-form energy development
transitions serve DJ structure
melodic identity evolves without constant replacement
breakdowns create contrast without destroying momentum
intro / outro remain mix-friendly
```

Likewise, a scoring pack must define actual cue/sync/handoff behaviour rather than merely saying "cinematic".

---

# 10. Command-Aware Pack Behaviour

Extension packs do not need their own command system merely because the core skills have command decomposition.

Instead, define how each pack affects the relevant existing Music Production commands.

Use the repository's **actual command IDs**.

If the current command design still resembles the specified command set, relevant examples may include:

```text
music-compose / interpret-brief
→ apply pack use-context and production constraints

music-compose / draft-material
→ generate alternatives appropriate to the pack grammar

music-compose / arrange
→ apply pack-specific arrangement / energy / instrumentation behaviour

music-produce / plan-production
→ choose a fidelity and production route appropriate to the pack

music-produce / produce-demo
→ create the correct pack-specific checkpoint

music-produce / refine-region
→ preserve approved musical identity while repairing only the failing unit

music-produce / prepare-delivery
→ enforce pack-specific deliverables and handoff semantics

music-evaluate / evaluate-final
→ judge the artifact against pack-specific quality targets

music-evaluate / verify-preservation
→ protect approved or locked traits

music-evaluate / route-failure
→ distinguish composition, arrangement, production, technical and delivery defects
```

Only document command effects that genuinely matter to that pack.

Do not create a giant command-by-pack matrix merely for completeness.

Do not create benchmark-only command semantics.

---

# 11. Evaluation Contract

Every pack must explicitly separate:

```text
preserve
tolerate
reject
```

Use `do_not_penalise` instead of `tolerate` if that is the repository's established vocabulary.

Example for `intimate-singer-songwriter-single`:

```text
preserve
→ approved lyric meaning
→ selected melody / hook
→ intimate vocal focus
→ restrained arrangement identity

tolerate
→ natural timing variation
→ audible breath / small performance imperfection
→ restrained dynamic range when intentional

reject
→ production spectacle that overwhelms the song
→ lyric mutation during sonic refinement
→ vocal identity drift
→ unnecessary arrangement density
```

Example for `adaptive-game-score`:

```text
preserve
→ musical identity across states
→ loop boundaries
→ layer compatibility

tolerate
→ intentionally modular construction
→ repetition required for loop function

reject
→ audible loop discontinuity
→ incompatible layers
→ transitions that fail runtime state changes
→ delivery that only provides one linear master when adaptive assets are required
```

The pack changes the quality target.

It does not excuse genuine production defects.

---

# 12. Performance and Vocal Profiles

Performance / vocal configuration remains optional.

A catalogue entry may define:

```text
no vocal profile
performance direction only
vocal role / delivery profile
provider reference only when explicitly authorised and genuinely required
```

Do not invent provider voice IDs.

Do not make imitation of a real identifiable living singer, producer, composer, or performer the defining behaviour of a pack.

For vocal-enabled packs define only useful information such as:

```text
role
performance direction
register / range guidance where appropriate
language
accent only when materially relevant
phrasing
intensity
articulation
consistency requirements
provider reference where authorised
```

The pack owns the intended production/performance profile.

Provider skills own execution.

---

# 13. Behavioural Evals

Every catalogue pack must have behavioural eval coverage.

At minimum test:

```text
pack activates when requested
pack does not activate when not requested

explicit user instructions override pack defaults
approved / locked music decisions override conflicting pack defaults

pack affects brief interpretation where relevant
pack affects composition / drafting where relevant
pack affects arrangement where relevant
pack affects production realisation where relevant
pack affects delivery / handoff where relevant

pack-aware evaluation accepts intentional traits
pack-aware evaluation rejects genuine defects
targeted refinement preserves pack identity
```

Use command-targeted evals where command decomposition exists.

Pack-specific examples:

```text
melodic-techno-club-track
→ does not force verse / chorus pop structure
→ rejects unstable kick/bass relationship
→ preserves long-form club energy logic

cinematic-hybrid-score
→ treats missed critical sync point as failure
→ preserves dialogue space
→ produces score-oriented handoff rather than pretending to own video editing

adaptive-game-score
→ distinguishes adaptive music from one linear track
→ validates loop / layer / transition behaviour

premium-brand-music
→ preserves mnemonic identity across exact-duration variants
→ rejects unrelated 6-second recomposition

intimate-singer-songwriter-single
→ preserves lyric/melody identity during production refinement
→ does not penalise intentional natural performance variation
```

Do not inflate eval counts with trivial restatements.

---

# 14. Catalogue Acceptance Gate

A pack enters `extension-packs/manifest.json` as ready only when:

```text
✓ installable Agent Skill exists
✓ valid SKILL.md
✓ coherent format / use-context / genre / production-language profile
✓ audience defined where materially relevant
✓ performance / vocal profile defined only where relevant
✓ operational production profile exists
✓ intentional traits are explicit
✓ genuine defects are explicit
✓ precedence rules are respected
✓ approved / locked material cannot be silently reopened
✓ no unnecessary provider implementation exists
✓ no false native-stem claims exist
✓ behavioural evals exist
✓ catalogue README exists
✓ showcase is pack-specific
✓ exact fenced ## Prompt exists
✓ benchmark case exists
✓ install smoke succeeds when the current stage requires it
```

If a mandatory gate cannot currently run:

```text
status: blocked
```

or leave the pack out of the ready catalogue.

Never mark it complete without evidence.

If install smoke is intentionally deferred until Stage 13, preserve that repository-stage semantics and report the pack as structurally ready but installation-unverified rather than pretending installation passed.

---

# 15. Benchmark Integration

If the Narrative-standard first-class benchmark system exists, every catalogue pack must have a matching `packs` benchmark case.

Required invariant:

```text
extension-packs/manifest.json pack
↔
extension-packs/<pack>/README.md
↔
skills/<pack>/
↔
benchmarks/cases/packs/<case>
```

The benchmark prompt source must point to:

```text
extension-packs/<pack>/README.md
```

and extract the exact fenced `## Prompt`.

Changing the showcase prompt must invalidate the benchmark case/result fingerprint.

Repository validation must fail when:

```text
catalogue pack has no benchmark case
benchmark pack has no catalogue pack
catalogue entry points to missing skill
catalogue entry points to missing README
catalogue README has no valid ## Prompt
```

Do not require paid generation merely to validate catalogue coverage.

If benchmark standardisation has not yet been implemented, preserve the equivalent current benchmark invariant and make the catalogue structure compatible with the planned `benchmarks/` migration.

Do not create a second parallel benchmark system just for packs.

---

# 16. Catalogue README

Create:

```text
extension-packs/README.md
```

This is the human browse surface.

Keep it concise and mobile-friendly.

Suggested structure:

```text
# Music Extension Pack Catalogue

What extension packs are
→ how to install one
→ browse by production context
→ pack links
→ how to create a new pack
```

For each pack show only:

```text
name
one-line production identity
format / use context / genre
showcase title
link to pack README
```

Do not copy every generation prompt into the root catalogue README.

Do not use a very wide Markdown table.

Prefer stacked sections grouped by meaningful production context.

Example:

```text
## Songs / Artist Releases

### Intimate Singer-Songwriter Single
Sparse, lyric-led vocal production focused on song and performance.
Format: single
Use context: artist release
Showcase: Kitchen Light
```

---

# 17. Repository README

Update the root README only enough to expose the catalogue.

Add a concise section such as:

```markdown
## Extension packs

Browse ready-made music-production formats, use contexts and production grammars in the [Extension Pack Catalogue](extension-packs/README.md).
```

Optionally show the five initial pack names if that remains concise.

Do not move the full catalogue into the root README.

The root README remains focused on Music Production Skills itself.

---

# 18. `music-pack-author`

Update `music-pack-author` so its output contract matches the implemented repository.

Its catalogue-oriented flow should become:

```text
inspect existing catalogue
→ assess whether a new pack is justified
→ define production profile
→ define pack/core-command effects
→ define evaluation profile
→ define optional performance / vocal profile
→ create skill package
→ create behavioural evals
→ create catalogue showcase
→ add catalogue manifest entry
→ add benchmark coverage
→ validate
```

If the command decomposition currently exists, align the flow with the real commands.

The expected command responsibilities may include:

```text
assess-pack-need
→ inspect the catalogue and decide reuse, adapt, or create

define-profile
→ define format, use context, genre guidance, production language,
  optional performance/vocal profile, delivery and evaluation target

author-pack
→ create the smallest self-contained installable Agent Skill

create-showcase
→ create extension-packs/<pack>/README.md with exact generation prompt

validate-pack
→ verify packaging, precedence, boundaries, profile/eval completeness

catalogue-pack
→ add manifest + benchmark registration only after acceptance gates pass
```

Use the actual repository command IDs if they differ.

If catalogue inspection is not explicit enough in the current command contract, add the smallest necessary update.

Do not automatically create a new pack when:

```text
existing pack already fits
```

or:

```text
existing pack + project-specific instruction is sufficient
```

Example:

```text
dark progressive techno
→ adapt melodic-techno-club-track with project-specific direction
```

rather than automatically creating:

```text
dark-progressive-techno
```

This protects the catalogue from trivial near-duplicates.

Do not add a pack-composition engine.

---

# 19. Catalogue Generation from the Current Spec

Materialise **every currently approved pack** in the Music Extension Pack Catalogue specification.

Do not stop after creating only documentation if the user-facing catalogue specification already defines installable packs.

For each current pack:

```text
create / validate skill package
create / validate production profile
create behavioural evals
create extension-packs/<pack>/README.md
preserve the specified showcase concept
preserve the specified generation prompt intent
add manifest entry
add benchmark definition
validate
```

The full catalogue should become real repository content, not a list of future ideas.

If a pack cannot yet be implemented because a required core capability is genuinely missing:

```text
do not fake implementation
→ record it explicitly as BLOCKED
→ explain the missing capability
```

Do not create fake runtime support for:

```text
native stems
DAW sessions
adaptive game runtime integration
picture editing
provider capabilities
```

when those capabilities do not actually exist.

---

# 20. Preserve the Catalogue Specification

The catalogue spec remains the normative design document.

The new:

```text
extension-packs/
```

folder is its implemented/product surface.

Do not copy the entire catalogue spec verbatim into `extension-packs/README.md`.

Update the spec only where repository layout, authoritative showcase location, benchmark prompt source, or acceptance rules need to reflect the implemented structure.

If changed, increment the version/footer.

The specification should now make this distinction explicit:

```text
docs/06-extension-pack-catalogue.md
→ normative catalogue design

extension-packs/
→ implemented human/machine catalogue surface

skills/<pack>/
→ installable runtime surface

benchmarks/
→ measurement surface
```

---

# 21. Repository Validation

Extend repository validation to verify:

```text
extension-packs/manifest.json parses
pack slugs are unique
manifest pack directories exist
catalogue README exists for each pack
skillPath exists
SKILL.md exists
required skill frontmatter is valid
production-profile reference exists
pack evals exist
catalogue ## Prompt exists
prompt is fenced
prompt is non-empty

manifest format/use-context fields are valid enough for the current contract
manifest status is valid
benchmark case exists when benchmark subsystem is present

no orphan catalogue directories exist
no orphan installable catalogue-pack skills exist
no duplicate authoritative showcase prompt remains without justification
```

Also validate cross-references:

```text
manifest cataloguePath
manifest skillPath
manifest benchmarkCase
```

where present.

Do not require optional references that a pack does not need.

Add deterministic tests for the validator.

---

# 22. Installation Smoke Test

Every extension pack must install independently.

Test current supported agents using the repository's established smoke-test approach.

At minimum prove the equivalent of:

```bash
npx skills add . --list

npx skills add . \
  --skill <pack-slug> \
  --agent claude-code \
  --copy --yes
```

and the current equivalent for Codex if the repository supports it.

Verify the installed pack contains all runtime resources it references.

The pack must not depend at runtime on repository-level:

```text
docs/
extension-packs/
benchmarks/
examples/
tests/
```

Catalogue content is discovery/documentation.

The installed skill remains self-contained.

If install smoke is intentionally stage-gated until Stage 13:

```text
do not bypass the gate silently
do not report PASS
report BLOCKED / NOT YET VALIDATED
```

and still validate the rest of the catalogue deterministically.

---

# 23. TypeScript Only

Any repository tooling added for:

```text
catalogue validation
manifest validation
prompt extraction
extension-packs / benchmark coverage checks
duplicate-showcase detection
```

must use TypeScript and the repository's current strict TypeScript conventions.

Do not add Python to the repository.

Do not add a framework merely to generate JSON or Markdown files.

Use safe filesystem/subprocess practices consistent with the existing repository.

---

# 24. Non-Goals

Do not introduce:

```text
pack inheritance
pack composition DSL
automatic pack mixing
genre ontology service
style ontology service
marketplace backend
ranking / recommendation engine
download telemetry
provider-specific pack forks
automatic model router
automatic singer / voice marketplace
generic creative-profile framework
database
graph database
workflow engine
DAW abstraction layer
```

The Extension Pack Catalogue is:

> a curated collection of coherent, independently installable music-production recipes.

---

# 25. Completion Criteria

The change is complete only when:

```text
✓ extension-packs/ exists
✓ extension-packs/README.md exists
✓ extension-packs/manifest.json exists

✓ every approved catalogue pack has a catalogue directory
✓ every catalogue directory has a showcase README
✓ every showcase has an exact fenced ## Prompt

✓ every catalogue pack has an installable skill package
✓ every pack has an operational production profile
✓ every pack has behavioural eval coverage

✓ pack-aware evaluation distinguishes intentional traits from defects
✓ approved / locked decisions outrank pack defaults
✓ performance/vocal profiles are optional and operational
✓ no provider IDs or capabilities are invented
✓ no false native-stem claims are introduced

✓ catalogue manifest maps correctly to skills and showcases
✓ every catalogue showcase has benchmark coverage
✓ benchmark prompt source uses the catalogue README
✓ repository validation detects catalogue drift

✓ all packs pass structural validation
✓ independently installable packs pass smoke tests when the current stage permits them
  OR the smoke gate is explicitly reported BLOCKED / pending Stage 13

✓ root README links to the catalogue
✓ music-pack-author outputs the implemented catalogue structure
✓ music-pack-author checks reuse/adaptation before creating a new pack

✓ duplicate extension-pack showcase prompts are removed or explicitly justified
✓ progressive core examples remain under examples/
✓ no fabricated provider-backed quality result is introduced
✓ no unnecessary framework is introduced
```

---

# 26. Final Validation

Run the repository's actual current commands.

At minimum verify the equivalent of:

```bash
npm install
npm run check
npm run validate
npm test
npm run test:commands
npm run test:benchmark
npm run smoke:install
npm run benchmark:list
git diff --check
```

If command decomposition or Narrative-standard benchmark migration has not yet been implemented, use the current equivalent commands and report the missing subsystem explicitly.

Do **not** invent green output.

If install smoke is intentionally blocked until Stage 13, preserve that semantics.

Also verify catalogue coverage explicitly.

Report:

```text
catalogue packs: N
installable pack skills: N
catalogue showcases: N
fenced generation prompts: N
pack behavioural eval coverage: N/N
benchmark pack coverage: N/N
install-smoke coverage: N/N or BLOCKED
orphan catalogue entries: 0
orphan pack skills: 0
```

These are coverage counts, not semantic quality scores.

Do not mark a required check as passing if it could not run.

---

# 27. Final Report

After implementation report:

1. final `extension-packs/` tree;
2. final pack list grouped by production context;
3. catalogue pack count;
4. installable pack-skill count;
5. showcase prompt coverage;
6. behavioural eval coverage;
7. benchmark coverage;
8. installation smoke results or explicit Stage 13 blocker;
9. duplicate example/showcase material removed or retained and why;
10. `music-pack-author` changes;
11. validator/tests added;
12. specs updated and version bumps;
13. blocked packs, if any;
14. anything deliberately deferred.

The final repository should make the extension-pack system tangible:

```text
browse catalogue
→ open a pack
→ understand its production grammar
→ copy its showcase prompt
→ install it
→ produce music
→ evaluate it against pack-specific criteria
→ benchmark the result
```

---

**Implementation Prompt — Generate the Music Extension Pack Catalogue**  
**Version 1 — 27 August 2026**
