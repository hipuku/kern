import type { Meta, StoryObj } from '@storybook/react-vite'
import { Wordmark } from './Wordmark'

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
          'All three experiments hand-wrote this as a bare `<img>` in their App.tsx — and had already drifted: ' +
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

export const Linked: Story = {
  name: 'As a link',
  parameters: {
    docs: { description: { story: 'Tab to it — a linked wordmark takes the standard focus ring.' } },
  },
  args: { href: 'https://kern.hipuku.dev' },
}
