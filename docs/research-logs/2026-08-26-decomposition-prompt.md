# Implementation Prompt — Narrative Production Skills Command Decomposition

Implement bounded, skill-local command decomposition in the `narrative-production-skills` repository.

## Goal

Keep the existing Agent Skills as the public/installable capability boundary, but decompose each skill into smaller **internal production commands** so individual behaviour can be specified, evaluated and benchmarked independently.

The desired hierarchy is:

```text
command
→ one bounded narrative-production behaviour

skill
→ command selection and orchestration

workflow
→ multiple skills + artifact handoffs

production
→ end-to-end narrative quality
```

This is a testing and behavioural decomposition, **not** a new public skill taxonomy and not a workflow-engine project.

## Start by inspecting the repository

Before editing anything:

1. inspect the current `README.md`;
2. inspect all current `skills/*/SKILL.md` files;
3. inspect `docs/01-creative-skills-system-spec.md`;
4. inspect `docs/02-creative-skills-workflows-and-artifacts-spec.md`;
5. inspect `docs/03-creative-skills-repository-and-contracts-spec.md`;
6. inspect `docs/04-testing-and-benchmark-spec.md`;
7. inspect the customisation-pack / extension-pack specs and catalogue;
8. inspect the existing benchmark manifest/taxonomy/runner and repository validator;
9. run the existing deterministic repository checks before making changes.

Preserve current terminology, artifact semantics, examples, extension-pack catalogue and benchmark behaviour unless this change explicitly requires an update.

Do not hard-code old case counts or catalogue counts from this prompt. Use the repository's current state.

## Architectural rule

The existing installable skills remain the product surface:

```text
narrative-develop
narrative-write
narrative-continuity
narrative-evaluate
narrative-revise
narrative-pack-create   # optional extension-pack authoring support
```

Commands live inside their owning skill:

```text
skills/<skill-name>/commands/<command-id>.md
```

A command is:

> a bounded, domain-native narrative-production operation with an independently testable contract.

A command is **not**:

- another Agent Skill;
- independently installable;
- automatically a slash command;
- automatically a CLI command;
- a provider/API call;
- a file helper;
- a generic workflow-engine node.

Do not create commands such as:

```text
read-json
write-file
call-model
parse-yaml
run-pandoc
```

Those are implementation/tool operations behind narrative-production commands.

## Command contract format

Use lightweight local Markdown contracts. Prefer this minimal frontmatter:

```yaml
---
id: <command-id>
skill: <owning-skill>
---
```

Each command file must define:

```text
Purpose
When it runs
Inputs
Preconditions
Outputs
Invariants
Failure / routing semantics
Forbidden behaviour
Dependencies
Evaluation hooks
```

Keep command files concise. Detailed craft/domain guidance should remain in existing skill-local `references/` where appropriate.

Commands consume and produce the repository's existing artifacts. Do **not** create generic `command_result` artifacts, command-specific lifecycle states, or a second artifact model.

## Proposed command decomposition

Treat these as the initial target. Adjust a name or merge/split only when the current repository semantics demonstrate a clearly better boundary. Do not add commands merely for symmetry.

### `narrative-develop`

```text
interpret-brief
explore-concepts
select-concept
develop-story-foundations
build-outline
build-beats
build-scene-cards
prepare-writing
```

Expected responsibilities:

- `interpret-brief` — identify narrative intent, constraints, open decisions and approved constraints;
- `explore-concepts` — create genuinely distinct low-resolution concept alternatives;
- `select-concept` — compare/select without collapsing selection into approval;
- `develop-story-foundations` — develop only required character/world/story foundations;
- `build-outline` — establish causal macro structure;
- `build-beats` — refine the selected structure into meaningful beats;
- `build-scene-cards` — define scene purpose, objective/conflict/turn and required state changes;
- `prepare-writing` — verify that downstream writing has sufficient approved/developed artifacts without overbuilding context.

### `narrative-write`

```text
prepare-draft
draft-narrative-unit
refine-narrative-unit
apply-medium-conventions
```

Expected responsibilities:

- `prepare-draft` — assemble the relevant approved/developed story material for the requested writing unit;
- `draft-narrative-unit` — write the requested scene/chapter/sequence/unit from upstream artifacts;
- `refine-narrative-unit` — improve a bounded written unit without silently changing upstream story decisions;
- `apply-medium-conventions` — ensure prose/screenplay/other supported narrative form obeys the selected medium's writing conventions without taking over downstream visual/audio implementation.

Do not create one command per prose technique.

### `narrative-continuity`

```text
classify-story-state
update-continuity
assemble-context
check-continuity
project-state
```

