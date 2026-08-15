import type { Meta, StoryObj } from '@storybook/react'
import { InlineCode } from './InlineCode'

const meta = {
  title: 'Atoms/InlineCode',
  component: InlineCode,
  tags: ['autodocs'],
  args: { children: '.nav-link' },
  argTypes: {
    colour: {
      control: 'select',
      options: [
        'text-nebula', 'text-aurora', 'text-tidal', 'text-orbit',
        'text-pulsar', 'text-quasar', 'text-corona', 'text-dusk',
        'text-flare',  'text-solstice', 'text-supernova',
      ],
      description: 'Text colour — defaults to text-orbit.',
    },
    children: { control: 'text', description: 'Code content.' },
    className: { control: 'text', description: 'Additional Tailwind classes for one-off overrides.' },
  },
} satisfies Meta<typeof InlineCode>

export default meta
type Story = StoryObj<typeof meta>

const ALL_COLOURS = [
  'text-nebula', 'text-aurora', 'text-tidal',  'text-orbit',
  'text-pulsar', 'text-quasar', 'text-corona', 'text-dusk',
  'text-flare',  'text-solstice', 'text-supernova',
] as const

export const AllVariants: Story = {
  name: 'All colour variants',
  render: () => (
    <div className="flex flex-col gap-2">
      {ALL_COLOURS.map((colour) => (
        <div key={colour} className="flex items-center gap-3">
          <InlineCode colour={colour}>{`.${colour.replace('text-', '')}`}</InlineCode>
          <span className="type-annotation text-void-40">{colour}</span>
        </div>
      ))}
    </div>
  ),
}

export const InSentence: Story = {
  render: () => (
    <p className="type-p-sm text-void-60">
      Use <InlineCode>.is()</InlineCode> to match any selector in a list, or <InlineCode colour="text-tidal">:where()</InlineCode> for zero-specificity grouping.
    </p>
  ),
}
