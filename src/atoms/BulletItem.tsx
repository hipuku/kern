import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'

export type BulletItemProps = ComponentPropsWithRef<'li'>

/**
 * One item in a prose bullet list. Renders an `<li>`, so it must sit inside a
 * `<ul>` — the marker is drawn rather than native, but the semantics are not
 * faked.
 */
export function BulletItem({ children, className, ...props }: BulletItemProps) {
  return (
    <li className={cn('flex gap-3 items-start', className)} {...props}>
      {/*
        w-[5px] h-[5px]: 5 px dot sits between annotation (13 px) and p-sm (16 px) —
        standard bullet sizes (4 px, 6 px) read as too small or too heavy at this weight.
        mt-[0.55em]: optical alignment to cap-height of the first line of type-p-sm.
        Both values are deliberate; do not replace with a spacing token.
      */}
      <span aria-hidden="true" className="mt-[0.55em] w-[5px] h-[5px] rounded-full bg-void-40 shrink-0" />
      <p className="type-p-sm text-void-60 m-0">{children}</p>
    </li>
  )
}
