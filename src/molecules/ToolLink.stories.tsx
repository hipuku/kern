import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToolLink } from './ToolLink'
import { Section } from './Section'

const meta = {
  title: 'Molecules/ToolLink',
  component: ToolLink,
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

const ALL_VARIANTS: { colour: string; label: string }[] = [
  { colour: 'text-nebula   hover:text-nebula-light',   label: 'Name a colour →'        },
  { colour: 'text-aurora   hover:text-aurora-light',   label: 'Audit a palette →'      },
  { colour: 'text-tidal    hover:text-tidal-light',    label: 'Analyse contrast →'     },
  { colour: 'text-orbit    hover:text-orbit-light',    label: 'Map a palette →'        },
  { colour: 'text-pulsar   hover:text-pulsar-light',   label: 'Compare colours →'      },
  { colour: 'text-quasar   hover:text-quasar-light',   label: 'Inspect tokens →'       },
  { colour: 'text-corona   hover:text-corona-light',   label: 'Review a theme →'       },
  { colour: 'text-dusk     hover:text-dusk-light',     label: 'Explore gradients →'    },
  { colour: 'text-flare    hover:text-flare-light',    label: 'Debug errors →'         },
  { colour: 'text-solstice hover:text-solstice-light', label: 'Analyse a selector →'   },
  { colour: 'text-supernova hover:text-supernova-light', label: 'Rank a stylesheet →'  },
]

export const AllVariants: Story = {
  name: 'All colour variants',
  render: () => (
    <div className="flex flex-col gap-4">
      {ALL_VARIANTS.map(({ colour, label }) => (
        <ToolLink key={label} colour={colour} onClick={() => {}}>
          {label}
        </ToolLink>
      ))}
    </div>
  ),
}

export const FocusVisible: Story = {
  name: 'Focus ring (keyboard)',
  render: () => (
    <div className="flex flex-col gap-4">
      <ToolLink colour="text-pulsar hover:text-pulsar-light" onClick={() => {}}>Name a colour →</ToolLink>
      <ToolLink colour="text-orbit hover:text-orbit-light" onClick={() => {}}>Map a palette →</ToolLink>
      <ToolLink colour="text-solstice hover:text-solstice-light" onClick={() => {}}>Analyse a selector →</ToolLink>
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
          <ToolLink
            colour="text-pulsar hover:text-pulsar-light"
            onClick={() => setActive('name')}
          >
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
