import type { Meta, StoryObj } from '@storybook/react'
import { TokenPage, TokenSection } from './TokenPage'

const meta = {
  title: 'Tokens/Colours',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Palette ──────────────────────────────────────────────────────────────────

const NAMED = [
  { name: 'nebula',     dark: '#0D7A4F', base: '#15AD70', light: '#B4EDCF' },
  { name: 'aurora',     dark: '#5A9E3A', base: '#82D25D', light: '#C5F0A9' },
  { name: 'tidal',      dark: '#3FA8A1', base: '#68D0CA', light: '#B3EBE4' },
  { name: 'orbit',      dark: '#4A9FD0', base: '#73BDE7', light: '#C4E5F7' },
  { name: 'pulsar',     dark: '#4468D8', base: '#7193ED', light: '#C2CFFA' },
  { name: 'quasar',     dark: '#9B72E6', base: '#BF9FF1', light: '#E4D6FB' },
  { name: 'corona',     dark: '#F28BAD', base: '#F9C3D6', light: '#FCE4EE' },
  { name: 'dusk',       dark: '#E0B090', base: '#F5D4C0', light: '#FAF0E8' },
  { name: 'flare',      dark: '#C83D25', base: '#E15E42', light: '#F0A090' },
  { name: 'solstice',   dark: '#D46A0A', base: '#F78D2C', light: '#FDE4C0' },
  { name: 'supernova',  dark: '#D4A000', base: '#FFC700', light: '#FFE480' },
]

const VOID_STEPS = [
  { step: '0',  hex: '#121213' },
  { step: '10', hex: '#1F1F20' },
  { step: '20', hex: '#2B2B2C' },
  { step: '30', hex: '#383839' },
  { step: '40', hex: '#575759' },
  { step: '50', hex: '#838385' },
  { step: '60', hex: '#B1B1B3' },
  { step: '70', hex: '#D3D3D5' },
  { step: '80', hex: '#E8E8EA' },
  { step: '90', hex: '#F1F1F4' },
]

// All colours flat for contrast/lightness/oklch views
const ALL_COLOURS: { label: string; hex: string }[] = [
  ...NAMED.flatMap(({ name, dark, base, light }) => [
    { label: `${name}-dark`,  hex: dark  },
    { label: name,            hex: base  },
    { label: `${name}-light`, hex: light },
  ]),
  ...VOID_STEPS.map(({ step, hex }) => ({ label: `void-${step}`, hex })),
]

// ─── Colour math ──────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ]
}

