import type { ElementType, ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
  as?: ElementType
}

export function Section({ title, children, as: Heading = 'h2' }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <Heading className="type-h4 text-void-90">{title}</Heading>
      {children}
    </section>
  )
}
