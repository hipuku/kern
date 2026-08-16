import type { Meta, StoryObj } from '@storybook/react'
import { GitHubIcon } from './Icons'

const meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

const icons = [{ name: 'GitHubIcon', Icon: GitHubIcon }]

export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {icons.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-2 text-void-80">
          <Icon className="w-6 h-6" />
          <span className="type-annotation text-void-60">{name}</span>
        </div>
      ))}
    </div>
  ),
}
