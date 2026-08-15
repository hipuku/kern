import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Metric', value: '42' },
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'positive', 'warning', 'neutral', 'info'],
      description: 'Semantic variant — controls badge colour. Takes precedence over badgeColour when both are set.',
    },
    badgeColour: {
      control: 'select',
      options: [undefined, 'nebula', 'aurora', 'tidal', 'orbit', 'pulsar', 'quasar', 'corona', 'dusk', 'flare', 'solstice', 'supernova', 'neutral'],
      description: 'Escape hatch — pick a specific accent colour for the badge chip when none of the four named variants apply. Ignored when variant is set.',
    },
    badge:  { control: 'text',    description: 'Short qualifier displayed next to the value (e.g. "uniform", "high").' },
    sub:    { control: 'text',    description: 'Supporting sentence below the value.' },
    value:  { control: 'text',    description: 'Primary metric value. Accepts ReactNode for inline formatting.' },
    label:  { control: 'text',    description: 'Section label — rendered as annotation-sc above the value.' },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = {
  args: {
    label: 'Lightness uniformity',
    value: 'σ 4.2',
    badge: 'uniform',
    variant: 'positive',
    sub: 'Std dev of lightness steps between sorted colours. Lower = more even progression.',
  },
}

export const Info: Story = {
  args: {
    label: 'CIEDE2000 difference',
    value: 'ΔE 12.4',
    badge: 'distinct',
    variant: 'info',
    sub: 'Colours are perceptually distinct — clearly different to the average observer.',
  },
}

export const Warning: Story = {
  args: {
    label: 'Selector specificity',
    value: '(2,1,3)',
    badge: 'high',
    variant: 'warning',
    sub: 'Two ID selectors give this rule very high specificity.',
  },
}

export const Neutral: Story = {
  args: {
    label: 'Hue arc',
    value: '142°',
    badge: 'monotonic',
    variant: 'neutral',
    sub: 'Colours sweep 142° of the hue wheel with monotonic rotation.',
  },
}

export const WithoutBadge: Story = {
  args: {
    label: 'Hue arc',
    value: '142°',
    sub: 'Colours sweep 142° of the hue wheel with monotonic rotation.',
  },
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-96">
      <StatCard label="Specificity A" value="2" sub="ID selectors" />
      <StatCard label="Specificity B" value="1" sub="Class selectors" />
      <StatCard label="Specificity C" value="3" sub="Type selectors" />
      <StatCard label="Total" value="(2,1,3)" badge="high" variant="warning" />
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-[480px]">
      <StatCard label="Lightness uniformity" value="σ 4.2" badge="uniform"   variant="positive" sub="Even perceptual progression." />
      <StatCard label="Selector specificity" value="(2,1,3)" badge="high"    variant="warning"  sub="Two ID selectors — high specificity." />
      <StatCard label="Hue arc"              value="142°"  badge="monotonic" variant="neutral"  sub="Colours sweep 142° monotonically." />
      <StatCard label="CIEDE2000 difference" value="ΔE 12.4" badge="distinct" variant="info"    sub="Perceptually distinct colours." />
    </div>
  ),
}

export const EscapeHatch: Story = {
  name: 'badgeColour escape hatch',
  parameters: {
    docs: {
      description: {
        story: '`badgeColour` accepts any `StatusChipColour` for one-off cases not covered by the four named variants. It is ignored when `variant` is also set — `variant` always wins.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <StatCard label="Custom colour"   value="bezier" badge="alpha"        badgeColour="quasar" />
      <StatCard label="Variant + color" value="ignored" badge="variant wins" variant="info" badgeColour="quasar" sub="badgeColour is ignored — variant takes precedence." />
    </div>
  ),
}
