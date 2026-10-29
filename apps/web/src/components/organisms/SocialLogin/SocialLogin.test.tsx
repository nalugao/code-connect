import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLogin } from './SocialLogin'
import { wcagViolations } from '../../../test/axe'

describe('SocialLogin', () => {
  it('renders one button per provider and triggers the chosen one', async () => {
    const onGithub = vi.fn()
    render(
      <SocialLogin
        providers={[
          { name: 'Github', iconSrc: '/Github.png', onClick: onGithub },
          { name: 'Gmail', iconSrc: '/Google.png', onClick: vi.fn() },
        ]}
      />,
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)

    await userEvent.click(screen.getByRole('button', { name: 'Github' }))

    expect(onGithub).toHaveBeenCalledOnce()
  })

  it('has no WCAG 2.2 AA violations', async () => {
    render(
      <SocialLogin
        providers={[
          { name: 'Github', iconSrc: '/Github.png', onClick: vi.fn() },
          { name: 'Gmail', iconSrc: '/Google.png', onClick: vi.fn() },
        ]}
      />,
    )

    expect(await wcagViolations()).toEqual([])
  })
})
