/**
 * Generates kern's token CSS from `src/tokens/tokens.ts`.
 *
 *   npm run tokens         regenerate src/styles/*.css
 *   npm run tokens:check   fail if the committed CSS is stale (CI gate)
 *
 * kern ships as source with no build step, so the generated CSS is committed
 * rather than built on install. The check mode is what keeps that honest: it
 * regenerates into memory and diffs, so a token edit that skipped the
 * generator fails CI instead of silently shipping a stale stylesheet.
 *
 * Run through vite-node, which is why tokens.ts can be TypeScript.
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import {
  palette,
  voidScale,
  typeScale,
  typeRoles,
  fonts,
  bodyTypeRole,
  spacingBase,
  spacingRoles,
  radiusRoles,
  zIndexRoles,
  breakpoints,
  easing,
  duration,
  surfaceRoles,
  inkRoles,
  lineRoles,
  accentRoles,
  baseRoles,
} from '../src/tokens/tokens.ts'

const stylesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'styles')

const BANNER = `/*
 * ─────────────────────────────────────────────────────────────────────────────
 * GENERATED FILE: DO NOT EDIT.
 *
 * Source:    src/tokens/tokens.ts
 * Regenerate: npm run tokens
 *
 * Edits here are overwritten and will fail \`npm run tokens:check\` in CI.
 * ─────────────────────────────────────────────────────────────────────────────
 */
