import { Divider } from '../../atoms/Divider/Divider'
import { SocialLoginButton } from '../../molecules/SocialLoginButton/SocialLoginButton'

export type SocialProvider = {
  name: string
  iconSrc: string
  iconWidth: number
  iconHeight: number
  onClick: () => void
}

type SocialLoginProps = {
  providers: SocialProvider[]
  text?: string
}

export function SocialLogin({ providers, text = 'ou entre com outras contas' }: SocialLoginProps) {
  return (
    <div className="flex flex-col gap-2">
      <Divider text={text} />
      <ul className="flex justify-center gap-6">
        {providers.map((provider) => (
          <li key={provider.name}>
            <SocialLoginButton
              iconSrc={provider.iconSrc}
              iconWidth={provider.iconWidth}
              iconHeight={provider.iconHeight}
              label={provider.name}
              onClick={provider.onClick}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
