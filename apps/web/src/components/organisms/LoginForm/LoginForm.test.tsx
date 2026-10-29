import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { LoginForm } from './LoginForm'
import { wcagViolations } from '../../../test/axe'

function renderForm() {
  const onSubmit = vi.fn()
  render(
    <MemoryRouter>
      <LoginForm onSubmit={onSubmit} />
    </MemoryRouter>,
  )
  return { onSubmit }
}

describe('LoginForm', () => {
  it('shows errors and does not submit when fields are empty', async () => {
    const { onSubmit } = renderForm()

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Informe seu email ou usuário')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the filled values, trimming the identifier', async () => {
    const { onSubmit } = renderForm()

    await userEvent.type(screen.getByLabelText('Email ou usuário'), '  usuario123 ')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onSubmit).toHaveBeenCalledWith({ identifier: 'usuario123', password: 'segredo', remember: true })
  })

  it('has no WCAG 2.2 AA violations, with and without errors', async () => {
    renderForm()
    expect(await wcagViolations()).toEqual([])

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(await wcagViolations()).toEqual([])
  })
})
