import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToolLink } from './ToolLink'
import { Section } from './Section'

const meta = {
  title: 'Molecules/ToolLink',
  component: ToolLink,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ToolLink onClick={() => {}} colour="pulsar">Name a colour →</ToolLink>
  ),
}

export const AllAccents: Story = {
  name: 'All accent colours',
  render: () => (
    <div className="flex flex-col gap-3">
      <ToolLink onClick={() => {}} colour="pulsar">pulsar — hexicon primary →</ToolLink>
      <ToolLink onClick={() => {}} colour="solstice">solstice — specifi primary →</ToolLink>
      <ToolLink onClick={() => {}} colour="tidal">tidal →</ToolLink>
      <ToolLink onClick={() => {}} colour="orbit">orbit →</ToolLink>
      <ToolLink onClick={() => {}} colour="nebula">nebula →</ToolLink>
      <ToolLink onClick={() => {}} colour="flare">flare →</ToolLink>
    </div>
  ),
}

export const InSection: Story = {
  render: () => {
    const [active, setActive] = useState<string | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <Section title="Name a colour">
          <p className="type-p-sm text-void-60">
            Enter a hex code to find its closest English name using CIEDE2000 perceptual distance.
          </p>
          <ToolLink onClick={() => setActive('name')} colour="pulsar">
            Name a colour →
          </ToolLink>
        </Section>
        {active && (
          <p className="type-annotation text-void-40">Navigated to: {active}</p>
        )}
      </div>
    )
  },
}

export const FocusVisible: Story = {
  name: 'Focus ring (keyboard)',
  render: () => (
    <div className="flex flex-col gap-4">
      <ToolLink onClick={() => {}} colour="pulsar">Name a colour →</ToolLink>
      <ToolLink onClick={() => {}} colour="pulsar">Map a palette →</ToolLink>
      <ToolLink onClick={() => {}} colour="pulsar">Compare two colours →</ToolLink>
    </div>
  ),
}
