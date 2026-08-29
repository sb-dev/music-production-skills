# Music Production Extension Pack Catalogue

## 1. Purpose

This catalogue describes the initial Music Production Skills extension packs and the example productions that demonstrate them.

In this repository, **extension pack** is the user-facing catalogue term for a Music Production **Customisation Pack**. The canonical pack contract remains defined by `05-customisation-packs-spec.md`.

A catalogue entry must answer:

```text
what production grammar does the pack specialise?
when should it be used?
what changes in music-compose / music-produce / music-evaluate?
what must remain stable?
what does a representative production prompt look like?
```

The catalogue is intentionally small. Add a new pack only when it changes production behaviour materially rather than merely adding a genre or style label.

---

## 2. Catalogue Rules

Every published pack should include:

- a coherent format and use context;
- genre guidance where useful;
- an operational production language;
- performance or vocal direction where relevant;
- delivery requirements where relevant;
- pack-aware evaluation criteria;
- at least one showcase example;
- a full copyable generation prompt in every showcase example README;
- negative/boundary evals proving the pack is not applied when it should not be.

Explicit user instructions and approved/locked music artifacts always outrank pack defaults.

---

## 3. `intimate-singer-songwriter-single`

**Format:** vocal single  
**Use context:** streaming / album  
**Primary grammar:** song, lyric and performance first  
**Typical genre space:** singer-songwriter, indie folk, acoustic pop

### Production profile

The pack prioritises:

```text
lyric + melody
→ intimate performance
→ restrained arrangement
→ transparent production
→ natural final delivery
```

Typical characteristics:

- one expressive lead vocal;
- acoustic or lightly amplified core instrumentation;
- sparse arrangement with deliberate growth;
- human timing and natural dynamics;
- close vocal perspective;
- transparent pitch/timing correction;
- no density added merely to make the production sound "finished".

`music-evaluate` should not penalise intentional breathing, slight human timing variation, restrained stereo width, or sparse instrumentation. It should still reject weak lyric intelligibility, unsupported song structure, distracting performance defects, masking around the lead, or accidental edit noise.

### Showcase — Kitchen Light

A restrained 3-minute song about spending the final evening in an empty flat before moving away.

[Example README](../examples/packs/intimate-singer-songwriter-single/kitchen-light/README.md)

#### Generation prompt

```text
Use music-compose, music-produce and music-evaluate with the intimate-singer-songwriter-single extension pack.

Create a 3:10 intimate singer-songwriter single called "Kitchen Light".

Creative brief:
- Theme: the final evening in an almost-empty flat before moving away
- Emotional direction: reflective and specific rather than sentimental
- Point of view: first person
- Tempo: around 74 BPM
- Meter: 4/4
- Vocal: one close, natural lead vocal; restrained delivery; no showy melisma
- Core instrumentation: finger-picked acoustic guitar and upright-style piano
- Supporting instrumentation: soft bass, very light brushed percussion introduced later, optional cello only if it earns its place
- Production: warm, dry-to-close, small-room intimacy, natural dynamics, limited layering
- Duration: about 3 minutes 10 seconds

Composition workflow:
- Write three materially different chorus-hook options before selecting one
- Keep the lyric grounded in physical details from the flat rather than generic nostalgia
- Build a clear verse / chorus progression with a short bridge or contrasting middle section
- Approve the melody, lyric and core harmonic movement before expensive audio generation

Production workflow:
- Create a low-cost demo before final production
- Keep the first verse very sparse
- Let the arrangement widen gradually without becoming cinematic or oversized
- Preserve audible breaths and slight performance variation when they support intimacy
- Do not add large drums, glossy synth layers, choir-like backing vocals or exaggerated mastering loudness

Evaluation priorities:
- lyric intelligibility
- melodic memorability without pop overstatement
- emotional credibility
- arrangement restraint
- vocal focus
- preservation of approved melody and lyrics
- clean edits and technically valid final audio
```

**What it proves:** the pack changes the quality target. A sparse, human performance should not be "corrected" into a dense or heavily polished production.

---

## 4. `melodic-techno-club-track`

