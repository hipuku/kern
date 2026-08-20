import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Wordmark } from './Wordmark'

describe('Wordmark', () => {
  it('uses the name as alt text', () => {
    // A wordmark is meaningful content, not decoration — an unlabelled one
    // leaves a screen reader announcing the filename.
    render(<Wordmark src="/specifi.svg" name="specifi" />)
    expect(screen.getByAltText('specifi')).toBeInTheDocument()
  })

  it('renders one consistent height by default', () => {
    // The drift this exists to stop: hexicon rendered at h-5 while specifi and
    // gray-scott used h-7.
    render(<Wordmark src="/specifi.svg" name="specifi" />)
    expect(screen.getByAltText('specifi')).toHaveClass('h-7')
  })

  it('is not a link unless given an href', () => {
    render(<Wordmark src="/specifi.svg" name="specifi" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('takes the focus ring when linked', () => {
    render(<Wordmark src="/specifi.svg" name="specifi" href="https://specifi.hipuku.dev" />)
    expect(screen.getByRole('link').className).toMatch(/focus-visible:ring-2/)
  })

  it('has no axe violations', async () => {
    const { container } = render(<Wordmark src="/specifi.svg" name="specifi" href="#" />)
    expect((await axe(container)).violations).toEqual([])
  })
})
