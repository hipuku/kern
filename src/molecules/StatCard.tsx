import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { StatusChip } from '../atoms/StatusChip'
import { Label } from '../atoms/Label'
import type { AccentColour } from '../lib/accent'

export interface StatCardProps extends ComponentPropsWithRef<'div'> {
  /** What the number is. Rendered in small caps. */
  label: string
  /** The number itself, or any short node. */
  value: ReactNode
  /** A line of context below the value. */
  sub?: string
  /** Text for the chip beside the value. Without it, `badgeColour` does nothing. */
  badge?: string
  /**
   * Accent for the badge. Defaults to neutral.
   *
   * This replaces the old pair of overlapping props — a `variant`
   * (`positive` / `warning` / `info` / `neutral`) that mapped onto four fixed
   * accents, plus a `badgeColour` that set the accent directly, with `variant`
   * silently winning when both were passed. One prop, one meaning.
   */
  badgeColour?: AccentColour
}

/**
 * A single figure with its label — the unit a results grid is built from.
 */
export function StatCard({
  label,
  value,
  sub,
  badge,
  badgeColour = 'neutral',
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn('flex flex-col gap-2 p-4 rounded-card border bg-surface-raised border-line', className)}
      {...props}
    >
      {/* as="span": this names the card, not a form control. */}
      <Label as="span">{label}</Label>
      <div className="flex items-baseline gap-2">
        <span className="type-h4 text-ink-title">{value}</span>
        {badge && <StatusChip colour={badgeColour}>{badge}</StatusChip>}
      </div>
      {sub && <p className="type-annotation text-ink-body">{sub}</p>}
    </div>
  )
}
