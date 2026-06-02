import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type ColorToken =
  | 'text-nebula' | 'text-aurora' | 'text-tidal'  | 'text-orbit'
  | 'text-pulsar' | 'text-quasar' | 'text-corona' | 'text-dusk'
  | 'text-flare'  | 'text-solstice' | 'text-supernova'

interface InlineCodeProps {
  children: ReactNode
  color?: ColorToken
  className?: string
}

export function InlineCode({ children, color = 'text-orbit' as ColorToken, className }: InlineCodeProps) {
  return (
    <code className={cn('type-code bg-void-20 px-[5px] py-[1px] rounded-[4px]', color, className)}>
      {children}
    </code>
  )
}
