import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SignUpPage } from './SignUpPage'
import { wcagViolations } from '../../../test/axe'

describe('SignUpPage', () => {
  it('renders the sign-up form, social providers and login link', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gmail' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
  })

  it('has no WCAG 2.2 AA violations', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    )

    expect(await wcagViolations()).toEqual([])
  })
})
