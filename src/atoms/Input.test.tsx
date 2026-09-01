import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Input, inputChrome } from './Input'

describe('Input', () => {
  it('takes text by default and accepts typing', async () => {
    render(<Input aria-label="Selector" />)
    const field = screen.getByRole('textbox', { name: 'Selector' })
    expect(field).toHaveAttribute('type', 'text')
    await userEvent.type(field, '.card > p')
    expect(field).toHaveValue('.card > p')
  })

  it('announces the error state rather than only drawing it', () => {
    // `invalid` is the whole reason the prop exists: a red border is invisible
    // to a screen reader, so it has to set aria-invalid too.
    const { rerender } = render(<Input aria-label="Hex" invalid />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    // And absent rather than "false" when valid, so it never announces a state
    // the field is not in.
    rerender(<Input aria-label="Hex" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('focuses by moving the border, which is the documented exception', () => {
    // Every other interactive element in kern uses focusRing. A ring drawn
    // outside a full-width input crowds the fields above and below it, so this
    // one control changes its border instead. Asserted so the exception cannot
    // be quietly normalised away.
    expect(inputChrome).toContain('focus:border-line-strong')
    expect(inputChrome).not.toContain('ring')
  })

  it('has no axe violations when labelled', async () => {
    const { container } = render(
      <>
        <label htmlFor="sel">Selector</label>
        <Input id="sel" />
      </>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
