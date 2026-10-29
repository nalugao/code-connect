type DividerProps = {
  text?: string
}

// role="separator" makes its children presentational, so a labelled divider keeps its text
// outside the separator and draws the lines as decoration; screen readers then read the text.
export function Divider({ text }: DividerProps) {
  if (!text) return <div role="separator" className="h-px bg-offwhite" />

  return (
    <div className="flex items-center gap-4 text-sm text-offwhite">
      <span aria-hidden="true" className="h-px flex-1 bg-offwhite" />
      <span>{text}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-offwhite" />
    </div>
  )
}