**Format:** club track  
**Use context:** DJ / club / streaming  
**Primary grammar:** repetition plus gradual transformation  
**Typical genre space:** melodic techno, progressive techno, melodic house/techno

### Production profile

The pack prioritises:

```text
groove
→ low-end relationship
→ motif identity
→ gradual layer evolution
→ long-form energy
→ club translation
```

Typical characteristics:

- stable tempo;
- instrumental by default;
- functional intro and outro for mixing;
- strong kick/bass separation;
- repetition with controlled evolution;
- transitions built from automation, subtraction, timbre and rhythmic change;
- width concentrated above the sub/low-bass region;
- no forced verse/chorus structure.

`music-evaluate` should not penalise repetition when it creates functional tension or mixability. It should still reject stagnant energy, weak low-end separation, accidental density spikes, poor transition timing, or a pop-song form imposed without purpose.

### Showcase — Glass Meridian

A 6:30 club track driven by one recognisable three-note motif and a long controlled energy curve.

[Example README](../examples/packs/melodic-techno-club-track/glass-meridian/README.md)

#### Generation prompt

```text
Use music-compose, music-produce and music-evaluate with the melodic-techno-club-track extension pack.

Create a 6:30 instrumental club track called "Glass Meridian".

Creative brief:
- Tempo: 126 BPM
- Meter: 4/4
- Tonal centre: minor, dark but not ominous
- Core identity: one recognisable three-note synth motif
- Groove: steady four-on-the-floor kick with a controlled rolling bass relationship
- Production language: modern, spacious, synth-driven, precise low end, evolving analogue-style textures
- Vocal: none
- Use context: late-night club / DJ set

Composition and arrangement:
- Explore three motif variants cheaply before selecting one
- Build the track through gradual transformation rather than verse/chorus songwriting
- Provide a functional DJ intro and outro
- Establish the groove before introducing the full harmonic/melodic identity
- Use subtraction, automation, timbral change and rhythmic variation to create development
- Include one major release point, but do not turn it into a pop-drop cliché

Production workflow:
- Validate the kick/bass relationship early with a short section prototype
- Produce a representative central section before committing to the full track
- Keep sub information mono-focused
- Use stereo width primarily in higher-frequency textures and effects
- Preserve the selected motif throughout refinement
- If a transition fails, repair the affected transition rather than regenerating the whole track

Evaluation priorities:
- kick/bass separation
- groove consistency
- long-form energy progression
- functional intro/outro
- motif identity
- transition quality
- club-oriented translation without crushed transients
- no accidental vocal or song-form behaviour
```

**What it proves:** the pack uses a loop/evolution grammar and club delivery logic rather than a singer-songwriter or streaming-song structure.

---

## 5. `cinematic-hybrid-score`

**Format:** cue / score  
**Use context:** film / television / video  
**Primary grammar:** dramatic function and synchronisation  
**Typical genre space:** cinematic hybrid, orchestral-electronic, suspense/drama

### Production profile

The pack prioritises:

```text
spotting / dramatic purpose
→ cue concept
→ cue sketch
→ mockup
→ sync-aware final production
→ cue delivery
```

Typical characteristics:

- instrumental by default;
- cue timing driven by picture/narrative events;
- thematic identity rather than standalone hook maximisation;
- deliberate dialogue space;
- hybrid orchestral/electronic palette where appropriate;
- clean cue boundaries and tails;
- stems only when genuine production material exists.

`music-evaluate` judges the cue against scene function, sync and dialogue rather than standalone loudness or song completeness.

### Showcase — Blackout Protocol

A 95-second hybrid suspense cue with dialogue space, a reveal synchronisation point and a controlled ending.

[Example README](../examples/packs/cinematic-hybrid-score/blackout-protocol/README.md)

#### Generation prompt

