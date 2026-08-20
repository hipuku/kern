import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { inputChrome, inputInvalid } from './Input'

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  /** Applies the error treatment and sets `aria-invalid`. */
  invalid?: boolean
  /**
   * Which axes the user may resize. Defaults to vertical — free resizing lets a
   * textarea be dragged wider than its container and break the layout.
   */
  resize?: 'none' | 'vertical'
}

const RESIZE: Record<NonNullable<TextareaProps['resize']>, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
}

/**
 * A multi-line text field, for pasting a stylesheet or a list of colours.
 *
 * Shares `inputChrome` with `Input` rather than restating it, so the two cannot
 * drift — they were separate hand-rolled copies in hexicon and specifi.
 */
export function Textarea({ invalid, resize = 'vertical', className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(inputChrome, RESIZE[resize], invalid && inputInvalid, className)}
      {...props}
    />
  )
}
