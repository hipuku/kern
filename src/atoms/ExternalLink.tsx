import type { ReactNode } from 'react'

interface ExternalLinkProps {
  href: string
  children: ReactNode
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer text-[--primary] underline underline-offset-[3px] hover:opacity-80 transition-colors duration-150"
    >
      {children}<span className="sr-only"> (opens in new tab)</span>
    </a>
  )
}
