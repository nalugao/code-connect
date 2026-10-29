import { useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'

export type FormErrors<Values> = Partial<Record<keyof Values, string>>

type UseValidatedFormOptions<Values> = {
  /** Reads the submitted fields from the form's FormData. */
  parse: (data: FormData) => Values
  /** Returns one message per invalid field; an empty object means the form is valid. */
  validate: (values: Values) => FormErrors<Values>
  onSubmit: (values: Values) => void
}

// Shared submit flow for uncontrolled forms: parse → validate → show errors or submit.
// On failure, focus moves to the first invalid field so screen readers announce its error (WCAG 3.3.1).
export function useValidatedForm<Values>({ parse, validate, onSubmit }: UseValidatedFormOptions<Values>) {
  const [errors, setErrors] = useState<FormErrors<Values>>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = parse(new FormData(form))

    const validationErrors = validate(values)
    // Render the error messages first, so the field is announced together with its aria-describedby text.
    flushSync(() => setErrors(validationErrors))
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values)
      return
    }

    const firstInvalid = [...form.elements].find(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element.getAttribute('name') !== null && element.getAttribute('name')! in validationErrors,
    )
    firstInvalid?.focus()
  }

  return { errors, handleSubmit }
}
