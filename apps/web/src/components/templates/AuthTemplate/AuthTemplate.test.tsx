import { render, screen } from '@testing-library/react'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders the banner, the heading and the content', () => {
    render(
      <AuthTemplate bannerSrc="/banner.png" bannerAlt="Pessoa programando" title="Login" subtitle="Boas-vindas!">
        <p>conteúdo do formulário</p>
      </AuthTemplate>,
    )

    expect(screen.getByRole('img', { name: 'Pessoa programando' })).toHaveAttribute('src', '/banner.png')
    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas!')).toBeInTheDocument()
    expect(screen.getByText('conteúdo do formulário')).toBeInTheDocument()
  })
})
