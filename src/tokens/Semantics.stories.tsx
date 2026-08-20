import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, ScrollRegion } from './TokenPage'
import { surfaceRoles, inkRoles, lineRoles, accentRoles, voidScale } from './tokens'
import { contrastRatio, wcagLevel } from '../lib/colour'

const meta = {
  title: 'Tokens/Semantic roles',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

const LEVEL_CLASS: Record<string, string> = {
  AAA: 'text-nebula',
  AA: 'text-aurora',
  'AA-large': 'text-solstice',
  fail: 'text-flare',
}

function Ratio({ fg, bg }: { fg: string; bg: string }) {
  const ratio = contrastRatio(fg, bg)
  return (
    <span className={`type-annotation font-mono ${LEVEL_CLASS[wcagLevel(ratio)]}`}>
      {ratio.toFixed(1)}
    </span>
  )
}

function Swatch({ hex, step }: { hex: string; step: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-control border border-white/10 shrink-0" style={{ backgroundColor: hex }} />
      <code className="type-annotation font-mono text-ink-muted">void-{step}</code>
    </div>
  )
}

export const Roles: Story = {
  name: 'Surfaces, ink and lines',
  render: () => (
    <TokenPage
      title="Semantic roles"
      description="The named decisions components make. Reach for these, not for a void step — the primitives are the ramp, these are what the ramp is for."
    >
      <TokenSection title="Surfaces">
        <ScrollRegion label="Surface roles">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Utility</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Primitive</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(surfaceRoles).map(([role, { step, description }], i, all) => (
                <tr key={role} className={i < all.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">bg-{role}</code>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><Swatch hex={voidScale[step]} step={step} /></td>
                  <td className="px-4 py-3"><span className="type-annotation text-ink-body">{description}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
      </TokenSection>

      <TokenSection title="Ink on every surface it is allowed on">
        <p className="type-annotation text-ink-muted max-w-[62ch]">
          Each ink role declares which surfaces it may sit on, and the build fails if any of these
          drops below 4.5:1. A blank cell is a pairing the system does not permit —{' '}
          <code className="type-code">ink-muted</code> is barred from the hover surface because it
          measures 3.8:1 there.
        </p>
        <ScrollRegion label="Ink roles and their permitted surfaces">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Utility</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Primitive</th>
                {Object.keys(surfaceRoles).map((s) => (
                  <th key={s} className="type-annotation-sc text-ink-body text-right px-4 py-2 font-normal whitespace-nowrap">
                    {s.replace('surface-', '')}
                  </th>
                ))}
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inkRoles).map(([role, { step, description, surfaces }], i, all) => (
                <tr key={role} className={i < all.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">text-{role}</code>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><Swatch hex={voidScale[step]} step={step} /></td>
                  {Object.entries(surfaceRoles).map(([s, surface]) => (
                    <td key={s} className="px-4 py-3 text-right">
                      {(surfaces as readonly string[]).includes(s)
                        ? <Ratio fg={voidScale[step]} bg={voidScale[surface.step]} />
                        : <span className="type-annotation text-ink-muted">—</span>}
                    </td>
                  ))}
                  <td className="px-4 py-3"><span className="type-annotation text-ink-body">{description}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
      </TokenSection>

      <TokenSection title="Lines">
        <ScrollRegion label="Line roles">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Utility</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Primitive</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Drawn on</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lineRoles).map(([role, { step, description, on }], i, all) => (
                <tr key={role} className={i < all.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">border-{role}</code>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><Swatch hex={voidScale[step]} step={step} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-ink-muted">{on}</code>
                  </td>
                  <td className="px-4 py-3"><span className="type-annotation text-ink-body">{description}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
      </TokenSection>

      <TokenSection title="Accent seam">
        <p className="type-annotation text-ink-muted max-w-[62ch]">
          The three roles an experiment redefines to retint every shared component. kern&rsquo;s own
          default is pulsar.
        </p>
        <ScrollRegion label="Accent roles">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-line-subtle">
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Property</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal whitespace-nowrap">Default</th>
                <th className="type-annotation-sc text-ink-body text-left px-4 py-2 font-normal">Use</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(accentRoles).map(([role, { value, description }], i, all) => (
                <tr key={role} className={i < all.length - 1 ? 'border-b border-line-subtle' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-pulsar">--{role}</code>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <code className="type-annotation font-mono text-ink-muted">{value}</code>
                  </td>
                  <td className="px-4 py-3"><span className="type-annotation text-ink-body">{description}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
      </TokenSection>
    </TokenPage>
  ),
}
