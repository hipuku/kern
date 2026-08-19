import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { DataTable } from './DataTable'

const COLUMNS = ['Symbol', 'Name', 'Meaning']
const ROWS = [
  ['>', 'Child', 'Direct child only'],
  ['+', 'Adjacent', 'Immediately after'],
]

describe('DataTable', () => {
  it('marks headers as column scope so cells are announced with them', () => {
    render(<DataTable columns={COLUMNS} rows={ROWS} />)
    for (const column of COLUMNS) {
      expect(screen.getByRole('columnheader', { name: column })).toHaveAttribute('scope', 'col')
    }
  })

  it('names the table from its caption', () => {
    render(<DataTable columns={COLUMNS} rows={ROWS} caption="CSS combinators" />)
    expect(screen.getByRole('table', { name: 'CSS combinators' })).toBeInTheDocument()
  })

  it('makes the scrolling container reachable by keyboard', () => {
    // Without this a keyboard-only user cannot scroll a table that overflows:
    // there is nothing focusable inside plain text cells to arrow across.
    // axe reports it as scrollable-region-focusable.
    render(<DataTable columns={COLUMNS} rows={ROWS} caption="CSS combinators" />)
    const region = screen.getByRole('region', { name: 'CSS combinators' })
    expect(region).toHaveAttribute('tabindex', '0')
  })

  it('does not claim a region role it cannot name', () => {
    // An unnamed region is its own violation, so the role is only taken when
    // there is a caption to name it with.
    render(<DataTable columns={COLUMNS} rows={ROWS} />)
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<DataTable columns={COLUMNS} rows={ROWS} caption="CSS combinators" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
