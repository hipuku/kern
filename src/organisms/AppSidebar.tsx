import { type ComponentType, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'
import { breakpoints } from '../tokens/tokens'

export interface NavItem {
  id: string
  label: string
  // ComponentType rather than LucideIcon so that consumers on a different
  // lucide-react version don't hit a nominal type mismatch via npm link.
  icon: ComponentType<{ className?: string }>
}

export interface AppSidebarProps {
  logo: ReactNode
  navItems: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  accentActiveClass?: string
  /** Social links shown in the header, right of the logo — typically a `SocialBar`. */
  social?: ReactNode
  colophon?: ReactNode
  mobileOpen?: boolean
  onMobileToggle?: () => void
}

export function AppSidebar({
  logo,
  navItems,
  activeId,
  onNavigate,
  accentActiveClass = 'text-(--primary)',
  social,
  colophon,
  mobileOpen = false,
  onMobileToggle,
}: AppSidebarProps) {
  return (
    <>
      {/* Hamburger — visible only on small screens */}
      <button
        aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={mobileOpen}
        onClick={onMobileToggle}
        className={cn(
          'lg:hidden fixed top-4 left-4 z-(--z-control) p-2 rounded-control',
          'bg-surface-raised text-ink-body hover:text-ink-title hover:bg-surface-hover',
          focusRing,
          'transition-colors duration-200',
        )}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={onMobileToggle}
          className="lg:hidden fixed inset-0 z-(--z-backdrop) bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar panel */}
      <aside
        aria-label="Main navigation"
        className={cn(
          'flex flex-col justify-between shrink-0 h-full overflow-y-auto p-8 w-[360px]',
          'bg-surface-panel border-r border-line-subtle',
          // Desktop: always visible, relative in flow
          'lg:relative lg:translate-x-0',
          // Mobile: fixed overlay, slide in/out
          'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-(--z-panel)',
          'max-lg:transition-transform max-lg:duration-300 max-lg:ease-(--ease-standard)',
          mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
        )}
      >
        <div className="flex flex-col gap-16 w-full">
          <div className="flex items-center justify-between w-full">
            {/* On mobile, indent logo to clear the hamburger button */}
            <div className="lg:contents max-lg:pl-10">{logo}</div>
            {social}
          </div>

          <nav className="flex flex-col gap-4 w-full">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onNavigate(id)
                    // Close the sidebar after navigating, but only while it is
                    // an overlay. `breakpoints.lg` is the same value the `lg:`
                    // classes above compile against — it was a bare 1024 with
                    // nothing tying it to them, so changing the breakpoint in
                    // one place would have silently desynced the other.
                    if (onMobileToggle && window.innerWidth < breakpoints.lg) onMobileToggle()
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-3 w-full text-left px-4 py-3 rounded-card cursor-pointer',
                    'type-p-sm transition-all duration-200',
                    'bg-surface-raised hover:bg-surface-hover',
                    'text-ink-body hover:text-ink-title motion-safe:hover:translate-x-1',
                    focusRing,
                    isActive && cn('bg-surface-hover font-medium motion-safe:hover:translate-x-0', accentActiveClass),
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 motion-safe:group-hover:scale-110" />
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {colophon && (
          <div className="type-p-sm text-ink-body">{colophon}</div>
        )}
      </aside>
    </>
  )
}
