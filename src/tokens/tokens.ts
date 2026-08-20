/**
 * The kern token source of truth.
 *
 * Every token value in the system is declared here exactly once. Three things
 * consume it:
 *
 *   1. `scripts/build-tokens.mjs` generates the CSS in `src/styles/` from it.
 *      That CSS is committed (kern ships as source, with no build step for
 *      consumers), and `npm run tokens:check` fails CI if it drifts.
 *   2. The Storybook token pages render straight from these objects, so the
 *      published documentation cannot disagree with the shipped CSS.
 *   3. `contrast.test.ts` asserts every ink/surface pairing clears WCAG AA, so
 *      an inaccessible combination fails the build rather than shipping.
 *
 * Editing a value here and running `npm run tokens` is the only supported way
 * to change a token.
 */

// ─── Colour primitives ───────────────────────────────────────────────────────

/** A named accent, in the three steps every accent provides. */
export interface ColourRamp {
  /**
   * The variant for use on *light* backgrounds. kern is dark-only, so nothing
   * in the system currently reaches for it — it is kept for a consumer
   * embedding kern's palette on a light surface, and for a future light theme.
   * Do not use it as a "pressed" or "active" state on dark: it is darker than
   * the base and loses contrast against the void surfaces.
   */
  dark: string
  /** The default. Text, icons, and active states on dark surfaces. */
  base: string
  /** The hover state for interactive text carrying this accent. */
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
 * The three opacities at which an accent is used as chrome rather than as text.
 *
 * Only `tint` was declared before; `Button`'s accent variant carried a bare
 * `/25` and `/40` that no token described, which meant two thirds of the accent
 * chrome system was undocumented and unenforceable. Tailwind needs the class
 * itself written literally to be scannable, so these cannot be interpolated in —
 * `accent.test.ts` and `Button`'s own test assert the literals match.
 */
export const accentOpacity = {
  /** Background wash for chips, badges and the resting state of a toggle. */
  tint: 15,
  /** The same wash, on hover. */
  tintHover: 25,
  /** Border of an accent-carrying control. */
  border: 40,
} as const

/** @deprecated Use `accentOpacity.tint`. Kept so the name resolves during migration. */
export const accentTintPercent = accentOpacity.tint

/**
 * The neutral ramp, dark to light. `void-0` is the page background and
 * `void-90` the brightest text — the system is dark-only, so the scale runs in
 * the opposite direction to a conventional grey scale.
 *
 * **The ramp has two zones, and that is deliberate.** Steps 0–30 are surfaces
 * and sit close together (ΔL ≈ 0.05), which is what an elevation step should
 * be; their low contrast *ratios* against each other are not a defect, because
 * contrast ratio is the wrong measure for two adjacent surfaces. Steps 50–90
 * carry text and are spread far enough apart that each clears AA on every
 * surface it is placed on. Step 40 is the transition between the two and is
 * **decorative only** — at 2.60:1 on the page background it must never carry
 * text. It exists for borders, which have no contrast requirement.
 *
 * Two steps were corrected in v1.1 after measuring every pairing:
 *   - `void-50` was #838385, which failed AA on three of the four surfaces it
 *     was used on (3.10:1 on the hover surface). Raised until it clears 4.5 on
 *     the raised surface.
 *   - `void-80` was #E8E8EA, only ΔL 0.027 from `void-90` — two tokens doing
 *     one job. Moved to sit evenly between `void-70` and `void-90`.
 */
export const voidScale = {
  '0':  '#121213',
  '10': '#1F1F20',
  '20': '#2B2B2C',
  '30': '#383839',
  '40': '#575759',
  '50': '#929295',
  '60': '#B1B1B3',
  '70': '#D3D3D5',
  '80': '#E2E2E5',
  '90': '#F1F1F4',
} as const

export type VoidStep = keyof typeof voidScale

// ─── Semantic colour roles ───────────────────────────────────────────────────

/**
 * The named decisions the components actually make.
 *
 * Before these existed, the neutral half of the system had no semantic layer at
 * all: components reached straight for `bg-void-20` and `text-void-60`, and the
 * roles were real but unnamed — `text-void-60` appeared 136 times across four
 * codebases, always meaning "body text". The cost showed up when a contrast fix
 * meant editing 44 call sites instead of one token.
 *
 * Each role is a `:root` custom property pointing at a primitive, so an
 * experiment can retint any of them without forking a component.
 */
export const surfaceRoles = {
  'surface-page':   { step: '0',  description: 'The page background.' },
  'surface-panel':  { step: '10', description: 'Sidebar, code blocks — regions recessed from the page.' },
  'surface-raised': { step: '20', description: 'Cards, chips, controls. The most common surface text sits on.' },
  'surface-hover':  { step: '30', description: 'Hover state of a raised control.' },
} as const satisfies Record<string, { step: VoidStep; description: string }>

export type SurfaceRole = keyof typeof surfaceRoles

/**
 * Each ink role declares the surfaces it may be placed on, and
 * `contrast.test.ts` checks exactly those pairings.
 *
 * Only `ink-muted` is barred from `surface-hover`, and only because it measures
 * 3.77:1 there. An earlier draft of this restricted every mid-scale ink from
 * the hover surface on the theory that controls brighten their text as they
 * darken — which is true of the nav items but was too broad a rule: `ink-body`
 * measures 5.47:1 on the hover surface and is exactly right for a chip that
 * sits at that elevation. The declaration follows the measurement, not the
 * theory.
 */
export const inkRoles = {
  'ink-title': {
    step: '90',
    description: 'View titles and headings. The brightest text.',
    surfaces: ['surface-page', 'surface-panel', 'surface-raised', 'surface-hover'],
  },
  'ink-strong': {
    step: '80',
    description: 'Emphasised values inside body copy — a stat figure, a readout.',
    surfaces: ['surface-page', 'surface-panel', 'surface-raised', 'surface-hover'],
  },
  'ink-lead': {
    step: '70',
    description: 'Introductory and descriptive text below a title.',
    surfaces: ['surface-page', 'surface-panel', 'surface-raised', 'surface-hover'],
  },
  'ink-body': {
    step: '60',
    description: 'Default body and label text. The workhorse of the system.',
    surfaces: ['surface-page', 'surface-panel', 'surface-raised', 'surface-hover'],
  },
  'ink-muted': {
    step: '50',
    description: 'Annotations, captions, deliberately de-emphasised detail.',
    surfaces: ['surface-page', 'surface-panel', 'surface-raised'],
  },
} as const satisfies Record<string, { step: VoidStep; description: string; surfaces: readonly SurfaceRole[] }>

/**
 * `on` records the surface each line is drawn against, because a border is only
 * a border if it can be seen. `line-subtle` is the same value as
 * `surface-raised` by design — it is a divider for content sitting directly on
 * the page, and drawing it on a raised surface makes it disappear. Use `line`
 * inside a card.
 */
export const lineRoles = {
  'line-subtle': { step: '20', description: 'Dividers between rows of content on the page.', on: 'surface-page' },
  'line':        { step: '30', description: 'The edge of a card or control.',                 on: 'surface-page' },
  'line-strong': { step: '40', description: 'Hover state of a control edge. Decorative — never text.', on: 'surface-raised' },
} as const satisfies Record<string, { step: VoidStep; description: string; on: SurfaceRole }>

export type InkRole = keyof typeof inkRoles
export type LineRole = keyof typeof lineRoles

/**
 * The accent seam. Components reference these and never a named colour, so an
 * experiment sets them once in its own `index.css` and every shared component
 * follows. kern's own default is pulsar; specifi uses solstice, gray-scott
 * nebula.
 */
export const accentRoles = {
  primary: { value: 'var(--color-pulsar)', description: 'The experiment accent — active states, emphasis.' },
  ring:    { value: 'var(--color-pulsar)', description: 'Focus ring. Tracks the accent.' },
  link:    { value: 'var(--color-pulsar)', description: 'Inline links in prose.' },
} as const

export type AccentRole = keyof typeof accentRoles

/**
 * Aliases kept for the base layer and for components that style a whole page
 * region (`bg-background text-foreground`). They are the same decisions as
 * `surface-page` and `ink-title`, under the names Tailwind's own conventions
 * expect.
 */
export const baseRoles = {
  background: { step: '0',  description: 'Alias of surface-page, for the body element.' },
  foreground: { step: '90', description: 'Alias of ink-title, for the body element.' },
} as const satisfies Record<string, { step: VoidStep; description: string }>

// ─── Type ────────────────────────────────────────────────────────────────────

/**
 * One role in the type scale. kern's type is role-based rather than
 * size-based: you reach for `annotation` because the text is an annotation,
 * not because you want 13px.
 */
export interface TypeStyle {
  /** `font-size`, occasionally a clamp() for the fluid heading roles. */
  size: string
  /** Must be a weight Parkinsans actually ships — see `fontWeights`. */
  weight: number
  lineHeight: number
  tracking: string
  /** Renders in the mono face. */
  mono?: boolean
  /** Applies `font-variant-caps: all-small-caps` — never the `uppercase` class. */
  smallCaps?: boolean
}

/**
 * The weights Parkinsans ships, and therefore the only weights a type role may
 * declare. Google Fonts returns HTTP 400 for anything outside this range.
 *
 * `h1` and `h2` declared weight 100 until v1.1. It was never available, so the
 * browser silently substituted 300 — the token had never described what
 * rendered. Both now declare 300 explicitly.
 */
export const fontWeights = [300, 400, 500, 600, 700, 800] as const

const TYPE_SCALE = {
  'display':       { size: 'clamp(3.5rem, 7vw + 1rem, 7.125rem)',      weight: 800, lineHeight: 0.95, tracking: '-0.03em'  },
  'h1':            { size: 'clamp(2.625rem, 5vw + 0.75rem, 5.1875rem)', weight: 300, lineHeight: 1.05, tracking: '-0.025em' },
  'h2':            { size: 'clamp(2rem, 3.5vw + 0.5rem, 3.75rem)',      weight: 300, lineHeight: 1.1,  tracking: '-0.02em'  },
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

/**
 * Tailwind v4 derives every spacing utility from one base unit, multiplying it:
 * `p-4` compiles to `calc(var(--spacing) * 4)`. Declaring it here means kern
 * owns the value rather than inheriting Tailwind's default.
 *
 * kern previously shipped a twelve-step `--space-*` enumeration. It generated
 * nothing: Tailwind's namespace is `--spacing`, not `--space`, so no utility
 * ever referenced those custom properties. They looked correct only because
 * both scales happen to be 4px-based.
 */
export const spacingBase = '0.25rem'

/**
 * Named spacing for the layout decisions that recur. These are the rhythm the
 * Spacing token page used to describe in prose while the tokens themselves were
 * an unnamed numeric ladder.
 *
 * Reach for a raw multiple (`gap-2`) for one-off spacing inside a component;
 * reach for these when you are making the same layout decision the rest of the
 * system makes.
 */
export const spacingRoles = {
  tight:   { value: '0.25rem', description: 'Between items in a dense list.' },
  field:   { value: '0.5rem',  description: 'Between a label and its control.' },
  card:    { value: '0.75rem', description: 'Between elements inside a card.' },
  section: { value: '1rem',    description: 'Between blocks within a section.' },
  view:    { value: '1.5rem',  description: 'Between sections of a view.' },
  major:   { value: '2rem',    description: 'Between major regions of the page.' },
} as const

export type SpacingRole = keyof typeof spacingRoles

// ─── Radius ──────────────────────────────────────────────────────────────────

/**
 * Four decisions, named by what they wrap. The system was already consistent
 * about these — 37 `rounded-xl`, 13 `rounded-lg`, 8 `rounded-full` across four
 * codebases — but expressed as sizes, plus two arbitrary `rounded-[4px]` and
 * `rounded-[3px]` escape hatches that were really a missing fourth step.
 */
export const radiusRoles = {
  inline:  { value: '4px',    description: 'Inline code and other in-text chrome.' },
  control: { value: '8px',    description: 'Chips, small buttons, inputs.' },
  card:    { value: '12px',   description: 'Cards, panels, medium buttons.' },
  pill:    { value: '9999px', description: 'Status chips and anything fully rounded.' },
} as const

export type RadiusRole = keyof typeof radiusRoles

// ─── Layering ────────────────────────────────────────────────────────────────

/**
 * The stacking order of the app shell. Three values, previously spelled as
 * `z-30` / `z-40` / `z-50` at the point of use in `AppSidebar`, where the
 * relationship between them had to be reconstructed by reading all three.
 */
export const zIndexRoles = {
  backdrop: { value: 30, description: 'The scrim behind an open mobile sidebar.' },
  panel:    { value: 40, description: 'The sidebar panel itself, above the scrim.' },
  control:  { value: 50, description: 'The hamburger, which stays reachable above the panel.' },
} as const

export type ZIndexRole = keyof typeof zIndexRoles

// ─── Breakpoints ─────────────────────────────────────────────────────────────

/**
 * Tailwind's defaults, restated so they exist as values rather than only as
 * class prefixes. `lg` is the one that matters: it is where the sidebar becomes
 * an overlay, and `AppSidebar` needs the number in JavaScript to decide whether
 * a navigation should close the panel. That `1024` was a magic number with no
 * stated connection to the `lg:` classes it had to agree with.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export type Breakpoint = keyof typeof breakpoints

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
