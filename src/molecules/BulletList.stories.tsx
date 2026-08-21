import type { Meta, StoryObj } from '@storybook/react-vite'
import { BulletList } from './BulletList'
import { BulletItem } from '../atoms/BulletItem'

const meta = {
  title: 'Molecules/BulletList',
  component: BulletList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The `<ul>` wrapper for `BulletItem`s. Completes the pair kern previously shipped half of — every About ' +
          'view hand-wrote the same `list-none p-0 m-0` list.',
      },
    },
  },
} satisfies Meta<typeof BulletList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BulletList className="w-[520px]">
      <BulletItem>
        <strong className="text-ink-strong font-semibold">Lightness uniformity</strong> — standard deviation of lightness steps between sorted colours.
      </BulletItem>
      <BulletItem>
        <strong className="text-ink-strong font-semibold">Chroma coherence</strong> — standard deviation of C values across the palette.
      </BulletItem>
      <BulletItem>
        <strong className="text-ink-strong font-semibold">Hue arc</strong> — degrees of the hue wheel covered, and whether rotation is monotonic.
      </BulletItem>
    </BulletList>
  ),
}

export const CustomGap: Story = {
  name: 'Overriding the gap',
  render: () => (
    <BulletList className="w-[520px] gap-5">
      <BulletItem>A looser rhythm, set with a later <code className="type-code">gap-5</code> that twMerge lets win.</BulletItem>
      <BulletItem>Useful when the items are longer than a single line.</BulletItem>
    </BulletList>
  ),
}
