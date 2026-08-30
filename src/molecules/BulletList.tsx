import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

export type BulletListProps = ComponentPropsWithRef<'ul'>

/**
 * The `<ul>` that holds `BulletItem`s.
 *
 * kern shipped `BulletItem` (the `<li>`) but not the list around it, so every
 * About view hand-wrote the same `flex flex-col gap-3 list-none p-0 m-0` wrapper
 * It is the half of the pair a component library exists to absorb. The default gap
 * can be overridden through `className` (twMerge lets a later `gap-*` win).
 *
 * ```tsx
 * <BulletList>
 *   <BulletItem>…</BulletItem>
 *   <BulletItem>…</BulletItem>
 * </BulletList>
 * ```
 */
export function BulletList({ className, ...props }: BulletListProps) {
  return (
    <ul className={cn('flex flex-col gap-3 list-none p-0 m-0', className)} {...props} />
  )
}
