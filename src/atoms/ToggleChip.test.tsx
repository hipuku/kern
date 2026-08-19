import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ToggleChip } from './ToggleChip'

describe('ToggleChip', () => {
  it('exposes its selected state through aria-pressed', () => {
    // Selection used to be conveyed by colour alone, so a screen reader user
    // could hear every option but not which one was chosen.
    render(
      <>
        <ToggleChip active onClick={() => {}}>Leopard</ToggleChip>
        <ToggleChip active={false} onClick={() => {}}>Coral</ToggleChip>
      </>,
    )
    expect(screen.getByRole('button', { name: 'Leopard' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Coral' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onClick when activated', async () => {
    const onClick = vi.fn()
    render(<ToggleChip active={false} onClick={onClick}>Zebra</ToggleChip>)
    await userEvent.click(screen.getByRole('button', { name: 'Zebra' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div role="group" aria-label="Pattern">
        <ToggleChip active onClick={() => {}}>Leopard</ToggleChip>
        <ToggleChip active={false} onClick={() => {}}>Coral</ToggleChip>
      </div>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
