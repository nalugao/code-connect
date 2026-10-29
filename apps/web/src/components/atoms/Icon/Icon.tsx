type IconName = 'arrow-right' | 'clipboard'

type IconProps = {
  name: IconName
  className?: string
}

const paths: Record<IconName, string> = {
  'arrow-right': 'M4 12h14m-5-5 5 5-5 5',
  clipboard: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M8 11h8M8 15h8',
}

export function Icon({ name, className = 'size-4' }: IconProps) {
  return (
    <svg
      data-icon={name}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  )
}
