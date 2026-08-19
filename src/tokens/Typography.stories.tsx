import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage } from './TokenPage'
import { typeScale, typeRoles, type TypeRole } from './tokens'

const meta = {
  title: 'Tokens/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

// Every column but the sample is read from the token source, so this table is
// a rendering of the shipped CSS rather than a transcription of it. Only the
// sample strings live here — they are editorial, not tokens.

const SAMPLES: Record<TypeRole, string> = {
  'display':       'ΔE 12.4',
  'h1':            'Perceptual colour distance',
  'h2':            'Perceptual colour distance',
  'h3':            'Name a colour',
  'h4':            'Name a colour',
  'h5':            'Name a colour',
  'h6':            'Name a colour',
  'p-lg':          'Enter a hex code to find its closest English name.',
  'p-base':        'Enter a hex code to find its closest English name.',
  'p-sm':          'Enter a hex code to find its closest English name using CIEDE2000 perceptual distance.',
  'annotation':    'Registered 3 Jan 2026, pending review',
  'annotation-sc': 'Naming confidence',
  'button':        'Compare colours',
  'code':          '#7193ED · .nav-link:hover · (2,1,3)',
}

/** `clamp(a, b, c)` reads as `clamp(a → c)` in the table: the ends are what matter. */
function formatSize(size: string): string {
  const clamp = size.match(/^clamp\(([^,]+),[^,]+,([^)]+)\)$/)
  return clamp ? `clamp(${clamp[1].trim()} → ${clamp[2].trim()})` : size
}

const TYPE_STYLES = typeRoles.map((role) => {
  const { size, weight, lineHeight, tracking, smallCaps } = typeScale[role]
  return {
    cls: `type-${role}`,
    label: role,
    size: formatSize(size) + (smallCaps ? ' (small caps)' : ''),
    weight: String(weight),
    lh: String(lineHeight),
    tracking,
    sample: SAMPLES[role],
  }
})

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Scale: Story = {
  name: 'Type scale',
  render: () => (
    <TokenPage title="Typography" description="All type styles available as .type-* utility classes.">
      <div className="rounded-xl border border-void-30 overflow-x-auto">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Class</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Size</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">wt</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">lh</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">ls</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Sample</th>
            </tr>
          </thead>
          <tbody>
            {TYPE_STYLES.map(({ cls, label, size, weight, lh, tracking, sample }, i) => (
              <tr key={cls} className={i < TYPE_STYLES.length - 1 ? 'border-b border-void-20' : ''}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <code className="type-annotation font-mono text-pulsar">.{label}</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-40">{size}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-40">{weight}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-40">{lh}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="type-annotation font-mono text-void-40">{tracking}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`${cls} text-void-90 whitespace-nowrap block`}>{sample}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TokenPage>
  ),
}
