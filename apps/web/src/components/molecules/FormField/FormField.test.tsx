import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('associates the label with its input', () => {
    render(<FormField label="Email ou usuário" placeholder="usuario123" />)

    expect(screen.getByLabelText('Email ou usuário')).toHaveAttribute('placeholder', 'usuario123')
  })

  it('shows the error and marks the input as invalid', () => {
    render(<FormField label="Senha" error="Informe sua senha" />)
    const input = screen.getByLabelText('Senha')

    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Informe sua senha')
  })
})
