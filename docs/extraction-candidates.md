# Music Production Skills — Extraction Candidates

## 1. Purpose

This register records cross-domain concepts observed during the Stage 10 review.

It is evidence for future extraction, not a roadmap forcing extraction.

Current status:

```text
observe only
```

Music Production Skills is still specified rather than independently implemented. No candidate currently satisfies the project-family extraction gate.

---

## 2. Extraction Gate

A candidate may move into Creative Production Skills only after:

1. at least two production domains have independently implemented it;
2. the semantics are substantially equivalent;
3. a stable common contract can be extracted without weakening either domain;
4. extraction removes more duplication than it adds in coupling or indirection.

Design similarity alone is insufficient.

---

## 3. Candidate Review

| Candidate | Existing family evidence | Music semantics | Stage 10 assessment | Status |
|---|---|---|---|---|
| Draft-set semantics | Video uses persistent `draft_set`; Narrative uses candidate sets | Music uses composition/arrangement draft sets and may select components across candidates | Strong exploration-pattern overlap, but Music's component-level recombination is materially different | observe only |
| Lightweight artifact lineage | Video has richer `provenance_record`; Narrative uses lightweight parent/selection/revision lineage | Music attaches lineage plus model/tool provenance to production artifacts | A small lineage subset may converge; full provenance contracts are not equivalent | observe only |
| Decision-state semantics | Video distinguishes `open → selected → approved → locked`; Narrative separates candidate/selected/approved | Music independently uses `open → selected → approved → locked`, including component-level musical decisions | Strong candidate, but locking has domain-specific production consequences and implementation evidence is not yet sufficient | observe only |
| Preserve/change refinement | Video preserves approved visual decisions; Narrative preserves/reopens approved story decisions | Music preserves approved/locked musical decisions and targets the smallest responsible section or component | Strong common principle; correction units and preservation evidence remain domain-native | observe only |
| Promotion/refinement | Video promotes approved visual artifacts; Narrative refines selected/approved narrative work | Music promotes composition/arrangement/demo/mix states without restarting from the brief | Conceptual overlap; stable common contract not yet proven | observe only |
| Staged evaluation | Video and Narrative vary evaluation by lifecycle/artifact | Music varies evaluation across composition, arrangement, production, preservation, technical and delivery criteria | Lifecycle pattern looks reusable; quality rubrics and corrective routing must remain domain-native | observe only |
| Minimal evaluation-report envelope | Video has `evaluation_report`; Narrative has `editorial_report` | Music has `evaluation_report` with artifact, findings, owning stage and corrective action | A generic envelope may converge, but the report semantics are not currently interchangeable | observe only |

---

## 4. Explicit Non-Candidates

### Music Composition vs Video Visual Composition

```text
music composition
≠
video visual composition
```

The same word refers to different production concepts.

### Music Arrangement vs Video Editorial / Narrative Structure

```text
music arrangement
≠
video edit_timeline
≠
narrative outline / scene structure
```

All organise material over time, but their decisions and downstream consumers differ.

### Demo vs Animatic / Motion Prototype

```text
music demo
≠
video animatic
≠
video motion_prototype
```

All can reduce downstream risk, but they validate different production decisions.

### Music Mix vs Video `audio_mix`

```text
music mix
≠
video audio_mix
```

A music mix balances the internal music production. Video `audio_mix` is the picture/program mix combining dialogue, supplied music and effects.

### Music Master vs `video_master`

```text
music master
≠
video_master
```

They are final masters of different media with different delivery semantics.

### Music Technical QC vs Other-Domain QC

Technical infrastructure may overlap, but music mix/master constraints, video media QC, game-asset readiness and comic export/readability are not one quality contract.

### Music Brief vs Story / Campaign / Video Brief

Briefs share the idea of persistent intent, but their normative fields and owning decisions remain domain-specific. Cross-project work should translate upstream artifacts into a `music_brief` rather than assume one universal brief schema.

---

## 5. Family Tooling Candidate — Testing and Benchmark Harness

Video Production Skills and Music Production Skills both use a layered testing pattern:

```text
typecheck / validate
→ unit
→ stage
→ evals
→ deterministic benchmark
→ opt-in semantic benchmark
→ recorded transcripts / free rescoring
```

This is a possible family-level tooling/process convention, not a Creative Production Skills runtime abstraction.

Do not extract a shared test harness until the two repositories have implemented it and the duplication is substantial enough to justify a maintained common package or template.

---

## 6. Cross-Project Handoff Findings

### Narrative → Music

Prefer canonical narrative artifacts such as:

```text
story brief
character profile
world bible
screenplay
scene plan
dialogue
```

Music translates them into musical intent without taking ownership of story development.

### Video → Music

Prefer canonical video artifacts such as:

```text
brief
storyboard
shot plan
animatic
edit timeline
video master
```

Music should derive sync/timing requirements from those artifacts rather than duplicating video editorial models.

### Advertising → Music

Advertising supplies campaign strategy and messaging constraints. Music owns musical composition and production.

### Music → Video / Advertising / Game

Primary handoffs are:

```text
music track
mix / master
stems where genuine
timing map / timing metadata
delivery package
```

`music track` is a handoff label for an approved music output, not another first-class artifact. `timing map` remains delivery metadata until an independent lifecycle justifies promotion.

### Game Boundary

Music is handed to the game project. Video Game Asset Production Skills is not a required intermediary merely because music is also a game asset.

---

**Music Production Skills — Extraction Candidates — Stage 10**
