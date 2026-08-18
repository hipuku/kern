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
             BulletItem, CopyButton, ExternalLink, HipukuLogo, IconButton,
             Icons (custom brand SVGs), InlineCode, StatusChip, ToggleChip
molecules/   Composed from atoms + layout.
             CalloutCard, DataTable, ParamSlider, Section, SocialBar,
             StatCard, ToolLink, ViewHeader
organisms/   Full UI regions; may own local state.
             AppSidebar, ErrorBoundary
```

Atoms never import molecules or organisms; molecules may use atoms; organisms may use both. `src/lib/utils.ts` holds only the `cn()` class-merge helper. `src/tokens/` holds Storybook-only token documentation pages.

**Icons.** Interface glyphs come from **lucide-react**; brand marks lucide doesn't provide (e.g. the GitHub logo) are hand-rolled `currentColor` SVGs in `atoms/Icons.tsx`. Both kinds are plain `ComponentType<{ className?: string }>`, so they drop into any icon slot interchangeably — `IconButton`, `SocialBar`, `AppSidebar` nav items. The `Atoms/Icons` story is a catalog of the full icon vocabulary used across kern and the experiments.

## Token system

`src/tokens.css` is the single source of truth. Two tiers:

- **Primitives** — the void neutral scale (`--color-void-0…--color-void-90`) and named accent palettes (nebula, pulsar, aurora, …) as raw hex.
- **Semantics** — role aliases components consume: `--primary` / `--ring` (pulsar), surface and text roles, plus a per-experiment override seam so an experiment can retint the shared components without forking them.

Type is role-based (annotation, code, heading roles) with a matching class per role; motion is a small set of easing + duration tokens. The **Storybook token pages are the living reference** — kern documents its tokens by rendering them, not by listing values in prose that can go stale.

## Alternatives considered

- **Publish kern to npm** — rejected for now. The source-alias model already gives three real consumers with zero build/version overhead; a compiled package would add a release step and fight Tailwind scanning for no gain. The public Storybook is the artefact instead. (Revisit if kern is ever consumed outside this portfolio.)
- **A monorepo (pnpm workspace) holding kern + the experiments** — rejected. Each experiment deploys independently to its own subdomain; separate repos keep those deploys and their git histories clean. kern-as-a-git-dependency gives the sharing without coupling the deployments.
- **CSS-in-JS or a component-scoped stylesheet per component** — rejected. Tailwind v4 + CSS custom properties already cover theming and variants; a second styling system would be dead weight.

## Open questions

*None currently blocking.* Add here (numbered, assigned) when a decision is outstanding.
