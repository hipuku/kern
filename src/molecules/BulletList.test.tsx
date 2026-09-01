import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { BulletList } from './BulletList'
import { BulletItem } from '../atoms/BulletItem'

describe('BulletList', () => {
  it('drops the native marker without dropping the list semantics', () => {
    // `list-none` is styling. The role has to survive it, or a screen reader
    // announces three paragraphs where the page shows three bullets.
    render(
      <BulletList>
        <BulletItem>One</BulletItem>
        <BulletItem>Two</BulletItem>
      </BulletList>,
    )
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('UL')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <BulletList>
        <BulletItem>One</BulletItem>
      </BulletList>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
