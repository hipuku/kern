import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewportGate } from './ViewportGate'

const meta = {
  title: 'Templates/ViewportGate',
  component: ViewportGate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A desktop-only gate: the app at `lg`+, a short notice below it. Pure CSS (`lg:` / `max-lg:`), no ' +
          'resize listener and no flash of the wrong branch. Switch the viewport toolbar to a phone to see the ' +
          'notice; both branches are always in the DOM, the hidden one is display-none.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const FakeApp = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-ink-title type-h4">
    The app (visible at lg and above)
  </div>
)

export const DefaultNotice: Story = {
  name: 'Default notice (resize below lg)',
  render: () => (
    <ViewportGate>
      <FakeApp />
    </ViewportGate>
  ),
}

export const OnSmallScreen: Story = {
  name: 'On a small screen',
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  render: () => (
    <ViewportGate>
      <FakeApp />
    </ViewportGate>
  ),
}

export const CheekyNotice: Story = {
  name: 'On-brand copy',
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    docs: {
      description: {
        story:
          'The `notice` prop takes any node, so each experiment can speak in its own voice — a specificity pun, a ' +
          'colour-space quip, a reaction-diffusion aside. Supply just the content; the gate centres it.',
      },
    },
  },
  render: () => (
    <ViewportGate
      notice={
        <div className="flex flex-col gap-2 text-center max-w-xs">
          <p className="type-h4 text-ink-title">
            <code className="font-mono text-orbit">.phone</code> loses to{' '}
            <code className="font-mono text-solstice">#desktop</code>
          </p>
          <p className="type-p-sm text-ink-body">
            specifi is desktop-only for now. Open it on a wider screen — higher specificity wins.
          </p>
        </div>
      }
    >
      <FakeApp />
    </ViewportGate>
  ),
}
