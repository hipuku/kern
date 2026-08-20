import type { Meta, StoryObj } from '@storybook/react-vite'
import { RotateCcw, ChevronRight, X } from 'lucide-react'
import { IconButton } from './IconButton'

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { 'aria-label': 'Reset', onClick: () => {}, children: <RotateCcw className="w-3.5 h-3.5" /> },
  argTypes: {
    'aria-label': { control: 'text', description: 'Accessible name — describe the action, not the icon.' },
    onClick: { action: 'clicked', description: 'Click handler.' },
    children: { control: false, description: 'The icon element.' },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Bound to args rather than a render function, so the controls in the docs
 * panel actually drive it. Every story in this file used to be render-based,
 * which left the documented argTypes inert — a props table advertising
 * controls that did nothing.
 */
export const Default: Story = {}

export const Reset: Story = {
  render: () => (
    <IconButton onClick={() => {}} aria-label="Reset">
      <RotateCcw className="w-3.5 h-3.5" />
    </IconButton>
  ),
}

export const Row: Story = {
  render: () => (
    <div className="flex gap-2">
      <IconButton onClick={() => {}} aria-label="Reset"><RotateCcw className="w-3.5 h-3.5" /></IconButton>
      <IconButton onClick={() => {}} aria-label="Next"><ChevronRight className="w-3.5 h-3.5" /></IconButton>
      <IconButton onClick={() => {}} aria-label="Close"><X className="w-3.5 h-3.5" /></IconButton>
    </div>
  ),
}
