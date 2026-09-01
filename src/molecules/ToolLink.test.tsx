import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ToolLink } from './ToolLink'

describe('ToolLink', () => {
  it('is operable from the keyboard', async () => {
    const onClick = vi.fn()
    render(<ToolLink onClick={onClick}>Open the ramp</ToolLink>)
    await userEvent.tab()
    expect(screen.getByRole('button', { name: 'Open the ramp' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('uses the experiment accent unless told otherwise', () => {
    // Omitting `colour` is the usual case: the link takes --primary and follows
    // whatever the experiment's theme is. Passing one is for a link pointing at
    // something the palette already colour-codes.
    const { rerender } = render(<ToolLink data-testid="l">Go</ToolLink>)
    const primary = screen.getByTestId('l').className
    rerender(<ToolLink colour="flare" data-testid="l">Go</ToolLink>)
    expect(screen.getByTestId('l').className).not.toBe(primary)
  })

  it('has no axe violations', async () => {
    const { container } = render(<ToolLink>Open the ramp</ToolLink>)
    expect((await axe(container)).violations).toEqual([])
  })
})
