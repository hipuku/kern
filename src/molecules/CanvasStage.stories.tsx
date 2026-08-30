import type { Meta, StoryObj } from '@storybook/react-vite'
import { CanvasStage } from './CanvasStage'

const meta = {
  title: 'Molecules/CanvasStage',
  component: CanvasStage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A framed, clipped, `position: relative` container for a `<canvas>` and its overlays. The chrome only: ' +
          'the pixels, worker and readouts stay with the view.',
      },
    },
  },
  args: { square: true },
  argTypes: { square: { control: 'boolean' } },
} satisfies Meta

export default meta
type Story = StoryObj

// A stand-in for the simulation canvas: a simple gradient fill.
const FakeCanvas = () => (
  <div
    className="w-full h-full"
    style={{ background: 'radial-gradient(circle at 30% 30%, var(--color-nebula), var(--color-background) 70%)' }}
  />
)

export const Default: Story = {
  render: (args) => (
    <div className="w-[360px]">
      <CanvasStage {...args}>
        <FakeCanvas />
      </CanvasStage>
    </div>
  ),
}

export const WithOverlay: Story = {
  name: 'With an overlay readout',
  render: () => (
    <div className="w-[360px]">
      <CanvasStage>
        <FakeCanvas />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-control bg-background/70 backdrop-blur-sm px-2 py-1">
          <span className="type-annotation font-mono text-ink-muted">60 fps</span>
        </div>
      </CanvasStage>
    </div>
  ),
}
