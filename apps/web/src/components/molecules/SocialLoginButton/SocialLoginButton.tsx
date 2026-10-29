type SocialLoginButtonProps = {
  iconSrc: string
  label: string
  onClick?: () => void
}

export function SocialLoginButton({ iconSrc, label, onClick }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center gap-1 text-xs text-offwhite hover:text-verde-destaque focus-visible:outline-2 focus-visible:outline-verde-destaque"
    >
      <img src={iconSrc} alt="" />
      {label}
    </button>
  )
}
