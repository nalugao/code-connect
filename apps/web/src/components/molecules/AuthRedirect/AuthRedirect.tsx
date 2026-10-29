import type { ComponentProps } from 'react'
import { Icon } from '../../atoms/Icon/Icon'
import { TextLink } from '../../atoms/TextLink/TextLink'

type AuthRedirectProps = {
  question: string
  linkText: string
  to: string
  icon?: ComponentProps<typeof Icon>['name']
}

export function AuthRedirect({ question, linkText, to, icon }: AuthRedirectProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-offwhite">{question}</p>
      <TextLink to={to} variant="primary">
        {linkText}
        {icon && <Icon name={icon} />}
      </TextLink>
    </div>
  )
}
