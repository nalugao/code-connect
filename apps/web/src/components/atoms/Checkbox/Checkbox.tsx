import type { InputHTMLAttributes } from 'react'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer items-center gap-2 text-sm text-input ${className}`}>
      <span className="relative flex size-4">
        <input
          type="checkbox"
          className="peer size-4 cursor-pointer appearance-none rounded-sm border border-primary focus-visible:outline-2 focus-visible:outline-primary"
          {...props}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute inset-0 hidden text-primary peer-checked:block"
        >
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
      {label}
    </label>
  )
}
