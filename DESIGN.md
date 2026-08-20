# kern — design and architecture

The design record for kern: what it is, how it is consumed, and the decisions behind that shape. Written before the library was extracted and updated as decisions change.

## Context

The hipuku experiments (specifi, hexicon, gray-scott) are independent Vite/React apps, each its own repository and deployment. Left alone they would drift — three subtly different buttons, three spacing scales, three definitions of "muted text". kern exists so that everything a visitor recognises as *hipuku* — the sidebar, the token palette, the type rhythm, the motion — is defined **once** and consumed by all three.

kern is deliberately small and opinionated. It is not a general-purpose UI kit; it is the specific set of parts these experiments actually share.

## Architecture: source-only, no build

The defining decision: **kern ships as TypeScript source with no build step and no npm publish.** Consumers resolve `@kern/*` through a Vite path alias pointed straight at kern's `src/`:

```ts
// each experiment's vite.config.ts
resolve: { alias: { '@kern': path.resolve(__dirname, 'node_modules/kern/src') } }
```

The matching `tsconfig` `paths` entry mirrors it for the type checker.

**Why source-only over a compiled package:**

- No build artefact means no stale-dist class of bug, and no publish step between an edit and a consumer seeing it.
- The experiments already run Vite + Tailwind v4; they compile kern's `.tsx` and scan its classes as if it were their own source. A pre-built bundle would gain nothing and would fight Tailwind's content scanning.
- Distribution is a `github:hipuku/kern` dependency plus the alias — the git ref pins the version, and `npm link` swaps in a live symlink for local development.

**Consequences that must be respected:**

- kern uses **relative internal imports** (`../lib/utils`), never `@/`, so a consuming app's own `@/` alias can't accidentally resolve into kern's tree.
- Each consumer must register kern for Tailwind scanning: `@source "../node_modules/kern/src";` in its `index.css`. Without it, kern's utility classes are absent from the generated CSS.
- `lucide-react`, `react`, and `react-dom` are **peer dependencies** — the consumer owns the single copy, which is why `NavItem.icon` is typed as `ComponentType`, not `LucideIcon` (a nominal type from a possibly-different lucide version would clash).

## Component hierarchy

Atomic design, one direction of dependency only:

```
atoms/       Single-purpose primitives. Depend on tokens only.
             BulletItem, Button, CopyButton, ExternalLink, IconButton,
             Icons (custom brand SVGs), InlineCode, Input, Label, Logo,
             StatusChip, Textarea, ToggleChip, Wordmark
molecules/   Composed from atoms + layout.
             CalloutCard, Colophon, DataTable, Field, ParamSlider, Section,
             SocialBar, StatCard, ToolLink, ViewHeader
organisms/   Full UI regions; may own local state.
             AppSidebar
templates/   Page structure, independent of the content that fills it.
             AppShell
utils/       Behaviour with no UI of its own in the ordinary case.
             ErrorBoundary
```

Atoms never import molecules or organisms; molecules may use atoms; organisms may use both; templates arrange organisms. `src/lib/` holds the shared foundations components compose rather than re-derive: `utils.ts` (the `cn()` class-merge helper), `focus.ts` (the focus ring), and `accent.ts` (the accent colour vocabulary). `src/tokens/` holds the token source and its Storybook documentation pages.

**Two departures from the canonical five layers.**

`utils/` exists because `ErrorBoundary` is not a region of the interface — it renders nothing in the ordinary case, and its job is control flow. Atomic design classifies UI; filing control flow under `organisms` made the word mean two different things. It lived there until v1.

There is no `pages/` layer, and there will not be one. kern has no pages: the experiments are the pages, and they live in their own repositories. `templates/AppShell` is the boundary — kern owns the structure, each experiment owns what fills it.

**Component API contract.** Every component extends its underlying element (`ComponentPropsWithRef<'button'>` and so on), accepts and merges `className` through `cn()`, and forwards refs. Before v1 each component accepted only the props someone had happened to need: nine silently dropped `className`, nothing could be disabled or take a ref, and `IconButton` could not be a submit button. Variants come from `class-variance-authority`, and anything button-shaped composes `buttonVariants` rather than restating padding, radius and focus behaviour.

**A public API.** `src/index.ts` and the per-layer barrels are the supported surface. Consumers previously deep-imported `@kern/atoms/ToggleChip`, which made every file path a public contract — moving `ErrorBoundary` between layers would have been a breaking change. React `>=19` is a peer requirement, since components take `ref` as an ordinary prop rather than through `forwardRef`.

**Icons.** Interface glyphs come from **lucide-react**; brand marks lucide doesn't provide (e.g. the GitHub logo) are hand-rolled `currentColor` SVGs in `atoms/Icons.tsx`. Both kinds are plain `ComponentType<{ className?: string }>`, so they drop into any icon slot interchangeably — `IconButton`, `SocialBar`, `AppSidebar` nav items. The `Atoms/Icons` story is a catalog of the full icon vocabulary used across kern and the experiments.

## Token system

`src/tokens/tokens.ts` is the single source of truth. Every token value in the system is written there exactly once, and two things consume it:

