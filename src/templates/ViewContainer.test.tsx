import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ViewContainer, viewContainerVariants } from './ViewContainer'

describe('ViewContainer', () => {
  it('centres a column and stacks what it is given', () => {
    render(<ViewContainer data-testid="v"><p>Body</p></ViewContainer>)
    const el = screen.getByTestId('v')
    expect(el.className).toContain('mx-auto')
    expect(el.className).toContain('flex-col')
  })

  it('holds the reading measure to the two documented widths', () => {
    // The measure is the point of the template: a tool view that grows to the
    // window is unreadable at 2560px, which is what every experiment did before
    // this existed.
    expect(viewContainerVariants({ width: 'lg' })).toContain('max-w-3xl')
    expect(viewContainerVariants({ width: 'md' })).toContain('max-w-2xl')
  })

  it('offers three rhythms and defaults to one of them', () => {
    for (const gap of ['sm', 'md', 'lg'] as const) {
      expect(viewContainerVariants({ gap })).toMatch(/\bgap-\d+\b/)
    }
    expect(viewContainerVariants({})).toMatch(/\bgap-\d+\b/)
  })

  it('has no axe violations', async () => {
    const { container } = render(<ViewContainer><p>Body</p></ViewContainer>)
    expect((await axe(container)).violations).toEqual([])
  })
})