Expected responsibilities:

- `classify-story-state` — distinguish planned, canonical, belief, secret, uncertain and superseded states;
- `update-continuity` — persist a justified state change without over-promoting speculative material;
- `assemble-context` — provide only task-relevant continuity/context to another narrative operation;
- `check-continuity` — detect contradictions, knowledge leaks and invalid state use;
- `project-state` — derive the state that should be true at a particular scene/chapter/episode/branch point.

Preserve the existing rule that planned events are not automatically canon and character belief is not objective fact.

### `narrative-evaluate`

```text
inspect-target
evaluate-development
evaluate-draft
evaluate-refinement
evaluate-final
route-failure
produce-editorial-report
```

Expected responsibilities:

- `inspect-target` — identify target artifact, lifecycle/decision state and relevant upstream evidence;
- `evaluate-development` — assess concept/outline/beat/scene-card readiness;
- `evaluate-draft` — diagnose whether a draft is fit to continue developing;
- `evaluate-refinement` — verify requested correction, preservation and regressions;
- `evaluate-final` — run full applicable developmental/medium/continuity checks;
- `route-failure` — identify the highest useful owning artifact/root cause and smallest sufficient revision scope;
- `produce-editorial-report` — persist findings without silently rewriting the target.

Evaluation commands must diagnose. They must not perform the revision themselves.

### `narrative-revise`

```text
plan-revision
analyse-impact
revise-unit
regenerate-descendants
verify-revision
```

Expected responsibilities:

- `plan-revision` — turn findings into explicit preserve/change constraints and revision steps;
- `analyse-impact` — identify the smallest sufficient owning unit and affected descendants;
- `revise-unit` — change only the required narrative unit;
- `regenerate-descendants` — update only downstream artifacts invalidated by an upstream revision;
- `verify-revision` — confirm the diagnosed problem was fixed and approved material survived.

Preserve the core rule:

> Fix the highest useful upstream cause at the smallest sufficient scope, then regenerate only affected descendants.

### `narrative-pack-create`

Use the existing extension-pack authoring skill and decompose it into:

```text
inspect-catalogue
assess-pack-need
define-profile
author-pack
create-showcase
validate-pack
catalogue-pack
```

Expected responsibilities:

- `inspect-catalogue` — find existing packs that may already cover the need;
- `assess-pack-need` — decide whether a reusable pack is justified versus existing pack + project instructions;
- `define-profile` — create operational medium/genre/style/audience/voice/handoff/evaluation behaviour;
- `author-pack` — create the smallest self-contained Agent Skill package;
- `create-showcase` — create at least one showcase README containing the exact fenced generation prompt;
- `validate-pack` — enforce precedence, boundaries, completeness, eval coverage and self-containment;
- `catalogue-pack` — add an accepted pack to the catalogue and benchmark surfaces.

A likely catalogue overlap must go through `inspect-catalogue` / `assess-pack-need` before `author-pack`.

## `SKILL.md` orchestration

Update each `SKILL.md` with a concise `## Commands` / orchestration section.

The skill remains responsible for choosing and sequencing commands.

Example:

```text
user asks to strengthen one weak scene
    ↓
narrative-evaluate / route-failure
    ↓
root cause = scene-card conflict
    ↓
narrative-revise / plan-revision
    ↓
narrative-revise / revise-unit
    ↓
narrative-revise / verify-revision
```

Do not introduce a generic orchestration runtime or graph engine.

A skill must be able to fail in two separately measurable ways:

```text
wrong command selected
→ skill-orchestration failure

right command selected but contract violated
→ command failure
```

## Repository structure

Add `commands/` only where real command contracts exist:

```text
skills/narrative-develop/commands/
skills/narrative-write/commands/
skills/narrative-continuity/commands/
skills/narrative-evaluate/commands/
skills/narrative-revise/commands/
skills/narrative-pack-create/commands/
```

Every installed skill must remain self-contained. Command files must install with their owning skill and must not reference repository-level `/docs` at runtime.

Do not create a shared `commands/` package at repository root.

## Specification updates

Update the current specs rather than adding a new top-level command spec.

### System spec

Define:

```text
Agent Skill
→ command selection/orchestration
→ bounded command
→ artifacts / host model / deterministic tools
```

State explicitly that commands are internal behavioural contracts and not additional installable skills.

### Workflows and Artifacts spec

State explicitly:

- commands are an execution view over the existing workflow;
- commands are not artifacts;
- commands are not lifecycle states;
- existing artifact promotion, canon, continuity, lineage and decision-state semantics remain authoritative.

### Repository and Contracts spec

Define:

