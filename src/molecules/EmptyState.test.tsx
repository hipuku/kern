import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('shows the message on its own', () => {
    render(<EmptyState>Paste a stylesheet to begin.</EmptyState>)
    expect(screen.getByText('Paste a stylesheet to begin.')).toBeInTheDocument()
  })

  it('shows the lead line and the actions row when given them', () => {
    render(
      <EmptyState title="Nothing yet" actions={<button type="button">Try an example</button>}>
        Paste a stylesheet to begin.
      </EmptyState>,
    )
    expect(screen.getByText('Nothing yet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try an example' })).toBeInTheDocument()
  })

  it('renders no empty wrappers when the optional slots are absent', () => {
    // An empty actions row still takes gap and pushes the message off centre.
    const { container } = render(<EmptyState>Body</EmptyState>)
    expect(container.querySelectorAll('div')).toHaveLength(1)
  })

  it('has no axe violations', async () => {
    const { container } = render(<EmptyState title="Nothing yet">Body</EmptyState>)
    expect((await axe(container)).violations).toEqual([])
  })
})
