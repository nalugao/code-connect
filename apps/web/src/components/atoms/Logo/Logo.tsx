type LogoProps = {
  className?: string
}

// Pieces exported from the Figma "Logo" component, positioned with its original offsets.
export function Logo({ className = '' }: LogoProps) {
  return (
    <div role="img" aria-label="Code Connect" className={`relative h-10 w-[127px] ${className}`}>
      <img src="/logo/symbol-bottom.svg" alt="" className="absolute top-[35.48%] left-0 h-[58.43%] w-[11.96%]" />
      <img src="/logo/symbol-top.svg" alt="" className="absolute top-[15.11%] left-[9.43%] h-[58.42%] w-[11.97%]" />
      <img src="/logo/wordmark.svg" alt="" className="absolute top-0 left-[26.88%] h-full w-[73.12%]" />
    </div>
  )
}
