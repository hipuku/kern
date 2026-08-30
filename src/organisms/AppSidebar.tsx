import { type ComponentType, type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { focusRing } from '../lib/focus'

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
  /** Social links shown in the header, right of the logo, typically a `SocialBar`. */
  social?: ReactNode
  colophon?: ReactNode
}

/**
 * The fixed navigation rail every experiment is built beside.
 *
 * Desktop-only by design. kern used to carry a full responsive collapse here,
 * a hamburger, a backdrop, slide-in transforms and a `mobileOpen` state threaded
 * up through `AppShell`, but these tools are not built for small screens, and
 * pretending otherwise cost more than it bought. Below the `lg` breakpoint the
 * app shows a `ViewportGate` notice instead of a cramped sidebar, so this
 * component only ever renders at desktop width.
 */
export function AppSidebar({
  logo,
  navItems,
  activeId,
  onNavigate,
  accentActiveClass = 'text-(--primary)',
  social,
  colophon,
}: AppSidebarProps) {
  return (
    <aside
      aria-label="Main navigation"
      className={cn(
        'flex flex-col justify-between shrink-0 h-full overflow-y-auto p-8 w-[360px]',
        'bg-surface-panel border-r border-line-subtle',
      )}
    >
      <div className="flex flex-col gap-16 w-full">
        <div className="flex items-center justify-between w-full">
          {logo}
          {social}
        </div>

        <nav className="flex flex-col gap-4 w-full">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
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
  )
}
