import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorBoundary } from './ErrorBoundary'

const meta = {
  title: 'Utilities/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    // These stories need local state or a throwing child, so they cannot be
    // driven by args. Hiding the panel is honest; leaving it visible advertises
    // controls that do nothing.
    controls: { disable: true },
 layout: 'fullscreen' },
  args: { children: null },
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

function ThrowOnMount(): never {
  throw new Error('Intentional render error — thrown by ThrowOnMount story fixture.')
}

export const Triggered: Story = {
  name: 'Triggered (error state)',
  decorators: [
    (Story) => (
      <ErrorBoundary>
        <Story />
      </ErrorBoundary>
    ),
  ],
  render: () => <ThrowOnMount />,
}

export const Passthrough: Story = {
  name: 'Passthrough (no error)',
  render: () => (
    <ErrorBoundary>
      <div className="flex items-center justify-center h-screen">
        <p className="type-p-sm text-void-60">Children render normally when no error is thrown.</p>
      </div>
    </ErrorBoundary>
  ),
}
