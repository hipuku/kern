/**
 * The consuming experiments, for stories that need a real wordmark.
 *
 * The sidebar and shell stories previously hand-transcribed hexicon's and
 * specifi's SVG paths inline, hundreds of characters of asset data duplicated
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
  /**
   * x-height as a fraction of the mark's viewBox height, measured from the
   * artwork: the height of a round lowercase letter sitting on the baseline,
   * over the viewBox height. See `Wordmark` for why size is defined this way.
   */
  xHeightRatio: number
  /** The experiment's `--primary` accent, for the active nav item. */
  accentClass: string
  /** Retints the Logo hover animation to the experiment's palette. */
  hoverFills: { hi: string; pu: string; ku: string }
}

export const experiments: ExperimentBrand[] = [
  {
    name: 'hexicon',
    src: '/brand/hexicon.svg',
    // 15.7 / 24, no descender, so the box is mostly ascender.
    xHeightRatio: 0.654,
    accentClass: 'text-pulsar',
    hoverFills: { hi: 'var(--color-pulsar)', pu: 'var(--color-orbit)', ku: 'var(--color-tidal)' },
  },
  {
    name: 'specifi',
    src: '/brand/specifi.svg',
    // 18.6 / 35. The p's descender makes this the tallest box of the three,
    // which is why it looked smallest at a shared box height.
    xHeightRatio: 0.531,
    accentClass: 'text-solstice',
    hoverFills: { hi: 'var(--color-orbit)', pu: 'var(--color-solstice)', ku: 'var(--color-supernova)' },
  },
  {
    name: 'gray-scott',
    src: '/brand/gray-scott.svg',
    // 16.3 / 28, descenders on g and y.
    xHeightRatio: 0.582,
    accentClass: 'text-nebula',
    hoverFills: { hi: 'var(--color-nebula)', pu: 'var(--color-supernova)', ku: 'var(--color-solstice)' },
  },
]
