import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { StatusChip } from './StatusChip'

describe('StatusChip', () => {
  it('is not interactive', () => {
    // The docstring draws the line: if it can be clicked, reach for ToggleChip.
    // A chip that looks like a control and is not one is the defect this
    // prevents.
    render(<StatusChip colour="orbit">AA</StatusChip>)
    const chip = screen.getByText('AA')
    expect(chip.tagName).toBe('SPAN')
    expect(chip).not.toHaveAttribute('role')
    expect(chip).not.toHaveAttribute('tabindex')
  })

  it('carries a different treatment per accent', () => {
    const { rerender } = render(<StatusChip colour="orbit" data-testid="c">AA</StatusChip>)
    const orbit = screen.getByTestId('c').className
    rerender(<StatusChip colour="flare" data-testid="c">AA</StatusChip>)
    expect(screen.getByTestId('c').className).not.toBe(orbit)
  })

  it('has no axe violations', async () => {
    const { container } = render(<p>Rated <StatusChip colour="orbit">AA</StatusChip></p>)
    expect((await axe(container)).violations).toEqual([])
  })
})
