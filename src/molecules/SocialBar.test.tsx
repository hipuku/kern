import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { SocialBar } from './SocialBar'

describe('SocialBar', () => {
  it('names both icon links, since neither has visible text', () => {
    // Two icons and no words. Without the labels these are announced as "link"
    // and "link", which is the most common icon-only failure there is.
    render(<SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />)
    expect(screen.getByRole('link', { name: 'hipuku.dev (opens in new tab)' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'specifi on GitHub (opens in new tab)' })).toBeInTheDocument()
  })

  it('points GitHub at the repo it was given', () => {
    render(<SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />)
    expect(screen.getByRole('link', { name: 'specifi on GitHub (opens in new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/hipuku/specifi',
    )
  })

  it('shows the website link alone when no repo is given', () => {
    render(<SocialBar siteName="specifi" />)
    expect(screen.getByRole('link', { name: 'hipuku.dev (opens in new tab)' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /GitHub/ })).not.toBeInTheDocument()
  })

  it('labels each link with where it goes', () => {
    // The globe points at hipuku.dev, not at the tool, so naming it after
    // the tool announced one destination and opened another.
    render(<SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />)
    expect(screen.getByRole('link', { name: 'hipuku.dev (opens in new tab)' })).toHaveAttribute(
      'href',
      'https://www.hipuku.dev',
    )
  })

  it('takes a label along with a custom website', () => {
    render(
      <SocialBar siteName="specifi" websiteUrl="https://example.com" websiteLabel="Example site" />,
    )
    expect(screen.getByRole('link', { name: 'Example site (opens in new tab)' })).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <SocialBar githubUrl="https://github.com/hipuku/specifi" siteName="specifi" />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
