import { useState, type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { AppSidebar, type NavItem } from '../organisms/AppSidebar'
import { ErrorBoundary } from '../utils/ErrorBoundary'

export interface AppShellProps {
  /** The experiment's wordmark, for the sidebar header. */
  logo: ReactNode
  navItems: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  /** Text colour for the active nav item. Defaults to the `--primary` role. */
  accentActiveClass?: string
  /** Social links beside the logo — typically a `SocialBar`. */
  social?: ReactNode
  /** Credit line at the foot of the sidebar — typically a `Colophon`. */
  colophon?: ReactNode
  /** The active view. */
  children: ReactNode
  /** Class for the `<main>` scroll region, if a view needs different padding. */
  mainClassName?: string
  /**
   * Wrap the tree in an `ErrorBoundary`. On by default: a render error in one
   * view should show a recoverable fallback rather than a blank page.
   */
  errorBoundary?: boolean
}

/**
 * The full-page layout every experiment is built on: a fixed sidebar beside a
 * scrolling main region.
 *
 * **Why this is a template.** Atomic design's template layer is where page
 * structure lives — the arrangement of regions, independent of what fills them.
 * kern had no such layer, so all three experiments hand-wrote the same
 * `App.tsx`: the same flex container, the same `<main>` classes, the same
 * `mobileOpen` state and toggle, the same `ErrorBoundary` wrapper. Four copies
 * of a layout is four places for it to drift.
 *
 * The mobile open/closed state is owned here rather than lifted to the
 * consumer. It is presentation state with no meaning outside this layout, and
 * every experiment previously declared the identical `useState` to feed it
 * straight back in.
 */
export function AppShell({
  logo,
  navItems,
  activeId,
  onNavigate,
  accentActiveClass,
  social,
  colophon,
  children,
  mainClassName,
  errorBoundary = true,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const shell = (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar
        logo={logo}
        navItems={navItems}
        activeId={activeId}
        onNavigate={onNavigate}
        accentActiveClass={accentActiveClass}
        social={social}
        colophon={colophon}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((open) => !open)}
      />
      {/*
        max-lg:pt-16 clears the hamburger, which is `fixed top-4 left-4` and so
        sits above the content rather than in the flow. AppSidebar already
        indents its own logo for this; every experiment's <main> did not, and
        the first line of every view was overlapped on mobile.
      */}
      <main className={cn('flex-1 h-full overflow-y-auto p-10 max-lg:pt-16', mainClassName)}>
        {children}
      </main>
    </div>
  )

  return errorBoundary ? <ErrorBoundary>{shell}</ErrorBoundary> : shell
}
