import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ExternalLink } from './ExternalLink'

describe('ExternalLink', () => {
  it('cannot be got wrong: always a new tab, always noopener noreferrer', () => {
    // The whole point of the component. An unadorned <a target="_blank"> is a
    // security footgun, so the system provides one that has no unsafe setting.
    render(<ExternalLink href="https://example.com">Docs</ExternalLink>)
    const link = screen.getByRole('link', { name: /Docs/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')?.split(' ')).toEqual(
      expect.arrayContaining(['noopener', 'noreferrer']),
    )
  })

  it('announces the change of context in the accessible name', () => {
    // Visually the target is implied by the arrow. For a screen reader the
    // change of context has to be in the name itself.
    render(<ExternalLink href="https://example.com">Docs</ExternalLink>)
    // Asserted as a substring rather than an exact string on purpose. Name
    // computation collapses and trims whitespace per node, so the separator
    // disappears whether it is a plain space or a non-breaking one and the name
    // is "Docs(opens in new tab)". That is how every library that appends
    // hidden text behaves, and the parenthesis carries the pause in speech.
    expect(screen.getByRole('link')).toHaveAccessibleName(/^Docs\(opens in new tab\)$/)
  })

  it('has no axe violations', async () => {
    const { container } = render(<ExternalLink href="https://example.com">Docs</ExternalLink>)
    expect((await axe(container)).violations).toEqual([])
  })
})
