import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLoginButton } from './SocialLoginButton'

describe('SocialLoginButton', () => {
  it('calls onClick when the provider is chosen', async () => {
    const onClick = vi.fn()
    render(<SocialLoginButton iconSrc="/Github.png" label="Github" onClick={onClick} />)

    await userEvent.click(screen.getByRole('button', { name: 'Github' }))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
