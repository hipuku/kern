import { type ComponentType, type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

export interface SocialLink {
  Icon: ComponentType<{ className?: string }>
  label: string
  href?: string
}

interface AppSidebarProps {
  logo: ReactNode
  navItems: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  accentActiveClass?: string
  socialLinks?: SocialLink[]
  colophon?: ReactNode
}

export function AppSidebar({
  logo,
  navItems,
  activeId,
  onNavigate,
  accentActiveClass = 'text-[--primary]',
  socialLinks = [],
  colophon,
}: AppSidebarProps) {
  return (
    <aside aria-label="Main navigation" className="flex flex-col justify-between shrink-0 h-full overflow-y-auto p-8 w-[360px] bg-void-10 border-r border-void-20">

      <div className="flex flex-col gap-16 w-full">
        <div className="flex items-center justify-between w-full">
          {logo}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, label, href = '#' }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-void-60 inline-flex transition-all duration-200 motion-safe:hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-void-50 rounded"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-4 w-full">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl cursor-pointer',
                  'type-p-sm transition-all duration-200',
                  'bg-void-20 hover:bg-void-30',
                  'text-void-60 hover:text-void-90 motion-safe:hover:translate-x-1',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-void-50',
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
  )
}
