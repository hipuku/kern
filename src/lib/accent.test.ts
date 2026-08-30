import { accentTint, accentText, accentTextHover, accentColours } from './accent'
import { accentOpacity, accentNames, palette } from '../tokens/tokens'
import { contrastRatio } from './colour'
import { voidScale, surfaceRoles } from '../tokens/tokens'

describe('accent maps', () => {
  it('covers every accent plus neutral, with no gaps', () => {
    for (const colour of accentColours) {
      expect(accentText[colour], `accentText is missing ${colour}`).toBeTruthy()
      expect(accentTint[colour], `accentTint is missing ${colour}`).toBeTruthy()
      expect(accentTextHover[colour], `accentTextHover is missing ${colour}`).toBeTruthy()
    }
    expect(accentColours).toHaveLength(accentNames.length + 1)
  })

  it('uses one tint opacity across every accent', () => {
    // The classes have to be written literally for Tailwind to scan them, so
    // the shared value cannot be interpolated in. This is what keeps the
    // literals honest against the number declared in tokens.ts.
    for (const name of accentNames) {
      expect(accentTint[name], `${name} tint does not use /${accentOpacity.tint}`)
        .toBe(`bg-${name}/${accentOpacity.tint}`)
    }
  })

  it('pairs neutral text with a surface it can actually be read on', () => {
    // The neutral chip is the one accent pairing that is two void steps rather
    // than a tint, so its contrast is not covered by the accent checks.
    // It was ink-muted on surface-hover, 3.77:1, until v1.1.
    const ratio = contrastRatio(voidScale['60'], voidScale[surfaceRoles['surface-hover'].step])
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('maps every accent to its own palette entry', () => {
    for (const name of accentNames) {
      expect(accentText[name]).toBe(`text-${name}`)
      expect(accentTextHover[name]).toBe(`hover:text-${name}-light`)
      expect(palette[name].base).toMatch(/^#[0-9A-F]{6}$/)
    }
  })
})
