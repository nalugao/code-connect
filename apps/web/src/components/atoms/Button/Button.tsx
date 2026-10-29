import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-verde-destaque text-verde-petroleo hover:brightness-95',
}

export function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-lg font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-destaque disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
