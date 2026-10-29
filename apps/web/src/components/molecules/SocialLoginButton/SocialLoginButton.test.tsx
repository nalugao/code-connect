import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLoginButton } from './SocialLoginButton'
import { wcagViolations } from '../../../test/axe'

describe('SocialLoginButton', () => {
  it('calls onClick when the provider is chosen', async () => {
    const onClick = vi.fn()
    const { container } = render(<SocialLoginButton iconSrc="/Github.png" iconWidth={33} iconHeight={32} label="Github" onClick={onClick} />)

    await userEvent.click(screen.getByRole('button', { name: 'Github' }))

    expect(onClick).toHaveBeenCalledOnce()
    expect(container.querySelector('img')).toHaveAttribute('width', '33')
  })

  it('has no WCAG 2.2 AA violations', async () => {
    render(<SocialLoginButton iconSrc="/Github.png" iconWidth={33} iconHeight={32} label="Github" onClick={vi.fn()} />)

    expect(await wcagViolations()).toEqual([])
  })
})
