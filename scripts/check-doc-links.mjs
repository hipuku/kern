/**
 * Verifies that every internal Storybook link in the MDX docs resolves.
 *
 *   npm run check:links     (run after build-storybook; CI does)
 *
 * Story IDs are derived from the *export name* rather than the `name` field, so a
 * story exported as `All` and displayed as "All colours" is
 * `tokens-colours--all`, and a hand-written link to `--all-colours` looks
 * entirely reasonable and 404s. That is exactly the bug this catches: the
 * Introduction page shipped two dead links written from the visible names.
 *
 * Reads the index.json that `build-storybook` emits, so it checks against what
 * was actually built rather than a guess.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = join(root, 'storybook-static', 'index.json')

if (!existsSync(indexPath)) {
  console.error('✗ storybook-static/index.json not found. Run `npm run build-storybook` first.')
  process.exit(1)
}

const entries = new Set(Object.keys(JSON.parse(readFileSync(indexPath, 'utf8')).entries))

const docsDir = join(root, 'src', 'docs')
const linkPattern = /\?path=\/(?:story|docs)\/([a-z0-9-]+--[a-z0-9-]+)/g

let broken = 0
let checked = 0

for (const file of readdirSync(docsDir).filter((f) => f.endsWith('.mdx'))) {
  const contents = readFileSync(join(docsDir, file), 'utf8')
  for (const [, id] of contents.matchAll(linkPattern)) {
    checked++
    if (!entries.has(id)) {
      console.error(`✗ ${file}: no such story or docs page: ${id}`)
      broken++
    }
  }
}

if (broken > 0) {
  console.error(`\n${broken} broken link${broken === 1 ? '' : 's'} of ${checked} checked.`)
  console.error('Story IDs come from the export name, not the displayed name.')
  process.exit(1)
}

console.log(`✓ All ${checked} internal docs links resolve`)
