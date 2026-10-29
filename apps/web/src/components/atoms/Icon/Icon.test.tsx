import { render } from '@testing-library/react'
import { Icon } from './Icon'

describe('Icon', () => {
  it.each(['arrow-right', 'clipboard', 'login'] as const)('renders the %s icon hidden from assistive tech', (name) => {
    const { container } = render(<Icon name={name} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('data-icon', name)
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
