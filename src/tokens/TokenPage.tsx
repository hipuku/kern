import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

interface TokenPageProps {
  title: string
  description?: string
  children: ReactNode
}

export function TokenPage({ title, description, children }: TokenPageProps) {
  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col gap-1.5">
        <h1 className="type-h4 text-void-90">{title}</h1>
        {description && <p className="type-p-sm text-void-60">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export function TokenSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="type-annotation-sc text-void-60">{title}</span>
      {children}
    </div>
  )
}

/**
 * A horizontally-scrolling container for the wide reference tables on these
 * pages.
 *
 * The `tabIndex` is the point: a container that scrolls must be reachable by
 * keyboard, or a keyboard-only user cannot scroll it — there is nothing
 * focusable inside a table of plain text to arrow across. axe reports this as
 * `scrollable-region-focusable`, and every token page was failing it. The
 * labelled region gives the resulting tab stop a name instead of announcing an
 * anonymous group.
 */
export function ScrollRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={label}
      className={cn(
        'rounded-xl border border-void-30 overflow-x-auto',
        focusRing,
      )}
    >
      {children}
    </div>
  )
}
