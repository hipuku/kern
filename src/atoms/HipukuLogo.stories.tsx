import type { Meta, StoryObj } from '@storybook/react-vite'
import { HipukuLogo } from './HipukuLogo'

const meta = {
  title: 'Atoms/HipukuLogo',
  component: HipukuLogo,
  tags: ['autodocs'],
} satisfies Meta<typeof HipukuLogo>

export default meta
type Story = StoryObj<typeof meta>

export const HexiconPalette: Story = {
  name: 'Hexicon palette (pulsar / orbit / tidal)',
  render: () => (
    <div className="flex items-center gap-2 type-p-sm text-void-60">
      <span>2026 © hexicon by</span>
      <HipukuLogo />
    </div>
  ),
}

export const SpecifiPalette: Story = {
  name: 'Specifi palette (orbit / solstice / supernova)',
  render: () => (
    <div className="flex items-center gap-2 type-p-sm text-void-60">
      <span>2026 © specifi by</span>
      <HipukuLogo hoverFills={{ hi: 'var(--color-orbit)', pu: 'var(--color-solstice)', ku: 'var(--color-supernova)' }} />
    </div>
  ),
}

export const GrayScottPalette: Story = {
  name: 'Gray-Scott palette (nebula / supernova / solstice)',
  render: () => (
    <div className="flex items-center gap-2 type-p-sm text-void-60">
      <span>2026 © gray-scott by</span>
      <HipukuLogo hoverFills={{ hi: 'var(--color-nebula)', pu: 'var(--color-supernova)', ku: 'var(--color-solstice)' }} />
    </div>
  ),
}

export const ReducedMotion: Story = {
  name: 'Reduced motion',
  parameters: {
    docs: {
      description: {
        story: 'Under `prefers-reduced-motion: reduce`, both the letter bounce animation and fill colour transitions are suppressed via CSS. The `@media (prefers-reduced-motion: reduce)` block in `index.css` sets `transition: none` and `animation: none !important` on all `.logo-*` elements. Hover the logo to confirm nothing moves.',
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .logo-h, .logo-i, .logo-p, .logo-u1, .logo-k, .logo-u2 {
            transition: none !important;
            animation: none !important;
          }
        `}</style>
        <div className="flex items-center gap-2 type-p-sm text-void-60">
          <span>Hover — no animation fires:</span>
          <Story />
        </div>
      </>
    ),
  ],
}
