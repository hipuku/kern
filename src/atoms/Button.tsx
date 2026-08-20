import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

/**
 * kern had no Button. Three places hand-rolled one — `IconButton`, `ToolLink`,
 * and the retry control inside `ErrorBoundary` — each with its own padding,
 * radius, transition duration and focus treatment. This is the one definition
 * they now share.
 *
 * Exported so a component that needs button styling on a non-button element
 * (an anchor that looks like a button) can borrow the classes without faking a
 * `<button>`.
 */
export const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 cursor-pointer',
    'transition-colors duration-(--duration-fast) ease-(--ease-standard)',
    'disabled:cursor-not-allowed disabled:opacity-50',
    focusRing,
  ),
  {
    variants: {
      variant: {
        /** The default: a raised control on the void surface. */
        surface: 'bg-surface-raised border border-line text-ink-body hover:text-ink-title hover:border-line-strong',
        /** Carries the experiment accent. For the one primary action in a view. */
        accent: 'bg-(--primary)/15 border border-(--primary)/40 text-(--primary) hover:bg-(--primary)/25',
        /** No chrome until hovered. For dense toolbars and repeated controls. */
        ghost: 'text-ink-body hover:text-ink-title hover:bg-surface-raised',
        /**
         * Reads as a link, behaves as a button. For in-prose actions that
         * navigate the app rather than the web — those are genuinely buttons and
         * must not be anchors, but they should look like links.
         */
        link: 'text-(--primary) hover:opacity-70 transition-opacity underline-offset-[3px] hover:underline',
      },
      size: {
        sm:   'type-annotation px-2.5 py-1 rounded-control',
        md:   'type-button px-4 py-2 rounded-card',
        /** Square, for a single icon. Pair with a required `aria-label`. */
        icon: 'p-2 rounded-card',
      },
    },
    compoundVariants: [
      // `link` is text, not a control: chrome-related padding and radius would
      // give it a hit area that does not match what the user sees.
      { variant: 'link', size: 'md', class: 'px-0 py-0 rounded-none' },
      { variant: 'link', size: 'sm', class: 'px-0 py-0 rounded-none' },
    ],
    defaultVariants: { variant: 'surface', size: 'md' },
  },
)

export interface ButtonProps
  extends ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode
}

/**
 * The button primitive. Extends the native `<button>` element, so `type`,
 * `disabled`, `title`, `aria-*`, `ref` and every event handler pass through —
 * kern's previous buttons accepted only `onClick`, which meant a form could not
 * submit with one and nothing could be disabled.
 *
 * Defaults to `type="button"`. An unspecified `type` inside a form is
 * `"submit"` per the HTML spec, which is almost never what a design-system
 * button is being used for; opt in explicitly when you do want to submit.
 */
export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
