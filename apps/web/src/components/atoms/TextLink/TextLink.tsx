import { Link, type LinkProps } from 'react-router'

type TextLinkVariant = 'muted' | 'primary'

type TextLinkProps = LinkProps & {
  variant?: TextLinkVariant
}

const variantClasses: Record<TextLinkVariant, string> = {
  muted: 'text-sm text-offwhite underline',
  primary: 'text-verde-destaque hover:underline',
}

export function TextLink({ variant = 'muted', className = '', ...props }: TextLinkProps) {
  return (
    <Link
      className={`inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-verde-destaque ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
