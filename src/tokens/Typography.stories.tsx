import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage } from './TokenPage'

const meta = {
  title: 'Tokens/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

const TYPE_STYLES = [
  { cls: 'type-display',       label: 'display',       size: 'clamp(3.5rem → 7.125rem)',     weight: '800', lh: '0.95',  tracking: '-0.03em',  sample: 'ΔE 12.4' },
  { cls: 'type-h1',            label: 'h1',            size: 'clamp(2.625rem → 5.1875rem)',  weight: '100', lh: '1.05',  tracking: '-0.025em', sample: 'Perceptual colour distance' },
  { cls: 'type-h2',            label: 'h2',            size: 'clamp(2rem → 3.75rem)',        weight: '100', lh: '1.1',   tracking: '-0.02em',  sample: 'Perceptual colour distance' },
  { cls: 'type-h3',            label: 'h3',            size: 'clamp(1.5rem → 2.5rem)',       weight: '600', lh: '1.2',   tracking: '-0.015em', sample: 'Name a colour' },
  { cls: 'type-h4',            label: 'h4',            size: 'clamp(1.25rem → 1.75rem)',     weight: '600', lh: '1.3',   tracking: '-0.01em',  sample: 'Name a colour' },
  { cls: 'type-h5',            label: 'h5',            size: 'clamp(1.125rem → 1.375rem)',   weight: '500', lh: '1.4',   tracking: '-0.005em', sample: 'Name a colour' },
  { cls: 'type-h6',            label: 'h6',            size: '1.125rem',                     weight: '500', lh: '1.5',   tracking: '0em',      sample: 'Name a colour' },
  { cls: 'type-p-lg',          label: 'p-lg',          size: '1.375rem',                     weight: '400', lh: '1.4',   tracking: '0em',      sample: 'Enter a hex code to find its closest English name.' },
  { cls: 'type-p-base',        label: 'p-base',        size: '1.125rem',                     weight: '400', lh: '1.15',  tracking: '0em',      sample: 'Enter a hex code to find its closest English name.' },
  { cls: 'type-p-sm',          label: 'p-sm',          size: '1rem',                         weight: '400', lh: '1.7',   tracking: '0.01em',   sample: 'Enter a hex code to find its closest English name using CIEDE2000 perceptual distance.' },
  { cls: 'type-annotation',    label: 'annotation',    size: '0.8125rem',                    weight: '400', lh: '1.7',   tracking: '0.01em',   sample: 'Registered 3 Jan 2026, pending review' },
  { cls: 'type-annotation-sc', label: 'annotation-sc', size: '1rem (small caps)',            weight: '400', lh: '1.5',   tracking: '0.08em',   sample: 'Naming confidence' },
  { cls: 'type-button',        label: 'button',        size: '1rem',                         weight: '600', lh: '1.0',   tracking: '0.02em',   sample: 'Compare colours' },
  { cls: 'type-code',          label: 'code',          size: '0.9375rem',                    weight: '400', lh: '1.7',   tracking: '0em',      sample: '#7193ED · .nav-link:hover · (2,1,3)' },
]

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
