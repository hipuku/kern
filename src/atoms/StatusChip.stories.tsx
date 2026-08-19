import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusChip } from './StatusChip'

const meta = {
  title: 'Atoms/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  args: { children: 'Contested zone', colour: 'orbit' },
  argTypes: {
    colour: {
      control: 'select',
      options: ['nebula', 'aurora', 'tidal', 'orbit', 'pulsar', 'quasar', 'corona', 'dusk', 'flare', 'solstice', 'supernova', 'neutral'],
      description: 'Named accent that tints the chip.',
    },
    children: { control: 'text', description: 'Chip label.' },
  },
} satisfies Meta<typeof StatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Contested zone', colour: 'orbit' },
}

export const AllColours: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <StatusChip colour="nebula">Passing</StatusChip>
      <StatusChip colour="flare">Failing</StatusChip>
      <StatusChip colour="orbit">Info</StatusChip>
      <StatusChip colour="pulsar">Unambiguous</StatusChip>
      <StatusChip colour="solstice">Warning</StatusChip>
      <StatusChip colour="supernova">Highlight</StatusChip>
      <StatusChip colour="tidal">Close match</StatusChip>
      <StatusChip colour="quasar">Quasar</StatusChip>
      <StatusChip colour="aurora">Aurora</StatusChip>
      <StatusChip colour="corona">Corona</StatusChip>
      <StatusChip colour="dusk">Dusk</StatusChip>
      <StatusChip colour="neutral">Monotonic</StatusChip>
    </div>
  ),
}
