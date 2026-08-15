import { StatusChip, type StatusChipColour } from '../atoms/StatusChip'
import type { ReactNode } from 'react'

type BadgeVariant = 'positive' | 'warning' | 'neutral' | 'info'

const VARIANT_CHIP: Record<BadgeVariant, StatusChipColour> = {
  positive: 'nebula',
  warning:  'flare',
  neutral:  'neutral',
  info:     'orbit',
}

interface StatCardProps {
  label: string
  value: ReactNode
  sub?: string
  badge?: string
  variant?: BadgeVariant
  badgeColour?: StatusChipColour
}

export function StatCard({ label, value, sub, badge, variant, badgeColour }: StatCardProps) {
  const chipColour: StatusChipColour = variant ? VARIANT_CHIP[variant] : (badgeColour ?? 'neutral')

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl border bg-void-20 border-void-30">
      <span className="type-annotation-sc text-void-60">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="type-h4 text-void-90">{value}</span>
        {badge && <StatusChip colour={chipColour}>{badge}</StatusChip>}
      </div>
      {sub && <p className="type-annotation text-void-60">{sub}</p>}
    </div>
  )
}
