import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ToolView } from './ToolView'
import { ViewContainer } from '../templates/ViewContainer'
import { Field } from '../molecules/Field'
import { Section } from '../molecules/Section'
import { Metric } from '../molecules/Metric'
import { EmptyState } from '../molecules/EmptyState'
import { Input } from '../atoms/Input'
import { ToggleChip } from '../atoms/ToggleChip'

const meta = {
  title: 'Organisms/ToolView',
  component: ToolView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The scaffold every tool view shares: a `ViewHeader`, an optional input region, and a body that swaps to ' +
          'an `EmptyState` when there is nothing to show. Shown inside a `ViewContainer` (the page column belongs to ' +
          'the template, not to this region).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const EXAMPLES = ['nav > ul li.active', '#header .logo::before', 'a:not(.disabled):hover']

export const Interactive: Story = {
  name: 'Empty → result',
  render: () => {
    const [value, setValue] = useState('')
    const isEmpty = value.trim().length === 0
    return (
      <div className="p-10 bg-background min-h-screen">
        <ViewContainer width="md">
          <ToolView
            title="Analyse a selector"
            description="Enter a single CSS selector to see its specificity score."
            isEmpty={isEmpty}
            input={
              <Field label="Selector">
                {(control) => (
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="e.g. nav > ul li.active"
                    {...control}
                  />
                )}
              </Field>
            }
            empty={
              <EmptyState
                title="Try an example"
                actions={EXAMPLES.map((ex) => (
                  <ToggleChip key={ex} active={false} onClick={() => setValue(ex)} mono>
                    {ex}
                  </ToggleChip>
                ))}
              >
                Or type your own selector above.
              </EmptyState>
            }
          >
            <Section title="Specificity">
              <div className="grid grid-cols-3 gap-3">
                <Metric label="[a] IDs" value={1} valueClassName="type-h4 font-mono text-solstice" />
                <Metric label="[b] classes" value={2} valueClassName="type-h4 font-mono text-orbit" />
                <Metric label="[c] types" value={3} valueClassName="type-h4 font-mono text-supernova" />
              </div>
            </Section>
          </ToolView>
        </ViewContainer>
      </div>
    )
  },
}
