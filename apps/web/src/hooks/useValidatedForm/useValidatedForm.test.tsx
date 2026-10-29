import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useValidatedForm } from './useValidatedForm'

type Values = { name: string; email: string }

function NameForm({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const { errors, handleSubmit } = useValidatedForm<Values>({
    parse: (data) => ({ name: String(data.get('name') ?? ''), email: String(data.get('email') ?? '') }),
    // Valid fields map to undefined on purpose: only fields with a message may block the submit.
    validate: ({ name, email }) => ({
      name: name ? undefined : 'Informe seu nome',
      email: email ? undefined : 'Informe seu email',
    }),
    onSubmit,
  })

  return (
    <form noValidate onSubmit={handleSubmit}>
      <input aria-label="Nome" name="name" />
      {errors.name && <p>{errors.name}</p>}
      <input aria-label="Email" name="email" />
      {errors.email && <p>{errors.email}</p>}
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

  it('moves focus to the first invalid field', async () => {
    render(<NameForm onSubmit={vi.fn()} />)

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(screen.getByLabelText('Email')).toHaveFocus()
  })

  it('submits the parsed values and clears previous errors', async () => {
    const onSubmit = vi.fn()
    render(<NameForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    await userEvent.type(screen.getByLabelText('Nome'), 'Ana')
    await userEvent.type(screen.getByLabelText('Email'), 'ana@email.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Ana', email: 'ana@email.com' })
    expect(screen.queryByText('Informe seu nome')).not.toBeInTheDocument()
  })
})
