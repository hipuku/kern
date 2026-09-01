import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ViewHeader } from './ViewHeader'

describe('ViewHeader', () => {
  it('is the page h1 by default', () => {
    render(<ViewHeader title="Analyse" description="Paste a stylesheet." />)
    expect(screen.getByRole('heading', { name: 'Analyse', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Paste a stylesheet.')).toBeInTheDocument()
  })

  it('steps down when the page already has an h1', () => {
    // The prop exists for exactly one reason: two h1s on a page, or a jump from
    // h1 to h3, is the heading-order failure this component would otherwise
    // cause in every view that uses it.
    render(<ViewHeader title="Analyse" description="d" as="h2" />)
    expect(screen.getByRole('heading', { name: 'Analyse', level: 2 })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<ViewHeader title="Analyse" description="d" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
