import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { GitHubIcon } from './Icons'

describe('Icons', () => {
  it('drops into the same slots as a lucide icon', () => {
    // The module header's claim: currentColor, takes a className for sizing and
    // colour. If either stops being true these stop matching the lucide icons
    // they sit beside, which is a mismatch nobody notices in review.
    const { container } = render(<GitHubIcon className="w-4 h-4" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(svg.getAttribute('class')).toBe('w-4 h-4')
  })

  it('is hidden from the accessible tree', () => {
    // Decorative, always. The label belongs to the control wrapping it — a
    // glyph announced as "graphic" beside a named button is noise.
    const { container } = render(<GitHubIcon />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no axe violations inside a labelled control', async () => {
    const { container } = render(
      <button type="button" aria-label="GitHub"><GitHubIcon /></button>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
