import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { ViewHeader } from '../molecules/ViewHeader'

export interface ToolViewProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title: string
  description: string
  /** Heading level for the `ViewHeader`. Defaults to `h1`. See `ViewHeader`. */
  as?: 'h1' | 'h2' | 'h3'
  /** The entry region, inputs and controls, shown between the header and the body. */
  input?: ReactNode
  /**
   * Shown in place of `children` when `isEmpty` is true, typically an
   * `EmptyState`. Keeping the empty branch here means every tool decides "no
   * result yet" the same way instead of scattering the condition through its JSX.
   */
  empty?: ReactNode
  /** When true, render `empty` instead of `children`. */
  isEmpty?: boolean
  /** The results / body of the tool. */
  children: ReactNode
}

/**
 * The scaffold every tool view is built on: a `ViewHeader`, an optional input
 * region, and a body that swaps to an empty state when there is nothing to show.
 *
 * All three experiments repeat this shape (header, then inputs, then results or
 * an empty message) in ~13 views, each re-deriving the "which do I render"
 * branch inline. `ToolView` owns the arrangement and that branch, so a view is
 * reduced to its actual content.
 *
 * It composes molecules (`ViewHeader`, and an `EmptyState` in the `empty` slot)
 * but does not wrap itself in a `ViewContainer`: the centred column is page
 * structure and belongs to the template above, not to this region.
 */
export function ToolView({
  title,
  description,
  as,
  input,
  empty,
  isEmpty,
  children,
  className,
  ...props
}: ToolViewProps) {
  return (
    <div className={cn('flex flex-col gap-8', className)} {...props}>
      <ViewHeader title={title} description={description} as={as} />
      {input}
      {isEmpty && empty != null ? empty : children}
    </div>
  )
}
