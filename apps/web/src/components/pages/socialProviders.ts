import type { SocialProvider } from '../organisms/SocialLogin/SocialLogin'

// TODO: integrate with the API once authentication endpoints exist.
export const socialProviders: SocialProvider[] = [
  { name: 'Github', iconSrc: '/Github.png', onClick: () => console.log('login with github') },
  { name: 'Gmail', iconSrc: '/Google.png', onClick: () => console.log('login with google') },
]
