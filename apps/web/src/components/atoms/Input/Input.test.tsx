import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('updates its value as the user types', async () => {
    render(<Input aria-label="Email" />)
    const input = screen.getByRole('textbox', { name: 'Email' })

    await userEvent.type(input, 'usuario123')

    expect(input).toHaveValue('usuario123')
  })

  it('marks itself as invalid', () => {
    render(<Input aria-label="Email" invalid />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInvalid()
  })
})
