# kern: design and architecture

What kern is, how it is consumed, and the decisions behind that shape. Written before the library was extracted and updated as decisions change.

## Context

The hipuku experiments (specifi, hexicon, gray-scott) are independent Vite/React apps, each its own repository and deployment. Left alone they drift: three subtly different buttons, three spacing scales, three definitions of "muted text". kern defines the sidebar, the token palette, the type rhythm and the motion **once**, and all three consume it.

kern is deliberately small and opinionated. It holds the specific set of parts these experiments share.

## Architecture: source-only, no build

**kern ships as TypeScript source with no build step and no npm publish.** Consumers resolve `@kern/*` through a Vite path alias pointed straight at kern's `src/`:

```ts
// each experiment's vite.config.ts
resolve: { alias: { '@kern': path.resolve(__dirname, 'node_modules/kern/src') } }
```

The matching `tsconfig` `paths` entry mirrors it for the type checker.

**Why source-only over a compiled package:**

- No build artefact means no stale-dist class of bug, and no publish step between an edit and a consumer seeing it.
- The experiments already run Vite + Tailwind v4; they compile kern's `.tsx` and scan its classes as if it were their own source. A pre-built bundle would gain nothing and would fight Tailwind's content scanning.
- Distribution is a `github:hipuku/kern` dependency plus the alias. The git ref pins the version, and `npm link` swaps in a live symlink for local development.

**Consequences that must be respected:**

- kern uses **relative internal imports** (`../lib/utils`), never `@/`, so a consuming app's own `@/` alias can't accidentally resolve into kern's tree.
- Each consumer must register kern for Tailwind scanning: `@source "../node_modules/kern/src";` in its `index.css`. Without it, kern's utility classes are absent from the generated CSS.
- `lucide-react`, `react`, and `react-dom` are **peer dependencies**, so the consumer owns the single copy. That is why `NavItem.icon` is typed as `ComponentType`: a nominal `LucideIcon` from a possibly-different lucide version would clash.

## Component hierarchy

Atomic design, one direction of dependency only:

```
atoms/       Single-purpose primitives. Depend on tokens only.              (16)
             BulletItem, Button, Card, CopyButton, ExternalLink, IconButton,
             IconLink, Icons (custom brand SVGs), InlineCode, Input, Label,
             Logo, StatusChip, Textarea, ToggleChip, Wordmark
molecules/   Composed from atoms + layout.                                  (16)
             BulletList, CalloutCard, CanvasStage, ChipGroup, Colophon,
             DataTable, EmptyState, Field, Metric, ParamSlider, Section,
             SocialBar, StatCard, ToolLink, TransportControls, ViewHeader
organisms/   Full UI regions; may own local state.                           (3)
             AppSidebar, ToolView, Workbench
templates/   Page structure, independent of the content that fills it.       (3)
             AppShell, ViewContainer, ViewportGate
utils/       Behaviour with no UI of its own in the ordinary case.           (1)
             ErrorBoundary
```

**38 components across the four UI layers**, plus `ErrorBoundary`. The organisms and templates
layers are v1 additions: before the rebuild there was one of each, and the three experiments were
each hand-rolling the parts that are now `ToolView`, `Workbench`, `CanvasStage`,
`TransportControls`, `Card`, `IconLink`, `BulletList`, `ChipGroup`, `Metric` and `EmptyState`. Those
were the components most likely to drift, because every app had its own copy and no two were
reviewed together.

Atoms never import molecules or organisms; molecules may use atoms; organisms may use both; templates arrange organisms. `src/lib/` holds the shared foundations components compose rather than re-derive: `utils.ts` (the `cn()` class-merge helper), `focus.ts` (the focus ring), and `accent.ts` (the accent colour vocabulary). `src/tokens/` holds the token source and its Storybook documentation pages.

**Departures from the canonical five layers.**

`utils/` exists because `ErrorBoundary` renders nothing in the ordinary case and its job is control flow. Atomic design classifies UI, and filing control flow under `organisms` made the word mean two different things. It lived there until v1.

There is no `pages/` layer, and there will not be one. kern has no pages: the experiments are the pages, and they live in their own repositories. `templates/AppShell` is the boundary: kern owns the structure, and each experiment owns what fills it.

**Component API contract.** Every component extends its underlying element (`ComponentPropsWithRef<'button'>` and so on), accepts and merges `className` through `cn()`, and forwards refs. Before v1 each component accepted only the props someone had happened to need: nine silently dropped `className`, nothing could be disabled or take a ref, and `IconButton` could not be a submit button. Variants come from `class-variance-authority`, and anything button-shaped composes `buttonVariants` rather than restating padding, radius and focus behaviour.

**A public API.** `src/index.ts` and the per-layer barrels are the supported surface. Consumers previously deep-imported `@kern/atoms/ToggleChip`, which made every file path a public contract, so moving `ErrorBoundary` between layers would have been a breaking change. React `>=19` is a peer requirement, since components take `ref` as an ordinary prop rather than through `forwardRef`.

**Icons.** Interface glyphs come from **lucide-react**; brand marks lucide doesn't provide (e.g. the GitHub logo) are hand-rolled `currentColor` SVGs in `atoms/Icons.tsx`. Both kinds are plain `ComponentType<{ className?: string }>`, so they drop into any icon slot interchangeably: `IconButton`, `SocialBar`, `AppSidebar` nav items. The `Atoms/Icons` story is a catalog of the full icon vocabulary used across kern and the experiments.

## Token system

`src/tokens/tokens.ts` is the single source of truth. Every token value in the system is written there exactly once, and two things consume it:

