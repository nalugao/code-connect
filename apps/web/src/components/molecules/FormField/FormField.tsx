import { useId, type InputHTMLAttributes } from 'react'
import { Input } from '../../atoms/Input/Input'
import { Label } from '../../atoms/Label/Label'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function FormField({ label, error, id, ...inputProps }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <span id={errorId} className="text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}
