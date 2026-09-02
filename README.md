# kern

The shared component library and design tokens behind the hipuku experiments, consumed as TypeScript source with no build step. Live Storybook at [kern.hipuku.dev](https://kern.hipuku.dev).

## Features

- **38 components** in four layers: 16 atoms, 16 molecules, 3 organisms and 3 templates, plus an `ErrorBoundary` utility. Every one has its own Storybook story, and a test fails if one loses it.
- **One token source.** Every value is declared once in `src/tokens/tokens.ts`; the CSS is generated from it and the Storybook token pages render from it, so the documentation cannot drift from what ships.
- **Source-only distribution.** No build, no bundle. Consumers alias `@kern/*` straight at the source tree, so there is never a stale compiled copy to reason about.
- **A public API.** `src/index.ts` and the per-layer barrels are the supported surface; file paths are not.
- **Desktop only, gated in CSS.** These are wide-canvas tools, so v1 gates the whole app rather than asking each one to degrade its own layout. `templates/ViewportGate` renders the interface at `lg` and above and a short notice below it. The switch is `lg:` / `max-lg:` in CSS, so there is no resize listener to leak and no flash of the wrong branch on first paint.
- **Accessible by default.** Semantic HTML first, one shared focus ring, aria-labelled controls, a Storybook a11y addon on every story, and axe assertions in every component test suite. The three remaining test files cover the accent vocabulary, the token contrast maths and the story coverage, where axe has nothing to look at.

## Relationship to haus

kern and [haus](https://github.com/hipuku/haus) are separate design systems, and which one you want depends on how you consume it.

haus publishes W3C DTCG tokens and React components to npm, for consumers it does not know. kern is github-pinned and source-only, and holds the parts three in-house tools share.

The split is what lets kern change an API. It knows all three of its consumers by name and each pins a tag, so v1 could be a breaking rebuild that shipped, sat unused, and was adopted one app at a time.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 |
| Styling | Tailwind CSS v4 (Vite plugin) + CSS custom properties |
| Variants | class-variance-authority |
| Language | TypeScript 6 |
| Icons | lucide-react (peer dependency) |
| Docs | Storybook 10 + a11y addon |
| Tests | Vitest + vitest-axe + Testing Library |
| Lint | ESLint 10 (flat config) |

## Using kern in an experiment

kern is installed from GitHub and resolved via a Vite path alias.

**Pin a tag.** An unpinned `github:hipuku/kern` resolves to whatever `main` happens to be at install time, so an unrelated change to the library can break your build on a routine reinstall.

```jsonc
// package.json
"dependencies": { "kern": "github:hipuku/kern#v1.2.0" }
```

No alias, and no build step. kern ships its TypeScript and declares entry points for it, so
your bundler resolves the package the way it resolves any other:

```ts
import { AppShell, ParamSlider, ToggleChip } from 'kern'
```

Layer barrels exist when you want to be explicit about which tier you are reaching into:

```ts
import { ToggleChip } from 'kern/atoms'
import { palette, type AccentName } from 'kern/tokens'
```

**Deep imports are not possible, by design.** `kern/src/atoms/Input` fails with
`ERR_PACKAGE_PATH_NOT_EXPORTED`, because the `exports` map lists the barrels and nothing else.
That is the point: file paths are not public API and components do move between layers.
`ErrorBoundary` went from `organisms/` to `utils/` without a breaking change, which is only
true while nobody can import it by path.

Tailwind v4 only scans within the project root, so each consumer's `index.css` must import
kern's stylesheet *and* register its source for class scanning. Without the second line the
classes are absent and components render unstyled with no error. The `@source` line stays a
relative path because it is a filesystem glob rather than a module import, so it never goes
through package resolution:

```css
@import "tailwindcss";
@import "kern/kern.css";
@source "../node_modules/kern/src";
```

## Local development

```bash
npm install
npm run storybook      # localhost:6006
```

| Script | What it does |
|---|---|
| `npm run tokens` | Regenerate the token CSS from `src/tokens/tokens.ts` |
| `npm run tokens:check` | Fail if the committed token CSS is stale |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run build-storybook` | Production Storybook build |

CI runs `tokens:check`, `lint`, `typecheck`, `test`, `build-storybook` and `check:links`. `main` deploys to kern.hipuku.dev automatically.

To see kern edits live inside a consuming experiment, symlink it (the git install is a copy):

```bash
cd kern && npm link
cd ../gray-scott && npm link kern
```

The symlink does not survive `npm install`, so re-run `npm link kern` after any reinstall.

## Documentation

- **[Storybook](https://kern.hipuku.dev)**: Introduction, Installation and Contributing guides, the living token reference (Colours, Typography, Spacing, Motion), and every component with its controls.
- **[`DESIGN.md`](./DESIGN.md)**: architecture, the source-only consumption model, component hierarchy, token system, versioning, and the decisions behind them.
