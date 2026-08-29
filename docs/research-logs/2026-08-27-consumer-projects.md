# Consumer Project Structure

Music Production Skills should fit the consumer's project rather than forcing one oversized canonical workspace.

Installed Agent Skills and production artifacts are separate concerns.

```text
.claude/skills/ or .agents/skills/
→ installed behaviour

production/
→ music-production artifacts
```


## Install only what the workspace needs

For a composition-focused project:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-evaluate \
  --agent claude-code
```

For Replicate-backed production, add the official execution peers plus `music-produce`:

```bash
npx skills add replicate/skills \
  --skill find-models \
  --skill compare-models \
  --skill run-models \
  --agent claude-code

npx skills add <org>/music-production-skills \
  --skill music-produce \
  --skill music-evaluate \
  --agent claude-code
```

The consumer project should not install the whole Creative Production Skills family merely because one workflow may eventually need another domain.

## Level 1 — Controlled output

Start with only what the task needs:

```text
production/
├── brief.md
├── composition.yaml
├── arrangement.yaml
└── audio/
```

Use for:

```text
brief → composition → short demo
```

## Level 2 — Selection and preservation

Add explicit alternatives and evaluation only when creative choice requires them:

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

Use for:

```text
draft alternatives
→ component selection
→ approval / locking
→ refined demo
```

## Level 3 — Full production

Add production and delivery structure when the work crosses that boundary:

```text
production/
├── brief.md
├── references/
├── composition/
├── arrangement/
├── demos/
├── production/
├── delivery/
└── evaluations/
```

Do not create `mixes/`, `stems/`, or `multitrack/` merely because the project might need them one day.

## Level 4 — Repair workflow

Retain parent/child relationships and the defective region rather than making copies of the entire production tree:

```text
production/
├── production/final.wav
├── production/final.meta.yaml
├── repairs/chorus-2/
└── evaluations/
```

The repair should reference the original artifact and the smallest affected region.

## Level 5 — Cross-domain production

Compose through artifacts:

```text
production/
├── narrative/   # supplied story artifacts when installed/available
├── video/       # supplied picture/editorial artifacts when installed/available
├── advertising/ # campaign constraints when installed/available
├── game/        # supplied game-project context when available
└── music/       # this project's music artifacts
```

No shared runtime API is required merely because several domains participate.

## State is metadata, not directory duplication

Avoid structures such as:

```text
draft/
approved/
locked/
final/
```

for every artifact. Use artifact metadata such as:

```yaml
workflowState: refine
decisionState: approved
```

Selections should point to their sources rather than copy large artifacts into new status folders.
