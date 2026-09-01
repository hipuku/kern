import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Colophon } from './Colophon'

describe('Colophon', () => {
  it('defaults to the current year rather than a hardcoded one', () => {
    // Every experiment used to hardcode 2026, so the footer of a long-lived
    // page went stale on 1 January and nobody noticed. This test fails on the
    // day someone puts a literal back.
    render(<Colophon name="specifi" />)
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()} © specifi by`))).toBeInTheDocument()
  })

  it('accepts an explicit year', () => {
    render(<Colophon name="specifi" year={2019} />)
    expect(screen.getByText(/2019 © specifi by/)).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Colophon name="specifi" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
