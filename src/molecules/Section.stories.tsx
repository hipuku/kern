import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from './Section'
import { BulletItem } from '@/atoms/BulletItem'
import { ExternalLink } from '@/atoms/ExternalLink'

const meta = {
  title: 'Molecules/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    title: 'How it works',
    children: <p className="type-p-sm text-ink-body">The body of the section.</p>,
  },
  argTypes: {
    title: { control: 'text', description: 'Section heading.' },
    as: { control: 'radio', options: ['h2', 'h3', 'h4'], description: 'Heading level. See ViewHeader on heading order.' },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Bound to args so the controls in the docs panel drive it. Every story in this
 * file used to be render-based, which left the documented argTypes inert.
 */
export const Default: Story = {}

export const WithContent: Story = {
  render: () => (
    <Section title="How it works">
      <p className="type-p-sm text-void-60">
        Every About page is built from titled sections. Each section wraps a heading and
        any number of body elements — paragraphs, bullet lists, tables, or CTAs.
      </p>
    </Section>
  ),
}

export const WithBullets: Story = {
  render: () => (
    <Section title="Perceptual metrics">
      <p className="type-p-sm text-void-60">
        The tool measures three OKLCH axes independently:
      </p>
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        <BulletItem><strong className="text-void-80 font-semibold">Lightness</strong> — standard deviation of L steps when sorted.</BulletItem>
        <BulletItem><strong className="text-void-80 font-semibold">Chroma</strong> — spread of C values across the palette.</BulletItem>
        <BulletItem><strong className="text-void-80 font-semibold">Hue arc</strong> — degrees covered, and whether rotation is monotonic.</BulletItem>
      </ul>
    </Section>
  ),
}

export const WithExternalLinks: Story = {
  render: () => (
    <Section title="Background">
      <p className="type-p-sm text-void-60">
        The dataset is{' '}
        <ExternalLink href="https://github.com/meodai/color-names">meodai/color-names</ExternalLink>
        {' '}— over 30,000 hand-curated English colour names.
        Distance is computed with{' '}
        <ExternalLink href="https://cie.co.at/publications/improvement-industrial-colour-difference-evaluation">
          CIEDE2000 (CIE 142:2001)
        </ExternalLink>.
      </p>
    </Section>
  ),
}
