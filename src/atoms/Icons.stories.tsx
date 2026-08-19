import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'
import {
  Beaker, Check, ChevronDown, ChevronRight, Columns2, Copy, GitCompare,
  Globe, Grid3x3, Hash, Info, ListChecks, Map, Menu, Pause, Play,
  RotateCcw, Search, Waves, X,
} from 'lucide-react'
import { GitHubIcon } from './Icons'

const meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The complete icon vocabulary used across kern and the three experiments. ' +
          'Interface glyphs come from **lucide-react**; brand marks that lucide does ' +
          'not provide live as hand-rolled SVGs in `atoms/Icons.tsx`. Every icon is a ' +
          '`currentColor` component taking a `className`, so they are interchangeable ' +
          'in any icon slot — `IconButton`, `SocialBar`, `AppSidebar` nav items.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

type Icon = ComponentType<{ className?: string }>

function IconGrid({ icons }: { icons: { name: string; Icon: Icon }[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
      {icons.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-void-20 border-void-30 text-void-80"
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="type-code text-void-60 truncate">{name}</span>
        </div>
      ))}
    </div>
  )
}

const brand: { name: string; Icon: Icon }[] = [
  { name: 'GitHubIcon', Icon: GitHubIcon },
]

// lucide-react glyphs actually imported somewhere across kern + the experiments.
const lucide: { name: string; Icon: Icon }[] = [
  { name: 'Beaker', Icon: Beaker },
  { name: 'Check', Icon: Check },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'Columns2', Icon: Columns2 },
  { name: 'Copy', Icon: Copy },
  { name: 'GitCompare', Icon: GitCompare },
  { name: 'Globe', Icon: Globe },
  { name: 'Grid3x3', Icon: Grid3x3 },
  { name: 'Hash', Icon: Hash },
  { name: 'Info', Icon: Info },
  { name: 'ListChecks', Icon: ListChecks },
  { name: 'Map', Icon: Map },
  { name: 'Menu', Icon: Menu },
  { name: 'Pause', Icon: Pause },
  { name: 'Play', Icon: Play },
  { name: 'RotateCcw', Icon: RotateCcw },
  { name: 'Search', Icon: Search },
  { name: 'Waves', Icon: Waves },
  { name: 'X', Icon: X },
]

export const Catalog: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="type-annotation-sc text-void-60">Brand — custom SVGs (atoms/Icons.tsx)</h3>
        <IconGrid icons={brand} />
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="type-annotation-sc text-void-60">Interface — lucide-react</h3>
        <IconGrid icons={lucide} />
      </section>
    </div>
  ),
}
