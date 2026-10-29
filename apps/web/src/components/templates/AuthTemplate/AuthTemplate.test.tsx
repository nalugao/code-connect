import { render, screen } from '@testing-library/react'
import { AuthTemplate } from './AuthTemplate'
import { wcagViolations } from '../../../test/axe'

describe('AuthTemplate', () => {
  it('renders the banner with the logo, the heading, the content and the footer', () => {
    render(
      <AuthTemplate
        bannerSrc="/banner.png"
        bannerAlt="Pessoa programando"
        bannerPosition="object-[60%_center]"
        title="Login"
        subtitle="Boas-vindas!"
        footer={<p>rodapé</p>}
      >
        <p>conteúdo do formulário</p>
      </AuthTemplate>,
    )

    const banner = screen.getByRole('img', { name: 'Pessoa programando' })
    expect(banner).toHaveAttribute('src', '/banner.png')
    expect(banner).toHaveClass('object-[60%_center]')
    expect(screen.getByRole('img', { name: 'Code Connect' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas!')).toBeInTheDocument()
    expect(screen.getByText('conteúdo do formulário')).toBeInTheDocument()
    expect(screen.getByText('rodapé')).toBeInTheDocument()
  })

  it('has no WCAG 2.2 AA violations', async () => {
    render(
      <AuthTemplate bannerSrc="/banner.png" bannerAlt="Pessoa programando" title="Login" subtitle="Boas-vindas!">
        <p>conteúdo do formulário</p>
      </AuthTemplate>,
    )

    expect(await wcagViolations()).toEqual([])
  })
})
