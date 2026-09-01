import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { InlineCode } from './InlineCode'

describe('InlineCode', () => {
  it('renders a code element', () => {
    render(<InlineCode>.btn &gt; span</InlineCode>)
    expect(screen.getByText('.btn > span').tagName).toBe('CODE')
  })

  it('takes an accent name, not a Tailwind class', () => {
    // It used to take "text-orbit", which leaked the styling implementation
    // through the API and disagreed with every other accent-carrying component.
    const { rerender } = render(<InlineCode data-testid="c">a</InlineCode>)
    const withDefault = screen.getByTestId('c').className
    rerender(<InlineCode colour="flare" data-testid="c">a</InlineCode>)
    expect(screen.getByTestId('c').className).not.toBe(withDefault)
  })

  it('has no axe violations', async () => {
    const { container } = render(<p>A rule like <InlineCode>#id</InlineCode> wins.</p>)
    expect((await axe(container)).violations).toEqual([])
  })
})
