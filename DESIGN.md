---
name: Kynetik Koncepts
description: Dubai coachbuilder marketing site — carbon-fibre builds on modern platforms
colors:
  vintage-yellow: "#E9BE5F"
  kynetik-black: "#202020"
  carbon-grey: "#353535"
  foster-white: "#ECECEC"
  olive-green: "#808000"
  media-black: "#141414"
typography:
  display:
    fontFamily: "Space Grotesk, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 5.2rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "0.03em"
  headline:
    fontFamily: "Space Grotesk, Arial Narrow, sans-serif"
    fontSize: "clamp(2.1rem, 5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "0.04em"
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  tile-title:
    fontFamily: "Space Grotesk, Arial Narrow, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "24px"
  md: "56px"
  lg: "120px"
components:
  button-primary:
    backgroundColor: "{colors.vintage-yellow}"
    textColor: "{colors.kynetik-black}"
    rounded: "{rounded.none}"
    padding: "17px 30px"
  button-primary-hover:
    backgroundColor: "#f2cd7d"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foster-white}"
    rounded: "{rounded.none}"
    padding: "17px 30px"
  button-ghost-hover:
    textColor: "{colors.vintage-yellow}"
---

# Design System: Kynetik Koncepts

## Overview

**Creative North Star: "The Coachbuilder's Blueprint"**

Kynetik Koncepts reads like a workshop drawing, not a SaaS marketing site: numbered indices, monospace labels, hairline rules, and full-bleed real photography stand in for the decoration a typical luxury-brand microsite would reach for. The system is restrained, precise, and technical — every element earns its place through repetition and discipline (01 through 09, always), not through embellishment. Vintage Yellow is spent like a signature stamp, not a paint color: it marks the thing that matters on a given screen (an eyebrow, a hairline, the one CTA) and stays absent everywhere else.

Depth and warmth come from the real photography and deep, near-black grounds, not from surface treatment. Type stays quiet and functional so the car photography and the workshop-drawing motifs (indices, rails, hairlines) carry the emotional weight instead.

