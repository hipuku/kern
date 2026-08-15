import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type ColourToken =
  | 'text-nebula' | 'text-aurora' | 'text-tidal'  | 'text-orbit'
  | 'text-pulsar' | 'text-quasar' | 'text-corona' | 'text-dusk'
  | 'text-flare'  | 'text-solstice' | 'text-supernova'
  | 'text-void-40' | 'text-void-50' | 'text-void-60'
  | 'text-void-70' | 'text-void-80' | 'text-void-90'

interface InlineCodeProps {
  children: ReactNode
  colour?: ColourToken
  className?: string
}

export function InlineCode({ children, colour = 'text-orbit' as ColourToken, className }: InlineCodeProps) {
  return (
    <code className={cn('type-code bg-void-20 px-[5px] py-[1px] rounded-[4px]', colour, className)}>
      {children}
    </code>
  )
}
