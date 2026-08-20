import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info, Hash, Map, GitCompare, Search, ListChecks } from 'lucide-react'
import { AppSidebar } from './AppSidebar'
import { Wordmark } from '../atoms/Wordmark'
import { Colophon } from '../molecules/Colophon'
import { experiments } from '../atoms/wordmarks'
import { SocialBar } from '../molecules/SocialBar'

const meta = {
  title: 'Organisms/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Every story here holds the active-item state locally, so none can be
    // driven by args. Hiding the panel is honest; leaving it visible advertises
    // controls that do nothing.
    controls: { disable: true },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
        <div className="flex-1 bg-surface-page" />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

const hexiconNav = [
  { id: 'about',      label: 'About',             icon: Info       },
  { id: 'name',       label: 'Name a colour',      icon: Hash       },
  { id: 'structure',  label: 'Map a palette',       icon: Map        },
  { id: 'difference', label: 'Compare two colours', icon: GitCompare },
]

const specifiNav = [
  { id: 'about',   label: 'About this tool',      icon: Info       },
  { id: 'analyse', label: 'Analyse a selector',    icon: Search     },
  { id: 'compare', label: 'Compare two selectors', icon: GitCompare },
  { id: 'rank',    label: 'Rank a stylesheet',     icon: ListChecks },
]

const [hexicon, specifi, grayScott] = experiments

export const Hexicon: Story = {
  render: () => {
    const [active, setActive] = useState('name')
    return (
      <AppSidebar
        logo={<Wordmark src={hexicon.src} name={hexicon.name} xHeightRatio={hexicon.xHeightRatio} />}
        navItems={hexiconNav}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass={hexicon.accentClass}
        social={<SocialBar siteName="hexicon" githubUrl="https://github.com/hipuku/hexicon" />}
        colophon={<Colophon name={hexicon.name} hoverFills={hexicon.hoverFills} />}
      />
    )
  },
}

export const Specifi: Story = {
  render: () => {
    const [active, setActive] = useState('analyse')
    return (
      <AppSidebar
        logo={<Wordmark src={specifi.src} name={specifi.name} xHeightRatio={specifi.xHeightRatio} />}
        navItems={specifiNav}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass={specifi.accentClass}
        social={<SocialBar siteName="specifi" githubUrl="https://github.com/hipuku/specifi" />}
        colophon={<Colophon name={specifi.name} hoverFills={specifi.hoverFills} />}
      />
    )
  },
}

const grayScottNav = [
  { id: 'about',    label: 'About this tool',   icon: Info       },
  { id: 'simulate', label: 'Simulate',          icon: Hash       },
  { id: 'isolate',  label: 'Channels',          icon: GitCompare },
  { id: 'space',    label: 'Parameter space',   icon: Map        },
]

export const GrayScott: Story = {
  name: 'gray-scott',
  render: () => {
    const [active, setActive] = useState('simulate')
    return (
      <AppSidebar
        logo={<Wordmark src={grayScott.src} name={grayScott.name} xHeightRatio={grayScott.xHeightRatio} />}
        navItems={grayScottNav}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass={grayScott.accentClass}
        social={<SocialBar siteName="gray-scott" githubUrl="https://github.com/hipuku/gray-scott" />}
        colophon={<Colophon name={grayScott.name} hoverFills={grayScott.hoverFills} />}
      />
    )
  },
}

export const Minimal: Story = {
  name: 'Minimal (no social links, no colophon)',
  render: () => {
    const [active, setActive] = useState('about')
    return (
      <AppSidebar
        logo={<Wordmark src={hexicon.src} name={hexicon.name} xHeightRatio={hexicon.xHeightRatio} />}
        navItems={hexiconNav}
        activeId={active}
        onNavigate={setActive}
      />
    )
  },
}

export const KeyboardNav: Story = {
  name: 'Keyboard navigation',
  parameters: {
    docs: {
      description: {
        story: 'Tab through the sidebar to inspect focus rings on nav buttons and social links.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('about')
    return (
      <AppSidebar
        logo={<Wordmark src={hexicon.src} name={hexicon.name} xHeightRatio={hexicon.xHeightRatio} />}
        navItems={hexiconNav}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass={hexicon.accentClass}
        social={<SocialBar siteName="hexicon" githubUrl="https://github.com/hipuku/hexicon" />}
        colophon={<Colophon name={hexicon.name} hoverFills={hexicon.hoverFills} />}
      />
    )
  },
}
