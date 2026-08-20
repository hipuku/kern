/**
 * The consuming experiments, for stories that need a real wordmark.
 *
 * The sidebar and shell stories previously hand-transcribed hexicon's and
 * specifi's SVG paths inline — hundreds of characters of asset data duplicated
 * into a story file, which goes stale silently the moment a mark is redrawn,
 * and gray-scott had no mark at all so its story used a text placeholder.
 * These are served from `brand/` as static assets instead.
 *
 * Not part of kern's public API: an experiment already has its own wordmark in
 * its `public/` folder and passes that path to `Wordmark` directly.
 */
export interface ExperimentBrand {
  name: string
  src: string
  /** The experiment's `--primary` accent, for the active nav item. */
  accentClass: string
  /** Retints the Logo hover animation to the experiment's palette. */
  hoverFills: { hi: string; pu: string; ku: string }
}

export const experiments: ExperimentBrand[] = [
  {
    name: 'hexicon',
    src: '/brand/hexicon.svg',
    accentClass: 'text-pulsar',
    hoverFills: { hi: 'var(--color-pulsar)', pu: 'var(--color-orbit)', ku: 'var(--color-tidal)' },
  },
  {
    name: 'specifi',
    src: '/brand/specifi.svg',
    accentClass: 'text-solstice',
    hoverFills: { hi: 'var(--color-orbit)', pu: 'var(--color-solstice)', ku: 'var(--color-supernova)' },
  },
  {
    name: 'gray-scott',
    src: '/brand/gray-scott.svg',
    accentClass: 'text-nebula',
    hoverFills: { hi: 'var(--color-nebula)', pu: 'var(--color-supernova)', ku: 'var(--color-solstice)' },
  },
]