- **`scripts/build-tokens.mjs`** generates `src/styles/primitives.css` and `src/styles/typography.css`. The generated CSS is committed, because kern ships as source and a consumer must never need a build step; `npm run tokens:check` regenerates into memory and diffs, so a token edit that skipped the generator fails CI instead of shipping stale CSS.
- **The Storybook token pages** render straight from the same objects, so the published documentation cannot describe a system that no longer ships.

Before v1 the palette was typed out by hand in three places — `tokens.css`, the Colours story, and the Storybook background config — and the type scale in two, with nothing connecting them. Documentation drifting away from the tokens it documents is the exact failure a token system exists to prevent.

Three tiers, not two:

- **Primitives** — the void neutral ramp (`--color-void-0…90`) and the named accent ramps (nebula, pulsar, aurora, …) as raw hex. The ramp, not what the ramp is for.
- **Semantic roles** — the decisions components actually make. Surfaces (`surface-page`, `surface-panel`, `surface-raised`, `surface-hover`), ink (`ink-title`, `ink-strong`, `ink-lead`, `ink-body`, `ink-muted`), and lines (`line-subtle`, `line`, `line-strong`), each generating a Tailwind utility: `bg-surface-raised`, `text-ink-body`, `border-line-subtle`.
- **The accent seam** — `--primary`, `--ring`, `--link`. Components reference these and never a named colour, so an experiment retints every shared component from its own `index.css`.

The middle tier was missing until v1.1. The neutral half of the system had no semantic layer at all: components reached straight for `bg-void-20` and `text-void-60`, and the roles were real but unnamed — `text-void-60` appeared 136 times across four codebases, always meaning "body text". The cost surfaced when a contrast fix meant editing 44 call sites instead of one token.

**The ramp has two zones, deliberately.** Steps 0–30 are surfaces and sit close together (ΔL ≈ 0.05), which is what an elevation step should be; their low contrast *ratios* against each other are not a defect, because contrast ratio is the wrong measure for two adjacent surfaces. Steps 50–90 carry text. Step 40 is the transition and is decorative only — at 2.60:1 on the page background it must never carry text, which is why it is named `line-strong` and not an ink role.

**Contrast is enforced.** Each ink role declares the surfaces it is permitted on, and `contrast.test.ts` asserts exactly those pairings clear WCAG AA. kern previously had a contrast matrix that measured every colour and prevented nothing — it was possible to ship a 2.6:1 label underneath it, and kern did. The colour maths lives in `lib/colour.ts` so the test and the published matrix compute identically.

**Spacing is a multiplier, not a ladder.** Tailwind derives every spacing utility from one base unit: `p-4` compiles to `calc(var(--spacing) * 4)`. kern shipped a twelve-step `--space-*` enumeration alongside this until v1.1; it generated nothing, because Tailwind's namespace is `--spacing`. Six named layout roles (`gap-tight` … `gap-major`) cover the decisions that recur.

Type is role-based with a matching `.type-*` composite class per role, and a role may only declare a weight Parkinsans actually ships — `h1` and `h2` declared weight 100 until v1.1, which the font does not have, so the browser silently substituted 300.

**Stylesheet layout.** Each file's name says what it holds:

```
styles/primitives.css       generated — primitives, semantic roles, radius, motion
styles/typography.css       generated — type axes, body defaults, .type-* classes
styles/hipuku-logo.css      hand-written component CSS (@property + keyframes)
styles/storybook-docs.css   hand-written, Storybook docs only
tokens.css                  the two generated halves — tokens without components
kern.css                    the full library entry consumers import
index.css                   Storybook's entry: Tailwind + kern.css + docs CSS
```

## Alternatives considered

- **Publish kern to npm** — rejected for now. The source-alias model already gives three real consumers with zero build/version overhead; a compiled package would add a release step and fight Tailwind scanning for no gain. The public Storybook is the artefact instead. (Revisit if kern is ever consumed outside this portfolio.)
- **A monorepo (pnpm workspace) holding kern + the experiments** — rejected, and reconsidered at v1 when the question was how to let the experiments keep consuming the old library while `main` was rebuilt. It turned out not to need one: kern's git ref *is* its version, so tagging `v0.1.0` and pinning each experiment to it gave the isolation with one line per app, while `main` moved on and kept deploying to kern.hipuku.dev. A monorepo would have worked against this — coupling three independently-deployed subdomains into one repository and forcing them to move together.
- **CSS-in-JS or a component-scoped stylesheet per component** — rejected. Tailwind v4 + CSS custom properties already cover theming and variants; a second styling system would be dead weight.

## Versioning

kern is versioned by git tag, and consumers pin one:

```jsonc
"kern": "github:hipuku/kern#v0.1.0"
```

Until v1 the experiments depended on an unpinned `github:hipuku/kern`, which resolves to whatever `main` is at install time — so an unrelated change to the library could break an experiment on a routine reinstall, and no breaking change to kern was ever really safe. Pinning is what makes it possible to change an API properly instead of accumulating compatibility shims: tag a new major, and each experiment adopts on its own schedule by bumping one line.

## Open questions

*None currently blocking.* Add here (numbered, assigned) when a decision is outstanding.
