import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

export interface ToggleChipProps extends Omit<ButtonProps, 'variant' | 'size'> {
  /** Whether this chip is the selected one in its group. */
  active: boolean
  /** Render the label in the monospace face — for values, counts and symbols. */
  mono?: boolean
}

/**
 * A chip in a single-select group: pattern presets, speed multipliers, filter
 * categories.
 *
 * Sets `aria-pressed` from `active`. Previously the selected state was conveyed
 * by colour alone, so a screen reader user could hear the options but not which
 * one was chosen.
 */
export function ToggleChip({ active, mono = false, className, ...props }: ToggleChipProps) {
  return (
    <Button
      size="sm"
      variant={active ? 'accent' : 'surface'}
      aria-pressed={active}
      className={cn(mono && 'font-mono', className)}
      {...props}
    />
  )
}
