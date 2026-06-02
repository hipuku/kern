import type { ReactNode } from 'react'

interface ToolLinkProps {
  onClick: () => void
  colour: string
  children: ReactNode
}

export function ToolLink({ onClick, colour, children }: ToolLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer type-p-sm font-medium transition-colors duration-150 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded ${colour}`}
    >
      {children}
    </button>
  )
}
