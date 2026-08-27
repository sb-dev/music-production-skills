# Skill Installation

This project uses the open Agent Skills CLI as its canonical installation mechanism.

The repository name is fixed as `music-production-skills`, but the public GitHub owner is not verified until publication. Until then, use:

```text
<org>/music-production-skills
```

Do not replace `<org>` with an inferred account name.

## Project-local installation is the default

Install skills into the project that needs them:

```bash
# Inspect available Music Production Skills
npx skills add <org>/music-production-skills --list

# Install every repository skill, including optional pack authoring support
npx skills add <org>/music-production-skills
```

Project-local installation keeps production behaviour explicit to the consumer project, visible to the team, and isolated from unrelated work.

Global installation is optional when the same behaviour is intentionally wanted across projects:

```bash
npx skills add <org>/music-production-skills --global
```

## Selective installation

Install only the skills needed by the workflow.

### Composition and arrangement

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-evaluate \
  --agent claude-code
```

This path does not require Replicate when work remains symbolic/MIDI-only.

### Complete music production

Install the official Replicate execution skills first:

```bash
npx skills add replicate/skills \
  --skill find-models \
  --skill compare-models \
  --skill run-models \
  --agent claude-code
```

Then install the Music Production Skills:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --skill music-produce \
  --skill music-evaluate \
  --agent claude-code
```

`music-produce` requires the Replicate peer skills for its primary generative execution path. `music-compose` requires them only when composition work escalates to Replicate-backed audio generation.

### Existing-track repair

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

If the repair is deterministic only, such as trimming, format correction, or technical inspection, Replicate execution may not be required.


### Extension-pack authoring

Install the optional authoring skill when creating or maintaining reusable extension packs:

```bash
npx skills add <org>/music-production-skills \
  --skill music-pack-author \
  --agent claude-code
```

`music-pack-author` is not required for normal composition, production or evaluation. It creates pack contracts, behavioural evals and canonical showcase examples; it does not execute music generation.

## Agent targeting

Claude Code:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --agent claude-code
```

Codex:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --agent codex
```

The Skills CLI also supports additional agents. Do not hard-code host-specific skill paths in Music Production Skills; let the CLI install to the selected agent's standard location.

For non-interactive automation, add `--yes`:

```bash
npx skills add <org>/music-production-skills \
  --skill music-compose \
  --agent claude-code \
  --yes
```

## Runtime requirements by skill

### `music-compose`

Core instruction behaviour requires only an Agent Skills-compatible host.

The optional deterministic MIDI helpers require Node.js 22+ and the skill-local npm dependencies. From the installed `music-compose` directory:

```bash
npm install
```

This installs `tonal` and `@tonejs/midi` for the local scripts. Do not require them when the workflow does not use MIDI helpers.

### `music-produce`

Replicate-backed generation requires:

```text
REPLICATE_API_TOKEN
```

and the official Replicate peer skills:

```text
find-models
compare-models
run-models
```

Deterministic audio helpers require:

```text
Node.js 22+
ffmpeg
ffprobe
```

### `music-evaluate`

Creative evaluation can operate from supplied artifacts and host reasoning.

Technical audio QC requires:

```text
Node.js 22+
ffmpeg
ffprobe
```

Replicate credentials are not required merely to evaluate an existing artifact.

## Installed skill tracking and updates

Inspect project-installed skills:

```bash
npx skills list
```

Update project skills:

```bash
npx skills update --project
```

Or update named skills non-interactively:

```bash
npx skills update music-compose music-produce music-evaluate music-pack-author \
  --project \
  --yes
```

The CLI may maintain project installation metadata such as `skills-lock.json`. That metadata may be committed by a consumer project when useful, but lock restoration is not a core Music Production Skills dependency. Explicit `npx skills add ...` commands remain the canonical recovery path.

## Consumer project layout

Installed behaviour and music artifacts are separate:

```text
.claude/skills/ or .agents/skills/
→ installed Agent Skills

production/
→ music artifacts
```

See [`consumer-projects.md`](consumer-projects.md) for progressive workspace examples.

## Local-source validation contract

Stage 13 will validate the unpublished repository from a clean project using the local source path:

```bash
npx skills add /path/to/music-production-skills --list
```

Then each skill must install independently, for example:

```bash
npx skills add /path/to/music-production-skills \
  --skill music-compose \
  --agent claude-code \
  --yes
```

Stage 12 configures these commands and dependencies. It does **not** claim they have passed; that evidence belongs to Stage 13.
