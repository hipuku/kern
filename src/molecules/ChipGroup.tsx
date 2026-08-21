import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Label } from '../atoms/Label'

export interface ChipGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /** Names the group — rendered as a small-caps `Label` and as the group's accessible name. */
  label: string
  /** The chips, typically `ToggleChip`s. */
  children: ReactNode
}

/**
 * A labelled row of chips — pattern presets, speed multipliers, example prompts.
 *
 * The chips are already an atom (`ToggleChip`); what recurred untyped was the
 * label-над-a-wrap layout, in gray-scott's "Pattern"/"Speed" and specifi's "Try
 * an example". The label is tied to the chips with `role="group"` +
 * `aria-label`, so assistive technology announces "Pattern, group" as focus
 * enters — the wrapping every hand-rolled copy left off.
 *
 * It owns no selection state: the chips are a controlled single-select group
 * managed by the view, and pushing that state in here would only add a layer
 * every caller has to thread `value`/`onChange` back through.
 */
export function ChipGroup({ label, children, className, ...props }: ChipGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <Label as="span">{label}</Label>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  )
}
