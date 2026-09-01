import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { SocialBar } from './SocialBar'

describe('SocialBar', () => {
  it('names both icon links, since neither has visible text', () => {
    // Two icons and no words. Without the labels these are announced as "link"
    // and "link", which is the most common icon-only failure there is.
    render(<SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />)
    expect(screen.getByRole('link', { name: /specifi website/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
  })

  it('points GitHub at the repo it was given', () => {
    render(<SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />)
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/hipuku/specifi',
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
