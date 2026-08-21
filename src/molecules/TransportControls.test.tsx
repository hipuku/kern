import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { TransportControls } from './TransportControls'

describe('TransportControls', () => {
  it('labels the toggle by the current state', () => {
    const { rerender } = render(
      <TransportControls running onToggle={() => {}} onReset={() => {}} />,
    )
    // While running, the control offers to pause.
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    rerender(<TransportControls running={false} onToggle={() => {}} onReset={() => {}} />)
    // Paused, it offers to play.
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
  })

  it('fires toggle and reset', async () => {
    const onToggle = vi.fn()
    const onReset = vi.fn()
    render(
      <TransportControls running onToggle={onToggle} onReset={onReset} resetLabel="Reset simulation" />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Pause' }))
    await userEvent.click(screen.getByRole('button', { name: 'Reset simulation' }))
    expect(onToggle).toHaveBeenCalledOnce()
    expect(onReset).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <TransportControls running onToggle={() => {}} onReset={() => {}} />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
