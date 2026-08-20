import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

export interface SectionProps extends Omit<ComponentPropsWithRef<'section'>, 'title'> {
  title: string
  /** Heading level for the section title. See `ViewHeader` on heading order. */
  as?: 'h2' | 'h3' | 'h4'
}

/** A titled block within a view. */
export function Section({ title, children, as: Heading = 'h2', className, ...props }: SectionProps) {
  return (
    <section className={cn('flex flex-col gap-4', className)} {...props}>
      <Heading className="type-h4 text-ink-title">{title}</Heading>
      {children}
    </section>
  )
}
