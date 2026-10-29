import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders a separator with its text', () => {
    render(<Divider text="ou entre com outras contas" />)

    expect(screen.getByRole('separator')).toHaveTextContent('ou entre com outras contas')
  })

  it('renders a plain separator without text', () => {
    render(<Divider />)

    expect(screen.getByRole('separator')).toHaveTextContent('')
  })
})
