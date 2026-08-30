import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface CanvasStageProps extends ComponentPropsWithRef<'div'> {
  /**
   * Constrain the frame to a square, the shape of the simulation grids.
   * On by default; turn off for a stage with its own aspect ratio.
   */
  square?: boolean
  /** The `<canvas>` and any absolutely-positioned overlays (readouts, crosshair). */
  children: ReactNode
}

/**
 * A framed drawing surface: a clipped, bordered container for a `<canvas>`, with
 * `position: relative` so overlays (a `CanvasReadout`, a crosshair) can be placed
 * against it.
 *
 * gray-scott framed four canvases with the identical
 * `relative rounded-card overflow-hidden border bg-background` block. This is
 * that frame: the chrome rather than the pixels. The canvas, its worker and its
 * overlays stay with the view; the stage just holds them.
 */
export function CanvasStage({ square = true, className, children, ...props }: CanvasStageProps) {
  return (
    <div
      className={cn(
        'relative rounded-card overflow-hidden border border-line bg-background',
        square && 'aspect-square',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
