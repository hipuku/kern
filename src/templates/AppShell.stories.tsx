import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info, Search, GitCompare, ListChecks } from 'lucide-react'
import { AppShell } from './AppShell'
import { ViewContainer } from './ViewContainer'
import { SocialBar } from '../molecules/SocialBar'
import { Colophon } from '../molecules/Colophon'
import { Wordmark } from '../atoms/Wordmark'
import { experiments } from '../atoms/wordmarks'
import { ViewHeader } from '../molecules/ViewHeader'
import { Section } from '../molecules/Section'
import { StatCard } from '../molecules/StatCard'
import { Metric } from '../molecules/Metric'
import { CalloutCard } from '../molecules/CalloutCard'
import { DataTable } from '../molecules/DataTable'
import { Field } from '../molecules/Field'
import { BulletList } from '../molecules/BulletList'
import { Input } from '../atoms/Input'
import { InlineCode } from '../atoms/InlineCode'
import { BulletItem } from '../atoms/BulletItem'
import { Label } from '../atoms/Label'

const meta = {
  title: 'Templates/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full-page layout every experiment is built on. Atomic design puts page structure in the template ' +
          'layer, the arrangement of regions independent of what fills them, and kern had no such layer, so all ' +
          'three experiments hand-wrote the same App.tsx: the same flex container, the same `<main>` classes, the ' +
          'same ErrorBoundary wrapper.\n\n' +
          'Desktop-only: the shell is wrapped in a `ViewportGate`, so below the `lg` breakpoint the viewer sees a ' +
          'short notice instead of a squeezed layout.',
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

const [, specifi] = experiments

export const Default: Story = {
  name: 'A complete experiment',
  render: () => {
    const [active, setActive] = useState('analyse')
    return (
      <AppShell
        logo={<Wordmark src={specifi.src} name={specifi.name} xHeightRatio={specifi.xHeightRatio} />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass="text-solstice"
        social={<SocialBar siteName="specifi" githubUrl="https://github.com/hipuku/specifi" />}
        colophon={<Colophon name="specifi" hoverFills={specifi.hoverFills} />}
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

export const CompleteView: Story = {
  name: 'A complete view, every layer',
  parameters: {
    docs: {
      description: {
        story:
          'The payoff of the whole library, on one screen. Nothing here is bespoke: the shell is a **template** ' +
          '(`AppShell`) wrapping a **template** column (`ViewContainer`); the sidebar is an **organism** ' +
          '(`AppSidebar`, fed the `SocialBar` and `Colophon` **molecules**); and the view is **molecules** ' +
          '(`ViewHeader`, `Field`, `Section`, `Metric`, `CalloutCard`, `DataTable`, `BulletList`) built from ' +
          '**atoms** (`Wordmark`, `Input`, `Label`, `InlineCode`, `BulletItem`, `StatusChip`). This is what "each ' +
          'layer is built from the one below" looks like assembled.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('analyse')
    return (
      <AppShell
        logo={<Wordmark src={specifi.src} name={specifi.name} xHeightRatio={specifi.xHeightRatio} />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass="text-solstice"
        social={<SocialBar siteName="specifi" githubUrl="https://github.com/hipuku/specifi" />}
        colophon={<Colophon name="specifi" hoverFills={specifi.hoverFills} />}
      >
        <ViewContainer width="md">
          <ViewHeader
            title="Analyse a selector"
            description="Enter a single CSS selector to see its specificity score, segment by segment."
          />

          <Field
            label="Selector"
            aside={<span className="type-annotation text-ink-muted">7 tokens</span>}
            hint="Specificity is highest-wins per axis, never a carry."
          >
            {(control) => (
              <Input value="nav > ul li.active:not([hidden])::before" readOnly {...control} />
            )}
          </Field>

          <Section title="Specificity">
            <div className="grid grid-cols-3 gap-3">
              <Metric label="[a] IDs"     value={0} className="flex-1" valueClassName="type-h4 font-mono text-solstice" />
              <Metric label="[b] classes" value={2} className="flex-1" valueClassName="type-h4 font-mono text-orbit" />
              <Metric label="[c] types"   value={3} className="flex-1" valueClassName="type-h4 font-mono text-supernova" />
            </div>
          </Section>

          <CalloutCard colour="orbit" label="Class-heavy">
            Most of this selector's weight is on the class axis: <InlineCode>.active</InlineCode> and{' '}
            <InlineCode>:not()</InlineCode>. Dropping either lowers specificity fastest.
          </CalloutCard>

          <Section title="How each segment counts">
            <DataTable
              caption="Specificity contribution of each selector segment"
              columns={['Segment', 'Axis', 'Adds']}
              rows={[
                [<InlineCode key="c">.active</InlineCode>, 'class', 'b + 1'],
                [<InlineCode key="n">:not([hidden])</InlineCode>, 'class', 'b + 1'],
                [<InlineCode key="e">li</InlineCode>, 'type', 'c + 1'],
                [<InlineCode key="p">::before</InlineCode>, 'type', 'c + 1'],
              ]}
            />
          </Section>

          <Section title="Notes">
            <BulletList>
              <BulletItem>
                <Label as="span" className="text-ink-strong">Pseudo-elements</Label> count as types, pseudo-classes as classes.
              </BulletItem>
              <BulletItem>The negation itself adds nothing; only its argument does.</BulletItem>
            </BulletList>
          </Section>
        </ViewContainer>
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
        logo={<Wordmark src="/brand/wordmark.svg" name="kern" />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
      >
        <ViewHeader title="About this tool" description="Both sidebar footer slots are optional." />
      </AppShell>
    )
  },
}

export const SmallScreen: Story = {
  name: 'Small screen, desktop-only notice',
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Below `lg` the whole app is replaced by the `ViewportGate` notice: no collapsed sidebar, no hamburger. ' +
          'Pass `smallScreenNotice` for on-brand copy; here it is the default message.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('analyse')
    return (
      <AppShell
        logo={<Wordmark src={specifi.src} name={specifi.name} xHeightRatio={specifi.xHeightRatio} />}
        navItems={NAV}
        activeId={active}
        onNavigate={setActive}
        accentActiveClass="text-solstice"
        colophon={<Colophon name="specifi" hoverFills={specifi.hoverFills} />}
      >
        <ViewHeader title="Analyse a selector" description="This view only shows at desktop width." />
      </AppShell>
    )
  },
}
