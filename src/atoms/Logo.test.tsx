import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Logo } from './Logo'

describe('Logo', () => {
  it('names the link, since the mark itself is aria-hidden', () => {
    render(<Logo />)
    expect(screen.getByRole('link', { name: 'hipuku' })).toBeInTheDocument()
  })

  it('carries a visible focus indicator', () => {
    // It was an interactive element with no focus treatment at all, invisible
    // to anyone navigating by keyboard.
    render(<Logo />)
    expect(screen.getByRole('link', { name: 'hipuku' }).className).toMatch(/focus-visible:ring-2/)
  })

  it('renders without a link when href is null', () => {
    render(<Logo href={null} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Logo />)
    expect((await axe(container)).violations).toEqual([])
  })
})
