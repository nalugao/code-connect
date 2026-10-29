import { AuthRedirect } from '../../molecules/AuthRedirect/AuthRedirect'
import { LoginForm, type LoginFormValues } from '../../organisms/LoginForm/LoginForm'
import { SocialLogin, type SocialProvider } from '../../organisms/SocialLogin/SocialLogin'
import { AuthTemplate } from '../../templates/AuthTemplate/AuthTemplate'

// TODO: integrate with the API once authentication endpoints exist.
const socialProviders: SocialProvider[] = [
  { name: 'Github', iconSrc: '/Github.png', onClick: () => console.log('login with github') },
  { name: 'Gmail', iconSrc: '/Google.png', onClick: () => console.log('login with google') },
]

// TODO: integrate with the API once authentication endpoints exist.
function handleLogin(values: LoginFormValues) {
  console.log('login', values)
}

export function LoginPage() {
  return (
    <AuthTemplate
      bannerSrc="/IMG_1 - Desktop.png"
      bannerAlt="Pessoa sorrindo programando em frente a telas com interfaces verdes"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
    >
      <LoginForm onSubmit={handleLogin} />
      <SocialLogin providers={socialProviders} />
      <AuthRedirect question="Ainda não tem conta?" linkText="Crie seu cadastro!" to="/cadastro" icon="clipboard" />
    </AuthTemplate>
  )
}
