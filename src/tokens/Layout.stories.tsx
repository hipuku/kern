import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, ScrollRegion } from './TokenPage'
import { zIndexRoles, breakpoints } from './tokens'

const meta = {
  title: 'Tokens/Layout',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

const Z = Object.entries(zIndexRoles).map(([name, { value, description }]) => ({
  name,
  value,
  description,
}))

const BP = Object.entries(breakpoints).map(([name, px]) => ({
  name,
  px,
  rem: `${px / 16}rem`,
}))

export const Structure: Story = {
  name: 'Layering and breakpoints',
  render: () => (
    <TokenPage
      title="Layout"
      description="The two structural scales: what stacks above what, and where the layout changes shape."
    >
      <TokenSection title="Layering">
        <p className="type-p-sm text-ink-body max-w-[62ch]">
          Three values, previously spelled as <code className="type-code">z-30</code>,{' '}
          <code className="type-code">z-40</code> and <code className="type-code">z-50</code> at the
          point of use in <code className="type-code">AppSidebar</code>, where the relationship
          between them had to be reconstructed by reading all three. Not a Tailwind namespace, so
          reach for them as <code className="type-code">z-(--z-panel)</code>.
        </p>
        <ScrollRegion label="Layering roles">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Property</th>
                <th className="type-annotation-sc text-ink-body text-right px-4 py-2 font-normal whitespace-nowrap">Value</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              </tr>
            </thead>
            <tbody>
              {Z.map(({ name, value, description }, i) => (
                <tr key={name} className={i < Z.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">--z-{name}</code>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="type-annotation font-mono text-ink-muted">{value}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="type-annotation text-ink-body">{description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>

        {/* The mobile sidebar, flattened out so the order is visible at a glance. */}
        <div className="relative h-32 w-full max-w-md rounded-card border border-line overflow-hidden bg-surface-page">
          {/* Label sits right so the panel, which occupies the left, cannot cover it. */}
          <div className="absolute inset-0 bg-black/60 flex items-end justify-end p-2">
            <span className="type-annotation text-ink-body">backdrop · 30</span>
          </div>
          <div className="absolute inset-y-0 left-0 w-40 bg-surface-panel border-r border-line-subtle flex items-end p-2">
            <span className="type-annotation text-ink-body">panel · 40</span>
          </div>
          <div className="absolute top-2 left-2 rounded-control bg-surface-raised border border-line px-2 py-1">
            <span className="type-annotation text-ink-title">control · 50</span>
          </div>
        </div>
      </TokenSection>

      <TokenSection title="Breakpoints">
        <p className="type-p-sm text-ink-body max-w-[62ch]">
          Tailwind&rsquo;s defaults, restated so they exist as values rather than only as class
          prefixes. <code className="type-code">lg</code> is the one that matters: it is where the
          sidebar becomes an overlay, and <code className="type-code">AppSidebar</code> needs the
          number in JavaScript to decide whether a navigation should close the panel. That{' '}
          <code className="type-code">1024</code> used to be a magic number with nothing tying it to
          the <code className="type-code">lg:</code> classes it had to agree with.
        </p>
        <ScrollRegion label="Breakpoints">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Prefix</th>
                <th className="type-annotation-sc text-ink-body text-right px-4 py-2 font-normal whitespace-nowrap">px</th>
                <th className="type-annotation-sc text-ink-body text-right px-4 py-2 font-normal whitespace-nowrap">rem</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">In JavaScript</th>
              </tr>
            </thead>
            <tbody>
              {BP.map(({ name, px, rem }, i) => (
                <tr key={name} className={i < BP.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">{name}:</code>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="type-annotation font-mono text-ink-body">{px}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="type-annotation font-mono text-ink-muted">{rem}</span>
                  </td>
                  <td className="px-4 py-3">
                    <code className="type-annotation font-mono text-ink-muted">breakpoints.{name}</code>
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
