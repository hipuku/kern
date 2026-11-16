# kern: workflow

How changes get into kern: branches, pull requests, the checks that gate them, review,
dependencies, the published Storybook and releases.

## Contents

- [Branches and pull requests](#branches-and-pull-requests)
- [Checks](#checks)
- [Review](#review)
- [Dependencies](#dependencies)
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

| Check     | Workflow | Runs                                                                                                          | Required |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| Lint      | `ci.yml` | `tokens:check`, `npm run lint` (ESLint: tiers, JSX accessibility, typed promises), `lint:prose` and `lint:md` | Yes      |
| Links     | `ci.yml` | lychee, offline: every relative link and heading anchor in the Markdown resolves                              | Yes      |
| Format    | `ci.yml` | `npm run format:check`                                                                                        | Yes      |
| Typecheck | `ci.yml` | `npm run typecheck`                                                                                           | Yes      |
| Test      | `ci.yml` | `npm test`                                                                                                    | Yes      |
| Build     | `ci.yml` | `npm run build-storybook` and `check:links`, after Lint, Typecheck and Test pass                              | Yes      |

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
