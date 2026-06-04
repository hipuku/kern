import type { ReactNode } from 'react'

interface DataTableProps {
  columns: string[]
  rows: ReactNode[][]
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="rounded-xl border border-void-30 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-void-20">
            {columns.map((col, i) => (
              <th key={i} className="text-left px-4 py-2 type-annotation-sc text-void-60">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? 'border-b border-void-20' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 type-annotation text-void-60">
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