`

/** Pads `s` to `width` so generated columns line up like a hand-written file. */
const pad = (s, width) => s.padEnd(width)

/** All semantic colour roles that resolve to a void step, in emission order. */
const stepRoles = { ...surfaceRoles, ...inkRoles, ...lineRoles, ...baseRoles }

// ─── primitives.css ──────────────────────────────────────────────────────────

function buildPrimitives() {
  const lines = []
  lines.push(BANNER)
  lines.push('@custom-variant dark (&:is(.dark *));')
  lines.push('')
  lines.push('@theme inline {')

  lines.push('  /* ─── Fonts ───────────────────────────────────────────────────────────── */')
  lines.push(`  --font-sans: ${fonts.sans};`)
  lines.push(`  --font-mono: ${fonts.mono};`)
  lines.push('')

  lines.push('  /* ─── Type scale sizes ────────────────────────────────────────────────── */')
  const sizeKeyWidth = Math.max(...typeRoles.map((r) => r.length)) + 8
  for (const role of typeRoles) {
    lines.push(`  ${pad(`--text-${role}:`, sizeKeyWidth)} ${typeScale[role].size};`)
  }
  lines.push('')

  lines.push('  /* ─── Spacing ─────────────────────────────────────────────────────────── */')
  lines.push('  /* Every numeric utility multiplies this base: p-4 = calc(--spacing * 4). */')
  lines.push(`  --spacing: ${spacingBase};`)
  const spaceWidth = Math.max(...Object.keys(spacingRoles).map((k) => k.length)) + 12
  for (const [name, { value }] of Object.entries(spacingRoles)) {
    lines.push(`  ${pad(`--spacing-${name}:`, spaceWidth)} ${value};`)
  }
  lines.push('')

  lines.push('  /* ─── Radius ──────────────────────────────────────────────────────────── */')
  const radiusWidth = Math.max(...Object.keys(radiusRoles).map((k) => k.length)) + 11
  for (const [name, { value }] of Object.entries(radiusRoles)) {
    lines.push(`  ${pad(`--radius-${name}:`, radiusWidth)} ${value};`)
  }
  lines.push('')

  lines.push('  /* ─── Breakpoints ─────────────────────────────────────────────────────── */')
  for (const [name, px] of Object.entries(breakpoints)) {
    lines.push(`  ${pad(`--breakpoint-${name}:`, 20)} ${px / 16}rem;`)
  }
  lines.push('')

  lines.push('  /* ─── Motion ──────────────────────────────────────────────────────────── */')
  const easeWidth = Math.max(...Object.keys(easing).map((k) => k.length)) + 9
  for (const [name, { value }] of Object.entries(easing)) {
    lines.push(`  ${pad(`--ease-${name}:`, easeWidth)} ${value};`)
  }
  const durWidth = Math.max(...Object.keys(duration).map((k) => k.length)) + 13
  for (const [name, { value }] of Object.entries(duration)) {
    lines.push(`  ${pad(`--duration-${name}:`, durWidth)} ${value};`)
  }
  lines.push('')

  lines.push('  /* ─── Colour primitives ───────────────────────────────────────────────── */')
  const accentWidth = Math.max(...Object.keys(palette).map((k) => k.length))
  for (const [name, ramp] of Object.entries(palette)) {
    const dark = pad(`--color-${name}-dark:`, accentWidth + 15)
    const base = pad(`--color-${name}:`, accentWidth + 10)
    const light = pad(`--color-${name}-light:`, accentWidth + 16)
    lines.push(`  ${dark} ${ramp.dark}; ${base} ${ramp.base}; ${light} ${ramp.light};`)
  }
  const steps = Object.entries(voidScale)
  for (let i = 0; i < steps.length; i += 3) {
    const row = steps
      .slice(i, i + 3)
      .map(([step, hex]) => `${pad(`--color-void-${step}:`, 19)} ${hex};`)
      .join(' ')
    lines.push(`  ${row}`)
  }
  lines.push('')

  lines.push('  /* ─── Semantic colour roles ───────────────────────────────────────────── */')
  lines.push('  /* Utilities: bg-surface-raised, text-ink-body, border-line-subtle, … */')
  const roleWidth = Math.max(...Object.keys({ ...stepRoles, ...accentRoles }).map((k) => k.length)) + 11
  for (const role of Object.keys(stepRoles)) {
    lines.push(`  ${pad(`--color-${role}:`, roleWidth)} var(--${role});`)
  }
  for (const role of Object.keys(accentRoles)) {
    lines.push(`  ${pad(`--color-${role}:`, roleWidth)} var(--${role});`)
  }
  lines.push('}')
  lines.push('')

  lines.push('/* ─── Layering ────────────────────────────────────────────────────────── */')
  lines.push('/* Not a Tailwind namespace; reach for these as z-(--z-panel). */')
  lines.push(':root {')
  const zWidth = Math.max(...Object.keys(zIndexRoles).map((k) => k.length)) + 6
  for (const [name, { value }] of Object.entries(zIndexRoles)) {
    lines.push(`  ${pad(`--z-${name}:`, zWidth)} ${value};`)
  }
  lines.push('}')
  lines.push('')

  lines.push('/* ─── Theme (dark-only) ───────────────────────────────────────────────── */')
  lines.push('/*')
  lines.push(' * The override seam. An experiment redefines any of these in its own')
  lines.push(' * index.css and every kern component follows, without forking anything.')
  lines.push(' */')
  lines.push(':root {')
  const themeWidth = Math.max(...Object.keys({ ...stepRoles, ...accentRoles }).map((k) => k.length)) + 4
  for (const [role, { step }] of Object.entries(stepRoles)) {
    lines.push(`  ${pad(`--${role}:`, themeWidth)} var(--color-void-${step});`)
  }
  for (const [role, { value }] of Object.entries(accentRoles)) {
    lines.push(`  ${pad(`--${role}:`, themeWidth)} ${value};`)
  }
  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

// ─── typography.css ──────────────────────────────────────────────────────────

function buildTypography() {
  const lines = []
  lines.push(BANNER)

  lines.push('/* ─── Type axis tokens ─────────────────────────────────────────────────── */')
  lines.push(':root {')
  // Each of the three axis columns is padded to its own widest entry, so the
  // block reads as a table of weight / line-height / tracking down the roles.
  const colWidth = (suffix) =>
    Math.max(...typeRoles.map((r) => `--text-${r}-${suffix}:`.length))
  const wCol = colWidth('weight')
  const lCol = colWidth('lh')
  const tCol = colWidth('tracking')
  const valWidth = (get) => Math.max(...typeRoles.map((r) => `${get(typeScale[r])};`.length))
  const wVal = valWidth((t) => t.weight)
  const lVal = valWidth((t) => t.lineHeight)

  for (const role of typeRoles) {
    const { weight, lineHeight, tracking } = typeScale[role]
    lines.push(
      `  ${pad(`--text-${role}-weight:`, wCol)} ${pad(`${weight};`, wVal)}  ` +
        `${pad(`--text-${role}-lh:`, lCol)} ${pad(`${lineHeight};`, lVal)}  ` +
        `${pad(`--text-${role}-tracking:`, tCol)} ${tracking};`,
    )
  }
  lines.push('}')
  lines.push('')

  lines.push('@layer base {')
  lines.push('  body {')
  lines.push('    background-color: var(--background);')
  lines.push('    color: var(--foreground);')
  lines.push('    font-family: var(--font-sans);')
  lines.push(`    font-size: var(--text-${bodyTypeRole});`)
  lines.push(`    font-weight: var(--text-${bodyTypeRole}-weight);`)
  lines.push(`    line-height: var(--text-${bodyTypeRole}-lh);`)
  lines.push(`    letter-spacing: var(--text-${bodyTypeRole}-tracking);`)
  lines.push('    -webkit-font-smoothing: antialiased;')
  lines.push('    -moz-osx-font-smoothing: grayscale;')
  lines.push('  }')
  lines.push('}')
  lines.push('')

  lines.push('/* ─── Composite type classes ───────────────────────────────────────────── */')
  lines.push('@layer components {')
  const clsWidth = Math.max(...typeRoles.map((r) => r.length)) + 7
  for (const role of typeRoles) {
    const { mono, smallCaps } = typeScale[role]
    const decls = [
      `font-size: var(--text-${role});`,
      `font-weight: var(--text-${role}-weight);`,
      `line-height: var(--text-${role}-lh);`,
      `letter-spacing: var(--text-${role}-tracking);`,
    ]
    if (mono) decls.push('font-family: var(--font-mono);')
    if (smallCaps) decls.push('font-variant-caps: all-small-caps;')
    lines.push(`  ${pad(`.type-${role}`, clsWidth)} { ${decls.join(' ')} }`)
  }
  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

// ─── Write / check ───────────────────────────────────────────────────────────

const outputs = {
  'primitives.css': buildPrimitives(),
  'typography.css': buildTypography(),
}

const check = process.argv.includes('--check')
const stale = []

if (!check && !existsSync(stylesDir)) mkdirSync(stylesDir, { recursive: true })

for (const [name, content] of Object.entries(outputs)) {
  const target = join(stylesDir, name)
  if (check) {
    const current = existsSync(target) ? readFileSync(target, 'utf8') : null
    if (current !== content) stale.push(name)
  } else {
    writeFileSync(target, content)
  }
}

if (check) {
  if (stale.length) {
    console.error(
      `✗ Token CSS is stale: ${stale.join(', ')}\n` +
        `  src/tokens/tokens.ts has changed without regenerating.\n` +
        `  Run: npm run tokens`,
    )
    process.exit(1)
  }
  console.log('✓ Token CSS is up to date with src/tokens/tokens.ts')
} else {
  console.log(`✓ Wrote ${Object.keys(outputs).join(', ')} from src/tokens/tokens.ts`)
}
