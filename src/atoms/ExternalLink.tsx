import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

export interface ExternalLinkProps extends ComponentPropsWithRef<'a'> {
  href: string
}

/**
 * A link that leaves the site.
 *
 * Always opens in a new tab with `rel="noopener noreferrer"`, and always
 * appends a visually-hidden "(opens in new tab)" so the change of context is
 * announced rather than only implied by the target. Both are the point of the
 * component: an unadorned `<a target="_blank">` is a security and
 * accessibility footgun, so the system provides one that cannot be got wrong.
 *
 * Renders in `--link`, which kern now defines (it previously consumed the role
 * without declaring it, so the atom was unstyled outside an experiment).
 */
export function ExternalLink({ href, children, className, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'cursor-pointer text-(--link) underline underline-offset-[3px] rounded-inline',
        'hover:opacity-80 transition-opacity duration-(--duration-fast)',
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  )
}
