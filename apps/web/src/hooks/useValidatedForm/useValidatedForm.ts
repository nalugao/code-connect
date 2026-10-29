import { useState, type FormEvent } from 'react'

export type FormErrors<Values> = Partial<Record<keyof Values, string>>

type UseValidatedFormOptions<Values> = {
  /** Reads the submitted fields from the form's FormData. */
  parse: (data: FormData) => Values
  /** Returns one message per invalid field; an empty object means the form is valid. */
  validate: (values: Values) => FormErrors<Values>
  onSubmit: (values: Values) => void
}

// Shared submit flow for uncontrolled forms: parse → validate → show errors or submit.
export function useValidatedForm<Values>({ parse, validate, onSubmit }: UseValidatedFormOptions<Values>) {
  const [errors, setErrors] = useState<FormErrors<Values>>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = parse(new FormData(event.currentTarget))

    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) onSubmit(values)
  }

  return { errors, handleSubmit }
}
