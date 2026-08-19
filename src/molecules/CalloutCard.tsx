import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { accentText, type AccentColour } from '../lib/accent'

export interface CalloutCardProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  /** Accent for the label. The card chrome stays neutral either way. */
  colour: AccentColour
  /** Optional heading line, tinted with `colour`. */
  label?: ReactNode
}

/**
 * A short aside in a view — a caveat, a definition, a rule of thumb.
 *
 * Only the label carries the accent; the surface stays neutral so a column of
 * callouts in different colours still reads as one column rather than as a
 * stack of unrelated alerts.
 */
export function CalloutCard({ colour, label, children, className, ...props }: CalloutCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl px-4 py-3 bg-void-20 border border-void-30 flex flex-col gap-1',
        className,
      )}
      {...props}
    >
      {label != null && (
        <p className={cn('type-annotation', accentText[colour])}>{label}</p>
      )}
      <p className="type-annotation text-void-60">{children}</p>
    </div>
  )
}
