import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { accentText, accentTint, type AccentColour } from '../lib/accent'

export interface StatusChipProps extends ComponentPropsWithRef<'span'> {
  /** Which accent to carry. See the Colours token page for the palette. */
  colour: AccentColour
}

/**
 * A small, non-interactive status label — a state, a category, a count
 * qualifier. Not a button: if it can be clicked, reach for `ToggleChip`.
 *
 * The twelve-entry colour map this used to carry now lives in `lib/accent`,
 * shared with every other accent-carrying component.
 */
export function StatusChip({ colour, className, ...props }: StatusChipProps) {
  return (
    <span
      className={cn(
        'type-annotation font-medium px-2 py-0.5 rounded-pill',
        accentText[colour],
        accentTint[colour],
        className,
      )}
      {...props}
    />
  )
}
