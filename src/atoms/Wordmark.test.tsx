import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Wordmark } from './Wordmark'
import { experiments } from './wordmarks'

describe('Wordmark', () => {
  it('uses the name as alt text', () => {
    // A wordmark is meaningful content rather than decoration, so an unlabelled one
    // leaves a screen reader announcing the filename.
    render(<Wordmark src="/specifi.svg" name="specifi" />)
    expect(screen.getByAltText('specifi')).toBeInTheDocument()
  })

  it('falls back to a fixed box height when the x-height is unknown', () => {
    render(<Wordmark src="/specifi.svg" name="specifi" />)
    expect(screen.getByAltText('specifi')).toHaveStyle({ height: '28px' })
  })

  it('renders every known mark at the same x-height', () => {
    // The point of the whole exercise. A shared *box* height leaves the marks
    // looking different sizes, because what fills the box depends on which
    // letters the name happens to contain: at a uniform 28px box the measured
    // x-heights were 18.3 / 14.9 / 16.3 px. Normalising on x-height instead
    // means the rendered heights differ but the letterforms match.
    for (const { name, src, xHeightRatio } of experiments) {
      const { unmount } = render(<Wordmark src={src} name={name} xHeightRatio={xHeightRatio} />)
      const box = parseFloat(getComputedStyle(screen.getByAltText(name)).height)
      expect(box * xHeightRatio, `${name} x-height`).toBeCloseTo(16, 1)
      unmount()
    }
  })

  it('renders the marks at genuinely different box heights', () => {
    // Guards against the normalisation silently becoming a no-op: if all three
    // boxes were equal again, the x-heights would be unequal again.
    const heights = experiments.map(({ name, src, xHeightRatio }) => {
      const { unmount } = render(<Wordmark src={src} name={name} xHeightRatio={xHeightRatio} />)
      const h = getComputedStyle(screen.getByAltText(name)).height
      unmount()
      return h
    })
    expect(new Set(heights).size).toBe(experiments.length)
  })

  it('is not a link unless given an href', () => {
    render(<Wordmark src="/specifi.svg" name="specifi" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('takes the focus ring when linked', () => {
    render(<Wordmark src="/specifi.svg" name="specifi" href="https://specifi.hipuku.dev" />)
    expect(screen.getByRole('link').className).toMatch(/focus-visible:ring-2/)
  })

  it('has no axe violations', async () => {
    const { container } = render(<Wordmark src="/specifi.svg" name="specifi" href="#" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
