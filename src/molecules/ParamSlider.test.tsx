import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ParamSlider } from './ParamSlider'

describe('ParamSlider', () => {
  it('gives the range input an accessible name from its label', () => {
    render(
      <ParamSlider label="f (feed rate)" value={0.035} min={0.01} max={0.08} step={0.001} onChange={() => {}} />,
    )
    expect(screen.getByRole('slider', { name: 'f (feed rate)' })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ParamSlider label="k (kill rate)" value={0.065} min={0.04} max={0.075} step={0.001} onChange={() => {}} />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
