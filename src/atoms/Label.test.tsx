import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Label } from './Label'

describe('Label', () => {
  it('is a real label when it names a control', () => {
    render(
      <>
        <Label htmlFor="x">Threshold</Label>
        <input id="x" />
      </>,
    )
    expect(screen.getByLabelText('Threshold')).toBeInTheDocument()
  })

  it('renders a span when it names a region instead', () => {
    // A <label> with no control to point at is a lie to assistive technology,
    // which is why the escape hatch exists rather than callers reaching for a
    // bare <span> and losing the type role.
    render(<Label as="span">Contrast</Label>)
    expect(screen.getByText('Contrast').tagName).toBe('SPAN')
  })

  it('gets small caps from the type role, never from uppercase', () => {
    // Uppercasing in CSS changes the letterforms the font was drawn with, and
    // some screen readers read the result letter by letter.
    render(<Label as="span">Contrast</Label>)
    const el = screen.getByText('Contrast')
    expect(el.className).toContain('type-annotation-sc')
    expect(el.className.split(' ')).not.toContain('uppercase')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Label htmlFor="y">Threshold</Label>
        <input id="y" />
      </>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
