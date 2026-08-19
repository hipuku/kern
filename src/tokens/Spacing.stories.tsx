import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, ScrollRegion } from './TokenPage'
import { spacing } from './tokens'

const meta = {
  title: 'Tokens/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

// Derived from the token source: name, rem value and the Tailwind utilities
// each step generates are all mechanical. Only the usage notes are editorial.

const STEPS = Object.entries(spacing).map(([step, rem]) => ({
  token: `--space-${step}`,
  name: `space-${step}`,
  px: `${parseFloat(rem) * 16}px`,
  rem,
  tw: `p-${step} / gap-${step}`,
}))

const GAP_USAGE = [
  { gap: 'gap-1', label: 'Tight list items'    },
  { gap: 'gap-2', label: 'Form field spacing'  },
  { gap: 'gap-3', label: 'Card internals'      },
  { gap: 'gap-4', label: 'Section blocks'      },
  { gap: 'gap-6', label: 'View sections'       },
  { gap: 'gap-8', label: 'Major layout breaks' },
]

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Scale: Story = {
  name: 'Spacing scale',
  render: () => (
    <TokenPage title="Spacing" description="Base-4 spacing scale mapped to CSS custom properties.">
      <ScrollRegion label="Spacing scale">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">Token</th>
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">px</th>
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">rem</th>
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">Tailwind</th>
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">Visual</th>
            </tr>
          </thead>
          <tbody>
            {STEPS.map(({ token, name, px, rem, tw }, i) => (
              <tr key={token} className={i < STEPS.length - 1 ? 'border-b border-void-20' : ''}>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <code className="type-annotation font-mono text-pulsar">{name}</code>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-50">{px}</span>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-60">{rem}</span>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-60">{tw}</span>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div
                    className="bg-pulsar/30 border border-pulsar/50 rounded-sm h-4"
                    style={{ width: `var(${token})` }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>
    </TokenPage>
  ),
}

export const InContext: Story = {
  name: 'Common gap values',
  render: () => (
    <TokenPage title="Common gap values" description="Typical gap sizes and where to apply them.">
      <ScrollRegion label="Gap usage">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">Gap</th>
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">Use</th>
              <th className="type-annotation-sc text-void-60 text-left px-4 py-2 font-normal whitespace-nowrap">Preview</th>
            </tr>
          </thead>
          <tbody>
            {GAP_USAGE.map(({ gap, label }, i) => (
              <tr key={gap} className={i < GAP_USAGE.length - 1 ? 'border-b border-void-20' : ''}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <code className="type-annotation font-mono text-pulsar">{gap}</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation text-void-50">{label}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`flex ${gap}`}>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-7 w-12 rounded bg-void-20 border border-void-30" />
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
