import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Card, cardVariants } from './Card'

describe('Card', () => {
  it('is only the surface', () => {
    // The docstring is explicit: no flex, no gap, no typography, because those
    // are the consumer's layout and baking them in would make the atom refuse
    // to be anything but one component's card.
    render(<Card data-testid="card">Body</Card>)
    const card = screen.getByTestId('card')
    for (const layout of ['flex', 'grid', 'gap-2', 'gap-3', 'gap-4']) {
      expect(card.className.split(' ')).not.toContain(layout)
    }
    expect(card.className).toContain('bg-surface-raised')
  })

  it('carries the padding variant, and none means none', () => {
    expect(cardVariants({ padding: 'md' })).toContain('p-4')
    expect(cardVariants({ padding: 'sm' })).toContain('px-4')
    expect(cardVariants({ padding: 'none' })).not.toMatch(/\bp-\d/)
    // The default is the results-grid card.
    expect(cardVariants({})).toContain('p-4')
  })

  it('lets a consumer override rather than append', async () => {
    // cn() is tailwind-merge, so a later padding wins instead of both landing.
    render(<Card className="p-8" data-testid="card">Body</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('p-8')
    expect(card.className.split(' ')).not.toContain('p-4')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Card>Body</Card>)
    expect((await axe(container)).violations).toEqual([])
  })
})
