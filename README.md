# kern

The shared component library and design tokens behind the hipuku experiments — consumed as TypeScript source, no build step. Live Storybook at [kern.hipuku.dev](https://kern.hipuku.dev).

## Features

- **22 components** across atoms, molecules, organisms, templates and utilities, each with a Storybook story.
- **One token source.** Every value is declared once in `src/tokens/tokens.ts`; the CSS is generated from it and the Storybook token pages render from it, so the documentation cannot drift from what ships.
- **Source-only distribution.** No build, no bundle. Consumers alias `@kern/*` straight at the source tree, so there is never a stale compiled copy to reason about.
- **A real public API.** `src/index.ts` and the per-layer barrels are the supported surface; file paths are not.
- **Accessible by default** — semantic HTML first, one shared focus ring, aria-labelled controls, a Storybook a11y addon on every story, and axe assertions on every test.

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

kern is installed from GitHub and resolved via a Vite path alias — no build step.

**Pin a tag.** An unpinned `github:hipuku/kern` resolves to whatever `main` happens to be at install time, so an unrelated change to the library can break your build on a routine reinstall.

```jsonc
// package.json
"dependencies": { "kern": "github:hipuku/kern#v0.1.0" }
```

```ts
// vite.config.ts
resolve: {
  alias: { '@kern': path.resolve(__dirname, 'node_modules/kern/src') },
}
```

Tailwind v4 only scans within the project root, so each consumer's `index.css` must import kern's stylesheet *and* register its source for class scanning. Without the second line the classes are simply absent, and components render unstyled with no error:

```css
@import "tailwindcss";
@import "../node_modules/kern/src/kern.css";
@source "../node_modules/kern/src";
```

Then import from the package root:

```ts
import { AppShell, ParamSlider, ToggleChip } from 'kern'
```

Layer barrels (`kern/atoms`, `kern/molecules`, …) exist when you want to be explicit about which tier you are reaching into. Avoid deep-importing individual files — those paths are not public API, and components do move between layers.

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

CI runs all six. `main` deploys to kern.hipuku.dev automatically.

To see kern edits live inside a consuming experiment, symlink it (the git install is a copy):

```bash
cd kern && npm link
cd ../gray-scott && npm link kern
```

The symlink does not survive `npm install` — re-run `npm link kern` after any reinstall.

## Documentation

- **[Storybook](https://kern.hipuku.dev)** — Introduction, Installation and Contributing guides, the living token reference (Colours, Typography, Spacing, Motion), and every component with its controls.
- **[`DESIGN.md`](./DESIGN.md)** — architecture, the source-only consumption model, component hierarchy, token system, versioning, and the decisions behind them.
