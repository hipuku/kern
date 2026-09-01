import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { useState } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

/** Throws once, then renders. Lets a test prove the boundary recovers rather
 *  than only that it catches. */
function Bomb({ throwNow }: { throwNow: boolean }) {
  if (throwNow) throw new Error('simulation diverged')
  return <p>Back to work</p>
}

describe('ErrorBoundary', () => {
  // React logs caught render errors to console.error by design, and so does the
  // boundary's own componentDidCatch. Silenced per test so a passing run is
  // quiet and a real unexpected error still stands out.
  let spy: ReturnType<typeof vi.spyOn>
  beforeEach(() => { spy = vi.spyOn(console, 'error').mockImplementation(() => {}) })
  afterEach(() => spy.mockRestore())

  it('renders its children when nothing throws', () => {
    render(<ErrorBoundary><p>All fine</p></ErrorBoundary>)
    expect(screen.getByText('All fine')).toBeInTheDocument()
  })

  it('catches a render error and announces the fallback', () => {
    // role="alert" is the part worth asserting: the screen changes completely,
    // and without it a screen reader user gets no notification that it did.
    render(<ErrorBoundary><Bomb throwNow /></ErrorBoundary>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Something went wrong')
    expect(alert).toHaveTextContent('simulation diverged')
  })

  it('recovers when the user resets it', async () => {
    function Harness() {
      const [broken, setBroken] = useState(true)
      return (
        <ErrorBoundary
          fallback={(error, reset) => (
            <button type="button" onClick={() => { setBroken(false); reset() }}>
              Retry after {error.message}
            </button>
          )}
        >
          <Bomb throwNow={broken} />
        </ErrorBoundary>
      )
    }
    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: /Retry after/ }))
    expect(screen.getByText('Back to work')).toBeInTheDocument()
  })

  it('reports the error to a caller that wants to forward it', () => {
    const onError = vi.fn()
    render(<ErrorBoundary onError={onError}><Bomb throwNow /></ErrorBoundary>)
    expect(onError).toHaveBeenCalledOnce()
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error)
    expect(onError.mock.calls[0][1]).toHaveProperty('componentStack')
  })

  it('has no axe violations in the fallback', async () => {
    const { container } = render(<ErrorBoundary><Bomb throwNow /></ErrorBoundary>)
    expect((await axe(container)).violations).toEqual([])
  })
})
