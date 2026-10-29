import type { ComponentProps } from 'react'
import { Icon } from '../../atoms/Icon/Icon'
import { TextLink } from '../../atoms/TextLink/TextLink'

type AuthRedirectLayout = 'stacked' | 'inline'

type AuthRedirectProps = {
  question: string
  linkText: string
  to: string
  icon?: ComponentProps<typeof Icon>['name']
  layout?: AuthRedirectLayout
}

const layoutClasses: Record<AuthRedirectLayout, { wrapper: string; question: string }> = {
  stacked: { wrapper: 'flex-col items-center', question: 'text-sm' },
  // Wraps instead of overflowing narrow cards or enlarged text (WCAG 1.4.4 / 1.4.10).
  inline: { wrapper: 'flex-wrap items-center justify-center', question: 'text-lg' },
}

export function AuthRedirect({ question, linkText, to, icon, layout = 'stacked' }: AuthRedirectProps) {
  const classes = layoutClasses[layout]

  return (
    <div className={`flex gap-2 ${classes.wrapper}`}>
      <p className={`text-offwhite ${classes.question}`}>{question}</p>
      <TextLink to={to} variant="primary" className="gap-3 text-lg">
        {linkText}
        {icon && <Icon name={icon} className="size-6" />}
      </TextLink>
    </div>
  )
}
