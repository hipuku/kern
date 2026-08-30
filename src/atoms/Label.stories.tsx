import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Naming confidence' },
  argTypes: {
    as: { control: 'radio', options: ['label', 'span'], description: 'Render a span when the text names a region rather than a form control.' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`type-annotation-sc text-ink-body` appeared 77 times across kern and the three experiments, so the ' +
          'single most repeated class pair in the system, and one that had already drifted onto `text-ink-muted` ' +
          'in one place.\n\n' +
          'Small caps come from `font-variant-caps` via the type role, never from the `uppercase` class: ' +
          'uppercasing in CSS changes the letterforms the font was drawn with, and is read aloud ' +
          'letter-by-letter by some screen readers.',
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NamingAControl: Story = {
  render: () => (
    <div className="flex flex-col gap-field w-80">
      <Label htmlFor="demo-hex">Hex code</Label>
      <Input id="demo-hex" placeholder="#7193ED" />
    </div>
  ),
}

export const NamingARegion: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A `<label>` with no control to point at is a lie to assistive technology, so use `as="span"`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Label as="span">Named colours</Label>
      <div className="flex gap-2">
        {['nebula', 'pulsar', 'flare'].map((c) => (
          <div key={c} className="h-10 w-20 rounded-control bg-surface-raised border border-line" />
        ))}
      </div>
    </div>
  ),
}
