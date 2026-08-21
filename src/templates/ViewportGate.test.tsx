import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ViewportGate } from './ViewportGate'

describe('ViewportGate', () => {
  it('renders both the app and the notice (CSS decides which is shown)', () => {
    // The switch is display-none, not conditional rendering, so both branches
    // are in the DOM at once — the test asserts the gate does not unmount either.
    render(
      <ViewportGate notice={<span>Come back on desktop</span>}>
        <main>The app</main>
      </ViewportGate>,
    )
    expect(screen.getByText('The app')).toBeInTheDocument()
    expect(screen.getByText('Come back on desktop')).toBeInTheDocument()
  })

  it('falls back to a default notice when none is given', () => {
    render(
      <ViewportGate>
        <main>The app</main>
      </ViewportGate>,
    )
    expect(screen.getByText('Desktop only, for now')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ViewportGate>
        <main>The app</main>
      </ViewportGate>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
