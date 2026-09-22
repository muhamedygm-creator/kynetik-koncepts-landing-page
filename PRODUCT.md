# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospective clients researching Kynetik Koncepts before reaching out — car owners (or their representatives) evaluating the workshop's credibility and capability before starting a WhatsApp conversation or build inquiry. Primarily UAE/GCC based, reflecting Kynetik's real regional client base; the site is not positioned for a global audience.

## Product Purpose

Kynetik Koncepts is a Dubai-based modern coachbuilder producing one-of-one carbon-fibre builds (roughly AED 400,000+ range). The site's job is to build enough trust, craft credibility, and clarity in a single visit to convert a researching visitor into a WhatsApp/contact inquiry — not to transact online.

## Positioning

"Carbon fibre is our coachwork, modern platforms are our chassis." Kynetik positions itself as the return of the classical coachbuilder tradition, applied to modern platforms (Porsche Taycan, Ferrari, Rolls-Royce, BMW, etc.), not as a body-kit, wrap, or aftermarket-tuning shop. Five build categories give the offering shape: Bespoke One-of-One, Karbon Ikonics, Karbon Klassics, Karbon Elektric, Karbon Toys.

## Operating Context

Real production marketing site, multi-page (`index.html` homepage, `pedigree.html` portfolio, `downloads.html`, `projects/*.html` project detail pages), shared nav/footer injected client-side by `assets/js/site-chrome.js`. Primary conversion paths are the sticky WhatsApp button and the "Start a build" CTA. No e-commerce, no account system, no CMS — content is hand-edited HTML directly.

## Capabilities and Constraints

Real photography, partially matched to sections by actual content; a real edited hero video; a real extracted logo. WhatsApp number and some social handles are still placeholders pending confirmation before launch. No framework, no build step, no `package.json` — edits are made directly to `index.html` / `assets/css/site.css` / `assets/js/site-interactions.js`.

## Brand Commitments

Real logo and brand guideline colour system: Kynetik Black `#202020`, Carbon Grey `#353535`, Foster White `#ECECEC`, Vintage Yellow `#E9BE5F` (accent), Olive Green `#808000` (largely retired from active use after an earlier revision). Typography: Broche / Helvetica / IBM Plex Mono. Strict brand rule: the gold accent never sits directly on the olive green. Established site-wide interaction language — a hairline rule that extends on hover, and a description that reveals on hover rather than sitting permanently visible — should be reused by new sections rather than replaced with a new pattern.

## Evidence on Hand

Real project photography for several completed/in-progress builds (a matte-wrapped Rolls-Royce, a full-exposed-carbon Ferrari, a Porsche Taycan, carbon aero details on a blue Porsche, an SF90 Spider interior, a dune-buggy render), used across the homepage and `pedigree.html`/`projects/*.html`. No testimonials, pricing, or case-study metrics are published on the site — future work must not fabricate them. Several Process-section stages (3D Scanning, 3D Printing, Prototyping, Pre-Molding, Mold Production, Fitment) currently use explicitly-flagged placeholder photography because no real photography exists yet for those production stages; future work should replace those placeholders rather than build on top of them.

## Product Principles

- Real photography must be matched to a section by what it actually depicts, never by filename, order, or convenience — where no suitable photo exists, flag the gap rather than force a mismatch or fabricate one.
- Edits are surgical, not rebuilds: never regenerate or overwrite the codebase wholesale, even for a large-looking change.
- New sections reuse the site's already-established interaction language (hairline-extends-on-hover, description-reveals-on-hover) rather than introducing a new pattern each time.
- When a design prototype or external spec conflicts with the site's already-published real copy, preserve the real copy and only adopt the prototype's interaction/layout/CSS mechanics.
- On touch devices, nothing essential (like a revealed description) may depend on hover — it must be visible without it.

## Accessibility & Inclusion

No formal standard (e.g. a WCAG level) has been set as a binding requirement. Continue the general good-practice level already present in the codebase: meaningful `alt` text, `aria-label`s on icon-only controls, and `prefers-reduced-motion` support across hero video autoplay, cursor effects, magnetic buttons, scroll-scrub reveals, and the Process crossfade.
