import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

interface ToggleChipProps {
  active: boolean
  onClick: () => void
  children: ReactNode
  mono?: boolean
  className?: string
}

export function ToggleChip({ active, onClick, children, mono = false, className }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'type-annotation px-2.5 py-1 rounded-lg border transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)',
        mono && 'font-mono',
        active
          ? 'bg-(--primary)/15 border-(--primary)/40 text-(--primary)'
          : 'bg-void-20 border-void-30 text-void-60 hover:text-void-90 hover:border-void-40',
        className,
      )}
    >
      {children}
    </button>
  )
}
