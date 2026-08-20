/**
 * Colour maths for the token layer.
 *
 * This lived inside `Colours.stories.tsx`, which meant the only code that could
 * measure kern's contrast was a Storybook page — documentation that reports a
 * number nobody can assert on. Moved here so `contrast.test.ts` can fail the
 * build on an inaccessible pairing using exactly the same arithmetic the
 * published contrast matrix displays.
 *
 * sRGB and OKLab conversions follow Björn Ottosson's published coefficients.
 */

/** Splits `#RRGGBB` into three 0–1 channels. */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ]
}

/** Undoes the sRGB transfer function, giving linear light. */
export function srgbToLinear(v: number): number {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

/** WCAG relative luminance. */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * WCAG contrast ratio between two colours, 1–21. Order does not matter.
 *
 * Thresholds: 3 for large text and UI components, 4.5 for AA body text, 7 for
 * AAA.
 */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export interface Oklch {
  /** Perceptual lightness, 0–1. */
  L: number
  /** Chroma — 0 is a true neutral. */
  C: number
  /** Hue angle in degrees. */
  H: number
}

/**
 * Converts to OKLCH, which is perceptually uniform in a way sRGB is not: equal
 * steps in `L` look like equal steps to the eye, so it is the right space for
 * judging whether a neutral ramp is evenly spaced.
 */
export function hexToOklch(hex: string): Oklch {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
  const bv = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s

  return {
    L,
    C: Math.sqrt(a * a + bv * bv),
    H: ((Math.atan2(bv, a) * 180) / Math.PI + 360) % 360,
  }
}

/** WCAG conformance level of a ratio, for labelling. */
export function wcagLevel(ratio: number): 'AAA' | 'AA' | 'AA-large' | 'fail' {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA-large'
  return 'fail'
}
