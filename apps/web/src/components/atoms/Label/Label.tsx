import type { LabelHTMLAttributes } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className = '', ...props }: LabelProps) {
  return <label className={`text-lg text-offwhite ${className}`} {...props} />
}
