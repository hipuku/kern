import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    padding: 'md',
    children: 'A raised surface.',
  },
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md'],
      description:
        '`md` (`p-4`) is the results-grid card, `sm` (`px-4 py-3`) the tighter callout, `none` for content that draws its own edge-to-edge padding.',
    },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The raised-panel surface (`rounded-card border bg-surface-raised border-line`) that `StatCard`, ' +
          '`CalloutCard` and the sidebar hamburger previously each spelled out by hand. It is deliberately only the ' +
          'surface — flex, gap and typography stay with the consumer.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[320px] type-p-sm text-ink-body" />
  ),
}

export const Padding: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <Card padding="md" className="type-annotation text-ink-body">padding=&quot;md&quot; — p-4</Card>
      <Card padding="sm" className="type-annotation text-ink-body">padding=&quot;sm&quot; — px-4 py-3</Card>
      <Card padding="none" className="type-annotation text-ink-body p-2">padding=&quot;none&quot; — consumer supplies its own</Card>
    </div>
  ),
}

export const Composed: Story = {
  name: 'As a layout base',
  parameters: {
    docs: {
      description: {
        story:
          'The consumer adds its own flex column and gap. This is how `StatCard` and `CalloutCard` are built on top ' +
          'of the atom.',
      },
    },
  },
  render: () => (
    <Card className="w-[240px] flex flex-col gap-2">
      <span className="type-annotation-sc text-ink-body">Lightness uniformity</span>
      <span className="type-h4 text-ink-title">σ 4.2</span>
      <span className="type-annotation text-ink-body">Std dev of lightness steps.</span>
    </Card>
  ),
}
