import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignUpForm } from './SignUpForm'
import { wcagViolations } from '../../../test/axe'

function renderForm() {
  const onSubmit = vi.fn()
  render(<SignUpForm onSubmit={onSubmit} />)
  return { onSubmit }
}

describe('SignUpForm', () => {
  it('shows errors and does not submit when fields are empty', async () => {
    const { onSubmit } = renderForm()

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(screen.getByText('Informe seu nome')).toBeInTheDocument()
    expect(screen.getByText('Informe seu email')).toBeInTheDocument()
    expect(screen.getByText('Informe uma senha')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects an invalid email', async () => {
    const { onSubmit } = renderForm()

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await userEvent.type(screen.getByLabelText('Email'), 'ana.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(screen.getByText('Informe um email válido')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the filled values', async () => {
    const { onSubmit } = renderForm()

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await userEvent.type(screen.getByLabelText('Email'), 'ana@email.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ana Souza',
      email: 'ana@email.com',
      password: 'segredo',
      remember: true,
    })
  })

  it('has no WCAG 2.2 AA violations, with and without errors', async () => {
    renderForm()
    expect(await wcagViolations()).toEqual([])

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))
    expect(await wcagViolations()).toEqual([])
  })
})
