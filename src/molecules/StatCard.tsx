import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type BadgeVariant = 'positive' | 'warning' | 'neutral' | 'info'

const VARIANT_COLOR: Record<BadgeVariant, string> = {
  positive: 'text-nebula',
  warning:  'text-flare',
  neutral:  'text-void-50',
  info:     'text-orbit',
}

const VARIANT_BORDER: Record<BadgeVariant, string> = {
  positive: 'border-nebula/30',
  warning:  'border-flare/30',
  neutral:  'border-void-30',
  info:     'border-orbit/30',
}

interface StatCardProps {
  label: string
  value: ReactNode
  sub?: string
  badge?: string
  variant?: BadgeVariant
  badgeColor?: string
}

export function StatCard({ label, value, sub, badge, variant, badgeColor }: StatCardProps) {
  const resolvedColor = variant ? VARIANT_COLOR[variant] : (badgeColor ?? 'text-void-50')
  const borderClass   = variant ? VARIANT_BORDER[variant] : 'border-void-30'
  return (
    <div className={cn('flex flex-col gap-2 p-4 rounded-xl border bg-void-20', borderClass)}>
      <span className="type-annotation-sc text-void-60">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="type-h4 text-void-90">{value}</span>
        {badge && <span className={cn('type-annotation font-medium', resolvedColor)}>{badge}</span>}
      </div>
      {sub && <p className="type-p-sm text-void-60">{sub}</p>}
    </div>
  )
}
