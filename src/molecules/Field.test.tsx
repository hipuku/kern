import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Field } from './Field'
import { Input } from '../atoms/Input'

describe('Field', () => {
  it('associates the label with the control', () => {
    // The whole point of the render-prop shape: htmlFor and id cannot disagree
    // because the caller never writes either of them.
    render(<Field label="Hex code">{(c) => <Input {...c} />}</Field>)
    expect(screen.getByLabelText('Hex code')).toBeInTheDocument()
  })

  it('describes the control with its error and marks it invalid', () => {
    render(
      <Field label="Hex code" error="Not a valid hex code">
        {(c) => <Input invalid {...c} />}
      </Field>,
    )
    const input = screen.getByLabelText('Hex code')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Not a valid hex code')
    expect(screen.getByRole('alert')).toHaveTextContent('Not a valid hex code')
  })

  it('describes the control with its hint, without raising an alert', () => {
    render(
      <Field label="Selector" hint="Any valid CSS selector">
        {(c) => <Input {...c} />}
      </Field>,
    )
    expect(screen.getByLabelText('Selector')).toHaveAccessibleDescription('Any valid CSS selector')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('prefers the error over the hint when both are given', () => {
    render(
      <Field label="Selector" hint="Any valid CSS selector" error="Unclosed bracket">
        {(c) => <Input {...c} />}
      </Field>,
    )
    expect(screen.getByLabelText('Selector')).toHaveAccessibleDescription('Unclosed bracket')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Field label="Hex code" error="Not a valid hex code">
        {(c) => <Input invalid {...c} />}
      </Field>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
