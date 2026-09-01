import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Workbench } from './Workbench'

describe('Workbench', () => {
  it('puts the stage first in the DOM, not just on the left', () => {
    // The rail is beside the stage visually. Source order is what a screen
    // reader and the tab sequence follow, so the thing being worked on comes
    // first rather than after twenty controls.
    const { container } = render(
      <Workbench stage={<canvas aria-label="Simulation" />} controls={<button type="button">Run</button>} />,
    )
    const text = container.innerHTML
    expect(text.indexOf('Simulation')).toBeLessThan(text.indexOf('Run'))
  })

  it('renders both regions', () => {
    render(
      <Workbench stage={<p>Stage</p>} controls={<button type="button">Run</button>} />,
    )
    expect(screen.getByText('Stage')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument()
  })

  it('lets a caller widen the control rail', () => {
    // Defaults to w-52. A simulation with long-labelled sliders needs more, and
    // the alternative iseach experiment restyling the container from outside.
    const { container } = render(
      <Workbench stage={<p>S</p>} controls={<p>C</p>} railClassName="w-80" />,
    )
    expect(container.innerHTML).toContain('w-80')
    expect(container.innerHTML).not.toContain('w-52')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Workbench stage={<p>Stage</p>} controls={<button type="button">Run</button>} />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
