import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'

const meta = {
  title: 'Molecules/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const DeltaE: Story = {
  name: 'ΔE reference (mono first column)',
  args: {
    columns: ['ΔE', 'Perception'],
    rows: [
      [<span className="font-mono">{'< 1'}</span>,  'Imperceptible to the average observer'],
      [<span className="font-mono">{'1–2'}</span>,   'Just-noticeable difference (JND threshold)'],
      [<span className="font-mono">{'2–10'}</span>,  'Clearly different, same colour family'],
      [<span className="font-mono">{'10–50'}</span>, 'Perceptually distinct colours'],
      [<span className="font-mono">{'≥ 50'}</span>,  'Categorically different'],
    ],
  },
}

export const Combinators: Story = {
  name: 'Combinators (specifi-style)',
  args: {
    columns: ['Symbol', 'Name', 'Meaning'],
    rows: [
      ['(space)', 'Descendant',      'Any depth inside'],
      ['>',       'Child',           'Direct child only'],
      ['+',       'Adjacent',        'Immediately after'],
      ['~',       'General sibling', 'Any sibling after'],
    ],
  },
}
