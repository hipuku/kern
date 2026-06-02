import type { ReactNode } from 'react'

interface BulletItemProps {
  children: ReactNode
}

export function BulletItem({ children }: BulletItemProps) {
  return (
    <li className="flex gap-3 items-start">
      {/*
        w-[5px] h-[5px]: 5 px dot sits between annotation (13 px) and p-sm (16 px) —
        standard bullet sizes (4 px, 6 px) read as too small or too heavy at this weight.
        mt-[0.55em]: optical alignment to cap-height of the first line of type-p-sm.
        Both values are deliberate; do not replace with a spacing token.
      */}
      <span className="mt-[0.55em] w-[5px] h-[5px] rounded-full bg-void-40 shrink-0" />
      <p className="type-p-sm text-void-60 m-0">{children}</p>
    </li>
  )
}
