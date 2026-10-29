import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders with an accessible name', () => {
    render(<Logo />)

    expect(screen.getByRole('img', { name: 'Code Connect' })).toBeInTheDocument()
  })
})
