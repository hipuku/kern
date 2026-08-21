import { render, screen, within } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ChipGroup } from './ChipGroup'
import { ToggleChip } from '../atoms/ToggleChip'

describe('ChipGroup', () => {
  it('names the chip group for assistive technology', () => {
    render(
      <ChipGroup label="Pattern">
        <ToggleChip active onClick={() => {}}>Coral</ToggleChip>
        <ToggleChip active={false} onClick={() => {}}>Leopard</ToggleChip>
      </ChipGroup>,
    )
    // The chips are reachable through a group announced by the label, rather
    // than as loose buttons with no shared name.
    const group = screen.getByRole('group', { name: 'Pattern' })
    expect(group).toBeInTheDocument()
    expect(within(group).getAllByRole('button')).toHaveLength(2)
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ChipGroup label="Speed">
        <ToggleChip active onClick={() => {}}>×1</ToggleChip>
        <ToggleChip active={false} onClick={() => {}}>×2</ToggleChip>
      </ChipGroup>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
