import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('exposes its text to assistive tech instead of hiding it in a separator', () => {
    render(<Divider text="ou entre com outras contas" />)

    expect(screen.getByText('ou entre com outras contas')).toBeVisible()
    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
  })

  it('renders a plain separator without text', () => {
    render(<Divider />)

    expect(screen.getByRole('separator')).toHaveTextContent('')
  })
})
