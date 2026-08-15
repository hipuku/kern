import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

interface IconButtonProps {
  onClick: () => void
  'aria-label': string
  children: ReactNode
  className?: string
}

export function IconButton({ onClick, 'aria-label': ariaLabel, children, className }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'p-2 rounded-xl border transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)',
        'bg-void-20 border-void-30 text-void-60 hover:text-void-90 hover:border-void-40',
        className,
      )}
    >
      {children}
    </button>
  )
}
