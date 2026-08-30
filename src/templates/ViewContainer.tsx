import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

/**
 * The centred single-column frame every view opens with:
 * `mx-auto w-full flex flex-col` at a capped width. All three experiments spell
 * this out at the top of ~13 view files, varying only the max-width and the
 * vertical rhythm.
 */
export const viewContainerVariants = cva('mx-auto w-full flex flex-col', {
  variants: {
    /** Reading measure. `lg` (`max-w-3xl`) is the default column; `md` (`max-w-2xl`) for a narrower tool. */
    width: {
      md: 'max-w-2xl',
      lg: 'max-w-3xl',
    },
    /** Vertical rhythm between the blocks a view stacks. */
    gap: {
      sm: 'gap-6',
      md: 'gap-8',
      lg: 'gap-12',
    },
  },
  defaultVariants: { width: 'lg', gap: 'md' },
})

export interface ViewContainerProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof viewContainerVariants> {}

/**
 * The content-column counterpart to `AppShell`.
 *
 * `AppShell` owns the page chrome (sidebar + scrolling `<main>`); `ViewContainer`
 * owns the column that chrome wraps: the centred, width-capped stack a single
 * view fills. Splitting them keeps the shell ignorant of any one view's measure
 * and lets a wide view opt out simply by not using it.
 */
export function ViewContainer({ width, gap, className, ...props }: ViewContainerProps) {
  return <div className={cn(viewContainerVariants({ width, gap }), className)} {...props} />
}
