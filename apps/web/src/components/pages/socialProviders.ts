import type { SocialProvider } from '../organisms/SocialLogin/SocialLogin'

// TODO: integrate with the API once authentication endpoints exist.
export const socialProviders: SocialProvider[] = [
  { name: 'Github', iconSrc: '/Github.png', iconWidth: 33, iconHeight: 32, onClick: () => console.log('login with github') },
  { name: 'Gmail', iconSrc: '/Google.png', iconWidth: 28, iconHeight: 28, onClick: () => console.log('login with google') },
]
