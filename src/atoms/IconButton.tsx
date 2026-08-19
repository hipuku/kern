import type { ReactNode } from 'react'
import { Button, type ButtonProps } from './Button'

export interface IconButtonProps extends Omit<ButtonProps, 'size' | 'children'> {
  /**
   * Required, not optional. An icon-only control has no accessible name from
   * its contents, so without this a screen reader announces it as just
   * "button". TypeScript enforces what a lint rule otherwise would.
   */
  'aria-label': string
  /** A single icon. Sized by the icon itself, conventionally `w-4 h-4`. */
  children: ReactNode
}

/**
 * A square, icon-only button.
 *
 * A thin specialisation of `Button` rather than its own implementation: it
 * fixes `size` to `icon` and makes `aria-label` mandatory, and inherits
 * everything else — variants, focus ring, disabled handling, native button
 * props. It previously duplicated Button's styling and accepted only `onClick`.
 */
export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <Button size="icon" {...props}>
      {children}
    </Button>
  )
}
