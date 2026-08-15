# kern

The shared component library and design tokens behind the hipuku experiments — consumed as TypeScript source, no build step.

## Features

- **18 components** across atoms, molecules, and organisms, each with a Storybook story.
- **A single token layer** (`src/tokens.css`) — void neutral scale, named accent palettes, type scale, motion — consumed by every experiment.
- **Source-only distribution.** No build, no bundle. Consumers alias `@kern/*` straight at the source tree, so there is never a stale compiled copy to reason about.
- **Accessible by default** — semantic HTML first, focus-visible rings, aria-labelled controls, a Storybook a11y addon on every story, and axe smoke tests on the load-bearing components.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 |
| Styling | Tailwind CSS v4 (Vite plugin) + CSS custom properties |
| Language | TypeScript 6 |
| Icons | lucide-react (peer dependency) |
| Docs | Storybook 8 + a11y addon |
| Tests | Vitest + vitest-axe |

## Using kern in an experiment

kern is installed from GitHub and resolved via a Vite path alias — no build step.

```jsonc
// package.json
"dependencies": { "kern": "github:hipuku/kern" }
```

```ts
// vite.config.ts
resolve: {
  alias: { '@kern': path.resolve(__dirname, 'node_modules/kern/src') },
}
```

Tailwind v4 only scans within the project root, so each consumer's `index.css` must also register kern's source for class scanning:

```css
@source "../node_modules/kern/src";
```

Then import by layer:

```ts
import { AppSidebar }  from '@kern/organisms/AppSidebar'
import { ParamSlider } from '@kern/molecules/ParamSlider'
import { ToggleChip }  from '@kern/atoms/ToggleChip'
```

## Local development

Run the Storybook:

```bash
npm install
npm run storybook   # localhost:6006
```

To see kern edits live inside a consuming experiment, symlink it (the git install is a copy):

```bash
cd kern && npm link
cd ../gray-scott && npm link kern
```

The symlink does not survive `npm install` — re-run `npm link kern` after any reinstall.

## Documentation

- **[`DESIGN.md`](./DESIGN.md)** — architecture, the source-only consumption model, component hierarchy, token system, and the decisions behind them.
- **Storybook** — the living token reference (Colours, Typography, Spacing, Motion) and every component with its controls.
