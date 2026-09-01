import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { BulletItem } from './BulletItem'

describe('BulletItem', () => {
  it('renders a real list item, with the marker hidden from the accessible tree', () => {
    // The marker is drawn rather than native. The docstring's claim is that the
    // semantics are not faked with it: a screen reader should hear a list of one
    // item, not a list of one item preceded by a stray graphic.
    render(
      <ul>
        <BulletItem>Specificity is not a score</BulletItem>
      </ul>,
    )
    const item = screen.getByRole('listitem')
    expect(item.tagName).toBe('LI')
    expect(item.textContent).toBe('Specificity is not a score')
    expect(item.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })

  it('has no axe violations inside a list', async () => {
    const { container } = render(
      <ul>
        <BulletItem>One</BulletItem>
        <BulletItem>Two</BulletItem>
      </ul>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