```text
Use music-compose, music-produce and music-evaluate with the cinematic-hybrid-score extension pack.

Create a 95-second hybrid score cue called "Blackout Protocol" for the following scene.

Scene:
A satellite-control engineer enters a dark operations room after a total systems failure. Emergency lights pulse. She crosses the room while speaking quietly with a colleague over radio from 00:15 to 00:38. At 00:52 the main tracking display unexpectedly comes back online and reveals one impossible moving signal. She approaches the screen as the signal accelerates. At 01:31 the picture cuts abruptly to black.

Musical function:
- establish controlled uncertainty, not horror
- leave clear space for dialogue between 00:15 and 00:38
- create a recognisable two- or three-note thematic cell
- make the reveal at 00:52 musically legible without a trailer-style impact cliché
- increase urgency after the reveal while preserving the thematic identity
- end precisely with the cut to black, allowing only a deliberately chosen tail if it supports the edit

Production language:
- hybrid acoustic/electronic
- low strings or string-like texture for tension
- restrained synth pulse
- sparse processed percussion introduced only after the reveal
- no vocals
- no wall-to-wall orchestral density

Workflow:
- derive spotting requirements before composing
- create a cue sketch first
- create a mockup before final production
- evaluate dialogue space and sync points before increasing fidelity
- preserve the approved thematic cell through production
- repair local sync or transition problems locally where possible

Delivery:
- final stereo cue
- timing notes for major sync points
- cue stems only if genuine source production supports them

Evaluation priorities:
- scene alignment
- dialogue space
- thematic coherence
- reveal timing
- dramatic progression
- clean ending at picture cut
- no false claim of stems
```

**What it proves:** the pack changes the unit of work from a song/track to a sync-aware cue with spotting, mockup and picture-driven evaluation.

---

## 6. `adaptive-game-score`

**Format:** adaptive music set  
**Use context:** video game  
**Primary grammar:** modular states, loops and transitions  
**Typical genre space:** hybrid electronic, cinematic game music, chiptune/electronic where requested

### Production profile

The pack prioritises:

```text
shared thematic identity
→ loopable state material
→ compatible layers / intensity states
→ transitions + stingers
→ runtime-oriented metadata
```

Typical characteristics:

- instrumental by default;
- stable tempo/meter within one adaptive system;
- loop-safe segment boundaries;
- related exploration/combat/intensity states;
- layers designed for compatibility when declared;
- stingers and transition notes;
- no requirement to implement Wwise/FMOD/runtime logic.

### Showcase — Frozen Relay

An adaptive set for a frozen industrial facility with exploration, tension and combat states sharing one motif.

[Example README](../examples/packs/adaptive-game-score/frozen-relay/README.md)

#### Generation prompt

```text
Use music-compose, music-produce and music-evaluate with the adaptive-game-score extension pack.

Create an adaptive music set called "Frozen Relay" for a science-fiction game level set in an abandoned communications facility buried under ice.

Game states:
1. Exploration: quiet movement through empty machinery spaces
2. Tension: the player has evidence that something is active nearby but combat has not started
3. Combat: fast, dangerous engagement in the same environment
4. Stinger: a short success/recovery event after the encounter

Shared musical identity:
- Tempo: 110 BPM
- Meter: 4/4
- Core motif: one short, recognisable motif shared across all states
- Harmonic language: cold, open, restrained dissonance
- Palette: granular ice-like textures, muted electronic pulse, low synthetic bass, sparse metallic percussion
- No vocals

Structure and compatibility:
- exploration loop: 32 bars, seamless
- tension state: must be able to enter cleanly at bar-aware boundaries and clearly increase uncertainty without becoming full combat
- combat state: higher rhythmic density and intensity while retaining motif identity
- stinger: 2-4 seconds, decisive but not celebratory
- keep tempo and meter compatible across the main states
- if using vertical layers, declare which layers are designed to play simultaneously

Workflow:
- design the state relationship before producing final audio
- validate loop points and transition behaviour early
- approve the shared motif before building all states
- create low-cost state sketches first
- produce/refine each state without mutating the approved motif unnecessarily

Delivery:
- exploration loop
- tension state or layer
- combat state or layer
- recovery stinger
- BPM and meter metadata
- loop-point and transition notes
- stems/layers only when genuinely produced as independent compatible material

Evaluation priorities:
- seamless loops
- thematic identity across states
- meaningful intensity differentiation
- transition-safe boundaries
- state/layer compatibility where declared
- no clicks or tail truncation at loops
- no linear-only master presented as an adaptive deliverable
```

