import type { Meta, StoryObj } from '@storybook/react'
import { SocialBar } from './SocialBar'

const meta = {
  title: 'Molecules/SocialBar',
  component: SocialBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    siteName: 'gray-scott',
    githubUrl: 'https://github.com/hipuku/gray-scott',
  },
} satisfies Meta<typeof SocialBar>

export default meta
type Story = StoryObj<typeof SocialBar>

export const Default: Story = {}

export const InSidebarHeader: Story = {
  name: 'In a sidebar header',
  render: (args) => (
    <div className="flex items-center justify-between w-[300px] bg-void-10 p-8 rounded-xl">
      <span className="type-h4 text-void-90">logo</span>
      <SocialBar {...args} />
    </div>
  ),
}

export const CustomWebsite: Story = {
  name: 'Custom website URL',
  args: {
    siteName: 'specifi',
    githubUrl: 'https://github.com/hipuku/specifi',
    websiteUrl: 'https://example.com',
  },
}
