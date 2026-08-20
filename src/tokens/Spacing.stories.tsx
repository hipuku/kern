import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, ScrollRegion } from './TokenPage'
import { spacingBase, spacingRoles } from './tokens'

const meta = {
  title: 'Tokens/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

const base = parseFloat(spacingBase) * 16

/** The multiples that actually appear across kern and the three experiments. */
const COMMON_MULTIPLES = [1, 1.5, 2, 2.5, 3, 4, 6, 8, 10, 16]

/**
 * The gap utility for each role, spelled out. Tailwind scans for complete class
 * strings, so `gap-${name}` would compile to nothing — the same constraint that
 * governs the accent maps in lib/accent.ts.
 */
const ROLE_GAP: Record<keyof typeof spacingRoles, string> = {
  tight:   'gap-tight',
  field:   'gap-field',
  card:    'gap-card',
  section: 'gap-section',
  view:    'gap-view',
  major:   'gap-major',
}

const ROLES = Object.entries(spacingRoles).map(([name, { value, description }]) => ({
  name,
  value,
  px: `${parseFloat(value) * 16}px`,
  description,
  gapClass: ROLE_GAP[name as keyof typeof spacingRoles],
}))

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Scale: Story = {
  name: 'The multiplier',
  render: () => (
    <TokenPage
      title="Spacing"
      description={`Every spacing utility is a multiple of one base unit: ${spacingBase} (${base}px).`}
    >
      <TokenSection title="How it works">
        <p className="type-p-sm text-ink-body max-w-[62ch]">
          Tailwind derives every spacing utility from a single custom property.{' '}
          <code className="type-code text-orbit">p-4</code> compiles to{' '}
          <code className="type-code text-orbit">calc(var(--spacing) * 4)</code>, so the scale is
          the multiplier itself rather than a fixed ladder of named steps — any multiple is
          available, including halves.
        </p>
        <p className="type-p-sm text-ink-muted max-w-[62ch]">
          kern previously shipped a twelve-step <code className="type-code">--space-*</code>{' '}
          enumeration alongside this. It generated nothing: Tailwind&rsquo;s namespace is{' '}
          <code className="type-code">--spacing</code>, so no utility ever referenced those
          properties. They looked correct only because both scales are 4px-based.
        </p>
      </TokenSection>

      <TokenSection title="Multiples in use">
        <ScrollRegion label="Spacing multiples">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Utility</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Computes to</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">px</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Visual</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_MULTIPLES.map((n, i) => (
                <tr key={n} className={i < COMMON_MULTIPLES.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">p-{n} / gap-{n}</code>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className="type-annotation font-mono text-ink-muted">--spacing × {n}</span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className="type-annotation font-mono text-ink-body">{base * n}px</span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div
                      className="bg-pulsar/30 border border-pulsar/50 rounded-sm h-4"
                      style={{ width: `calc(var(--spacing) * ${n})` }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
      </TokenSection>
    </TokenPage>
  ),
}

export const Roles: Story = {
  name: 'Named layout spacing',
  render: () => (
    <TokenPage
      title="Named layout spacing"
      description="The layout decisions that recur, named. Reach for a raw multiple inside a component; reach for these when you are making the same decision the rest of the system makes."
    >
      <ScrollRegion label="Named spacing roles">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-line-subtle">
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Utility</th>
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Value</th>
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Preview</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map(({ name, value, px, description, gapClass }, i) => (
              <tr key={name} className={i < ROLES.length - 1 ? 'border-b border-line-subtle' : ''}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <code className="type-annotation font-mono text-pulsar">{gapClass}</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation font-mono text-ink-muted">{value} · {px}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="type-annotation text-ink-body">{description}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`flex ${gapClass}`}>
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-7 w-12 rounded-control bg-surface-raised border border-line" />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>
    </TokenPage>
  ),
}
