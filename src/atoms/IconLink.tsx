import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

export interface IconLinkProps extends ComponentPropsWithRef<'a'> {
  href: string
  /**
   * Required, not optional. An icon-only link has no accessible name from its
   * contents, so without this a screen reader announces only "link". TypeScript
   * enforces what a lint rule otherwise would, the same contract `IconButton`
   * makes for buttons.
   */
  'aria-label': string
  /**
   * The link leaves the site: opens in a new tab with `rel="noopener noreferrer"`,
   * and appends "(opens in new tab)" to the accessible name so the change of
   * context is announced.
   *
   * The announcement is folded into `aria-label` rather than added as a
   * visually-hidden span, because an element that already has an `aria-label`
   * takes its whole accessible name from that attribute, so a trailing `sr-only`
   * child (the trick `ExternalLink` uses for its visible-text links) would be
   * silently ignored here.
   */
  external?: boolean
  /** A single icon, conventionally `w-4 h-4`. */
  children: ReactNode
}

/**
 * An icon-only link.
 *
 * kern had `IconButton` (a button) and `ExternalLink` (a text link) but nothing
 * for an icon that navigates, so `SocialBar` hand-rolled one, complete with its
 * own hover-scale and focus ring, and pointed off-site without any of
 * `ExternalLink`'s new-tab safety. This is the one definition that pattern now
 * shares.
 */
export function IconLink({
  external,
  'aria-label': ariaLabel,
  className,
  children,
  ...props
}: IconLinkProps) {
  return (
    <a
      aria-label={external ? `${ariaLabel} (opens in new tab)` : ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'text-ink-body inline-flex rounded transition-all duration-200 motion-safe:hover:scale-125',
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
