import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AuthRedirect } from './AuthRedirect'

describe('AuthRedirect', () => {
  it('shows the question and links to the target route', () => {
    render(
      <MemoryRouter>
        <AuthRedirect question="Ainda não tem conta?" linkText="Crie seu cadastro!" to="/cadastro" icon="clipboard" />
      </MemoryRouter>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute('href', '/cadastro')
  })
})
