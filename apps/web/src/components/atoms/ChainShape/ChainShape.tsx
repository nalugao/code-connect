type ChainShapeProps = {
  className?: string
}

// Two interlocked rounded links, echoing the Code Connect logo.
export function ChainShape({ className = '' }: ChainShapeProps) {
  return (
    <svg
      data-testid="chain-shape"
      aria-hidden="true"
      viewBox="0 0 260 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="40"
      className={`pointer-events-none text-verde-petroleo ${className}`}
    >
      <rect x="20" y="80" width="120" height="200" rx="60" />
      <rect x="120" y="20" width="120" height="200" rx="60" />
    </svg>
  )
}