function srgbToLinear(v: number): number {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function relLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relLuminance(hex1)
  const l2 = relLuminance(hex2)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

function hexToOklch(hex: string): { L: number; C: number; H: number } {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const lc = Math.cbrt(l)
  const mc = Math.cbrt(m)
  const sc = Math.cbrt(s)

  const L =  0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc
  const a =  1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc
  const bv = 0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc

  const C = Math.sqrt(a * a + bv * bv)
  const H = ((Math.atan2(bv, a) * 180) / Math.PI + 360) % 360

  return { L, C, H }
}


// ─── Inline polar plot (OKLCH token visualization only) ───────────────────────

const MAX_CHROMA = 0.4
const CHROMA_RINGS = [0.1, 0.2, 0.3, 0.4]

function toXY(C: number, H: number, R: number, cx: number, cy: number) {
  const rad = ((H - 90) * Math.PI) / 180
  const r   = (Math.min(C, MAX_CHROMA) / MAX_CHROMA) * R
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function OklchPolarPlot({ points, size = 300 }: { points: { hex: string; L: number; C: number; H: number }[]; size?: number }) {
  const pad = 28; const cx = size / 2; const cy = size / 2; const R = size / 2 - pad
  const hueLabels = [{ angle: 0, label: '0°' }, { angle: 90, label: '90°' }, { angle: 180, label: '180°' }, { angle: 270, label: '270°' }]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Polar plot of palette colours in OKLCH colour space">
      {CHROMA_RINGS.map(c => <circle key={c} cx={cx} cy={cy} r={(c / MAX_CHROMA) * R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />)}
      {[0, 90, 180, 270].map(deg => { const rad = ((deg - 90) * Math.PI) / 180; return <line key={deg} x1={cx} y1={cy} x2={cx + R * Math.cos(rad)} y2={cy + R * Math.sin(rad)} stroke="rgba(255,255,255,0.06)" strokeWidth={1} /> })}
      {hueLabels.map(({ angle, label }) => { const rad = ((angle - 90) * Math.PI) / 180; return <text key={angle} x={cx + (R + 16) * Math.cos(rad)} y={cy + (R + 16) * Math.sin(rad)} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="rgba(255,255,255,0.2)" fontFamily="'Geist Mono', monospace">{label}</text> })}
      {CHROMA_RINGS.map(c => <text key={c} x={cx + 4} y={cy - (c / MAX_CHROMA) * R - 3} fontSize={8} fill="rgba(255,255,255,0.18)" fontFamily="'Geist Mono', monospace">{c}</text>)}
      <circle cx={cx} cy={cy} r={2} fill="rgba(255,255,255,0.15)" />
      {points.map(pt => { const { x, y } = toXY(pt.C, pt.H, R, cx, cy); return <g key={pt.hex}><circle cx={x} cy={y} r={10} fill="rgba(0,0,0,0.4)" /><circle cx={x} cy={y} r={9} fill={pt.hex} stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} /></g> })}
    </svg>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColourSwatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-12 rounded-lg border border-white/5" style={{ backgroundColor: hex }} />
      <div className="flex flex-col gap-0.5">
        <span className="type-annotation font-mono text-void-80">{label}</span>
        <span className="type-annotation font-mono text-void-40">{hex.toUpperCase()}</span>
      </div>
    </div>
  )
}

function ContrastBadge({ ratio }: { ratio: number }) {
  const pass3 = ratio >= 3
  const pass45 = ratio >= 4.5
  const pass7 = ratio >= 7
  const bg = pass7 ? 'bg-nebula/20 text-nebula' : pass45 ? 'bg-aurora/20 text-aurora' : pass3 ? 'bg-solstice/20 text-solstice' : 'bg-void-20 text-void-40'
  return (
    <span className={`type-annotation font-mono rounded px-1 py-0.5 ${bg}`}>
      {ratio.toFixed(1)}
    </span>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const All: Story = {
  name: 'All colours',
  render: () => (
    <TokenPage title="Colours" description="All named and void-scale colours in the kern palette.">
      <TokenSection title="Named colours">
        <div className="flex flex-col gap-6">
          {NAMED.map(({ name, dark, base, light }) => (
            <div key={name} className="grid grid-cols-3 gap-3">
              <ColourSwatch hex={dark}  label={`${name}-dark`}  />
              <ColourSwatch hex={base}  label={name}            />
              <ColourSwatch hex={light} label={`${name}-light`} />
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Void scale">
        <div className="grid grid-cols-5 gap-3">
          {VOID_STEPS.map(({ step, hex }) => (
            <ColourSwatch key={step} hex={hex} label={`void-${step}`} />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  ),
}

export const ContrastMatrix: Story = {
  name: 'Contrast matrix',
  render: () => {
    const BG = '#121213'
    const SURFACE = '#1F1F20'
    const backgrounds = [
      { label: 'void-0',  hex: BG      },
      { label: 'void-10', hex: SURFACE },
    ]
    const foregrounds = ALL_COLOURS.filter(c =>
      relLuminance(c.hex) > relLuminance(BG) + 0.02
    )

    return (
      <TokenPage
        title="Contrast matrix"
        description="WCAG contrast ratios against void-0 and void-10 backgrounds. AA large ≥ 3, AA ≥ 4.5, AAA ≥ 7."
      >
        <div className="rounded-xl border border-void-30 overflow-x-auto">
          <table className="w-auto min-w-full">
            <thead>
              <tr className="border-b border-void-20">
                <th className="type-annotation-sc text-void-40 text-left px-4 py-2 font-normal whitespace-nowrap">Colour</th>
                {backgrounds.map(bg => (
                  <th key={bg.hex} className="type-annotation-sc text-void-40 text-right px-4 py-2 font-normal whitespace-nowrap">
                    on {bg.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {foregrounds.map(({ label, hex }, i) => (
                <tr key={hex} className={i < foregrounds.length - 1 ? 'border-b border-void-20' : ''}>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm border border-white/5 shrink-0" style={{ backgroundColor: hex }} />
                      <span className="type-code text-void-70">{label}</span>
                    </div>
                  </td>
                  {backgrounds.map(bg => (
                    <td key={bg.hex} className="px-4 py-2.5 text-right">
                      <ContrastBadge ratio={contrastRatio(hex, bg.hex)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 flex-wrap">
          <span className="type-annotation text-nebula">≥ 7 AAA</span>
          <span className="type-annotation text-aurora">≥ 4.5 AA</span>
          <span className="type-annotation text-solstice">≥ 3 AA large</span>
          <span className="type-annotation text-void-40">fail</span>
        </div>
      </TokenPage>
    )
  },
}


export const OklchPlot: Story = {
  name: 'OKLCH scale',
  render: () => {
    const points = ALL_COLOURS.map(({ hex }) => ({
      hex,
      ...hexToOklch(hex),
    }))

    const byLightness = [...ALL_COLOURS].sort(
      (a, b) => hexToOklch(a.hex).L - hexToOklch(b.hex).L
    )

    return (
      <TokenPage
        title="OKLCH scale"
        description="Polar plot of all colours in the OKLCH colour space. Angle = hue, radius = chroma, colour = actual swatch."
      >
        <TokenSection title="Polar plot — hue vs chroma">
          <OklchPolarPlot points={points} size={400} />
        </TokenSection>

        <TokenSection title="Lightness strip">
          <div className="flex h-6 rounded-lg overflow-hidden border border-white/5 w-full">
            {byLightness.map(({ hex, label }) => (
              <div
                key={label}
                title={label}
                className="flex-1 h-full"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="type-annotation text-void-40">dark</span>
            <span className="type-annotation text-void-40">light</span>
          </div>
        </TokenSection>
      </TokenPage>
    )
  },
}
