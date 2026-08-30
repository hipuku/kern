import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { Logo, type HoverFills } from '../atoms/Logo'

export interface ColophonProps extends ComponentPropsWithRef<'div'> {
  /** The experiment's name, as it should read in the credit line. */
  name: string
  /**
   * Year shown in the credit. Defaults to the current year, so the footer of a
   * long-lived experiment does not quietly go stale. Every experiment
   * previously hardcoded `2026`.
   */
  year?: number
  /** Retints the logo's hover animation to the experiment's palette. */
  hoverFills?: HoverFills
}

/**
 * The credit line at the foot of the sidebar: "2026 © specifi by hipuku".
 *
 * Each experiment used to assemble this by hand from a `<span>` and a
 * `Logo`, which is exactly the kind of small, repeated, always-identical
 * markup a component library exists to absorb.
 */
export function Colophon({
  name,
  year = new Date().getFullYear(),
  hoverFills,
  className,
  ...props
}: ColophonProps) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <span>{year} © {name} by</span>
      <Logo hoverFills={hoverFills} />
    </div>
  )
}
