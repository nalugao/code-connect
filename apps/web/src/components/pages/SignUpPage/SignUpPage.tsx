import { AuthRedirect } from '../../molecules/AuthRedirect/AuthRedirect'
import { SignUpForm, type SignUpFormValues } from '../../organisms/SignUpForm/SignUpForm'
import { SocialLogin } from '../../organisms/SocialLogin/SocialLogin'
import { AuthTemplate } from '../../templates/AuthTemplate/AuthTemplate'
import { socialProviders } from '../socialProviders'

// TODO: integrate with the API once authentication endpoints exist.
function handleSignUp(values: SignUpFormValues) {
  console.log('sign up', values)
}

export function SignUpPage() {
  return (
    <AuthTemplate
      bannerSrc="/banner-cadastro.webp"
      bannerAlt="Pessoa de óculos programando diante de telas com interfaces verdes"
      bannerWidth={1344}
      bannerHeight={896}
      bannerPosition="object-[60%_center]"
      title="Cadastro"
      subtitle="Olá! Preencha seus dados."
      footer={
        <AuthRedirect question="Já tem conta?" linkText="Faça seu login!" to="/login" icon="login" layout="inline" />
      }
    >
      <SignUpForm onSubmit={handleSignUp} />
      <SocialLogin providers={socialProviders} />
    </AuthTemplate>
  )
}
