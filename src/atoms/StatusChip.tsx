import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

export type StatusChipColour =
  | 'nebula' | 'aurora' | 'tidal'  | 'orbit'
  | 'pulsar' | 'quasar' | 'corona' | 'dusk'
  | 'flare'  | 'solstice' | 'supernova'
  | 'neutral'

const CHIP_CLASSES: Record<StatusChipColour, { text: string; bg: string }> = {
  nebula:    { text: 'text-nebula',    bg: 'bg-nebula/15'    },
  aurora:    { text: 'text-aurora',    bg: 'bg-aurora/15'    },
  tidal:     { text: 'text-tidal',     bg: 'bg-tidal/15'     },
  orbit:     { text: 'text-orbit',     bg: 'bg-orbit/15'     },
  pulsar:    { text: 'text-pulsar',    bg: 'bg-pulsar/15'    },
  quasar:    { text: 'text-quasar',    bg: 'bg-quasar/15'    },
  corona:    { text: 'text-corona',    bg: 'bg-corona/15'    },
  dusk:      { text: 'text-dusk',      bg: 'bg-dusk/15'      },
  flare:     { text: 'text-flare',     bg: 'bg-flare/15'     },
  solstice:  { text: 'text-solstice',  bg: 'bg-solstice/15'  },
  supernova: { text: 'text-supernova', bg: 'bg-supernova/15' },
  neutral:   { text: 'text-void-50',   bg: 'bg-void-30'      },
}

interface StatusChipProps {
  children: ReactNode
  colour: StatusChipColour
  className?: string
}

export function StatusChip({ children, colour, className }: StatusChipProps) {
  const { text, bg } = CHIP_CLASSES[colour]
  return (
    <span className={cn('type-annotation font-medium px-2 py-0.5 rounded-full', text, bg, className)}>
      {children}
    </span>
  )
}
