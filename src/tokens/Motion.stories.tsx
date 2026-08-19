import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage } from './TokenPage'
import { easing, duration } from './tokens'

const meta = {
  title: 'Tokens/Motion',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

// Derived from the token source — curve values and usage notes both live in
// tokens.ts, so the motion documentation and the shipped easings are one thing.

const EASINGS = Object.entries(easing).map(([name, { value, use }]) => ({
  token: `--ease-${name}`,
  name: `ease-${name}`,
  curve: value,
  description: use,
}))

const DURATIONS = Object.entries(duration).map(([name, { value, use }]) => ({
  token: `--duration-${name}`,
  name,
  value,
  ms: `${parseFloat(value) * 1000}ms`,
  use,
}))

// ─── Sub-components ───────────────────────────────────────────────────────────

function EasingRow({ token, name, curve, description, last }: typeof EASINGS[number] & { last: boolean }) {
  const [running, setRunning] = useState(false)
  const trigger = () => {
    setRunning(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setRunning(true)))
  }
  return (
    <tr className={last ? '' : 'border-b border-void-20'}>
      <td className="px-4 py-3 whitespace-nowrap">
        <code className="type-annotation font-mono text-pulsar">{name}</code>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="type-annotation font-mono text-void-40">{curve}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="type-annotation text-void-50">{description}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-32 bg-void-10 rounded border border-void-20 overflow-hidden shrink-0">
            <div
              className="absolute top-0.5 bottom-0.5 left-0.5 w-5 rounded bg-pulsar"
              style={{
                transform: running ? 'translateX(calc(100cqw - 1.375rem - 0.125rem))' : 'translateX(0)',
                transition: running ? `transform var(--duration-slow) var(${token})` : 'none',
                containerType: 'inline-size',
              }}
            />
          </div>
          <button
            onClick={trigger}
            className="text-void-60 hover:text-void-90 p-1.5 rounded bg-void-30 hover:bg-void-40 transition-colors duration-150 cursor-pointer shrink-0"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}

function DurationRow({ token, name, value, ms, use, last }: typeof DURATIONS[number] & { last: boolean }) {
  const [running, setRunning] = useState(false)
  const trigger = () => {
    setRunning(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setRunning(true)))
  }
  return (
    <tr className={last ? '' : 'border-b border-void-20'}>
      <td className="px-4 py-3 whitespace-nowrap">
        <code className="type-annotation font-mono text-pulsar">{name}</code>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="type-annotation font-mono text-void-60">{ms}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="type-annotation font-mono text-void-40">{value}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="type-annotation text-void-50">{use}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button
          onClick={trigger}
          className="w-7 h-7 rounded bg-void-20 border border-void-30 hover:bg-void-30 transition-colors duration-150 cursor-pointer shrink-0 overflow-hidden relative"
        >
          <div
            className="absolute inset-0 bg-pulsar/20 rounded"
            style={{
              transform: running ? 'scale(1)' : 'scale(0)',
              opacity: running ? 0 : 1,
              transition: running
                ? `transform var(${token}) var(--ease-decelerate), opacity var(${token}) var(--ease-decelerate)`
                : 'none',
            }}
          />
        </button>
      </td>
    </tr>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Easings: Story = {
  name: 'Easing curves',
  render: () => (
    <TokenPage title="Motion" description="Easing curves and durations for all transitions.">
      <div className="rounded-xl border border-void-30 overflow-x-auto">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Token</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Curve</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Use</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Preview</th>
            </tr>
          </thead>
          <tbody>
            {EASINGS.map((e, i) => <EasingRow key={e.name} {...e} last={i === EASINGS.length - 1} />)}
          </tbody>
        </table>
      </div>
    </TokenPage>
  ),
}

export const ReducedMotion: Story = {
  name: 'Reduced motion',
  parameters: {
    docs: {
      description: {
        story: 'All animated components use `motion-safe:` Tailwind variants so transitions are skipped automatically under `prefers-reduced-motion: reduce`. The `--duration-reduced: 0s` token is the explicit zero-duration override for any component that needs to reference it directly. The two boxes below demonstrate: the left box respects the OS setting via `motion-safe:`, the right box hardcodes `--duration-reduced` directly.',
      },
    },
  },
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <TokenPage title="Reduced motion" description="How the design system handles prefers-reduced-motion.">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setOn(v => !v)}
            className="type-annotation font-mono bg-void-20 border border-void-30 hover:bg-void-30 rounded-lg px-3 py-1.5 cursor-pointer transition-colors duration-150"
          >
            Toggle
          </button>
          <span className="type-annotation text-void-40 self-center">Click to animate, then enable OS reduced motion and click again</span>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <span className="type-annotation-sc text-void-40">motion-safe: variant</span>
            <div className="w-48 h-12 rounded-lg bg-void-20 border border-void-30 relative overflow-hidden">
              <div
                className="absolute inset-y-1 left-1 w-10 rounded bg-pulsar motion-safe:transition-transform motion-safe:duration-300"
                style={{ transform: on ? 'translateX(144px)' : 'translateX(0)' }}
              />
            </div>
            <span className="type-annotation text-void-50">Skipped when OS motion is off</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="type-annotation-sc text-void-40">--duration-reduced token</span>
            <div className="w-48 h-12 rounded-lg bg-void-20 border border-void-30 relative overflow-hidden">
              <div
                className="absolute inset-y-1 left-1 w-10 rounded bg-orbit"
                style={{
                  transform: on ? 'translateX(144px)' : 'translateX(0)',
                  transition: `transform var(--duration-reduced) var(--ease-standard)`,
                }}
              />
            </div>
            <span className="type-annotation text-void-50">Always instant — 0s duration</span>
          </div>
        </div>
      </TokenPage>
    )
  },
}

export const Durations: Story = {
  name: 'Durations',
  render: () => (
    <TokenPage title="Motion" description="Easing curves and durations for all transitions.">
      <div className="rounded-xl border border-void-30 overflow-x-auto">
        <table className="w-auto min-w-full">
          <thead>
            <tr className="border-b border-void-20">
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Token</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">ms</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">s</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Use</th>
              <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Preview</th>
            </tr>
          </thead>
          <tbody>
            {DURATIONS.map((d, i) => <DurationRow key={d.name} {...d} last={i === DURATIONS.length - 1} />)}
          </tbody>
        </table>
      </div>
    </TokenPage>
  ),
}
