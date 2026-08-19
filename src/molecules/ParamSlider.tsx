import { useId, type ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

export interface ParamSliderProps
  extends Omit<ComponentPropsWithRef<'input'>, 'onChange' | 'value' | 'type'> {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  /** How the current value is displayed. Defaults to three decimal places. */
  format?: (value: number) => string
  /** Class for the wrapper. The input itself takes `inputClassName`. */
  className?: string
  inputClassName?: string
}

const defaultFormat = (v: number) => v.toFixed(3)

/**
 * A labelled range input with a live readout — the control the simulation
 * experiments are largely built from.
 *
 * The label is a real `<label htmlFor>` rather than an `aria-label` on the
 * input. That makes the visible text the accessible name (so the two cannot
 * disagree) and makes the label a click target that focuses the slider, which
 * matters when the handle is only a few pixels wide.
 *
 * The readout is `aria-hidden`: the input already announces its own value, and
 * without this a screen reader reads the number twice.
 */
export function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = defaultFormat,
  className,
  inputClassName,
  ...props
}: ParamSliderProps) {
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="type-annotation-sc text-void-60 cursor-pointer">
          {label}
        </label>
        <span aria-hidden="true" className="type-code text-void-80">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={cn(
          'w-full h-1 rounded-full appearance-none cursor-pointer bg-void-30 accent-(--primary)',
          focusRing,
          inputClassName,
        )}
        {...props}
      />
    </div>
  )
}
