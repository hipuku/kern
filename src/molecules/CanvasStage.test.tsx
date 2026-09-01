import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { CanvasStage } from './CanvasStage'

describe('CanvasStage', () => {
  it('clips what it is given', () => {
    // A canvas or an SVG drawn to the edge overflows the rounded corner without
    // this, which shows as a square corner poking out of a rounded card.
    render(<CanvasStage data-testid="s"><canvas aria-label="Sim" /></CanvasStage>)
    const stage = screen.getByTestId('s')
    expect(stage.className).toContain('overflow-hidden')
    expect(stage.className).toContain('rounded-card')
  })

  it('is square by default, because the simulation grids are', () => {
    // Off is the exception, for a stage with its own aspect ratio. The default
    // is the shape four of gray-scott's canvases already framed by hand.
    const { rerender } = render(<CanvasStage data-testid="s">x</CanvasStage>)
    expect(screen.getByTestId('s').className).toContain('aspect-square')
    rerender(<CanvasStage square={false} data-testid="s">x</CanvasStage>)
    expect(screen.getByTestId('s').className).not.toContain('aspect-square')
  })

  it('has no axe violations', async () => {
    const { container } = render(<CanvasStage><canvas aria-label="Sim" /></CanvasStage>)
    expect((await axe(container)).violations).toEqual([])
  })
})
