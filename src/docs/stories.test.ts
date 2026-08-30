import { describe, expect, it } from 'vitest'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Every component has its own Storybook story, and the README says so.
 *
 * The claim was false for `Textarea` and `Field` until 2026-08-30. Both did
 * appear in Storybook, inside `Input.stories.tsx`, which is why a reader
 * checking the sidebar found the entry missing while a reader grepping for the
 * component name found it present. Storybook is the documentation for a
 * source-only library, so a component with no entry of its own is undocumented.
 *
 * This asserts the file, not the content: a story file that renders nothing
 * would pass. It exists so the README's claim cannot quietly stop being true.
 */
const LAYERS = ['atoms', 'molecules', 'organisms', 'templates', 'utils'] as const

/**
 * Vitest runs from the project root, so the layers are one join away. This read
 * `new URL('..', import.meta.url).pathname` until it was first run, which
 * resolved to `/src/index.ts` under Vitest's module graph and made every case
 * fail with ENOENT rather than with anything about stories.
 */
const SRC = join(process.cwd(), 'src')

function componentsIn(layer: string): string[] {
  return readdirSync(join(SRC, layer))
    .filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx') && !f.endsWith('.test.tsx'))
    .map((f) => f.replace(/\.tsx$/, ''))
}

describe('every component has a story', () => {
  it('resolves the source tree', () => {
    // Fails with the path it tried, rather than an ENOENT inside a filter.
    expect(existsSync(join(SRC, 'index.ts')), `no src/index.ts under ${SRC}`).toBe(true)
  })

  for (const layer of LAYERS) {
    it(layer, () => {
      const files = new Set(readdirSync(join(SRC, layer)))
      const missing = componentsIn(layer).filter((c) => !files.has(`${c}.stories.tsx`))
      expect(missing).toEqual([])
    })
  }

  it('counts 38 components across the four UI layers', () => {
    // The figure the README and DESIGN.md both quote.
    const total = (['atoms', 'molecules', 'organisms', 'templates'] as const).reduce(
      (n, layer) => n + componentsIn(layer).length,
      0,
    )
    expect(total).toBe(38)
  })
})
