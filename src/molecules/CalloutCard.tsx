import { cn } from '../lib/utils'
import type { StatusChipColour } from '../atoms/StatusChip'
import type { ReactNode } from 'react'

const LABEL_TEXT: Record<StatusChipColour, string> = {
  nebula:    'text-nebula',
  aurora:    'text-aurora',
  tidal:     'text-tidal',
  orbit:     'text-orbit',
  pulsar:    'text-pulsar',
  quasar:    'text-quasar',
  corona:    'text-corona',
  dusk:      'text-dusk',
  flare:     'text-flare',
  solstice:  'text-solstice',
  supernova: 'text-supernova',
  neutral:   'text-void-50',
}

interface CalloutCardProps {
  colour: StatusChipColour
  label?: ReactNode
  children: ReactNode
}

export function CalloutCard({ colour, label, children }: CalloutCardProps) {
  return (
    <div className="rounded-xl px-4 py-3 bg-void-20 border border-void-30 flex flex-col gap-1">
      {label != null && (
        <p className={cn('type-annotation', LABEL_TEXT[colour])}>
          {label}
        </p>
      )}
      <p className="type-annotation text-void-60">
        {children}
      </p>
    </div>
  )
}
