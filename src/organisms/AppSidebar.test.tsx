import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Beaker } from 'lucide-react'
import { AppSidebar } from './AppSidebar'

const navItems = [
  { id: 'analyse', label: 'Analyse', icon: Beaker },
  { id: 'compare', label: 'Compare', icon: Beaker },
]

describe('AppSidebar', () => {
  it('renders a nav control per item and marks the active one', () => {
    render(
      <AppSidebar
        logo={<span>hipuku</span>}
        navItems={navItems}
        activeId="analyse"
        onNavigate={() => {}}
      />,
    )
    const active = screen.getAllByRole('button', { name: /Analyse/ })[0]
    expect(active).toHaveAttribute('aria-current', 'page')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <AppSidebar
        logo={<span>hipuku</span>}
        navItems={navItems}
        activeId="analyse"
        onNavigate={() => {}}
      />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
