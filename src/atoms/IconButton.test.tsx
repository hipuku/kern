import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { RotateCcw } from 'lucide-react'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('exposes its aria-label as the accessible name', () => {
    render(
      <IconButton onClick={() => {}} aria-label="Reset simulation">
        <RotateCcw />
      </IconButton>,
    )
    expect(screen.getByRole('button', { name: 'Reset simulation' })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <IconButton onClick={() => {}} aria-label="Reset simulation">
        <RotateCcw />
      </IconButton>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
