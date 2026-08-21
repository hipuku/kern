import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface WorkbenchProps extends ComponentPropsWithRef<'div'> {
  /** The visual stage — typically a `CanvasStage`. Takes the remaining width. */
  stage: ReactNode
  /** The control rail — `ChipGroup`s, `ParamSlider`s, `TransportControls`. */
  controls: ReactNode
  /** Width class for the control rail. Defaults to `w-52`. */
  railClassName?: string
}

/**
 * The stage-and-rail region a simulation view is built from: a visual stage
 * taking the free width, beside a fixed control rail that scrolls on its own.
 *
 * gray-scott's Simulate view hand-wrote this two-column region — `flex flex-1`,
 * a centred stage, a `w-52 shrink-0` rail — around its canvas and controls.
 * `Workbench` is that arrangement as a region with two slots: it owns how the
 * stage and rail sit together, and the view fills them with a `CanvasStage` and
 * the control molecules.
 */
export function Workbench({ stage, controls, railClassName, className, ...props }: WorkbenchProps) {
  return (
    <div className={cn('flex flex-1 gap-6 min-h-0', className)} {...props}>
      <div className="flex-1 min-w-0 min-h-0 flex justify-center">{stage}</div>
      <div className={cn('shrink-0 flex flex-col gap-5 overflow-y-auto', railClassName ?? 'w-52')}>
        {controls}
      </div>
    </div>
  )
}