- `commands/` packaging;
- command frontmatter/required headings;
- command self-containment;
- command granularity rules;
- the canonical initial command sets;
- `SKILL.md` orchestration ownership;
- validator requirements;
- technical acceptance criteria.

### Testing and Benchmark spec

Add command-level measurement without replacing existing diagnostic, production, extension-pack or pack-authoring suites.

The benchmark hierarchy should become:

```text
command
skill
workflow
production
```

Add an optional `command` field and a case level/scope field to benchmark case metadata. Preserve backward compatibility for existing cases.

For command-level cases, require:

```text
owning skill
command id
capability
positive expectation
hard invariants where applicable
forbidden behaviour / boundary case where meaningful
```

Benchmark reporting must distinguish:

```text
wrong command selection
command-contract failure
cross-command sequencing failure
cross-skill workflow failure
end-product quality failure
```

Do not collapse these into one narrative-quality number.

### Customisation / extension-pack specs and catalogue

Update the `narrative-pack-create` contract and catalogue authoring section to describe its command decomposition.

Do not force commands into every extension pack. A pack is primarily a production profile; add pack-local commands only if real future usage demonstrates independently testable operational behaviour beyond profile application.

### Extraction candidates

Record the concept:

```text
installable skill
→ skill-local bounded production commands
→ command-level tests
```

as `observe only`.

Do not extract a family-wide command framework yet. Music Production Skills is independently specifying the same pattern, but family extraction still requires implemented semantic equivalence and net simplification.

## Validation and tests

Extend repository validation so it can verify command contracts.

At minimum validate:

- command file frontmatter contains matching `id` and owning `skill`;
- command filename matches command id;
- required command sections exist;
- no duplicate command ids within a skill;
- every command referenced by `SKILL.md` exists locally;
- no command file requires repository-level `/docs` at runtime;
- command files are included by selective skill installation;
- commands are not independently exposed as Agent Skills.

Add deterministic tests for the validator.

## Eval and benchmark coverage

Do not inflate coverage by creating trivial cases.

Every shipped command should have:

1. at least one positive contract case;
2. at least one boundary/forbidden case where the command has a meaningful misuse mode;
3. deterministic assertions for machine-checkable invariants;
4. semantic/host-agent cases only where narrative judgement is actually required.

Add orchestration cases that prove the owning skill chooses the right command.

Important examples:

```text
narrative-develop
→ selected concept must not silently become approved

narrative-continuity / classify-story-state
→ character belief must not become canon

narrative-evaluate / route-failure
→ weak prose caused by missing upstream conflict must route above prose

narrative-evaluate
→ evaluation request must not rewrite target

narrative-revise / analyse-impact
→ local scene defect must not trigger whole-story rewrite

narrative-revise / verify-revision
→ approved ending must survive an unrelated middle revision

narrative-pack-create / assess-pack-need
→ existing pack + project instructions beats redundant new pack
```

Coverage reporting must list commands with zero cases as gaps, not passes.

Do not fabricate a command-aware semantic baseline. Existing measured evidence remains valid only for the case definitions it actually measured.

## README

Keep the README user-focused. Do not turn it into a command catalogue.

A short architecture/testing note is acceptable if it materially helps users or contributors, but the installable skill surface must remain prominent.

## Non-goals

Do not add:

- a generic command framework package;
- a command registry service;
- a workflow engine;
- a graph database;
- command inheritance;
- command composition DSL;
- one command per writing technique;
- one command per artifact type merely for symmetry;
- command-specific lifecycle states;
- command-result artifact schemas;
- public slash commands unless independently justified later.

## Completion criteria

The change is complete only when:

```text
✓ existing installable skill names remain stable
✓ every intended skill has only meaningful command contracts
✓ command contracts are local and self-contained
✓ SKILL.md files orchestrate their local commands
✓ commands use existing narrative artifacts/state semantics
✓ repository validation checks command contracts
✓ deterministic validator tests pass
✓ benchmark taxonomy supports command-level cases
✓ command coverage is visible by skill + command
✓ wrong-command selection and command failure are distinguishable
✓ existing diagnostic benchmark still works
✓ existing progressive production examples still work
✓ existing extension-pack benchmark still works
✓ narrative-pack-create command coverage exists
✓ no fabricated benchmark baseline is introduced
✓ `npm run check` / repository deterministic gate passes
```

After implementation, report:

1. the final command set per skill;
2. any proposed command names you changed and why;
3. spec files updated and version bumps;
4. validator/tests added;
5. benchmark cases added by command;
6. existing benchmark/test results before versus after;
7. any command with incomplete coverage;
8. anything deliberately deferred.
