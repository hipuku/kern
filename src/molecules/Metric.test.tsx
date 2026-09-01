import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Metric } from './Metric'

describe('Metric', () => {
  it('names the figure with a span, not a label', () => {
    // A <label> names a form control. This names a figure, so the escape hatch
    // in Label is used deliberately here rather than leaving a label pointing
    // at nothing.
    render(<Metric label="Contrast" value="7.05" />)
    expect(screen.getByText('Contrast').tagName).toBe('SPAN')
    expect(screen.getByText('7.05')).toBeInTheDocument()
  })

  it('changes layout with orientation and keeps the same content', () => {
    const { rerender } = render(<Metric label="Contrast" value="7.05" data-testid="m" />)
    expect(screen.getByTestId('m').className).toContain('flex-col')
    rerender(<Metric label="Contrast" value="7.05" orientation="horizontal" data-testid="m" />)
    expect(screen.getByTestId('m').className).not.toContain('flex-col')
    expect(screen.getByText('Contrast')).toBeInTheDocument()
  })

  it('drops the card surface on request', () => {
    // surface={false} is for a metric sitting inside something that already
    // draws an edge; two nested raised surfaces read as a bug.
    render(<Metric label="Contrast" value="7.05" surface={false} data-testid="m" />)
    expect(screen.getByTestId('m').className).not.toContain('bg-surface-raised')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Metric label="Contrast" value="7.05" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
