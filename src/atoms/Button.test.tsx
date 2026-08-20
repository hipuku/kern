import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { createRef } from 'react'
import { Button } from './Button'
import { accentOpacity } from '../tokens/tokens'

describe('Button', () => {
  it('defaults to type="button" so it does not submit a surrounding form', async () => {
    // The regression this guards: an unspecified type inside a form is "submit"
    // per the HTML spec, so a design-system button used for anything else
    // silently submits and reloads the page.
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button>Not a submit</Button>
      </form>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Not a submit' }))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits when type="submit" is asked for explicitly', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Send</Button>
      </form>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('does not fire onClick while disabled', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Disabled' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards a ref to the underlying element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('merges className rather than dropping it', () => {
    render(<Button className="mt-4">Merged</Button>)
    const button = screen.getByRole('button', { name: 'Merged' })
    expect(button).toHaveClass('mt-4')
    // Still carries its variant classes.
    expect(button.className).toMatch(/bg-surface-raised/)
  })

  it('uses the declared accent opacities, not ad-hoc ones', () => {
    // The accent variant carried a bare /25 and /40 that no token described.
    // Tailwind needs these written literally to scan them, so this is what
    // keeps the literals and tokens.ts agreeing.
    render(<Button variant="accent">Accent</Button>)
    const cls = screen.getByRole('button', { name: 'Accent' }).className
    expect(cls).toContain(`bg-(--primary)/${accentOpacity.tint}`)
    expect(cls).toContain(`hover:bg-(--primary)/${accentOpacity.tintHover}`)
    expect(cls).toContain(`border-(--primary)/${accentOpacity.border}`)
  })

  it('has no axe violations across variants', async () => {
    const { container } = render(
      <>
        <Button variant="surface">Surface</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button disabled>Disabled</Button>
      </>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
