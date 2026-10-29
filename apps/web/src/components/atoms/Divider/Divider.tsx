type DividerProps = {
  text?: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div role="separator" className="flex items-center gap-4 text-sm text-offwhite">
      <span className="h-px flex-1 bg-offwhite" />
      {text && (
        <>
          <span>{text}</span>
          <span className="h-px flex-1 bg-offwhite" />
        </>
      )}
    </div>
  )
}
