import type { Meta, StoryObj } from '@storybook/react'
import { CalloutCard } from './CalloutCard'

const meta = {
  title: 'Molecules/CalloutCard',
  component: CalloutCard,
  args: {
    colour:   'supernova',
    label:    '3 near-identical pairs',
    children: 'Colours within ΔE 2.5 may be indistinguishable at small sizes or under reduced colour sensitivity.',
  },
  argTypes: {
    colour: {
      control: 'select',
      options: ['nebula', 'aurora', 'tidal', 'orbit', 'pulsar', 'quasar', 'corona', 'dusk', 'flare', 'solstice', 'supernova', 'neutral'],
      description: 'Colour of the label line. Communicates the semantic register of the finding.',
    },
    label: {
      control: 'text',
      description: 'Short finding headline rendered in the accent colour. Omit for a plain single-body callout.',
    },
    children: {
      control: 'text',
      description: 'Explanation copy rendered in void-60 beneath the label.',
    },
  },
} satisfies Meta<typeof CalloutCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllColours: Story = {
  name: 'All colours',
  render: () => (
    <div className="flex flex-col gap-3 w-[400px]">
      <CalloutCard colour="supernova" label="3 near-identical pairs">
        Colours within ΔE 2.5 may be indistinguishable at small sizes.
      </CalloutCard>
      <CalloutCard colour="flare" label="Collision risk">
        Two selectors have equal specificity and overlapping scope — source order is decisive.
      </CalloutCard>
      <CalloutCard colour="nebula" label="Clean palette">
        All colours are perceptually distinct and evenly spaced in OKLCH.
      </CalloutCard>
      <CalloutCard colour="orbit" label="Note">
        Specificity is calculated per selector in a selector list.
      </CalloutCard>
      <CalloutCard colour="neutral" label="No signal">
        Not enough data to determine a result.
      </CalloutCard>
    </div>
  ),
}

export const NoLabel: Story = {
  name: 'No label (body only)',
  args: {
    label:    undefined,
    children: 'Both selectors have equal specificity. Source order decides.',
  },
}
