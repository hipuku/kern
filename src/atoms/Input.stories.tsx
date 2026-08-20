import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { Textarea } from './Textarea'
import { Field } from '../molecules/Field'

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

export const Multiline: Story = {
  name: 'Textarea',
  parameters: {
    docs: {
      description: {
        story:
          'Shares `inputChrome` with Input rather than restating it, so the two cannot drift — they were ' +
          'separate hand-rolled copies in hexicon and specifi.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Textarea rows={4} placeholder=".nav a:hover { … }" />
      <Textarea rows={3} resize="none" invalid defaultValue="ul > { color: red }" />
    </div>
  ),
}

export const InAField: Story = {
  name: 'Wired up with Field',
  parameters: {
    docs: {
      description: {
        story:
          'Prose could describe the label and error markup but not enforce the part that matters — connecting ' +
          'them. `Field` generates the ids and hands back props to spread, so `htmlFor`, `id` and ' +
          '`aria-describedby` cannot disagree.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <Field label="Hex code" hint="Six hexadecimal digits, with or without the hash.">
        {(control) => <Input placeholder="#7193ED" {...control} />}
      </Field>
      <Field label="Selector" error="Unclosed bracket at position 12.">
        {(control) => <Input invalid defaultValue="ul > li:nth-child(2" {...control} />}
      </Field>
      <Field label="Stylesheet">
        {(control) => <Textarea rows={4} placeholder="Paste CSS here" {...control} />}
      </Field>
    </div>
  ),
}
