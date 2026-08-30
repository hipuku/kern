import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewContainer } from './ViewContainer'
import { ViewHeader } from '../molecules/ViewHeader'
import { Section } from '../molecules/Section'
import { StatCard } from '../molecules/StatCard'
import { CalloutCard } from '../molecules/CalloutCard'

const meta = {
  title: 'Templates/ViewContainer',
  component: ViewContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The centred, width-capped column a single view fills: the content-column counterpart to `AppShell`. ' +
          'All three experiments hand-wrote this frame at the top of every view.',
      },
    },
  },
  argTypes: {
    width: { control: 'select', options: ['md', 'lg'] },
    gap: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof ViewContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'A composed view column',
  parameters: {
    docs: {
      description: {
        story:
          'The column a view fills, here holding the `ViewHeader`, `Section`, `StatCard` and `CalloutCard` ' +
          'molecules at the container\'s gap. `AppShell` wraps this; the two together are the full page.',
      },
    },
  },
  render: (args) => (
    <div className="p-10 bg-background">
      <ViewContainer {...args}>
        <ViewHeader title="Map a palette" description="Paste CSS variables, JSON, or plain hex codes to see their perceptual structure." />
        <Section title="Results">
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Lightness uniformity" value="σ 4.2" badge="uniform" badgeColour="nebula" sub="Std dev of lightness steps." />
            <StatCard label="Chroma coherence" value="σ 1.8" badge="tight" badgeColour="nebula" sub="Std dev of chroma values." />
            <StatCard label="Hue arc" value="212°" badge="monotonic" badgeColour="tidal" sub="Degrees of the wheel swept." />
          </div>
        </Section>
        <CalloutCard colour="supernova" label="2 near-identical pairs">
          Colours within ΔE 2.5 may be indistinguishable at small sizes.
        </CalloutCard>
      </ViewContainer>
    </div>
  ),
}

export const Widths: Story = {
  render: () => (
    <div className="p-10 bg-background flex flex-col gap-8">
      <ViewContainer width="md" className="ring-1 ring-line rounded-card p-4">
        <span className="type-annotation-sc text-ink-body">width=&quot;md&quot;: max-w-2xl</span>
      </ViewContainer>
      <ViewContainer width="lg" className="ring-1 ring-line rounded-card p-4">
        <span className="type-annotation-sc text-ink-body">width=&quot;lg&quot;: max-w-3xl</span>
      </ViewContainer>
    </div>
  ),
}
