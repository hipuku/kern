# kern: workflow

How changes get into kern: branches, pull requests, the checks that gate them, review,
dependencies, Figma and code in step, the published Storybook and releases.

## Contents

- [Branches and pull requests](#branches-and-pull-requests)
- [Checks](#checks)
- [Review](#review)
- [Dependencies](#dependencies)
- [Design sync](#design-sync)
- [Storybook](#storybook)
- [Releases](#releases)

---

## Branches and pull requests

Nothing is committed to `main` directly. Every change goes through a branch named
`<type>/<short-name>` (`feat`, `fix`, `design`, `a11y`, `docs`, `refactor`, `chore`, `deps`) and a
pull request that uses the template, carries one type label, and is squash merged. The pull request
title becomes the commit on `main`, and labels group the release notes.

The `main` ruleset requires a pull request, the checks below, branches up to date with `main`,
resolved conversations and a linear history, and it applies to the owner too.

## Checks

| Check        | Workflow           | Runs                                                                                                          | Required |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------- | -------- |
| Lint         | `ci.yml`           | `tokens:check`, `npm run lint` (ESLint: tiers, JSX accessibility, typed promises), `lint:prose` and `lint:md` | Yes      |
| Links        | `ci.yml`           | lychee, offline: every relative link and heading anchor in the Markdown resolves                              | Yes      |
| Format       | `ci.yml`           | `npm run format:check`                                                                                        | Yes      |
| Typecheck    | `ci.yml`           | `npm run typecheck`                                                                                           | Yes      |
| Test         | `ci.yml`           | `npm test`                                                                                                    | Yes      |
| Build        | `ci.yml`           | `npm run build-storybook` and `check:links`, after Lint, Typecheck and Test pass                              | Yes      |
| Figma parity | `figma-parity.yml` | `npm run figma:check`: tokens, tints and components against the Figma file ([Design sync](#design-sync))      | Yes      |

Chromatic runs visual regression on every pull request (`chromatic.yml`) and Vercel builds a
preview; neither is a required check. What the tests hold is in
[DESIGN.md § Enforcement](./DESIGN.md#enforcement).

## Review

CodeRabbit reviews every pull request that is not a draft. Its configuration, `.coderabbit.yaml`,
gives it this repo's rules by path:

- **Components:** one direction of tier dependency, relative imports only, the component API
  contract, colour through the semantic roles and the accent seam, and accessible interactive
  elements.
- **Generated token CSS:** no hand edits.
- **The token source:** a new ink role or surface comes with its contrast pairing.
- **Markdown:** Australian English, topic-label headings, and claims the code supports.

It is not a required check. Each comment is applied in a commit or answered with a reason, then
resolved; the ruleset will not merge a pull request with an open conversation.

## Dependencies

Dependabot opens grouped pull requests every Monday, plus GitHub Actions monthly, each with the
`deps` label. The groups keep Storybook and its addons, the test runner, the build tools and the
linters apart, so one major update does not hold the others back. `.github/dependabot.yml` records
the reasons.

## Design sync

kern's design file is [kern on Figma](https://www.figma.com/design/2a7GqQcIxWB3UErg9q4bC6/kern):
its variables, a page per component, the icons and the consumer screens. The Figma parity check
compares it with the code on every pull request and every push to `main`. Variables are compared
from an exported snapshot, `figma/snapshot/kern.json`, so a variable changed in Figma is found once
that snapshot is refreshed.

### What is compared

| Item                   | Code                                                                        | Figma                                          |
| ---------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| `token --spacing-card` | A palette, role or scale property in `primitives.css`, `var()` followed     | A variable, by its code syntax                 |
| `token bg-nebula/15`   | A tint class written in `lib/accent.ts` or `Button`, as the colour it gives | A variable whose code syntax is the class      |
| `component Button`     | A component file in a tier folder                                           | A component on its own page                    |
| `axis Button.variant`  | A string-union prop, an alias for one, or a cva `variants` key              | A variant property of the set                  |
| `states Button`        | The `hover:`, `active:` and `disabled:` classes it writes                   | The `Hover`, `Pressed` and `Disabled` variants |

The default mode of `kern/roles` is compared; the four tool modes mirror each tool's `index.css`,
which lives in the tools' repositories. Left out on purpose: type, motion and breakpoints (text
styles and specs in Figma, not variables), focus (one `focusRing` everywhere), `as` and `type`
props (they choose an element, not a look), booleans and text properties, and the icon and
consumer pages. Differences meant to be there are listed with a reason in `figma/exceptions.json`.

### How a finding is decided

`figma/baseline.json` holds, for every item, the pair of values code and Figma had when the baseline
was last accepted. Code ahead of Figma or a conflict fails the pull request; a change made only in
Figma becomes a `drift-decision` issue, something new in Figma a `design-proposal` issue, and known
drift is listed without failing. The `figma-later` label waives code ahead, never a conflict. The
rules are in `scripts/figma/diff.mjs` and tested in `scripts/figma/parity.test.mjs`.

### Where Figma is read from

Components are read live from Figma's REST API with the `FIGMA_TOKEN` repository secret. Variables
need an Enterprise plan for that, so they come from the snapshot, exported through Figma's Plugin
API: `npm run figma:check -- --plugin-code` prints the export to run in Figma, and
`npm run figma:check -- --save <file>` stores its result. Without the token, everything comes from
the snapshot, and the report says so.

## Storybook

Vercel deploys [kern.hipuku.dev](https://kern.hipuku.dev) from `main`, and Chromatic publishes the
same Storybook for visual review.

## Releases

A release is a git tag that consumers pin.

1. A `chore/release-X-Y-Z` pull request bumps `package.json`, updates `CHANGELOG.md` and the
   version named in README and DESIGN.md.
2. Once it merges, tag the merge commit `vX.Y.Z` and push the tag.
3. Create a GitHub release from the tag with notes grouped by label by `.github/release.yml`, edited
   into a short paragraph and the grouped list.
4. Each tool bumps its `github:hipuku/kern#vX.Y.Z` line on its own schedule.
