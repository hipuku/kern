import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Textarea } from './Textarea'
import { inputChrome } from './Input'

describe('Textarea', () => {
  it('shares its chrome with Input rather than restating it', () => {
    // They were separate hand-rolled copies in hexicon and specifi. The test
    // exists so a change to one cannot silently stop applying to the other.
    render(<Textarea aria-label="Stylesheet" />)
    const area = screen.getByRole('textbox', { name: 'Stylesheet' })
    for (const cls of inputChrome.split(' ').filter(c => !c.startsWith('placeholder:'))) {
      expect(area.className).toContain(cls)
    }
  })

  it('resizes vertically by default and never freely', async () => {
    // Free resizing lets the control be dragged wider than its container and
    // break the layout, so the horizontal axis is not on offer at all.
    const { rerender } = render(<Textarea aria-label="A" />)
    expect(screen.getByRole('textbox').className).toContain('resize-y')
    rerender(<Textarea aria-label="A" resize="none" />)
    expect(screen.getByRole('textbox').className).toContain('resize-none')
  })

  it('announces the error state', () => {
    render(<Textarea aria-label="A" invalid />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('accepts multi-line input', async () => {
    render(<Textarea aria-label="A" />)
    const area = screen.getByRole('textbox')
    await userEvent.type(area, 'a{enter}b')
    expect(area).toHaveValue('a\nb')
  })

  it('has no axe violations when labelled', async () => {
    const { container } = render(
      <>
        <label htmlFor="ss">Stylesheet</label>
        <Textarea id="ss" />
      </>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
