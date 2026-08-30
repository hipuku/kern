import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

export interface DataTableProps extends Omit<ComponentPropsWithRef<'table'>, 'children'> {
  columns: string[]
  rows: ReactNode[][]
  /**
   * Names the table for assistive technology. A bare `<table>` is announced
   * only as "table"; on a page with several, that is not enough to tell them
   * apart. Rendered as a visually-hidden `<caption>`.
   */
  caption?: string
}

/**
 * A compact reference table: a legend, a lookup, a short comparison. Not a
 * data grid: no sorting, no pagination, no virtualisation.
 *
 * Rows are `ReactNode[][]` rather than objects, because the tables this serves
 * are hand-written reference material where cells are often formatted markup
 * rather than plain values.
 */
export function DataTable({ columns, rows, caption, className, ...props }: DataTableProps) {
  return (
    // A container that scrolls must be reachable by keyboard, or a keyboard-only
    // user cannot scroll it at all, since there is nothing focusable inside a table
    // of plain text to arrow across. tabIndex makes it focusable; the labelled
    // region gives the resulting tab stop a name rather than announcing an
    // anonymous group.
    <div
      tabIndex={0}
      // A region with no accessible name is its own violation, so only claim
      // the role when there is a caption to name it with.
      role={caption ? 'region' : undefined}
      aria-label={caption}
      className={cn(
        'rounded-card border border-line overflow-x-auto',
        focusRing,
      )}
    >
      <table className={cn('w-full', className)} {...props}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-line-subtle">
            {columns.map((col) => (
              // scope="col" is what lets a screen reader announce the column
              // heading with each cell as the user moves across a row.
              // Not the Label atom: a <th> is already the naming element for
              // its column, and wrapping one in a <label> or <span> would add a
              // redundant node. It borrows the same type role.
              <th key={col} scope="col" className="text-left px-4 py-2 type-annotation-sc text-ink-body">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? 'border-b border-line-subtle' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 type-annotation text-ink-body">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
