import { type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { AppSidebar, type NavItem } from '../organisms/AppSidebar'
import { ViewportGate } from './ViewportGate'
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
   * On-brand copy for the desktop-only notice shown below the `lg` breakpoint.
   * Defaults to `ViewportGate`'s plain message; pass a node for something with
   * the experiment's own voice.
   */
  smallScreenNotice?: ReactNode
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
 * `ErrorBoundary` wrapper. Three copies of a layout is three places for it to
 * drift.
 *
 * **Desktop-only.** The whole shell is wrapped in a `ViewportGate`, so below the
 * `lg` breakpoint the viewer gets a short notice instead of a squeezed layout.
 * kern used to carry a responsive sidebar collapse here; these tools are not
 * built for small screens, so it now says so plainly rather than degrading.
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
  smallScreenNotice,
  errorBoundary = true,
}: AppShellProps) {
  const shell = (
    <ViewportGate notice={smallScreenNotice}>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <AppSidebar
          logo={logo}
          navItems={navItems}
          activeId={activeId}
          onNavigate={onNavigate}
          accentActiveClass={accentActiveClass}
          social={social}
          colophon={colophon}
        />
        <main className={cn('flex-1 h-full overflow-y-auto p-10', mainClassName)}>
          {children}
        </main>
      </div>
    </ViewportGate>
  )

  return errorBoundary ? <ErrorBoundary>{shell}</ErrorBoundary> : shell
}