**What it proves:** the pack produces a modular music system rather than one linear master and preserves the boundary between music assets and game-runtime implementation.

---

## 7. `premium-brand-music`

**Format:** brand theme / campaign music / sting  
**Use context:** advertising / product film / social  
**Primary grammar:** immediate sonic identity plus exact-duration variants  
**Typical genre space:** premium electronic, electro-acoustic, minimal cinematic advertising

### Production profile

The pack prioritises:

```text
brand character
→ memorable sonic cell
→ full version
→ exact-duration cutdowns
→ sting / mnemonic
```

Typical characteristics:

- concise thematic identity;
- exact duration as a hard delivery requirement;
- clean edit points;
- controlled dynamics and polish;
- multiple versions sharing recognisable identity;
- no assumption that maximum density or loudness equals premium quality.

### Showcase — Aperture One

A premium camera launch theme with 60s, 30s, 15s and 6s variants built around one four-note mnemonic.

[Example README](../examples/packs/premium-brand-music/aperture-one/README.md)

#### Generation prompt

```text
Use music-compose, music-produce and music-evaluate with the premium-brand-music extension pack.

Create a premium brand-music package called "Aperture One" for the launch of a high-end mirrorless camera.

Brand character:
- precise
- quiet confidence
- tactile engineering
- modern without sounding futuristic
- premium without orchestral bombast

Core identity:
- create one memorable four-note sonic mnemonic that can survive every duration variant
- instrumental only
- production language: minimal electro-acoustic; tactile clicks/percussive details, warm low synth, restrained piano or mallet tone, fine-grained textural movement
- avoid generic corporate uplift, epic trailer drums and glossy EDM builds

Required versions:
- 60-second hero version
- 30-second cutdown
- 15-second social/product version
- 6-second sting

Workflow:
- explore three mnemonic candidates cheaply and select one
- approve the mnemonic before producing the full 60-second version
- design clear internal edit points so cutdowns feel composed rather than chopped
- derive every shorter version from the approved identity
- preserve the mnemonic's interval/rhythm identity across all variants unless explicitly reopened

Delivery requirements:
- exact durations for all four versions
- clean starts and endings
- consistent sonic identity
- enough negative space for product sound or voice-over where later required
- no native-stem claim unless genuine source stems exist

Evaluation priorities:
- mnemonic recognisability
- premium restraint
- exact-duration compliance
- coherence across variants
- clean edit points
- room for downstream voice/product sound
- no accidental shift into generic motivational advertising music
```

**What it proves:** the pack treats duration variants and brand identity as first-class production requirements rather than trimming one generic track after the fact.

---

## 8. Choosing a Pack

Use the production grammar first:

| Need | Start with |
|---|---|
| Intimate lyric/performance-led song | `intimate-singer-songwriter-single` |
| Long-form DJ/club evolution | `melodic-techno-club-track` |
| Cue synchronised to picture/narrative | `cinematic-hybrid-score` |
| Loops, layers, states and transitions | `adaptive-game-score` |
| Brand theme, sting and cutdowns | `premium-brand-music` |

Do not create another pack merely because the desired genre differs.

For example:

```text
"dark progressive techno"
→ normally adapt melodic-techno-club-track through the project brief

"acoustic breakup song"
→ normally adapt intimate-singer-songwriter-single

"orchestral suspense cue"
→ normally adapt cinematic-hybrid-score
```

Create a new pack only when the workflow, artifact requirements, delivery contract, preservation rules or evaluation target materially diverge.

---

## 9. Authoring New Packs

Use the optional `music-pack-author` skill when a new reusable production grammar is justified.

The authoring flow is:

```text
pack brief
→ overlap check against catalogue
→ production-grammar justification
→ pack dimensions
→ operational production profile
→ core-skill integration
→ pack-aware evaluation
→ showcase example + full prompt
→ behavioural evals
→ self-contained Agent Skill package
```

A new pack is incomplete until it has at least one showcase example whose README contains the full generation prompt.
