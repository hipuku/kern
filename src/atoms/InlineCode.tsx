import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { accentText, type AccentColour } from '../lib/accent'

export interface InlineCodeProps extends ComponentPropsWithRef<'code'> {
  /**
   * Which accent to render the code in. Takes an accent *name* — `"orbit"` —
   * where this component previously took a raw Tailwind class, `"text-orbit"`.
   * That leaked the styling implementation through the API and disagreed with
   * every other accent-carrying component in kern.
   */
  colour?: AccentColour
}

/**
 * A code fragment inside a line of prose — a hex value, a selector, a property
 * name. For a whole block, use a `<pre>`; this is deliberately inline-only.
 */
export function InlineCode({ colour = 'orbit', className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'type-code bg-void-20 px-[5px] py-[1px] rounded-[4px]',
        accentText[colour],
        className,
      )}
      {...props}
    />
  )
}
