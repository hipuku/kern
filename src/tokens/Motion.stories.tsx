import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react'
import { TokenPage } from './TokenPage'

const meta = {
  title: 'Tokens/Motion',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Data ─────────────────────────────────────────────────────────────────────

const EASINGS = [
  { token: '--ease-standard',   name: 'ease-standard',   curve: 'cubic-bezier(0.2, 0, 0, 1)',      description: 'Default for most transitions' },
  { token: '--ease-decelerate', name: 'ease-decelerate', curve: 'cubic-bezier(0, 0, 0.2, 1)',      description: 'Elements entering the screen' },
  { token: '--ease-accelerate', name: 'ease-accelerate', curve: 'cubic-bezier(0.4, 0, 1, 1)',      description: 'Elements leaving the screen' },
  { token: '--ease-sharp',      name: 'ease-sharp',      curve: 'cubic-bezier(0.4, 0, 0.6, 1)',    description: 'Quick, snappy actions' },
  { token: '--ease-smooth',     name: 'ease-smooth',     curve: 'cubic-bezier(0.45, 0, 0.55, 1)', description: 'Logo fill transitions' },
]

const DURATIONS = [
  { token: '--duration-instant', name: 'instant', value: '0.1s',  ms: '100ms', use: 'Focus rings, immediate feedback' },
  { token: '--duration-fast',    name: 'fast',    value: '0.15s', ms: '150ms', use: 'Hover states, colour swaps' },
  { token: '--duration-base',    name: 'base',    value: '0.2s',  ms: '200ms', use: 'Default for most transitions' },
  { token: '--duration-slow',    name: 'slow',    value: '0.3s',  ms: '300ms', use: 'Panels, dropdowns expanding' },
  { token: '--duration-enter',   name: 'enter',   value: '0.4s',  ms: '400ms', use: 'Page entry, logo letters' },
  { token: '--duration-reduced', name: 'reduced', value: '0s',    ms: '0ms',   use: 'Use with motion-safe: for prefers-reduced-motion' },
]

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
