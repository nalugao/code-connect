import { AuthRedirect } from '../../molecules/AuthRedirect/AuthRedirect'
import { LoginForm, type LoginFormValues } from '../../organisms/LoginForm/LoginForm'
import { SocialLogin } from '../../organisms/SocialLogin/SocialLogin'
import { AuthTemplate } from '../../templates/AuthTemplate/AuthTemplate'
import { socialProviders } from '../socialProviders'

// TODO: integrate with the API once authentication endpoints exist.
function handleLogin(values: LoginFormValues) {
  console.log('login', values)
}

export function LoginPage() {
  return (
    <AuthTemplate
      bannerSrc="/banner-login.webp"
      bannerAlt="Pessoa sorrindo programando em frente a telas com interfaces verdes"
      bannerPosition="object-[52%_center]"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      footer={<AuthRedirect question="Ainda não tem conta?" linkText="Crie seu cadastro!" to="/cadastro" icon="clipboard" />}
    >
      <LoginForm onSubmit={handleLogin} />
      <SocialLogin providers={socialProviders} />
    </AuthTemplate>
  )
}
