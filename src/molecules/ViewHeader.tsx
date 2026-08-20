import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

export interface ViewHeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title: string
  description: string
  /**
   * Heading level. Defaults to `h1`, which is right when the view is the page.
   * Drop to `h2` when the header sits inside a larger page that already has an
   * `h1` — skipping or repeating levels is the most common heading-order
   * failure in an app built from view components.
   */
  as?: 'h1' | 'h2' | 'h3'
}

/** The title-and-description block that opens a view. */
export function ViewHeader({ title, description, as: Heading = 'h1', className, ...props }: ViewHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <Heading className="type-h4 text-ink-title">{title}</Heading>
      <p className="type-p-sm text-ink-lead">{description}</p>
    </div>
  )
}
