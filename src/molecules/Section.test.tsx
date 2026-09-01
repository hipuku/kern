import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Section } from './Section'

describe('Section', () => {
  it('is a landmark-forming section with a heading', () => {
    render(<Section title="Weights"><p>Body</p></Section>)
    expect(screen.getByRole('heading', { name: 'Weights', level: 2 })).toBeInTheDocument()
  })

  it('lets the caller set the level so the order is not skipped', () => {
    // Heading level is a prop rather than fixed because a section nested inside
    // another one has to step down. Skipping or repeating levels is the most
    // common heading-order failure, and it is invisible without a screen reader.
    render(<Section title="Ramps" as="h3">Body</Section>)
    expect(screen.getByRole('heading', { name: 'Ramps', level: 3 })).toBeInTheDocument()
  })

  it('has no axe violations in a correct heading order', async () => {
    const { container } = render(
      <>
        <h1>Page</h1>
        <Section title="Weights">
          <Section title="Ramps" as="h3">Body</Section>
        </Section>
      </>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
