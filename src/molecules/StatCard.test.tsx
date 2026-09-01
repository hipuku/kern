import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('shows the label, the value and the optional context line', () => {
    render(<StatCard label="Rules" value={128} sub="across 4 files" />)
    expect(screen.getByText('Rules')).toBeInTheDocument()
    expect(screen.getByText('128')).toBeInTheDocument()
    expect(screen.getByText('across 4 files')).toBeInTheDocument()
  })

  it('names the card with a span rather than a dangling label', () => {
    render(<StatCard label="Rules" value={128} />)
    expect(screen.getByText('Rules').tagName).toBe('SPAN')
  })

  it('renders the badge as a non-interactive chip', () => {
    render(<StatCard label="Rules" value={128} badge="AA" badgeColour="orbit" />)
    const badge = screen.getByText('AA')
    expect(badge.tagName).toBe('SPAN')
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('has no axe violations', async () => {
    const { container } = render(<StatCard label="Rules" value={128} sub="across 4 files" badge="AA" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
