import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { CopyButton } from './CopyButton'

/** jsdom ships no clipboard, and userEvent installs its own stub, so each test
 *  states the behaviour it wants rather than sharing one. */
function stubClipboard(impl: () => Promise<void>) {
  const writeText = vi.fn(impl)
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  })
  return writeText
}

describe('CopyButton', () => {
  it('writes the text and names itself with it', async () => {
    const writeText = stubClipboard(() => Promise.resolve())
    render(<CopyButton text="#aa1155" />)
    await userEvent.click(screen.getByRole('button', { name: 'Copy #aa1155' }))
    expect(writeText).toHaveBeenCalledWith('#aa1155')
  })

  it('announces the confirmation as well as drawing it', async () => {
    // The icon swap is invisible to a screen reader, so the live region carries
    // the word. This is the reason the component exists rather than a bare
    // button with a clipboard call.
    stubClipboard(() => Promise.resolve())
    const { container } = render(<CopyButton text="#aa1155" />)
    const live = container.querySelector('[aria-live="polite"]')
    expect(live).toHaveTextContent('')

    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(live).toHaveTextContent('Copied'))
    expect(screen.getByRole('button', { name: 'Copied #aa1155' })).toBeInTheDocument()
  })

  it('does not confirm a copy that failed', async () => {
    // Clipboard access is refused in insecure contexts and when the user denies
    // permission. Neither is exceptional, and a false "Copied" is worse than
    // no feedback because the user moves on and pastes something stale.
    stubClipboard(() => Promise.reject(new Error('denied')))
    const { container } = render(<CopyButton text="#aa1155" />)
    await userEvent.click(screen.getByRole('button'))
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('')
    expect(screen.getByRole('button', { name: 'Copy #aa1155' })).toBeInTheDocument()
  })

  it('clears its timer on unmount', async () => {
    // A component that disappears mid-feedback must not set state on a dead
    // component. Without the cleanup this logs a React warning and the test
    // below is how it would be caught.
    stubClipboard(() => Promise.resolve())
    const warn = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { unmount } = render(<CopyButton text="#aa1155" feedbackMs={10} />)
    await userEvent.click(screen.getByRole('button'))
    unmount()
    await new Promise(r => setTimeout(r, 30))
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  it('has no axe violations', async () => {
    stubClipboard(() => Promise.resolve())
    const { container } = render(<CopyButton text="#aa1155" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
