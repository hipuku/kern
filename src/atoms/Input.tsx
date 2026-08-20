import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

/**
 * The shared chrome for text-entry controls, used by both `Input` and
 * `Textarea` so the two cannot drift apart.
 *
 * **Focus is a border change, not a ring.** This is the one deliberate
 * exception to kern's focus treatment: a ring drawn outside a full-width input
 * crowds the fields above and below it, and the border is already a strong
 * enough affordance on a filled control. Every other interactive element in the
 * system uses `focusRing`.
 */
export const inputChrome = cn(
  'w-full type-code bg-surface-panel text-ink-title',
  'border border-line-subtle rounded-card px-4 py-3',
  'outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)',
  'focus:border-line-strong',
  // ink-muted, not the void-40 the house pattern used to specify: placeholder
  // text is content, and void-40 measures 2.6:1 on this surface.
  'placeholder:text-ink-muted',
  'disabled:cursor-not-allowed disabled:opacity-50',
)

/** Error styling, shared by both controls. */
export const inputInvalid = 'border-flare text-flare focus:border-flare'

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  /**
   * Restricted to the text-like types. `checkbox`, `radio` and `range` are
   * different controls with different chrome — `range` is `ParamSlider` — and
   * accepting them here would render them with a text field's padding.
   */
  type?: 'text' | 'search' | 'url' | 'email' | 'number' | 'tel' | 'password'
  /** Applies the error treatment and sets `aria-invalid`. */
  invalid?: boolean
}

/**
 * A single-line text field.
 *
 * The house input pattern was written down in DESIGN_SYSTEM.md — the surface,
 * the border-only focus, the placeholder rule, the error state — but existed
 * only as prose, and three files across two experiments implemented it by hand.
 *
 * Renders in the mono face by default: every text input across the experiments
 * takes a hex code, a CSS selector or a number, none of which should be set in
 * a proportional face.
 */
export function Input({ type = 'text', invalid, className, ...props }: InputProps) {
  return (
    <input
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(inputChrome, invalid && inputInvalid, className)}
      {...props}
    />
  )
}
