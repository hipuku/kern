import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ChipGroup } from './ChipGroup'
import { ToggleChip } from '../atoms/ToggleChip'

const meta = {
  title: 'Molecules/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Pattern',
    // A static default so the type is satisfied; the stories below drive the
    // real, stateful single-select group through `render`.
    children: <ToggleChip active onClick={() => {}}>Coral</ToggleChip>,
  },
  argTypes: { label: { control: 'text' } },
} satisfies Meta<typeof ChipGroup>

export default meta
type Story = StoryObj<typeof meta>

const PATTERNS = ['Coral', 'Leopard', 'Mitosis', 'Solitons']

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState('Coral')
    return (
      <ChipGroup {...args}>
        {PATTERNS.map((p) => (
          <ToggleChip key={p} active={active === p} onClick={() => setActive(p)}>
            {p}
          </ToggleChip>
        ))}
      </ChipGroup>
    )
  },
}

export const Mono: Story = {
  name: 'Monospace values (speed)',
  render: () => {
    const [speed, setSpeed] = useState(1)
    return (
      <ChipGroup label="Speed">
        {[1, 2, 4, 8].map((s) => (
          <ToggleChip key={s} active={speed === s} onClick={() => setSpeed(s)} mono>
            ×{s}
          </ToggleChip>
        ))}
      </ChipGroup>
    )
  },
}
