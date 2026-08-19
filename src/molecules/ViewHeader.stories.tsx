import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewHeader } from './ViewHeader'

const meta = {
  title: 'Molecules/ViewHeader',
  component: ViewHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ViewHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Name a colour',
    description: 'Enter a hex code to find its closest English name using CIEDE2000 perceptual distance.',
  },
}
