# kern

Shared component library for hipuku experiments. Not published to npm — consumed as TypeScript source via a Vite path alias.

## Structure

```
src/
  atoms/       BulletItem, CopyButton, ExternalLink, GitHubIcon, InlineCode, StatusChip
  molecules/   CalloutCard, DataTable, Section, StatCard, ToolLink, ViewHeader
  organisms/   AppSidebar, ErrorBoundary, HipukuLogo
  tokens.css   single source of truth for all design tokens
```

## Storybook

```bash
npm install
npm run storybook   # localhost:6006
```

## Using in an experiment

kern is installed from GitHub and resolved via a Vite alias — no build step needed.

```ts
import { AppSidebar } from '@kern/organisms/AppSidebar'
import { StatCard }   from '@kern/molecules/StatCard'
import { StatusChip } from '@kern/atoms/StatusChip'
```

For local development, replace the installed copy with a symlink:

```bash
cd kern && npm link
cd ../hexicon && npm link kern
```

See the monorepo `DESIGN_SYSTEM.md` for full token reference and component usage.
