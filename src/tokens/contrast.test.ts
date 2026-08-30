import {
  voidScale,
  surfaceRoles,
  inkRoles,
  lineRoles,
  palette,
  accentNames,
  fontWeights,
  typeScale,
  typeRoles,
} from './tokens'
import { contrastRatio, hexToOklch } from '../lib/colour'

/**
 * The token system's own guarantees, asserted rather than documented.
 *
 * kern had a contrast matrix story that measured every colour beautifully and
 * prevented nothing. It was possible to ship a 2.6:1 label underneath it, and
 * kern did. These tests are the difference between describing the system and
 * enforcing it.
 */

const AA = 4.5
const AA_LARGE = 3

describe('ink on surface', () => {
  // Every pairing the system permits, built from each ink role's
  // own declaration of where it may be used. Adding a role, or widening one's
  // permitted surfaces, extends this automatically.
  const pairings = Object.entries(inkRoles).flatMap(([ink, { step, surfaces }]) =>
    surfaces.map((surface) => ({
      ink,
      surface,
      inkHex: voidScale[step],
      surfaceHex: voidScale[surfaceRoles[surface].step],
    })),
  )

  it.each(pairings)('$ink on $surface clears WCAG AA', ({ ink, surface, inkHex, surfaceHex }) => {
    const ratio = contrastRatio(inkHex, surfaceHex)
    expect(
      ratio,
      `${ink} (${inkHex}) on ${surface} (${surfaceHex}) is ${ratio.toFixed(2)}:1, below the ${AA}:1 AA floor`,
    ).toBeGreaterThanOrEqual(AA)
  })

  it('restricts surface-hover for a reason that still holds', () => {
    // The restriction is a design rule, not merely a contrast limit: mid-scale
    // ink never comes to rest on a hover surface because controls brighten
    // their text as they darken. But the rule earns its keep because the
    // lowest ink genuinely cannot survive there. If that stops being true the
    // restriction is worth revisiting rather than inheriting.
    const ratio = contrastRatio(
      voidScale[inkRoles['ink-muted'].step],
      voidScale[surfaceRoles['surface-hover'].step],
    )
    expect(ratio).toBeLessThan(AA)
  })
})

describe('line roles', () => {
  // Borders are not text and carry no AA obligation, but a border nobody can
  // see is not a border. Each line is checked against the surface it declares
  // it is drawn on, and checking them all against one surface is what made
  // line-subtle look broken when it is simply drawn somewhere else.
  it.each(Object.entries(lineRoles))('%s is visible on the surface it is drawn on', (_role, { step, on }) => {
    const ratio = contrastRatio(voidScale[step], voidScale[surfaceRoles[on].step])
    expect(ratio).toBeGreaterThan(1.12)
  })

  it('line-strong is not bright enough to be mistaken for text', () => {
    // void-40 reads as a usable grey but fails AA badly. Naming it a line role
    // is the guard; this asserts the naming stays honest, so nobody promotes it
    // to an ink role without the contrast catching up first.
    const ratio = contrastRatio(voidScale[lineRoles['line-strong'].step], voidScale['0'])
    expect(ratio).toBeLessThan(AA)
  })
})

describe('the void ramp', () => {
  const steps = Object.entries(voidScale)

  it('increases in lightness monotonically', () => {
    const lightness = steps.map(([, hex]) => hexToOklch(hex).L)
    for (let i = 1; i < lightness.length; i++) {
      expect(
        lightness[i],
        `void-${steps[i][0]} is not lighter than void-${steps[i - 1][0]}`,
      ).toBeGreaterThan(lightness[i - 1])
    }
  })

  it('has no two steps close enough to be redundant', () => {
    // void-80 and void-90 were ΔL 0.027 apart, two tokens doing one job.
    for (let i = 1; i < steps.length; i++) {
      const delta = hexToOklch(steps[i][1]).L - hexToOklch(steps[i - 1][1]).L
      expect(
        delta,
        `void-${steps[i - 1][0]} → void-${steps[i][0]} is only ΔL ${delta.toFixed(3)}`,
      ).toBeGreaterThan(0.035)
    }
  })
})

describe('accents', () => {
  it.each(accentNames)('%s base clears AA-large on the page surface', (name) => {
    // Accents carry icons, chip labels and active states, UI components rather
    // than body copy, which is the 3:1 threshold.
    const ratio = contrastRatio(palette[name].base, voidScale[surfaceRoles['surface-page'].step])
    expect(ratio).toBeGreaterThanOrEqual(AA_LARGE)
  })

  it.each(accentNames)('%s light is lighter than its base', (name) => {
    // `light` is the hover state, so it has to actually brighten.
    expect(hexToOklch(palette[name].light).L).toBeGreaterThan(hexToOklch(palette[name].base).L)
  })

  it.each(accentNames)('%s dark is darker than its base', (name) => {
    // `dark` is the on-light-background variant. It is unused in kern today,
    // but its name has to keep meaning what it says.
    expect(hexToOklch(palette[name].dark).L).toBeLessThan(hexToOklch(palette[name].base).L)
  })
})

describe('type', () => {
  it.each(typeRoles)('%s declares a weight the font actually ships', (role) => {
    // h1 and h2 declared weight 100 for the life of the system. Parkinsans has
    // no weight 100, since Google Fonts returns HTTP 400, so the browser silently
    // substituted 300 and the token never described what rendered.
    expect(fontWeights).toContain(typeScale[role].weight)
  })
})
