import type { InputHTMLAttributes, Ref } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
  ref?: Ref<HTMLInputElement>
}

export function Input({ invalid = false, className = '', ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`w-full rounded bg-input px-3 py-2 text-sm text-page placeholder:text-dark/70 focus:outline-2 focus:outline-primary ${invalid ? 'outline-2 outline-red-400' : ''} ${className}`}
      {...props}
    />
  )
}
