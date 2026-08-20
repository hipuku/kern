import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyButton } from './CopyButton'

const meta = {
  title: 'Atoms/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: { text: 'Midnight Blue' },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Bound to args rather than a render function, so the controls in the docs
 * panel actually drive it. Every story in this file used to be render-based,
 * which left the documented argTypes inert — a props table advertising
 * controls that did nothing.
 */
export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <span className="type-h4 text-ink-title">{args.text}</span>
      <CopyButton {...args} />
    </div>
  ),
}
