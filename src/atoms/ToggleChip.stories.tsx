import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ToggleChip } from './ToggleChip'

const meta = {
  title: 'Atoms/ToggleChip',
  component: ToggleChip,
  tags: ['autodocs'],
  args: { active: false, onClick: () => {}, children: 'Leopard', mono: false },
  argTypes: {
    active: { control: 'boolean', description: 'Whether the chip is selected.' },
    mono: { control: 'boolean', description: 'Render the label in the monospace face.' },
    onClick: { action: 'toggled', description: 'Click handler.' },
    children: { control: 'text', description: 'Chip label.' },
  },
} satisfies Meta<typeof ToggleChip>

export default meta
type Story = StoryObj<typeof meta>

const PRESETS = ['Leopard', 'Coral', 'Labyrinth', 'Mitosis', 'Zebra']
const SPEEDS  = ['×1', '×4', '×8']

export const PresetGroup: Story = {
  render: () => {
    const [active, setActive] = useState('Leopard')
    return (
      <div className="flex flex-col gap-3">
        <span className="type-annotation-sc text-void-60">Pattern</span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <ToggleChip key={p} active={active === p} onClick={() => setActive(p)}>{p}</ToggleChip>
          ))}
        </div>
      </div>
    )
  },
}

export const SpeedGroup: Story = {
  render: () => {
    const [active, setActive] = useState('×1')
    return (
      <div className="flex flex-col gap-3">
        <span className="type-annotation-sc text-void-60">Speed</span>
        <div className="flex gap-2">
          {SPEEDS.map(s => (
            <ToggleChip key={s} active={active === s} onClick={() => setActive(s)} mono>{s}</ToggleChip>
          ))}
        </div>
      </div>
    )
  },
}

export const ActiveState: Story = {
  render: () => (
    <div className="flex gap-2">
      <ToggleChip active={true}  onClick={() => {}}>Active</ToggleChip>
      <ToggleChip active={false} onClick={() => {}}>Inactive</ToggleChip>
    </div>
  ),
}
