import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Globe } from 'lucide-react'
import { IconLink } from './IconLink'

describe('IconLink', () => {
  it('exposes its aria-label as the accessible name', () => {
    render(
      <IconLink href="https://www.hipuku.dev" aria-label="hipuku website">
        <Globe />
      </IconLink>,
    )
    expect(screen.getByRole('link', { name: 'hipuku website' })).toBeInTheDocument()
  })

  it('announces the new tab and sets rel when external', () => {
    // aria-label wins over children for the accessible name, so the new-tab
    // notice has to live in the label itself, not a visually-hidden span.
    render(
      <IconLink href="https://github.com/hipuku" aria-label="GitHub" external>
        <Globe />
      </IconLink>,
    )
    const link = screen.getByRole('link', { name: 'GitHub (opens in new tab)' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('stays in the same tab when not external', () => {
    render(
      <IconLink href="#docs" aria-label="Documentation">
        <Globe />
      </IconLink>,
    )
    const link = screen.getByRole('link', { name: 'Documentation' })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <IconLink href="https://github.com/hipuku" aria-label="GitHub" external>
        <Globe />
      </IconLink>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
