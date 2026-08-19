import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info, Search, GitCompare, ListChecks } from 'lucide-react'
import { AppShell } from './AppShell'
import { SocialBar } from '../molecules/SocialBar'
import { Colophon } from '../molecules/Colophon'
import { ViewHeader } from '../molecules/ViewHeader'
import { Section } from '../molecules/Section'
import { StatCard } from '../molecules/StatCard'

const meta = {
  title: 'Templates/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full-page layout every experiment is built on. Atomic design puts page structure in the template ' +
          'layer — the arrangement of regions, independent of what fills them — and kern had no such layer, so all ' +
          'three experiments hand-wrote the same App.tsx: the same flex container, the same `<main>` classes, the ' +
          'same mobileOpen state, the same ErrorBoundary wrapper.\n\n' +
          'Resize the preview below the `lg` breakpoint to see the sidebar collapse behind the hamburger.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const NAV = [
  { id: 'about',   label: 'About this tool',       icon: Info       },
  { id: 'analyse', label: 'Analyse a selector',     icon: Search     },
  { id: 'compare', label: 'Compare two selectors',  icon: GitCompare },
  { id: 'rank',    label: 'Rank a stylesheet',      icon: ListChecks },
]

const SPECIFI_FILLS = {
  hi: 'var(--color-orbit)',
  pu: 'var(--color-solstice)',
  ku: 'var(--color-supernova)',
}

function Wordmark({ label }: { label: string }) {
  return <span className="type-h5 text-void-90">{label}</span>
}

export const Default: Story = {
  name: 'A complete experiment',
  render: () => {
    const [active, setActive] = useState('analyse')
    return (
      <AppShell
        logo={<Wordmark label="specifi" />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass="text-solstice"
        social={<SocialBar siteName="specifi" githubUrl="https://github.com/hipuku/specifi" />}
        colophon={<Colophon name="specifi" hoverFills={SPECIFI_FILLS} />}
      >
        <div className="flex flex-col gap-8 max-w-2xl">
          <ViewHeader
            title="Analyse a selector"
            description="Paste a CSS selector to see how its specificity is calculated, segment by segment."
          />
          <Section title="Specificity">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="IDs"     value="2" sub="#main, #nav" />
              <StatCard label="Classes" value="1" sub=".is-active" />
              <StatCard label="Types"   value="3" sub="ul, li, a" />
            </div>
          </Section>
        </div>
      </AppShell>
    )
  },
}

export const Minimal: Story = {
  name: 'Without social links or colophon',
  render: () => {
    const [active, setActive] = useState('about')
    return (
      <AppShell
        logo={<Wordmark label="kern" />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
      >
        <ViewHeader title="About this tool" description="Both sidebar footer slots are optional." />
      </AppShell>
    )
  },
}

export const Mobile: Story = {
  name: 'Mobile — collapsed sidebar',
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Below `lg` the sidebar becomes an overlay behind the hamburger, and closes itself after a navigation. ' +
          'That open/closed state is owned by the template rather than lifted to the consumer: it is presentation ' +
          'state with no meaning outside this layout, and every experiment previously declared the identical ' +
          'useState just to hand it straight back.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('analyse')
    return (
      <AppShell
        logo={<Wordmark label="specifi" />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass="text-solstice"
        colophon={<Colophon name="specifi" hoverFills={SPECIFI_FILLS} />}
      >
        <ViewHeader title="Analyse a selector" description="Tap the hamburger to open the navigation." />
      </AppShell>
    )
  },
}
