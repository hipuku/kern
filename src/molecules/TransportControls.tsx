import type { ComponentPropsWithRef } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { cn } from '../lib/utils'
import { IconButton } from '../atoms/IconButton'

export interface TransportControlsProps extends ComponentPropsWithRef<'div'> {
  /** Whether the thing being controlled is currently running. */
  running: boolean
  /** Toggle play/pause. */
  onToggle: () => void
  /** Restart / re-seed. */
  onReset: () => void
  /** Accessible label for the reset control. Defaults to "Reset". */
  resetLabel?: string
}

/**
 * Play/pause and reset for a running thing: a simulation, a playback.
 *
 * gray-scott built this twice, once with a hand-rolled play/pause button that
 * forked `Button`'s focus treatment. Here both are `IconButton`s, so the label
 * that flips with `running` and the focus ring come from the atom, not from a
 * copy.
 */
export function TransportControls({
  running,
  onToggle,
  onReset,
  resetLabel = 'Reset',
  className,
  ...props
}: TransportControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <IconButton onClick={onToggle} aria-label={running ? 'Pause' : 'Play'}>
        {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </IconButton>
      <IconButton onClick={onReset} aria-label={resetLabel}>
        <RotateCcw className="w-3.5 h-3.5" />
      </IconButton>
    </div>
  )
}
