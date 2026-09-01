import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { AppShell } from './AppShell'

/** NavItem requires an icon component; a plain glyph keeps the test about layout. */
const Dot = ({ className }: { className?: string }) => <span className={className} aria-hidden="true">•</span>

const NAV = [
  { id: 'analyse', label: 'Analyse', icon: Dot },
  { id: 'compare', label: 'Compare', icon: Dot },
]

function shell(props: Partial<Parameters<typeof AppShell>[0]> = {}) {
  return (
    <AppShell
      logo={<span>specifi</span>}
      navItems={NAV}
      activeId="analyse"
      onNavigate={() => {}}
      {...props}
    >
      <h1>Analyse</h1>
    </AppShell>
  )
}

describe('AppShell', () => {
  it('gives the page one main landmark and puts the view inside it', () => {
    render(shell())
    expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { name: 'Analyse' }))
  })

  it('marks the current view for assistive technology, not just visually', async () => {
    // The active item is tinted with an accent. Colour alone does not tell a
    // screen reader user which view they are in.
    render(shell())
    const current = screen.getByRole('button', { name: 'Analyse' })
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Compare' })).not.toHaveAttribute('aria-current')
  })

  it('reports which item was chosen', async () => {
    const onNavigate = vi.fn()
    render(shell({ onNavigate }))
    await userEvent.click(screen.getByRole('button', { name: 'Compare' }))
    expect(onNavigate).toHaveBeenCalledWith('compare')
  })

  it('wraps the app in an error boundary unless asked not to', () => {
    // The default matters: an uncaught render error in an experiment blanks the
    // page, and these are public demos.
    const Bomb = () => { throw new Error('boom') }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <AppShell logo={<span>s</span>} navItems={NAV} activeId="analyse" onNavigate={() => {}}>
        <Bomb />
      </AppShell>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
    spy.mockRestore()
  })

  it('has no axe violations', async () => {
    const { container } = render(shell())
    expect((await axe(container)).violations).toEqual([])
  })
})
