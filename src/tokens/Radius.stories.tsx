import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, ScrollRegion } from './TokenPage'
import { radiusRoles } from './tokens'

const meta = {
  title: 'Tokens/Radius',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

/**
 * The utility for each role, spelled out — Tailwind scans for complete class
 * strings, so `rounded-${name}` would compile to nothing.
 */
const ROLE_CLASS: Record<keyof typeof radiusRoles, string> = {
  inline:  'rounded-inline',
  control: 'rounded-control',
  card:    'rounded-card',
  pill:    'rounded-pill',
}

const ROLES = Object.entries(radiusRoles).map(([name, { value, description }]) => ({
  name,
  value,
  description,
  cls: ROLE_CLASS[name as keyof typeof radiusRoles],
}))

export const Scale: Story = {
  name: 'Radius roles',
  render: () => (
    <TokenPage
      title="Radius"
      description="Four decisions, named by what they wrap rather than by their size."
    >
      <p className="type-p-sm text-ink-body max-w-[62ch]">
        The system was already consistent about these — 37 <code className="type-code">rounded-xl</code>,
        13 <code className="type-code">rounded-lg</code> and 8 <code className="type-code">rounded-full</code>{' '}
        across kern and the three experiments — but expressed as sizes, plus two arbitrary{' '}
        <code className="type-code">rounded-[4px]</code> and <code className="type-code">rounded-[3px]</code>{' '}
        escape hatches that were really a missing fourth step.
      </p>

      <ScrollRegion label="Radius roles">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-line-subtle">
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Utility</th>
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Value</th>
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Visual</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map(({ name, value, description, cls }, i) => (
              <tr key={name} className={i < ROLES.length - 1 ? 'border-b border-line-subtle' : ''}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <code className="type-annotation font-mono text-pulsar">{cls}</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation font-mono text-ink-muted">{value}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="type-annotation text-ink-body">{description}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`w-20 h-10 bg-surface-raised border border-line ${cls}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>

      <div className="flex flex-wrap items-end gap-6 pt-2">
        <div className="flex flex-col gap-2">
          <span className="type-annotation-sc text-ink-muted">In context</span>
          <div className="flex items-center gap-3">
            <code className="type-code bg-surface-raised text-orbit px-[5px] py-[1px] rounded-inline">inline</code>
            <button type="button" className="type-annotation bg-surface-raised border border-line text-ink-body px-2.5 py-1 rounded-control">control</button>
            <span className="type-annotation font-medium px-2 py-0.5 rounded-pill bg-pulsar/15 text-pulsar">pill</span>
            <div className="bg-surface-raised border border-line rounded-card px-4 py-3">
              <span className="type-annotation text-ink-body">card</span>
            </div>
          </div>
        </div>
      </div>
    </TokenPage>
  ),
}
