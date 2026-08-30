import type { Meta, StoryObj } from '@storybook/react-vite'
import { BulletItem } from './BulletItem'

const meta = {
  title: 'Atoms/BulletItem',
  component: BulletItem,
  tags: ['autodocs'],
  args: { children: 'Equal steps in L, C, or H produce equal-feeling changes.' },
} satisfies Meta<typeof BulletItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Equal steps in L, C, or H produce equal-feeling changes to the eye.' },
}

export const List: Story = {
  render: () => (
    <ul className="flex flex-col gap-3 list-none p-0 m-0">
      <BulletItem><strong className="text-void-80 font-semibold">Lightness uniformity</strong>: standard deviation of lightness steps between sorted colours.</BulletItem>
      <BulletItem><strong className="text-void-80 font-semibold">Chroma coherence</strong>: standard deviation of C values across the palette.</BulletItem>
      <BulletItem><strong className="text-void-80 font-semibold">Hue arc</strong>: degrees of the hue wheel covered, and whether rotation is monotonic.</BulletItem>
    </ul>
  ),
}
