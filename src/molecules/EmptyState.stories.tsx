import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState } from './EmptyState'
import { ToggleChip } from '../atoms/ToggleChip'
import { InlineCode } from '../atoms/InlineCode'

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    children: 'Enter a selector above to see its specificity.',
  },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMessageMarkup: Story = {
  name: 'Message with code',
  render: () => (
    <EmptyState className="max-w-md">
      No selectors found. Make sure your CSS contains rules like <InlineCode colour="orbit">.class {'{ }'}</InlineCode>.
    </EmptyState>
  ),
}

export const WithActions: Story = {
  name: 'Try an example',
  render: () => (
    <EmptyState
      title="Try an example"
      actions={
        <>
          {['nav > ul li.active', '#header .logo::before', 'a:not(.disabled):hover'].map((ex) => (
            <ToggleChip key={ex} active={false} onClick={() => {}} mono>
              {ex}
            </ToggleChip>
          ))}
        </>
      }
    >
      Or paste your own selector above.
    </EmptyState>
  ),
}
