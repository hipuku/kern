import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface EmptyStateProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  /** Optional lead line above the message — "Try an example", "Nothing yet". */
  title?: string
  /** The message body. */
  children: ReactNode
  /** Optional actions row, e.g. a set of example `ToggleChip`s. */
  actions?: ReactNode
}

/**
 * The "no input yet / no results / try an example" region.
 *
 * Every tool has one — specifi's "No selectors found" and "Try an example",
 * hexicon's "No #hex codes found" and "Add at least 2 colours" — and each was a
 * bare `<p>` (plus, in one case, a hand-rolled row of example buttons). This is
 * the shared shape: a message, optionally a lead line, optionally a row of
 * actions to get the user unstuck.
 *
 * It is deliberately *not* the place for inline field validation — an invalid
 * value belongs in `Field`'s `error`, which is wired to the control. This is for
 * the empty view, not the wrong keystroke.
 */
export function EmptyState({ title, children, actions, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      {title && <p className="type-p-sm text-ink-lead">{title}</p>}
      <p className="type-p-sm text-ink-body">{children}</p>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
