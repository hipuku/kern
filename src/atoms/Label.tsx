import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

export interface LabelProps extends ComponentPropsWithRef<'label'> {
  /**
   * Renders a `<span>` instead of a `<label>`. Use when the text names a region
   * rather than a form control — a `<label>` with no control to point at is a
   * lie to assistive technology.
   */
  as?: 'label' | 'span'
}

/**
 * The small-caps label that names a control, a card, or a section.
 *
 * `type-annotation-sc text-ink-body` appeared 77 times across kern and the three
 * experiments — the single most repeated class pair in the system, and one that
 * had already drifted onto `text-ink-muted` in one place.
 *
 * Small caps come from `font-variant-caps` via the type role, never from the
 * `uppercase` class: uppercasing in CSS changes the letterforms the font was
 * drawn with and is read aloud letter-by-letter by some screen readers.
 */
export function Label({ as: Component = 'label', className, ...props }: LabelProps) {
  return (
    <Component
      className={cn('type-annotation-sc text-ink-body', className)}
      {...(props as ComponentPropsWithRef<'label'>)}
    />
  )
}
