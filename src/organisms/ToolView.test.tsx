import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ToolView } from './ToolView'

describe('ToolView', () => {
  it('names the view with a single h1 by default', () => {
    render(
      <ToolView title="Analyse a selector" description="Enter a selector.">
        <p>results</p>
      </ToolView>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Analyse a selector' })).toBeInTheDocument()
  })

  it('shows the empty slot instead of children when empty', () => {
    render(
      <ToolView
        title="Analyse a selector"
        description="Enter a selector."
        isEmpty
        empty={<p>Try an example</p>}
      >
        <p>results</p>
      </ToolView>,
    )
    expect(screen.getByText('Try an example')).toBeInTheDocument()
    expect(screen.queryByText('results')).not.toBeInTheDocument()
  })

  it('shows children once there is a result', () => {
    render(
      <ToolView
        title="Analyse a selector"
        description="Enter a selector."
        isEmpty={false}
        empty={<p>Try an example</p>}
      >
        <p>results</p>
      </ToolView>,
    )
    expect(screen.getByText('results')).toBeInTheDocument()
    expect(screen.queryByText('Try an example')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ToolView title="Analyse a selector" description="Enter a selector.">
        <p>results</p>
      </ToolView>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
