import type { Meta, StoryObj } from '@storybook/react-vite'
import { Colophon } from './Colophon'

const meta = {
  title: 'Molecules/Colophon',
  component: Colophon,
  tags: ['autodocs'],
  args: { name: 'hexicon' },
  argTypes: {
    name: { control: 'text', description: "The experiment's name, as it reads in the credit line." },
    year: { control: 'number', description: 'Defaults to the current year.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The credit line at the foot of the sidebar. Each experiment used to assemble this by hand from a span ' +
          'and a HipukuLogo, with the year hardcoded — so every footer would have quietly gone stale on 1 January.',
      },
    },
  },
} satisfies Meta<typeof Colophon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Retinted: Story = {
  name: 'Retinted for an experiment',
  parameters: {
    docs: {
      description: {
        story: "The logo's hover animation takes the experiment's own palette, so the mark belongs to the page it sits on.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Colophon name="hexicon" />
      <Colophon
        name="specifi"
        hoverFills={{ hi: 'var(--color-orbit)', pu: 'var(--color-solstice)', ku: 'var(--color-supernova)' }}
      />
      <Colophon
        name="gray-scott"
        hoverFills={{ hi: 'var(--color-nebula)', pu: 'var(--color-supernova)', ku: 'var(--color-solstice)' }}
      />
    </div>
  ),
}

export const FixedYear: Story = {
  name: 'Pinned year',
  args: { name: 'hexicon', year: 2026 },
}
