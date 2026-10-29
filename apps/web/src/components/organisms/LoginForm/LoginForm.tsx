import { useState, type FormEvent } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Icon } from '../../atoms/Icon/Icon'
import { TextLink } from '../../atoms/TextLink/TextLink'
import { FormField } from '../../molecules/FormField/FormField'

export type LoginFormValues = {
  identifier: string
  password: string
  remember: boolean
}

type LoginFormErrors = Partial<Record<'identifier' | 'password', string>>

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void
}

function validate({ identifier, password }: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}
  if (!identifier.trim()) errors.identifier = 'Informe seu email ou usuário'
  if (!password) errors.password = 'Informe sua senha'
  return errors
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: LoginFormValues = {
      identifier: String(data.get('identifier') ?? ''),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    }

    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) onSubmit(values)
  }

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
        <Icon name="arrow-right" />
      </Button>
    </form>
  )
}
