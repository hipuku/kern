import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TransportControls } from './TransportControls'

const meta = {
  title: 'Molecules/TransportControls',
  component: TransportControls,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [running, setRunning] = useState(true)
    return (
      <TransportControls
        running={running}
        onToggle={() => setRunning((r) => !r)}
        onReset={() => setRunning(true)}
        resetLabel="Reset simulation"
      />
    )
  },
}
