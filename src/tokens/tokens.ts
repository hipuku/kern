/**
 * The kern token source of truth.
 *
 * Every token value in the system is declared here exactly once. Two things
 * consume it:
 *
 *   1. `scripts/build-tokens.mjs` generates the CSS in `src/styles/` from it.
 *      That CSS is committed (kern ships as source, with no build step for
 *      consumers), and `npm run tokens:check` fails CI if it drifts.
 *   2. The Storybook token pages render straight from these objects, so the
 *      published documentation cannot disagree with the shipped CSS.
 *
 * Before this module existed, the palette was typed out by hand in three
 * places — `tokens.css`, `Colours.stories.tsx`, and the Storybook background
 * config — and the type scale in two. Documentation drifting away from the
 * tokens it documents is the exact failure a token system exists to prevent.
 *
 * Editing a value here and running `npm run tokens` is the only supported way
 * to change a token.
 */

// ─── Colour ──────────────────────────────────────────────────────────────────

/** A named accent, in the three steps every accent provides. */
export interface ColourRamp {
  dark: string
  base: string
  light: string
}

/**
 * The named accents, ordered by hue as they appear in the palette documentation.
 * Each experiment picks one as its `--primary`.
 */
export const palette = {
  nebula:    { dark: '#0D7A4F', base: '#15AD70', light: '#B4EDCF' },
  aurora:    { dark: '#5A9E3A', base: '#82D25D', light: '#C5F0A9' },
  tidal:     { dark: '#3FA8A1', base: '#68D0CA', light: '#B3EBE4' },
  orbit:     { dark: '#4A9FD0', base: '#73BDE7', light: '#C4E5F7' },
  pulsar:    { dark: '#4468D8', base: '#7193ED', light: '#C2CFFA' },
  quasar:    { dark: '#9B72E6', base: '#BF9FF1', light: '#E4D6FB' },
  corona:    { dark: '#F28BAD', base: '#F9C3D6', light: '#FCE4EE' },
  dusk:      { dark: '#E0B090', base: '#F5D4C0', light: '#FAF0E8' },
  flare:     { dark: '#C83D25', base: '#E15E42', light: '#F0A090' },
  solstice:  { dark: '#D46A0A', base: '#F78D2C', light: '#FDE4C0' },
  supernova: { dark: '#D4A000', base: '#FFC700', light: '#FFE480' },
} as const satisfies Record<string, ColourRamp>

export type AccentName = keyof typeof palette

/** Every accent name, in palette order. */
export const accentNames = Object.keys(palette) as AccentName[]

/**
 * The neutral ramp, dark to light. `void-0` is the app background and
 * `void-90` the primary text colour — the system is dark-only, so the scale
 * runs in the opposite direction to a conventional grey scale.
 */
export const voidScale = {
  '0':  '#121213',
  '10': '#1F1F20',
  '20': '#2B2B2C',
  '30': '#383839',
  '40': '#575759',
  '50': '#838385',
  '60': '#B1B1B3',
  '70': '#D3D3D5',
  '80': '#E8E8EA',
  '90': '#F1F1F4',
} as const

export type VoidStep = keyof typeof voidScale

// ─── Type ────────────────────────────────────────────────────────────────────

/**
 * One role in the type scale. kern's type is role-based rather than
 * size-based: you reach for `annotation` because the text is an annotation,
 * not because you want 13px.
 */
export interface TypeStyle {
  /** `font-size`, occasionally a clamp() for the fluid heading roles. */
  size: string
  weight: number
  lineHeight: number
  tracking: string
  /** Renders in the mono face. */
  mono?: boolean
  /** Applies `font-variant-caps: all-small-caps` — never the `uppercase` class. */
  smallCaps?: boolean
}

/**
 * Every type role, in scale order. Each generates a `--text-*` size token, a
 * matching set of `--text-*-weight` / `-lh` / `-tracking` axis tokens, and a
 * `.type-*` composite class that applies all four together.
 */
