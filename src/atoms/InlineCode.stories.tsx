import type { Meta, StoryObj } from '@storybook/react-vite'
import { InlineCode } from './InlineCode'
import { accentColours } from '../lib/accent'

const meta = {
  title: 'Atoms/InlineCode',
  component: InlineCode,
  tags: ['autodocs'],
  args: { children: '.nav-link' },
  argTypes: {
    colour: {
      control: 'select',
      options: accentColours,
      description: 'Accent to render the code in. Defaults to orbit.',
    },
    children: { control: 'text', description: 'Code content.' },
    className: { control: 'text', description: 'Additional Tailwind classes for one-off overrides.' },
  },
} satisfies Meta<typeof InlineCode>

export default meta
type Story = StoryObj<typeof meta>


export const AllVariants: Story = {
  name: 'All colour variants',
  render: () => (
    <div className="flex flex-col gap-2">
      {accentColours.map((colour) => (
        <div key={colour} className="flex items-center gap-3">
          <InlineCode colour={colour}>{`.${colour}`}</InlineCode>
          <span className="type-annotation text-void-40">{colour}</span>
        </div>
      ))}
    </div>
  ),
}

export const InSentence: Story = {
  render: () => (
    <p className="type-p-sm text-void-60">
      Use <InlineCode>.is()</InlineCode> to match any selector in a list, or <InlineCode colour="tidal">:where()</InlineCode> for zero-specificity grouping.
    </p>
  ),
}
