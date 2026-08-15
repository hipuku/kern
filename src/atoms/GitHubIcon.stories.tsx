import type { Meta, StoryObj } from '@storybook/react'
import { Globe } from 'lucide-react'
import { GitHubIcon } from './GitHubIcon'

const meta = {
  title: 'Atoms/GitHubIcon',
  component: GitHubIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof GitHubIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <a href="#" aria-label="GitHub" className="text-void-60 inline-flex transition-all duration-200 motion-safe:hover:scale-125">
      <GitHubIcon className="w-4 h-4" />
    </a>
  ),
}

export const InSocialRow: Story = {
  name: 'In social link row',
  render: () => (
    <div className="flex items-center gap-4">
      {[{ Icon: Globe, label: 'Website' }, { Icon: GitHubIcon, label: 'GitHub' }].map(({ Icon, label }) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="text-void-60 inline-flex transition-all duration-200 motion-safe:hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-void-50 rounded"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  ),
}
