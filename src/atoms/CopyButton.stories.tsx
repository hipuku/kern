import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from './CopyButton'

const meta = {
  title: 'Atoms/CopyButton',
  component: CopyButton,
  args: { text: 'Midnight Blue' },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="type-h4 text-void-90">Midnight Blue</span>
      <CopyButton text="Midnight Blue" />
    </div>
  ),
}
