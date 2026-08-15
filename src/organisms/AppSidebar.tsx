import { type ComponentType, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

export interface NavItem {
  id: string
  label: string
  // ComponentType rather than LucideIcon so that consumers on a different
  // lucide-react version don't hit a nominal type mismatch via npm link.
  icon: ComponentType<{ className?: string }>
}

interface AppSidebarProps {
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
          'lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg',
          'bg-void-20 text-void-60 hover:text-void-90 hover:bg-void-30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)',
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
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar panel */}
      <aside
        aria-label="Main navigation"
        className={cn(
          'flex flex-col justify-between shrink-0 h-full overflow-y-auto p-8 w-[360px]',
          'bg-void-10 border-r border-void-20',
          // Desktop: always visible, relative in flow
          'lg:relative lg:translate-x-0',
          // Mobile: fixed overlay, slide in/out
          'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40',
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
                  onClick={() => {
                    onNavigate(id)
                    // Close sidebar on mobile after navigation
                    if (onMobileToggle && window.innerWidth < 1024) onMobileToggle()
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl cursor-pointer',
                    'type-p-sm transition-all duration-200',
                    'bg-void-20 hover:bg-void-30',
                    'text-void-60 hover:text-void-90 motion-safe:hover:translate-x-1',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)',
                    isActive && cn('bg-void-30 font-medium motion-safe:hover:translate-x-0', accentActiveClass),
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
          <div className="type-p-sm text-void-60">{colophon}</div>
        )}
      </aside>
    </>
  )
}
