import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Icon } from '../../atoms/Icon/Icon'
import { TextLink } from '../../atoms/TextLink/TextLink'
import { FormField } from '../../molecules/FormField/FormField'
import { useValidatedForm, type FormErrors } from '../../../hooks/useValidatedForm/useValidatedForm'

export type LoginFormValues = {
  identifier: string
  password: string
  remember: boolean
}

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void
}

function parse(data: FormData): LoginFormValues {
  return {
    identifier: String(data.get('identifier') ?? '').trim(),
    password: String(data.get('password') ?? ''),
    remember: data.get('remember') === 'on',
  }
}

function validate({ identifier, password }: LoginFormValues): FormErrors<LoginFormValues> {
  const errors: FormErrors<LoginFormValues> = {}
  if (!identifier) errors.identifier = 'Informe seu email ou usuário'
  // Not trimmed (spaces may be part of a password), but a password of only spaces counts as empty.
  if (!password.trim()) errors.password = 'Informe sua senha'
  return errors
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { errors, handleSubmit } = useValidatedForm({ parse, validate, onSubmit })

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        label="Email ou usuário"
        name="identifier"
        placeholder="usuario123"
        autoComplete="username"
        error={errors.identifier}
      />
      <div className="flex flex-col gap-2">
        <FormField
          label="Senha"
          name="password"
          type="password"
          placeholder="******"
          autoComplete="current-password"
          error={errors.password}
        />
        <div className="flex items-center justify-between">
          <Checkbox label="Lembrar-me" name="remember" />
          <TextLink to="/esqueci-a-senha">Esqueci a senha</TextLink>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Login
        <Icon name="arrow-right" className="size-[18px]" />
      </Button>
    </form>
  )
}
