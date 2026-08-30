import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Card } from '../atoms/Card'
import { Label } from '../atoms/Label'

export interface MetricProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /** What the figure is, rendered in small caps. */
  label: string
  /** The figure itself. */
  value: ReactNode
  /**
   * `vertical` (default) stacks a large centred value above its label: the score
   * tile in a results row. `horizontal` sets a compact value beside its label,
   * the inline chip a per-axis breakdown is built from.
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Draw the raised `Card` surface. On by default; turn it off for a bare inline
   * value+label that sits inside another surface.
   */
  surface?: boolean
  /**
   * Class for the value span. The default is `type-h4 font-mono text-ink-title`;
   * override it to colour the value, e.g. a specificity axis in its own accent.
   */
  valueClassName?: string
}

/**
 * A single figure with its label: the compact sibling of `StatCard`.
 *
 * `StatCard` is the left-aligned card with a badge and a line of context;
 * `Metric` is just the value and its name, which the experiments reinvented four
 * ways (specifi's score cards, mini-scores and spec chips; hexicon's ΔE cells).
 * It carries no badge and no sub-text: reach for `StatCard` when you need those.
 */
export function Metric({
  label,
  value,
  orientation = 'vertical',
  surface = true,
  valueClassName,
  className,
  ...props
}: MetricProps) {
  const vertical = orientation === 'vertical'

  const content = (
    <>
      <span className={cn(valueClassName ?? 'type-h4 font-mono text-ink-title')}>{value}</span>
      {/* as="span": this names the figure, not a form control. */}
      <Label as="span">{label}</Label>
    </>
  )

  const layout = vertical
    ? 'flex flex-col items-center justify-center text-center gap-1.5'
    : 'flex items-center gap-2'

  return surface ? (
    <Card className={cn(layout, className)} {...props}>
      {content}
    </Card>
  ) : (
    <div className={cn(layout, className)} {...props}>
      {content}
    </div>
  )
}
