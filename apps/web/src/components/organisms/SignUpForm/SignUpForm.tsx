import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Icon } from '../../atoms/Icon/Icon'
import { FormField } from '../../molecules/FormField/FormField'
import { useValidatedForm, type FormErrors } from '../../../hooks/useValidatedForm/useValidatedForm'

export type SignUpFormValues = {
  name: string
  email: string
  password: string
  remember: boolean
}

type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void
}

// One "@", no spaces, and a dot in the domain — enough to catch typos; the API has the final word.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parse(data: FormData): SignUpFormValues {
  return {
    name: String(data.get('name') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    password: String(data.get('password') ?? ''),
    remember: data.get('remember') === 'on',
  }
}

function validate({ name, email, password }: SignUpFormValues): FormErrors<SignUpFormValues> {
  const errors: FormErrors<SignUpFormValues> = {}
  if (!name) errors.name = 'Informe seu nome'
  if (!email) errors.email = 'Informe seu email'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Informe um email válido'
  if (!password) errors.password = 'Informe uma senha'
  return errors
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { errors, handleSubmit } = useValidatedForm({ parse, validate, onSubmit })

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Nome" name="name" placeholder="Nome completo" autoComplete="name" error={errors.name} />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="Digite seu email"
        autoComplete="email"
        error={errors.email}
      />
      <div className="flex flex-col gap-2">
        <FormField
          label="Senha"
          name="password"
          type="password"
          placeholder="******"
          autoComplete="new-password"
          error={errors.password}
        />
        <Checkbox label="Lembrar-me" name="remember" />
      </div>
      <Button type="submit" className="mt-4">
        Cadastrar
        <Icon name="arrow-right" className="size-[18px]" />
      </Button>
    </form>
  )
}
