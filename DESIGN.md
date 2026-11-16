# kern: design

The system behind kern: how it is consumed, its component layers, its tokens, accessibility and
versioning, and the decisions behind each.

## Contents

- [Context](#context)
- [Distribution](#distribution)
- [Components](#components)
- [Tokens](#tokens)
- [Accessibility](#accessibility)
- [Enforcement](#enforcement)
- [Versioning](#versioning)
- [Known gaps](#known-gaps)

## Context

The tools kern serves are independent Vite and React apps, each its own repository and deployment:
hexicon, specifi, gray-scott and tokenise. Left alone they drift: a subtly different button in each,
a spacing scale each, a definition of "muted text" each. kern defines the sidebar, the token palette,
the type rhythm and the motion once, and every tool consumes it. It holds the specific set of parts
these tools share, and nothing else.

## Distribution

### Source only, no build

**Decision.** kern ships as TypeScript source with no build step and no npm publish. A tool depends
on `github:hipuku/kern#<tag>`, and kern's `exports` map points its entry points at the source, so
the tool's bundler resolves `kern` like any other package. `lucide-react`, `react` and `react-dom`
are peer dependencies.

**Reason.** No build artefact means no stale-dist class of bug, and no publish step between an edit
and a consumer seeing it. The tools already run Vite and Tailwind v4, and compile kern's `.tsx` and
scan its classes as if it were their own source; a pre-built bundle would gain nothing and would
fight Tailwind's content scanning. The consumer owns the single copy of each peer, which is why
`NavItem.icon` is typed as `ComponentType`: a nominal `LucideIcon` from a different lucide version
would clash.

**Alternatives.** Publishing to npm: rejected for now, since the source model already serves its
consumers with no build or version overhead, and the public Storybook is the artefact instead
(revisit if kern is consumed outside this portfolio). A pnpm monorepo of kern and the tools:
rejected, because tagging `v0.1.0` and pinning each tool gave the same isolation with one line per
app, without coupling independently deployed sites into one repository.

Two consequences follow. kern uses relative internal imports (`../lib/utils`), never `@/`, so a
consumer's own `@/` alias cannot resolve into kern's tree. Each consumer registers kern for Tailwind
scanning with `@source "../node_modules/kern/src";`, or kern's utility classes are absent from the
generated CSS.

### A public API

**Decision.** `src/index.ts` and the per-layer barrels are the supported surface. The `exports` map
lists the barrels and nothing else, so a deep import such as `kern/src/atoms/Input` fails with
`ERR_PACKAGE_PATH_NOT_EXPORTED`.

**Reason.** Consumers used to deep-import `@kern/atoms/ToggleChip`, which made every file path a
public contract. Behind the barrels, `ErrorBoundary` moved from `organisms/` to `utils/` without a
breaking change.

## Components

### Atomic tiers

**Decision.** Atomic design, one direction of dependency only: 38 components in four layers, plus
`ErrorBoundary`.

```text
atoms/       Single-purpose primitives. Depend on tokens only.              (16)
molecules/   Composed from atoms and layout.                                (16)
organisms/   Full UI regions; may own local state.                           (3)
templates/   Page structure, independent of the content that fills it.       (3)
utils/       Behaviour with no UI of its own in the ordinary case.           (1)
```

Atoms never import molecules or organisms; molecules may use atoms; organisms may use both;
templates arrange organisms. `src/lib/` holds the foundations components compose rather than
re-derive: `cn()`, the focus ring and the accent vocabulary.

**Reason.** The organisms and templates layers are v1 additions. Before the rebuild the tools each
hand-rolled the parts that are now `ToolView`, `Workbench`, `CanvasStage`, `TransportControls`,
`Card`, `IconLink`, `BulletList`, `ChipGroup`, `Metric` and `EmptyState`. Those were the parts most
likely to drift, because every app had its own copy and no two were reviewed together.

**Alternatives.** `ErrorBoundary` lived in `organisms/` until v1. It renders nothing in the ordinary
case and its job is control flow, so filing it with UI regions made the word mean two things; it has
`utils/` now. There is no `pages/` layer: the tools are the pages, and `templates/AppShell` is the
boundary between the structure kern owns and what each tool fills it with.

### Component API contract

**Decision.** Every component extends its underlying element (`ComponentPropsWithRef<'button'>` and
so on), merges `className` through `cn()`, and takes `ref` as an ordinary prop (React 19 is a peer
requirement). Variants come from `class-variance-authority`, and anything button-shaped composes
`buttonVariants`.

**Reason.** Before v1 each component accepted only the props someone had happened to need: nine
silently dropped `className`, nothing could be disabled or take a ref, and `IconButton` could not be
a submit button.

### Icons

**Decision.** Interface glyphs come from lucide-react. Brand marks lucide does not provide, such as
the GitHub logo, are hand-rolled `currentColor` SVGs in `atoms/Icons.tsx`. Both are plain
`ComponentType<{ className?: string }>`.

**Reason.** Either kind drops into any icon slot (`IconButton`, `SocialBar`, `AppSidebar` nav items)
interchangeably.

### Desktop only

**Decision.** `templates/ViewportGate` renders the interface at `lg` and above and a short notice
below it, switched with `lg:` and `max-lg:` in CSS.

**Reason.** These are wide-canvas tools, so v1 gates the whole app rather than asking each one to
degrade its own layout. A CSS switch has no resize listener to leak and no flash of the wrong branch
on first paint.

## Tokens

### One source

**Decision.** `src/tokens/tokens.ts` is the single source of every token value.
`scripts/build-tokens.mjs` generates `src/styles/primitives.css` and `src/styles/typography.css` from
it, and the Storybook token pages render from the same objects. The generated CSS is committed.

**Reason.** Before v1 the palette was typed out by hand in three places and the type scale in two,
with nothing connecting them, and the published documentation described a system that had already
moved. The CSS is committed because kern ships as source and a consumer must never need a build
step; `npm run tokens:check` keeps the committed copy honest.

```text
styles/primitives.css       generated: primitives, semantic roles, radius, motion
styles/typography.css       generated: type axes, body defaults, .type-* classes
styles/hipuku-logo.css      hand-written component CSS (@property and keyframes)
styles/storybook-docs.css   hand-written, Storybook docs only
tokens.css                  the two generated halves, tokens with no components
kern.css                    the full library entry consumers import
index.css                   Storybook's entry: Tailwind, kern.css and the docs CSS
```

### Three tiers

**Decision.** Primitives (the void neutral ramp and the named accent ramps, as raw hex), semantic
roles (`surface-page`, `surface-panel`, `surface-raised`, `surface-hover`; `ink-title` to
`ink-muted`; `line-subtle`, `line`, `line-strong`, each generating a Tailwind utility), and the accent
seam (`--primary`, `--ring`, `--link`). Components reference the roles and the seam, never a named
colour, so a tool retints every shared component from its own `index.css`.

**Reason.** The middle tier was missing until v1.1. Components reached straight for `bg-void-20` and
`text-void-60`: `text-void-60` appeared 136 times across four codebases, always meaning body text, and
a contrast fix meant editing 44 call sites rather than one token.

**Alternatives.** CSS-in-JS, or a stylesheet per component. Tailwind v4 and custom properties already
cover theming and variants, and a second styling system would be dead weight.

### The ramp has two zones

**Decision.** Steps 0 to 30 are surfaces and sit close together (ΔL ≈ 0.05). Steps 50 to 90 carry
text. Step 40 is decorative only and is named `line-strong` rather than given an ink role.

**Reason.** An elevation step should be small, and contrast ratio is the wrong measure for two
adjacent surfaces. Step 40 is 2.60:1 on the page background, so it must never carry text.

### Spacing and type

**Decision.** Spacing is Tailwind's multiplier on one base unit (`p-4` is `calc(var(--spacing) * 4)`),
with six named layout roles (`gap-tight` to `gap-major`). Type is role-based, with a `.type-*`
composite class per role, and a role may only declare a weight Parkinsans ships.

**Reason.** kern shipped a twelve-step `--space-*` scale alongside the multiplier until v1.1; it
generated nothing, because Tailwind's namespace is `--spacing`. `h1` and `h2` declared weight 100
until v1.1, which the font does not have, so the browser silently substituted 300.

## Accessibility

**Decision.** Semantic HTML first, one shared focus ring, labelled controls, the Storybook a11y addon
on every story, and axe assertions in every component's test suite. Each ink role declares the
surfaces it may sit on, and `contrast.test.ts` asserts exactly those pairings clear WCAG AA, with
the colour maths in `lib/colour.ts` shared with the published matrix.

**Reason.** kern previously had a contrast matrix that measured every colour and prevented nothing,
and it shipped a 2.6:1 label underneath it. A scrolling token table is a focusable labelled region
(`ScrollRegion`), because axe reported `scrollable-region-focusable` on every token page.

## Enforcement

**Decision.** CI fails on:

- a stale generated token CSS (`tokens:check`);
- an import that breaks the tier order or uses `@/` inside kern, an accessibility rule, or a dropped
  promise (ESLint);
- a component without a story, an ink role off its permitted surfaces, or an axe violation (tests);
- a docs link to a story id that does not exist (`check:links`, against the built Storybook).

CodeRabbit reviews with the same rules by path. [WORKFLOW.md](WORKFLOW.md) lists the required checks.

**Reason.** Each guards a failure recorded above: documentation that described a system that had
moved, deep imports made public by accident, a 2.6:1 label under a contrast matrix, and docs links
that can look right and 404, because story ids come from the export name.

## Versioning

**Decision.** kern is versioned by git tag, and each consumer pins one: `github:hipuku/kern#v1.5.0`.
All four tools are on v1.5.0. [CHANGELOG.md](CHANGELOG.md) records what each tag changed.

**Reason.** Until v1 the tools depended on an unpinned `github:hipuku/kern`, which resolves to
whatever `main` is at install time, so an unrelated change could break a tool on a routine reinstall
and no breaking change was safe. Pinned, the v1 rebuild could ship, sit unused, and be adopted one
app at a time.

## Known gaps

- **Single-consumer patterns stay in their tool** until a second tool needs them (a swatch strip in
  hexicon, canvas readouts in gray-scott), so some duplication within a tool is deliberate.
- **`check:links` guards nothing today.** The docs pages contain no story links, so the check passes
  with zero links until one is added.
