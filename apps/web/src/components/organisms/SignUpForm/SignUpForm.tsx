import { useState, type FormEvent } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Icon } from '../../atoms/Icon/Icon'
import { FormField } from '../../molecules/FormField/FormField'

export type SignUpFormValues = {
  name: string
  email: string
  password: string
  remember: boolean
}

type SignUpFormErrors = Partial<Record<'name' | 'email' | 'password', string>>

type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void
}

function validate({ name, email, password }: SignUpFormValues): SignUpFormErrors {
  const errors: SignUpFormErrors = {}
  if (!name.trim()) errors.name = 'Informe seu nome'
  if (!email.trim()) errors.email = 'Informe seu email'
  else if (!/^\S+@\S+$/.test(email)) errors.email = 'Informe um email válido'
  if (!password) errors.password = 'Informe uma senha'
  return errors
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [errors, setErrors] = useState<SignUpFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: SignUpFormValues = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    }

    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) onSubmit(values)
  }

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
