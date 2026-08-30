import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'
import { Field } from '../molecules/Field'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { rows: 4, placeholder: '.nav a:hover { … }' },
  argTypes: {
    invalid: {
      control: 'boolean',
      description: 'Applies the error treatment and sets aria-invalid.',
    },
    resize: { control: 'inline-radio', options: ['vertical', 'none'] },
    disabled: { control: 'boolean' },
    rows: { control: { type: 'number', min: 2, max: 12 } },
    placeholder: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text field, for pasting a stylesheet or a list of colours.\n\n' +
          'It shares `inputChrome` with `Input` rather than restating the surface, the border-only ' +
          'focus and the error state, so the two cannot drift. They were separate hand-rolled copies ' +
          'in hexicon and specifi.',
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Resting, filled, invalid and disabled, at the same width a form would give them.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Textarea rows={3} placeholder="Resting" />
      <Textarea rows={3} defaultValue=".nav a:hover { color: var(--primary) }" />
      <Textarea rows={3} invalid defaultValue="ul > { color: red }" />
      <Textarea rows={3} disabled placeholder="Disabled" />
    </div>
  ),
}

export const Resize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Vertical by default. Free resizing lets a textarea be dragged wider than its container ' +
          'and take the layout with it, so the horizontal axis is never offered; `resize="none"` ' +
          'fixes the height as well, for a field whose row count is part of the layout.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Textarea rows={3} defaultValue="resize: vertical" />
      <Textarea rows={3} resize="none" defaultValue="resize: none" />
    </div>
  ),
}

export const InAField: Story = {
  name: 'Wired up with Field',
  parameters: {
    docs: {
      description: {
        story:
          '`Field` generates the ids and hands back props to spread, so `htmlFor`, `id` and ' +
          '`aria-describedby` cannot disagree.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <Field label="Stylesheet" hint="Paste the rules you want audited.">
        {(control) => <Textarea rows={5} placeholder="Paste CSS here" {...control} />}
      </Field>
    </div>
  ),
}
