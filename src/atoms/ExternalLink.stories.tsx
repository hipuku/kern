import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from './ExternalLink'

const meta = {
  title: 'Atoms/ExternalLink',
  component: ExternalLink,
  tags: ['autodocs'],
  args: { href: 'https://example.com', children: 'CIEDE2000' },
} satisfies Meta<typeof ExternalLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { href: 'https://example.com', children: 'CIEDE2000 (CIE 142:2001)' },
}

export const InParagraph: Story = {
  render: () => (
    <p className="type-p-sm text-void-60">
      The dataset is{' '}
      <ExternalLink href="https://github.com/meodai/color-names">meodai/color-names</ExternalLink>
      , over 30,000 hand-curated English colour names.
    </p>
  ),
}

export const CitationBlock: Story = {
  name: 'Citation (dark prose)',
  render: () => (
    <div className="max-w-lg flex flex-col gap-4">
      <p className="type-p-sm text-void-60">
        The naming confidence measure draws on{' '}
        <ExternalLink href="https://www.jstor.org/stable/411222">
          Berlin &amp; Kay (1969), <em>Basic Color Terms</em>
        </ExternalLink>
        , which found that colour categories have focal points where naming is universal, and boundaries where it is contested.
      </p>
      <p className="type-p-sm text-void-60">
        ΔE thresholds follow{' '}
        <ExternalLink href="https://link.springer.com/article/10.1023/A:1020061901428">
          Sharma et al. (2005)
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink href="https://doi.org/10.1364/JOSAA.9.001529">
          MacAdam (1942)
        </ExternalLink>.
      </p>
    </div>
  ),
}
