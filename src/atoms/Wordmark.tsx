import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

type Size = 'sm' | 'md' | 'lg'

/**
 * Target **x-height** in px, not box height.
 *
 * Setting every wordmark to the same box height does not make them look the
 * same size, because a mark's bounding box is a typographic accident: what
 * fills it depends on which letters the name happens to contain. Measured
 * across the three experiments at a uniform 28px box, the x-heights came out
 * 18.3px (hexicon), 14.9px (specifi) and 16.3px (gray-scott), a 23% spread,
 * because "specifi" spends height on the descender of its p while "hexicon"
 * spends it on the ascender of its h.
 *
 * x-height is what the eye reads as size, so it is what the scale is defined
 * in. The rendered box height is derived from it per mark.
 */
const X_HEIGHT: Record<Size, number> = {
  sm: 12,
  md: 16,
  lg: 20,
}

/**
 * Fallback box heights, used when a mark's `xHeightRatio` is unknown. Matches
 * the previous `h-5` / `h-7` / `h-9`.
 */
const BOX_HEIGHT: Record<Size, number> = {
  sm: 20,
  md: 28,
  lg: 36,
}

export interface WordmarkProps extends Omit<ComponentPropsWithRef<'img'>, 'height' | 'src' | 'alt'> {
  /** Path to the wordmark asset, usually served from the app's `public/`. */
  src: string
  /**
   * The experiment's name. Becomes the image's alt text, so it is required:
   * a wordmark is meaningful content, not decoration, and an unlabelled one
   * leaves a screen reader announcing the filename.
   */
  name: string
  size?: Size
  /**
   * The mark's x-height as a fraction of its viewBox height, which is what lets
   * `size` mean x-height rather than box height.
   *
   * Measure it once per mark: the height of a round lowercase letter that sits
   * on the baseline with no ascender or descender (`e`, `o`, `c`, `s`), divided
   * by the viewBox height. The three experiments' values are in `wordmarks.ts`.
   *
   * Omit it and the mark falls back to a fixed box height, which is correct-ish and
   * better than demanding every consumer measure their own artwork.
   */
  xHeightRatio?: number
  /** Wraps the mark in a link. Omit for a mark that is not clickable. */
  href?: string
}

/**
 * An experiment's wordmark, normalised so marks of different letterforms read
 * at the same size.
 *
 * All three experiments hand-wrote this as a bare `<img>` in their `App.tsx`,
 * and had already drifted, hexicon at `h-5` against `h-7` for the other two.
 * Sharing one component fixed the box height; sharing one *metric* is what
 * actually makes them look uniform.
 *
 * For the hipuku brand lettermark itself, use `Logo`.
 */
export function Wordmark({
  src,
  name,
  size = 'md',
  xHeightRatio,
  href,
  className,
  style,
  ...props
}: WordmarkProps) {
  const height = xHeightRatio
    ? X_HEIGHT[size] / xHeightRatio
    : BOX_HEIGHT[size]

  const img = (
    <img
      src={src}
      alt={name}
      // Height is computed per mark, so it cannot be a utility class.
      style={{ height: `${height}px`, ...style }}
      className={cn('w-auto', className)}
      {...props}
    />
  )

  if (!href) return img

  return (
    <a href={href} className={cn('inline-flex rounded-inline', focusRing)}>
      {img}
    </a>
  )
}
