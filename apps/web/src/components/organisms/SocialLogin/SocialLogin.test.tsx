import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLogin } from './SocialLogin'

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
})
