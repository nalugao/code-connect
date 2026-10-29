import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AuthRedirect } from './AuthRedirect'

describe('AuthRedirect', () => {
  it.each(['stacked', 'inline'] as const)('shows the question and links to the target route (%s)', (layout) => {
    render(
      <MemoryRouter>
        <AuthRedirect question="Já tem conta?" linkText="Faça seu login!" to="/login" icon="login" layout={layout} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Já tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
  })
})
