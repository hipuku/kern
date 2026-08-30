import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from './Field'
import { Input } from '../atoms/Input'
import { Textarea } from '../atoms/Textarea'

const meta = {
  title: 'Molecules/Field',
  component: Field,
  tags: ['autodocs'],
  args: {
    label: 'Hex code',
    hint: 'Six hexadecimal digits, with or without the hash.',
    children: (control) => <Input placeholder="#7193ED" {...control} />,
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text', description: 'Replaces the hint and is announced as an alert.' },
    children: { control: false },
    aside: { control: false },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A labelled form control with its error and hint text.\n\n' +
          'The house pattern for this was documented in prose, and prose cannot enforce the part ' +
          'that matters: connecting the label to the control. Every hand-rolled copy had to ' +
          'remember `htmlFor`, a matching `id`, and `aria-describedby` for the error, three things ' +
          'that fail silently when missed, because the field still looks correct.\n\n' +
          'Taking a render function rather than plain children is what makes the wiring impossible ' +
          'to forget: the ids are generated here and handed to the control.',
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    label: 'Selector',
    hint: undefined,
    error: 'Unclosed bracket at position 12.',
    children: (control) => <Input invalid defaultValue="ul > li:nth-child(2" {...control} />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'An error replaces the hint and carries `role="alert"`, so it is announced when it ' +
          'appears. A hint is static and does not interrupt.',
      },
    },
  },
}

export const WithAside: Story = {
  args: {
    label: 'Stylesheet',
    hint: undefined,
    aside: <span className="type-annotation text-ink-muted">1,204 characters</span>,
    children: (control) => <Textarea rows={4} {...control} />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Trailing content in the label row, set hard right. It is placed but not styled by the ' +
          'field, and deliberately not wired into `aria-describedby`: the label row would ' +
          'otherwise read the count aloud as part of the field name.',
      },
    },
  },
}

export const Controls: Story = {
  name: 'Across control types',
  parameters: {
    docs: {
      description: {
        story: 'The same wiring, whatever the control is.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Field label="Hex code" hint="Six hexadecimal digits, with or without the hash.">
        {(control) => <Input placeholder="#7193ED" {...control} />}
      </Field>
      <Field label="Stylesheet">
        {(control) => <Textarea rows={4} placeholder="Paste CSS here" {...control} />}
      </Field>
    </div>
  ),
}
