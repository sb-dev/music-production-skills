# Contributing

Contributions should improve a real music-production behaviour rather than add infrastructure for its own sake.

A significant change should answer:

```text
What production problem does this solve?
Which lifecycle stage changes?
Which artifacts change?
What approved behaviour must remain stable?
How is the change evaluated?
What example demonstrates it?
Does this duplicate another project-family behaviour?
```

## Development

Requirements:

- Node.js 22+
- npm
- FFmpeg
- ffprobe

Install and run deterministic checks:

```bash
npm install
npm run check
```

Do not claim the Skills CLI smoke gate has passed unless it has actually been executed in a clean consumer project.

## Skill changes

Every installable skill must remain self-contained under `skills/<skill-name>/`.

Runtime material required by a skill belongs with that skill. Do not make a skill depend on repository-level `docs/`, another skill's private files, or a root-only runtime script.

Each skill change should include or update:

- `SKILL.md` behaviour;
- local references/assets/scripts where needed;
- its `evals/evals.json` cases;
- at least one relevant deterministic or end-to-end test when the behaviour is machine-testable;
- an example when the capability would otherwise be difficult to understand.

## Production policy

Preserve these architectural constraints unless new evidence justifies changing them:

- Replicate remains the primary model provider.
- Official Replicate Agent Skills own discovery, comparison and execution.
- Hard capability requirements come before price or preferred model.
- Selection, approval and locking remain distinct.
- `workflowState` and `decisionState` remain independent.
- Refine the smallest responsible production unit.
- Do not label source-separated estimates as native stems.
- Required-but-unrun checks report BLOCKED/NOT RUN, never PASS.

## Extraction candidates

Cross-domain similarities belong in `docs/extraction-candidates.md` first.

Do not move behaviour into Creative Production Skills until at least two domains have independently implemented substantially equivalent semantics and extraction produces net simplification.