- **`scripts/build-tokens.mjs`** generates `src/styles/primitives.css` and `src/styles/typography.css`. The generated CSS is committed, because kern ships as source and a consumer must never need a build step; `npm run tokens:check` regenerates into memory and diffs, so a token edit that skipped the generator fails CI instead of shipping stale CSS.
- **The Storybook token pages** render straight from the same objects, so the published documentation cannot describe a system that no longer ships.

Before v1 the palette was typed out by hand in three places (`tokens.css`, the Colours story, and the Storybook background config) and the type scale in two, with nothing connecting them. The published documentation described a system that had already moved.

Three tiers:

- **Primitives.** The void neutral ramp (`--color-void-0…90`) and the named accent ramps (nebula, pulsar, aurora, …) as raw hex. They carry the values and say nothing about where the values are used.
- **Semantic roles.** The decisions components actually make. Surfaces (`surface-page`, `surface-panel`, `surface-raised`, `surface-hover`), ink (`ink-title`, `ink-strong`, `ink-lead`, `ink-body`, `ink-muted`), and lines (`line-subtle`, `line`, `line-strong`), each generating a Tailwind utility: `bg-surface-raised`, `text-ink-body`, `border-line-subtle`.
- **The accent seam.** `--primary`, `--ring`, `--link`. Components reference these and never a named colour, so an experiment retints every shared component from its own `index.css`.

The middle tier was missing until v1.1. The neutral half of the system had no semantic layer at all: components reached straight for `bg-void-20` and `text-void-60`, and the roles were real but unnamed. `text-void-60` appeared 136 times across four codebases, always meaning "body text", and a contrast fix meant editing 44 call sites rather than one token.

**The ramp has two zones, deliberately.** Steps 0–30 are surfaces and sit close together (ΔL ≈ 0.05), which is what an elevation step should be; their low contrast *ratios* against each other are not a defect, because contrast ratio is the wrong measure for two adjacent surfaces. Steps 50–90 carry text. Step 40 is the transition and is decorative only: at 2.60:1 on the page background it must never carry text, which is why it is named `line-strong` rather than given an ink role.

**Contrast is enforced.** Each ink role declares the surfaces it is permitted on, and `contrast.test.ts` asserts exactly those pairings clear WCAG AA. kern previously had a contrast matrix that measured every colour and prevented nothing. It was possible to ship a 2.6:1 label underneath it, and kern did. The colour maths lives in `lib/colour.ts` so the test and the published matrix compute identically.

**Spacing is a multiplier.** Tailwind derives every spacing utility from one base unit: `p-4` compiles to `calc(var(--spacing) * 4)`. kern shipped a twelve-step `--space-*` enumeration alongside this until v1.1; it generated nothing, because Tailwind's namespace is `--spacing`. Six named layout roles (`gap-tight` … `gap-major`) cover the decisions that recur.

Type is role-based with a matching `.type-*` composite class per role, and a role may only declare a weight Parkinsans actually ships. `h1` and `h2` declared weight 100 until v1.1, which the font does not have, so the browser silently substituted 300.

**Stylesheet layout.** Each file's name says what it holds:

```
styles/primitives.css       generated: primitives, semantic roles, radius, motion
styles/typography.css       generated: type axes, body defaults, .type-* classes
styles/hipuku-logo.css      hand-written component CSS (@property + keyframes)
styles/storybook-docs.css   hand-written, Storybook docs only
tokens.css                  the two generated halves, tokens with no components
kern.css                    the full library entry consumers import
index.css                   Storybook's entry: Tailwind + kern.css + docs CSS
```

## Alternatives considered

- **Publish kern to npm.** Rejected for now. The source-alias model already gives three real consumers with zero build/version overhead; a compiled package would add a release step and fight Tailwind scanning for no gain. The public Storybook is the artefact instead. (Revisit if kern is ever consumed outside this portfolio.)
- **A monorepo (pnpm workspace) holding kern and the experiments.** Rejected, and reconsidered at v1 when the question was how to let the experiments keep consuming the old library while `main` was rebuilt. It turned out not to need one: kern's git ref *is* its version, so tagging `v0.1.0` and pinning each experiment to it gave the isolation with one line per app, while `main` moved on and kept deploying to kern.hipuku.dev. A monorepo would have coupled three independently-deployed subdomains into one repository and forced them to move together.
- **CSS-in-JS or a component-scoped stylesheet per component.** Rejected. Tailwind v4 and CSS custom properties already cover theming and variants, and a second styling system would be dead weight.

## Versioning

kern is versioned by git tag, and consumers pin one:

```jsonc
"kern": "github:hipuku/kern#v1.2.0"
```

Until v1 the experiments depended on an unpinned `github:hipuku/kern`, which resolves to whatever `main` is at install time, so an unrelated change to the library could break an experiment on a routine reinstall and no breaking change to kern was ever safe. Pinning is what makes it possible to change an API properly instead of accumulating compatibility shims: tag a new major, and each experiment adopts on its own schedule by bumping one line.

**v1 is released, at `v1.2.0`, and all three experiments are on it.** It was a breaking rebuild: the
templates layer arrived (`AppShell`, `ViewContainer`, `ViewportGate`), organisms grew from one to
three, and every component gained the API contract described above. specifi, hexicon and gray-scott
each bumped `#v0.1.0` to `#v1.2.0` and adopted the new layers, one repository at a time.

A breaking change to a library three apps track by branch has to land everywhere at once, which
in practice means it never lands. Pinned, the rebuild could ship, sit unused for as long as it
needed to, and be adopted per app on whatever day suited that app.

## Open questions

*None currently blocking.* Add here (numbered, assigned) when a decision is outstanding.
