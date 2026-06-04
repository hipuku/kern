import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import type { StatusChipColour } from '../atoms/StatusChip'

const LINK_CLASSES: Record<StatusChipColour, string> = {
  nebula:    'text-nebula hover:text-nebula-light',
  aurora:    'text-aurora hover:text-aurora-light',
  tidal:     'text-tidal hover:text-tidal-light',
  orbit:     'text-orbit hover:text-orbit-light',
  pulsar:    'text-pulsar hover:text-pulsar-light',
  quasar:    'text-quasar hover:text-quasar-light',
  corona:    'text-corona hover:text-corona-light',
  dusk:      'text-dusk hover:text-dusk-light',
  flare:     'text-flare hover:text-flare-light',
  solstice:  'text-solstice hover:text-solstice-light',
  supernova: 'text-supernova hover:text-supernova-light',
  neutral:   'text-void-50 hover:text-void-60',
}

interface ToolLinkProps {
  onClick: () => void
  children: ReactNode
  colour?: StatusChipColour
}

export function ToolLink({ onClick, children, colour }: ToolLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'cursor-pointer type-p-sm font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded',
        colour
          ? cn(LINK_CLASSES[colour], 'transition-colors duration-150')
          : 'text-(--primary) hover:opacity-70 transition-opacity duration-150',
      )}
    >
      {children}
    </button>
  )
}
