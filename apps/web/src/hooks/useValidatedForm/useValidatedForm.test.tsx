import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useValidatedForm } from './useValidatedForm'

type Values = { name: string }

function NameForm({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const { errors, handleSubmit } = useValidatedForm<Values>({
    parse: (data) => ({ name: String(data.get('name') ?? '') }),
    validate: ({ name }) => (name ? {} : { name: 'Informe seu nome' }),
    onSubmit,
  })

  return (
    <form noValidate onSubmit={handleSubmit}>
      <input aria-label="Nome" name="name" />
      {errors.name && <p>{errors.name}</p>}
      <button type="submit">Enviar</button>
    </form>
  )
}

describe('useValidatedForm', () => {
  it('shows errors and does not submit invalid values', async () => {
    const onSubmit = vi.fn()
    render(<NameForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(screen.getByText('Informe seu nome')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the parsed values and clears previous errors', async () => {
    const onSubmit = vi.fn()
    render(<NameForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    await userEvent.type(screen.getByLabelText('Nome'), 'Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Ana' })
    expect(screen.queryByText('Informe seu nome')).not.toBeInTheDocument()
  })
})
