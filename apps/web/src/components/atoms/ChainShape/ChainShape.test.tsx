import { render, screen } from '@testing-library/react'
import { ChainShape } from './ChainShape'

describe('ChainShape', () => {
  it('renders as a decorative element', () => {
    render(<ChainShape className="absolute" />)
    const shape = screen.getByTestId('chain-shape')

    expect(shape).toHaveAttribute('aria-hidden', 'true')
    expect(shape).toHaveClass('absolute')
  })
})
