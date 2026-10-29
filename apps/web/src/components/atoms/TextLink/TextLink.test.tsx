import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('renders a link to the given route', () => {
    render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute('href', '/cadastro')
  })
})
