import type { ReactNode } from 'react'

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
      <span className="type-annotation-sc text-void-40">{title}</span>
      {children}
    </div>
  )
}
