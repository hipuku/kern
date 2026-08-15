import type { Meta, StoryObj } from '@storybook/react'
import { RotateCcw, ChevronRight, X } from 'lucide-react'
import { IconButton } from './IconButton'

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

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
