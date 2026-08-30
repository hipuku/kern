import type { Meta, StoryObj } from '@storybook/react-vite'
import { Wordmark } from './Wordmark'
import { experiments } from './wordmarks'

const meta = {
  title: 'Atoms/Wordmark',
  component: Wordmark,
  tags: ['autodocs'],
  args: { src: '/brand/wordmark.svg', name: 'kern' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Rendered height. md is the house default for a sidebar header.' },
    name: { control: 'text', description: "The experiment's name. Becomes the alt text, so it is required." },
    href: { control: 'text', description: 'Wraps the mark in a link. Omit for a mark that is not clickable.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'All three experiments hand-wrote this as a bare `<img>` in their App.tsx, and had already drifted: ' +
          'hexicon rendered at `h-5` while specifi and gray-scott used `h-7`, so the sidebar header sat at a ' +
          'different height depending on which experiment you were looking at.\n\n' +
          'For the hipuku brand lettermark itself, use `Logo`.',
      },
    },
  },
} satisfies Meta<typeof Wordmark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-start gap-2">
          <Wordmark src="/brand/wordmark.svg" name="kern" size={size} />
          <span className="type-annotation font-mono text-ink-muted">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const TheExperiments: Story = {
  name: 'The three experiments',
  parameters: {
    docs: {
      description: {
        story:
          'The actual marks the three experiments ship, at the shared `md` height, which is the drift this ' +
          'atom exists to stop.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {experiments.map(({ name, src, xHeightRatio }) => (
        <div key={name} className="flex items-center gap-6">
          <Wordmark src={src} name={name} xHeightRatio={xHeightRatio} />
          <span className="type-annotation font-mono text-ink-muted">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Normalisation: Story = {
  name: 'Why size means x-height',
  parameters: {
    docs: {
      description: {
        story:
          'Left: every mark at the same box height, which is what a shared `h-7` gives you. The marks read as ' +
          'different sizes because the box is a typographic accident: "specifi" spends its height on the ' +
          'descender of the p, "hexicon" on the ascender of the h. Measured at a uniform 28px box the ' +
          'x-heights came out 18.3, 14.9 and 16.3 px.\n\n' +
          'Right: the same marks normalised on x-height. The boxes now differ; the letterforms match.',
      },
    },
  },
  render: () => (
    <div className="flex gap-16">
      {([
        ['Same box height', false],
        ['Same x-height', true],
      ] as const).map(([heading, normalised]) => (
        <div key={heading} className="flex flex-col gap-5">
          <span className="type-annotation-sc text-ink-muted">{heading}</span>
          {experiments.map(({ name, src, xHeightRatio }) => (
            <Wordmark
              key={name}
              src={src}
              name={name}
              xHeightRatio={normalised ? xHeightRatio : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Linked: Story = {
  name: 'As a link',
  parameters: {
    docs: { description: { story: 'Tab to it: a linked wordmark takes the standard focus ring.' } },
  },
  args: { href: 'https://kern.hipuku.dev' },
}
