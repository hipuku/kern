import type { Meta, StoryObj } from '@storybook/react-vite'
import { Globe } from 'lucide-react'
import { IconLink } from './IconLink'
import { GitHubIcon } from './Icons'

const meta = {
  title: 'Atoms/IconLink',
  component: IconLink,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    href: 'https://github.com/hipuku',
    'aria-label': 'GitHub',
    external: true,
    children: <GitHubIcon className="w-4 h-4" />,
  },
  argTypes: {
    external: {
      control: 'boolean',
      description:
        'Opens in a new tab with `rel="noopener noreferrer"` and appends "(opens in new tab)" to the accessible name.',
    },
    'aria-label': { control: 'text' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof IconLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Row: Story = {
  name: 'A row of links',
  render: () => (
    <div className="flex items-center gap-4">
      <IconLink href="https://www.hipuku.dev" aria-label="hipuku website" external>
        <Globe className="w-4 h-4" />
      </IconLink>
      <IconLink href="https://github.com/hipuku" aria-label="GitHub" external>
        <GitHubIcon className="w-4 h-4" />
      </IconLink>
    </div>
  ),
}

export const Internal: Story = {
  name: 'Same-tab (internal)',
  parameters: {
    docs: {
      description: {
        story:
          'Without `external`, the link stays in the same tab and its accessible name is the bare `aria-label` — for ' +
          'a link that points within the site.',
      },
    },
  },
  args: {
    href: '#somewhere',
    'aria-label': 'Documentation',
    external: false,
    children: <Globe className="w-4 h-4" />,
  },
}