**Key Characteristics:**
- Flat-by-default: no card shadows anywhere; the one exception (a soft glow on the Process rail's active-stage dot) is a deliberate, rare signal, never decoration.
- Sharp corners everywhere except true circles (cursor ring/dot, the rail's progress dot, the reduced-motion process icon badge) — no soft-rounded cards.
- Every tile, panel, and value column carries a two-digit mono index (01, 02, 03...) like a catalogue or blueprint sheet entry.
- Resting state is deliberately plain; craft shows up in the hover/reveal transition (hairline extends, description reveals), not the default state.

## Colors

A near-monochrome black/grey/white system with one reserved accent; the accent's rarity is the entire point.

### Primary
- **Vintage Yellow** (`#E9BE5F`): the single accent. Eyebrows, the drawn-in hairline rule, index numbers, the primary CTA button, active/hover states. Never used for large fills or backgrounds outside the CTA button itself.

### Neutral
- **Kynetik Black** (`#202020`): the default ground for most sections and body text color inversely on light grounds. Not a pure `#000` — carries a faint warmth consistent with the brand's photography.
- **Carbon Grey** (`#353535`): the secondary ground (the "What We Stand For" / Impact section, the Process stage-visual backdrop before a photo loads). A deliberate, confirmed choice from an earlier revision — do not reopen it as a "flat/boring" problem; treat layout and interaction as the levers instead.
- **Foster White** (`#ECECEC`): primary text color on dark grounds, and the ground color for the rare light section (`.ground-white`). Body copy on dark grounds is rarely pure white — commonly stepped down to 50–75% opacity (`rgba(236,236,236,0.5–0.75)`) for secondary text (meta lines, descriptions, labels).
- **Olive Green** (`#808000`, retired from active use): still declared as a brand token from the original guidelines but not currently referenced anywhere in the live CSS. **The Gold-on-Olive Rule.** The Vintage Yellow accent must never sit directly on Olive Green — a strict brand-guideline rule preserved even though Olive Green isn't in current use.
- **Media Black** (`#141414`): a deliberately darker-than-Kynetik-Black recessed ground, reserved for photo/video embed containers (`.media`, `.social-embed`) and the small dark circle behind an icon ring (`.ig-cta__ring-inner`) — never a section ground. Promoted from a repeated literal to a named token during the full-site polish pass.

### Named Rules
**The One Accent Rule.** Vintage Yellow appears on a small fraction of any given screen — an eyebrow, a hairline, one button, a handful of index numbers. If a new element reaches for a second saturated color, that's the signal something has gone off-brand.

## Typography

**Display Font:** Space Grotesk (with Arial Narrow, sans-serif fallback)
**Body Font:** Helvetica Neue (with Helvetica, Arial, sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback)

**Character:** A technical/editorial pairing — Space Grotesk carries every headline and label in uppercase, wide letter-spacing, like stenciled workshop signage; Helvetica Neue stays quiet for body copy; IBM Plex Mono marks anything numeric or meta (indices, counts, timestamps, fine print) as data, not prose.

### Hierarchy
- **Display** (700, `clamp(2.6rem, 7vw, 5.2rem)`, line-height 1.08): the largest headline on a page — the homepage Hero only. Always uppercase, 0.03em tracking.
- **Page Hero** (700, `clamp(2.2rem, 6vw, 3.8rem)`, line-height 1.08): the `.page-hero .h1` on every secondary page (Offering, Pedigree, Downloads, each project detail page). Deliberately one step down from Display — each of these pages gets its own headline moment, but the homepage Hero stays the single largest statement on the site. Uppercase, 0.03em tracking. (Round 12: promoted from an undocumented override to a named tier — headline-dominance review confirmed it already reads as the clear anchor of its own page, nothing in that frame competes with it, so this documents the working value rather than changing it.)
- **Headline** (700, `clamp(2.1rem, 5vw, 3.4rem)`, line-height 1.08): standard section headline (`.h2`), reused identically across every homepage section and both Pedigree pillars. Uppercase, 0.04em tracking.
- **Stage Headline** (700, `clamp(56px, 7vw, 96px)`, line-height 1.02): The Process's own per-stage headline (`.stage-content__title`) — larger than a standard Headline because it's the sole text anchor of a large content panel sitting directly beside a full-bleed photo across 9 consecutive stages, not a one-off section intro. Uppercase, 0.03em tracking. (Round 12: pushed well past its round-7 minimum for exactly this reason.)
- **Eyebrow** (600, 0.78rem, 0.24em tracking, uppercase): the small Vintage Yellow label above every section headline ("Offerings", "History · The Origin", "What We Stand For").
- **Tile Title** (700, 1.1rem, 0.02em tracking, uppercase): the title line inside a repeating card/tile component (`.value-tag__title`, `.social-block__handle`) — smaller and tighter-tracked than a section Headline since it's reading as a component label, not a page-level heading.
- **Body** (400, 1.05rem for `.sub-line` intros / 16px for running body, line-height 1.55): plain-language supporting copy under headlines. Cap around 36em measure for sub-lines.
- **Label** (IBM Plex Mono, 0.7–0.85rem, 0.04–0.16em tracking): indices, meta lines, nav links, footer legal text, stage tags, mono-numbered counters. 0.04em is the floor for anything that can run longer than a couple of words (breadcrumbs, contact meta, stage-tag captions); reserve the top of the range (0.14–0.16em) for genuinely short labels only.

### Named Rules
**The Uppercase-and-Tracked Rule.** Anything set in Space Grotesk is uppercase with deliberate letter-spacing; the font never appears in sentence case. Reserve sentence-case, tighter-tracked type for Helvetica body copy only.

## Layout

Content sits in a `.wrap` container (max-width 1440px, 24px side padding on mobile, 56px from 768px up) — the same container is reused for every section rather than each section inventing its own width. Sections default to generous vertical rhythm: 120px top/bottom padding at desktop, dropping to 84px under 767px (56px for `.section--tight`). Grids (Offerings, What We Make, Process rail, Impact values) commonly use a 1px/2px hairline gap with a translucent divider color instead of visible gutters, so the grid itself reads as a drawn table rather than floating cards. Breakpoints are chosen per-section based on content (600px/900px/1000px for photo and tile grids, 700px for the five-column Impact layout, 860px for the Process pinned section, 768px/960px for nav) rather than a single fixed system-wide breakpoint set.

## Elevation & Depth

**Flat by default, deliberately.** There are no card shadows anywhere in the system. Depth is conveyed through ground-color contrast (Kynetik Black vs. Carbon Grey vs. Foster White sections stacking against each other) and through the hairline/reveal motif, not through elevation. The one exception is a small glow (`box-shadow: 0 0 12px rgba(233,190,95,0.7)`) on the Process progress rail's active-stage dot — a rare, meaningful signal ("you are here"), not a decorative touch.

### Named Rules
**The Flat-By-Default Rule.** Surfaces stay flat at rest. The only depth cue permitted is the Vintage Yellow glow, and only to mark active/current state on a progress indicator — never applied to cards, buttons, or panels for decoration.

## Shapes

Sharp rectangles everywhere, with true circles as the sole exception: the custom cursor ring/dot, the Process rail's progress dot, the reduced-motion Process list's icon badge, and the mobile sticky WhatsApp button (which collapses to a circular icon-only button under 600px). No intermediate radius values exist anywhere in the system — an element is either a hard 0px corner or a full 50% circle, never `4px` or `8px` in between.

## Components

### Buttons
- **Shape:** hard rectangle (`0px` radius) always.
- **Primary:** Vintage Yellow background, Kynetik Black text, `17px 30px` padding, uppercase Space Grotesk label with 0.14em tracking.
- **Hover:** primary lightens to `#f2cd7d`; ghost gains a Vintage Yellow border and text color. Both transition over `var(--dur-med)` (500ms) with the site's precise cubic-bezier ease.
- **Ghost:** transparent background, `1px solid rgba(236,236,236,0.35)` border, Foster White text — the secondary action style (e.g. "View" / "Download" on downloads).

### Navigation
- Uppercase Space Grotesk links, 0.72rem, 0.16em tracking, 85% opacity at rest. The CTA ("Start a Build") is styled as a small primary button inline in the nav. Mobile collapses to a full-screen menu with much larger (2rem) stacked links.

### The Numbered Tile (signature component)
The recurring content unit across Offerings, What We Make, and Impact: a two-digit mono index in Vintage Yellow, a Space Grotesk uppercase title, a short hairline rule (28px, extending to 56px on hover), and a description that stays hidden (`max-height:0; opacity:0`) until hover reveals it — except on touch (`max-width:900px`), where the description is unconditionally visible since there's no hover to rely on. Offerings/Impact render this as flat text tiles on a hairline grid; What We Make renders the same pattern over full-bleed photography with a bottom scrim for legibility. New sections that need a repeating "labeled item" unit should reuse this pattern rather than inventing a card-with-icon layout.

### The Hairline (signature component)
**The Hairline Rule.** Every section headline is followed by a 1px Vintage Yellow rule that animates from `width:0` to `56px` as the section scrolls into view (driven by an `.is-in` class toggle), and the same motif reappears at tile/component scale, extending from 28px to 56px on hover. Any new section or component that needs a divider, underline, or "this is now active" indicator should reuse the hairline-draw-in / hairline-extend pattern rather than inventing a new one — it is the system's single recurring signature gesture, doing the job a shadow or a border-radius change would do in a more decorative system.

## Do's and Don'ts

### Do:
- **Do** reserve Vintage Yellow for one signal per screen — an eyebrow, a hairline, one button, index numbers. Never a second saturated color alongside it.
- **Do** reuse the hairline-draw / hairline-extend motif for new dividers, underlines, or active-state indicators (see The Hairline Rule).
- **Do** keep new "labeled item" grids (cards, tiles, columns) in the Numbered Tile pattern: mono index, uppercase title, hairline rule, hover/touch-revealed description.
- **Do** make any newly revealed content (a hover description, an expanded detail) unconditionally visible under `max-width:900px` so touch devices aren't locked out of it.
- **Do** match real photography to a section by what it actually depicts; flag a gap rather than force a mismatch (see PRODUCT.md's Product Principles).

### Don't:
- **Don't** add card shadows, glassmorphism, or gradient fills. The system is flat by default; the only permitted glow is the Vintage Yellow active-state signal on the Process rail.
- **Don't** introduce an intermediate border-radius. Corners are either hard 0px or true 50% circles.
- **Don't** reopen the Carbon Grey ground on the Impact section as a "make it more colorful" problem — it's a confirmed brand choice; layout, spacing, and interaction are the tools for fixing a flat-feeling section, not color.
- **Don't** place the Vintage Yellow accent directly on Olive Green, even though Olive Green is currently unused (The Gold-on-Olive Rule).
- **Don't** set Space Grotesk in sentence case, or drop its uppercase/tracked treatment — that contrast against Helvetica body copy is what gives the hierarchy its structure.
