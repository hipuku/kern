import { cn } from '../lib/utils'
import { Button, type ButtonProps } from '../atoms/Button'
import { accentText, accentTextHover, type AccentColour } from '../lib/accent'

export interface ToolLinkProps extends Omit<ButtonProps, 'variant' | 'size'> {
  /**
   * Tint the link with a specific accent. Omit to use the experiment's
   * `--primary`, which is the usual case — pass one only when the link points
   * at something the palette already colour-codes.
   */
  colour?: AccentColour
}

/**
 * An in-prose control that navigates within the app — "compare these two",
 * "open this in the analyser".
 *
 * It looks like a link and behaves like a button, which is correct: it changes
 * app state rather than the URL, so it must not be an anchor. Screen reader
 * users get "button", which is what it is.
 */
export function ToolLink({ colour, className, ...props }: ToolLinkProps) {
  return (
    <Button
      variant="link"
      size="md"
      className={cn(
        'type-p-sm font-medium text-left',
        colour && cn(accentText[colour], accentTextHover[colour], 'hover:opacity-100'),
        className,
      )}
      {...props}
    />
  )
}