const TYPE_SCALE = {
  'display':     { size: 'clamp(3.5rem, 7vw + 1rem, 7.125rem)',      weight: 800, lineHeight: 0.95, tracking: '-0.03em'  },
  'h1':            { size: 'clamp(2.625rem, 5vw + 0.75rem, 5.1875rem)', weight: 100, lineHeight: 1.05, tracking: '-0.025em' },
  'h2':            { size: 'clamp(2rem, 3.5vw + 0.5rem, 3.75rem)',      weight: 100, lineHeight: 1.1,  tracking: '-0.02em'  },
  'h3':            { size: 'clamp(1.5rem, 2.5vw + 0.25rem, 2.5rem)',    weight: 600, lineHeight: 1.2,  tracking: '-0.015em' },
  'h4':            { size: 'clamp(1.25rem, 1.5vw + 0.25rem, 1.75rem)',  weight: 600, lineHeight: 1.3,  tracking: '-0.01em'  },
  'h5':            { size: 'clamp(1.125rem, 1vw + 0.25rem, 1.375rem)',  weight: 500, lineHeight: 1.4,  tracking: '-0.005em' },
  'h6':            { size: '1.125rem',                                  weight: 500, lineHeight: 1.5,  tracking: '0em'      },
  'p-lg':          { size: '1.375rem',                                  weight: 400, lineHeight: 1.4,  tracking: '0em'      },
  'p-base':        { size: '1.125rem',                                  weight: 400, lineHeight: 1.15, tracking: '0em'      },
  'p-sm':          { size: '1rem',                                      weight: 400, lineHeight: 1.7,  tracking: '0.01em'   },
  'annotation':    { size: '0.8125rem',                                 weight: 400, lineHeight: 1.7,  tracking: '0.01em'   },
  'annotation-sc': { size: '1rem',                                      weight: 400, lineHeight: 1.5,  tracking: '0.08em', smallCaps: true },
  'button':        { size: '1rem',                                      weight: 600, lineHeight: 1.0,  tracking: '0.02em'   },
  'code':          { size: '0.9375rem',                                 weight: 400, lineHeight: 1.7,  tracking: '0em',    mono: true },
} as const satisfies Record<string, TypeStyle>

export type TypeRole = keyof typeof TYPE_SCALE

/**
 * Re-exported as `Record<TypeRole, TypeStyle>` rather than the inferred literal
 * type: `as const satisfies` narrows each entry to its own literal shape, which
 * drops the optional `mono` / `smallCaps` fields from the union and makes them
 * unreadable at a call site that iterates the roles. Keys stay exact; only the
 * values widen to the declared interface.
 */
export const typeScale: Record<TypeRole, TypeStyle> = TYPE_SCALE

/** Every type role, in scale order. */
export const typeRoles = Object.keys(TYPE_SCALE) as TypeRole[]

export const fonts = {
  sans: "'Parkinsans', system-ui, sans-serif",
  mono: "'Geist Mono', 'Fira Code', monospace",
} as const

/** The body default — the role every unstyled block of text falls back to. */
export const bodyTypeRole: TypeRole = 'p-sm'

// ─── Spacing ─────────────────────────────────────────────────────────────────

/** A 4px-based scale, thinned to the steps the system actually uses. */
export const spacing = {
  '1':  '0.25rem',
  '2':  '0.5rem',
  '3':  '0.75rem',
  '4':  '1rem',
  '5':  '1.25rem',
  '6':  '1.5rem',
  '8':  '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
} as const

export type SpacingStep = keyof typeof spacing

// ─── Motion ──────────────────────────────────────────────────────────────────

export const easing = {
  standard:   { value: 'cubic-bezier(0.2, 0, 0, 1)',   use: 'The default. Most transitions between two resting states.' },
  decelerate: { value: 'cubic-bezier(0, 0, 0.2, 1)',   use: 'Elements entering the viewport — fast in, gentle settle.' },
  accelerate: { value: 'cubic-bezier(0.4, 0, 1, 1)',   use: 'Elements leaving the viewport — gentle start, fast exit.' },
  sharp:      { value: 'cubic-bezier(0.4, 0, 0.6, 1)', use: 'Quick, decisive changes that stay on screen.' },
  smooth:     { value: 'cubic-bezier(0.45, 0, 0.55, 1)', use: 'Symmetric ease for looping or reversible motion.' },
} as const

export type EasingName = keyof typeof easing

export const duration = {
  instant: { value: '0.1s',  use: 'Colour and opacity on hover.' },
  fast:    { value: '0.15s', use: 'Small state changes — chips, icon buttons.' },
  base:    { value: '0.2s',  use: 'The default for interactive feedback.' },
  slow:    { value: '0.3s',  use: 'Panels and drawers moving across the screen.' },
  enter:   { value: '0.4s',  use: 'First appearance of a region or a decorative flourish.' },
  reduced: { value: '0s',    use: 'Substituted wholesale under prefers-reduced-motion.' },
} as const

export type DurationName = keyof typeof duration

// ─── Semantic roles ──────────────────────────────────────────────────────────

/**
 * The seam an experiment retints. kern's components reference these roles and
 * never a named accent directly, so an experiment sets `--primary` once in its
 * own `index.css` and every shared component follows.
 *
 * kern's own default is pulsar; specifi uses solstice, gray-scott nebula.
 */
export const semanticRoles = {
  background: { value: 'var(--color-void-0)',  description: 'Page background.' },
  foreground: { value: 'var(--color-void-90)', description: 'Primary text.' },
  primary:    { value: 'var(--color-pulsar)',  description: 'The experiment accent — active states, emphasis.' },
  ring:       { value: 'var(--color-pulsar)',  description: 'Focus ring. Tracks the accent.' },
  link:       { value: 'var(--color-pulsar)',  description: 'Inline links in prose.' },
} as const

export type SemanticRole = keyof typeof semanticRoles
