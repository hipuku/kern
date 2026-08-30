import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'
import { accentColours } from '../lib/accent'

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Metric', value: '42' },
  argTypes: {
    badgeColour: {
      control: 'select',
      options: accentColours,
      description: 'Accent for the badge chip. Defaults to neutral.',
    },
    badge:  { control: 'text', description: 'Short qualifier displayed next to the value (e.g. "uniform", "high").' },
    sub:    { control: 'text', description: 'Supporting sentence below the value.' },
    value:  { control: 'text', description: 'Primary metric value. Accepts a ReactNode for inline formatting.' },
    label:  { control: 'text', description: 'Section label, rendered as annotation-sc above the value.' },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Hue arc',
    value: '142°',
    sub: 'Colours sweep 142° of the hue wheel with monotonic rotation.',
  },
}

export const WithBadge: Story = {
  args: {
    label: 'Lightness uniformity',
    value: 'σ 4.2',
    badge: 'uniform',
    badgeColour: 'nebula',
    sub: 'Std dev of lightness steps between sorted colours. Lower = more even progression.',
  },
}

export const Grid: Story = {
  name: 'In a results grid',
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-96">
      <StatCard label="Specificity A" value="2" sub="ID selectors" />
      <StatCard label="Specificity B" value="1" sub="Class selectors" />
      <StatCard label="Specificity C" value="3" sub="Type selectors" />
      <StatCard label="Total" value="(2,1,3)" badge="high" badgeColour="flare" />
    </div>
  ),
}

export const BadgeColours: Story = {
  name: 'Reading the badge as a signal',
  parameters: {
    docs: {
      description: {
        story:
          'The badge accent is chosen at the call site rather than through a fixed set of semantic variants. ' +
          'These four are the conventional readings: nebula for a good result, flare for one that needs attention, ' +
          'orbit for neutral information, and the default neutral grey when the badge is a plain qualifier rather ' +
          'than a judgement.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-[480px]">
      <StatCard label="Lightness uniformity" value="σ 4.2"    badge="uniform"   badgeColour="nebula"  sub="Even perceptual progression." />
      <StatCard label="Selector specificity" value="(2,1,3)"  badge="high"      badgeColour="flare"   sub="Two ID selectors, high specificity." />
      <StatCard label="CIEDE2000 difference" value="ΔE 12.4"  badge="distinct"  badgeColour="orbit"   sub="Perceptually distinct colours." />
      <StatCard label="Hue arc"              value="142°"     badge="monotonic" sub="Colours sweep 142° monotonically." />
    </div>
  ),
}
