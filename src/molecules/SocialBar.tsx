import { type ComponentType } from 'react'
import { Globe } from 'lucide-react'
import { IconLink } from '../atoms/IconLink'
import { GitHubIcon } from '../atoms/Icons'
import { cn } from '../lib/utils'

/** The portfolio's home site. The globe icon links here by default. */
const HIPUKU_URL = 'https://www.hipuku.dev'

export interface SocialBarProps {
  /** Full GitHub repo URL, e.g. `https://github.com/hipuku/specifi`. */
  githubUrl: string
  /**
   * The experiment's name, used for the website link's accessible label
   * (e.g. `specifi` → "specifi website").
   */
  siteName: string
  /** Where the globe icon points. Defaults to the hipuku.dev home site. */
  websiteUrl?: string
  className?: string
}

interface Link {
  Icon: ComponentType<{ className?: string }>
  label: string
  href: string
}

/**
 * The portfolio-standard row of social links shown in each experiment's sidebar
 * header: a globe linking to hipuku.dev and a GitHub link to the source repo.
 * Encapsulates the convention so every experiment gets the same bar from one
 * repo URL instead of hand-rolling an identical array.
 *
 * Both destinations are off-site, so the links open in a new tab via
 * `IconLink`'s `external`, which keeps the experiment open behind them and adds
 * the `rel="noopener"` and new-tab announcement the hand-rolled version lacked.
 */
export function SocialBar({ githubUrl, siteName, websiteUrl = HIPUKU_URL, className }: SocialBarProps) {
  const links: Link[] = [
    { Icon: Globe, label: `${siteName} website`, href: websiteUrl },
    { Icon: GitHubIcon, label: 'GitHub', href: githubUrl },
  ]

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {links.map(({ Icon, label, href }) => (
        <IconLink key={label} href={href} aria-label={label} external>
          <Icon className="w-4 h-4" />
        </IconLink>
      ))}
    </div>
  )
}
