import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

/** Rendered heights. `md` is the house default for a sidebar header. */
const SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-5',
  md: 'h-7',
  lg: 'h-9',
}

export interface WordmarkProps extends Omit<ComponentPropsWithRef<'img'>, 'height' | 'src' | 'alt'> {
  /** Path to the wordmark asset, usually served from the app's `public/`. */
  src: string
  /**
   * The experiment's name. Becomes the image's alt text, so it is required —
   * a wordmark is meaningful content, not decoration, and an unlabelled one
   * leaves a screen reader announcing the filename.
   */
  name: string
  size?: keyof typeof SIZE
  /** Wraps the mark in a link. Omit for a mark that is not clickable. */
  href?: string
}

/**
 * An experiment's wordmark.
 *
 * All three experiments hand-wrote this as a bare `<img>` in their `App.tsx` —
 * and had already drifted: hexicon rendered at `h-5` while specifi and
 * gray-scott used `h-7`, so the sidebar header sat at a different height
 * depending on which experiment you were looking at. That is precisely the
 * class of divergence kern exists to absorb.
 *
 * For the hipuku brand lettermark itself, use `Logo`.
 */
export function Wordmark({ src, name, size = 'md', href, className, ...props }: WordmarkProps) {
  const img = (
    <img
      src={src}
      alt={name}
      className={cn(SIZE[size], 'w-auto', className)}
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
