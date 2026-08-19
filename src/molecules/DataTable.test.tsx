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

  it('has no axe violations', async () => {
    const { container } = render(<DataTable columns={COLUMNS} rows={ROWS} caption="CSS combinators" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
