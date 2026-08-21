import type { Meta, StoryObj } from '@storybook/react-vite'
import { Metric } from './Metric'

const meta = {
  title: 'Molecules/Metric',
  component: Metric,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A single figure with its label — the compact sibling of `StatCard`, without the badge or sub-text. ' +
          'Unifies the score cards, mini-scores, spec chips and ΔE cells the experiments each reinvented.',
      },
    },
  },
  args: {
    label: '[b] classes',
    value: 3,
    orientation: 'vertical',
    surface: true,
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    surface: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Metric>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Metric {...args} className="w-[160px]" />,
}

export const ScoreRow: Story = {
  name: 'A score row',
  render: () => (
    <div className="flex gap-3 w-[420px]">
      <Metric label="[a] IDs" value={1} className="flex-1" valueClassName="type-h4 font-mono text-solstice" />
      <Metric label="[b] classes" value={2} className="flex-1" valueClassName="type-h4 font-mono text-orbit" />
      <Metric label="[c] types" value={3} className="flex-1" valueClassName="type-h4 font-mono text-supernova" />
    </div>
  ),
}

export const Horizontal: Story = {
  name: 'Inline (horizontal, no surface)',
  render: () => (
    <div className="flex gap-4">
      <Metric orientation="horizontal" surface={false} label="a" value={1} valueClassName="type-code text-solstice" />
      <Metric orientation="horizontal" surface={false} label="b" value={2} valueClassName="type-code text-orbit" />
      <Metric orientation="horizontal" surface={false} label="c" value={3} valueClassName="type-code text-supernova" />
    </div>
  ),
}
