type SocialLoginButtonProps = {
  iconSrc: string
  /** Rendered icon size in px; also lets the browser reserve the space before the image loads. */
  iconWidth: number
  iconHeight: number
  label: string
  onClick?: () => void
}

export function SocialLoginButton({ iconSrc, iconWidth, iconHeight, label, onClick }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center gap-1 text-xs text-offwhite hover:text-verde-destaque focus-visible:outline-2 focus-visible:outline-verde-destaque"
    >
      <img src={iconSrc} alt="" width={iconWidth} height={iconHeight} />
      {label}
    </button>
  )
}
