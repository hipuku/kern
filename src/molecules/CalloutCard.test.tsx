import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { CalloutCard } from './CalloutCard'

describe('CalloutCard', () => {
  it('tints the label and leaves the card chrome neutral', () => {
    // The accent belongs to the label only. A tinted surface behind body text
    // is the version of this component that fails contrast.
    render(<CalloutCard colour="flare" label="Careful" data-testid="c">Specificity wars.</CalloutCard>)
    const card = screen.getByTestId('c')
    expect(card.className).toContain('bg-surface-raised')
    expect(screen.getByText('Careful').className).not.toBe(
      screen.getByText('Specificity wars.').className,
    )
  })

  it('renders without a label', () => {
    render(<CalloutCard colour="orbit">Body only.</CalloutCard>)
    expect(screen.getByText('Body only.')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<CalloutCard colour="orbit" label="Note">Body</CalloutCard>)
    expect((await axe(container)).violations).toEqual([])
  })
})
