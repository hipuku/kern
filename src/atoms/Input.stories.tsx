import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: '#7193ED' },
  argTypes: {
    invalid: { control: 'boolean', description: 'Applies the error treatment and sets aria-invalid.' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The house input pattern was written down in DESIGN_SYSTEM.md — the surface, the border-only focus, ' +
          'the placeholder rule, the error state — but existed only as prose, and three files across two ' +
          'experiments implemented it by hand.\n\n' +
          'Focus is a border change rather than a ring: this is the one deliberate exception to kern\'s focus ' +
          'treatment, because a ring drawn outside a full-width field crowds the fields above and below it.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input placeholder="Resting" />
      <Input defaultValue="#7193ED" />
      <Input invalid defaultValue="#ZZZZZZ" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
}
