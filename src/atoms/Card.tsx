import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

/**
 * The raised-panel surface, in one place.
 *
 * `rounded-card border bg-surface-raised border-line` was spelled out by hand in
 * `StatCard`, `CalloutCard`, the `AppSidebar` hamburger and four token-story
 * pages — the single most-repeated surface in the system, and exactly the kind
 * of primitive that quietly drifts (one copy on `border-line`, another on
 * `border-line-strong`) when no atom owns it.
 *
 * Exported so a component that needs the surface on a different element, or a
 * molecule building its own layout on top (a titled `Panel`), can borrow the
 * classes without restating them.
 */
export const cardVariants = cva('rounded-card border bg-surface-raised border-line', {
  variants: {
    /**
     * Interior padding. `md` (`p-4`) is the results-grid card; `sm` (`px-4 py-3`)
     * is the tighter callout; `none` lets a consumer that draws its own edge-to-edge
     * content (a table, a swatch strip) supply the padding itself.
     */
    padding: {
      none: '',
      sm: 'px-4 py-3',
      md: 'p-4',
    },
  },
  defaultVariants: { padding: 'md' },
})

export interface CardProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof cardVariants> {}

/**
 * A raised surface — the object a results grid, a callout or a stat is drawn on.
 *
 * Deliberately only the surface: no flex, no gap, no typography. Those are the
 * consumer's layout, and baking them in here would make the atom refuse to be
 * anything but one component's card.
 */
export function Card({ padding, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ padding }), className)} {...props} />
}
