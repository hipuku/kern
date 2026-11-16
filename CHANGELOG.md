# Changelog

What each tag changed for a tool that pins it. Consumers install from GitHub at a tag:
`github:hipuku/kern#vX.Y.Z`.

## Unreleased

Repository tooling only; nothing a consumer imports changed.

- One CI job per check, Prettier, and lint for the atomic tiers, JSX accessibility and dropped
  promises.
- `CopyButton` calls its handler through `void`; behaviour is unchanged.
- README, DESIGN.md, WORKFLOW.md and this file to the docs standard.

## v1.5.0 (2026-09-24)

- `SocialBar`'s links are labelled with where they go: the globe as hipuku.dev, GitHub as the tool
  name followed by "on GitHub".
- The Storybook is published to Chromatic.
- The Storybook site has a link preview: Open Graph tags and a 1200x630 image.

## v1.4.0 (2026-09-17)

- `SocialBar` can leave out the GitHub link.
- The Node floor (22) is enforced, not only declared.

## v1.3.0 (2026-09-02)

- The public API is reachable: the `exports` map lists the package and layer barrels.
- Every component is tested, with axe on every one; `Textarea` and `Field` have their own stories.
- Node 22 is the floor.

## v1.2.0 (2026-08-21)

- The organisms layer grows to three: `ToolView` and `Workbench` join `AppSidebar`, with their
  supporting molecules.
- Four atoms the tools were hand-rolling are added, and the logo atom is renamed `Logo`.
- `Wordmark` sizes by x-height, so marks of different letterforms match.

## v1.1.0 (2026-08-20)

- The token layer is rebuilt in three tiers: semantic roles for surfaces, ink and lines, with
  contrast enforced by a test, and dead tokens fixed.

## v1.0.0 (2026-08-20)

- A breaking rebuild on atomic-design foundations: the templates layer (`AppShell`,
  `ViewContainer`, `ViewportGate`), a shared accent, `class-variance-authority` variants, and the
  component API contract.
- `src/tokens/tokens.ts` is the single source of truth for tokens.
- Storybook 8.6 to 10.5.
