import type { Meta, StoryObj } from '@storybook/react'
import { TokenPage } from './TokenPage'

const meta = {
  title: 'Tokens/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  { token: '--space-1',  name: 'space-1',  px: '4px',   rem: '0.25rem', tw: 'p-1 / gap-1'   },
  { token: '--space-2',  name: 'space-2',  px: '8px',   rem: '0.5rem',  tw: 'p-2 / gap-2'   },
  { token: '--space-3',  name: 'space-3',  px: '12px',  rem: '0.75rem', tw: 'p-3 / gap-3'   },
  { token: '--space-4',  name: 'space-4',  px: '16px',  rem: '1rem',    tw: 'p-4 / gap-4'   },
  { token: '--space-5',  name: 'space-5',  px: '20px',  rem: '1.25rem', tw: 'p-5 / gap-5'   },
  { token: '--space-6',  name: 'space-6',  px: '24px',  rem: '1.5rem',  tw: 'p-6 / gap-6'   },
  { token: '--space-8',  name: 'space-8',  px: '32px',  rem: '2rem',    tw: 'p-8 / gap-8'   },
  { token: '--space-10', name: 'space-10', px: '40px',  rem: '2.5rem',  tw: 'p-10 / gap-10' },
  { token: '--space-12', name: 'space-12', px: '48px',  rem: '3rem',    tw: 'p-12 / gap-12' },
  { token: '--space-16', name: 'space-16', px: '64px',  rem: '4rem',    tw: 'p-16 / gap-16' },
  { token: '--space-20', name: 'space-20', px: '80px',  rem: '5rem',    tw: 'p-20 / gap-20' },
  { token: '--space-24', name: 'space-24', px: '96px',  rem: '6rem',    tw: 'p-24 / gap-24' },
]

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
      <div className="rounded-xl border border-void-30 overflow-x-auto">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Token</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">px</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">rem</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Tailwind</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Visual</th>
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
                  <span className="type-annotation font-mono text-void-40">{rem}</span>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-40">{tw}</span>
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
      </div>
    </TokenPage>
  ),
}

export const InContext: Story = {
  name: 'Common gap values',
  render: () => (
    <TokenPage title="Common gap values" description="Typical gap sizes and where to apply them.">
      <div className="rounded-xl border border-void-30 overflow-x-auto">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Gap</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Use</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Preview</th>
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
      </div>
    </TokenPage>
  ),
}
