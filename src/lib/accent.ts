/**
 * The accent colour vocabulary shared across kern.
 *
 * Three components used to each carry their own hand-copied twelve-entry map of
 * the same palette (StatusChip, CalloutCard and ToolLink) and the shared type
 * was called `StatusChipColour`, naming a system-wide concept after whichever
 * component happened to need it first. Adding a colour meant editing three
 * files and hoping none was missed. This module is the one place that knows how
 * an accent name becomes classes.
 *
 * **Why these maps are written out longhand.** Tailwind scans source files for
 * complete class strings; it cannot see a class assembled at runtime, so
 * `` `text-${name}` `` would compile to nothing. The literal spelling is load
 * bearing: a lookup table is the only way to keep the classes scannable while
 * keeping the choice of colour dynamic. The accent names themselves still come
 * from `tokens.ts`: because each map is typed `Record<AccentColour, string>` and
 * `AccentColour` derives from the palette, adding a colour to the token source
 * turns these into compile errors rather than silently missing classes.
 */
import { accentNames, type AccentName } from '../tokens/tokens'

/**
 * An accent, or the neutral grey used when a thing is deliberately unemphasised
 * (a disabled chip, an inactive link). `neutral` is not in the palette; it maps
 * onto the void scale, which is why this is its own type rather than
 * `AccentName`.
 */
export type AccentColour = AccentName | 'neutral'

/**
 * Every selectable accent, in palette order with neutral last. Derived from the
 * token source so it cannot fall out of step with the palette.
 */
export const accentColours: AccentColour[] = [...accentNames, 'neutral']

/** Foreground text in the accent. */
export const accentText: Record<AccentColour, string> = {
  nebula:    'text-nebula',
  aurora:    'text-aurora',
  tidal:     'text-tidal',
  orbit:     'text-orbit',
  pulsar:    'text-pulsar',
  quasar:    'text-quasar',
  corona:    'text-corona',
  dusk:      'text-dusk',
  flare:     'text-flare',
  solstice:  'text-solstice',
  supernova: 'text-supernova',
  neutral:   'text-ink-body',
}

/**
 * A 15% wash of the accent, for chip and badge backgrounds. Neutral uses a flat
 * surface step instead: a 15% wash of grey on a grey surface is invisible.
 *
 * The neutral pairing is `ink-body` on `surface-hover` (5.47:1), not the
 * `ink-muted` it used to be, which measured 3.77:1 and was the one place in the
 * system putting the lowest ink on the highest surface.
 */
export const accentTint: Record<AccentColour, string> = {
  nebula:    'bg-nebula/15',
  aurora:    'bg-aurora/15',
  tidal:     'bg-tidal/15',
  orbit:     'bg-orbit/15',
  pulsar:    'bg-pulsar/15',
  quasar:    'bg-quasar/15',
  corona:    'bg-corona/15',
  dusk:      'bg-dusk/15',
  flare:     'bg-flare/15',
  solstice:  'bg-solstice/15',
  supernova: 'bg-supernova/15',
  neutral:   'bg-surface-hover',
}

/** Hover state for interactive text in the accent, stepping up to the light ramp. */
export const accentTextHover: Record<AccentColour, string> = {
  nebula:    'hover:text-nebula-light',
  aurora:    'hover:text-aurora-light',
  tidal:     'hover:text-tidal-light',
  orbit:     'hover:text-orbit-light',
  pulsar:    'hover:text-pulsar-light',
  quasar:    'hover:text-quasar-light',
  corona:    'hover:text-corona-light',
  dusk:      'hover:text-dusk-light',
  flare:     'hover:text-flare-light',
  solstice:  'hover:text-solstice-light',
  supernova: 'hover:text-supernova-light',
  neutral:   'hover:text-ink-title',
}
