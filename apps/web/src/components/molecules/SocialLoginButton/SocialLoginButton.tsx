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
      className="flex cursor-pointer flex-col items-center gap-1 text-xs text-offwhite hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
    >
      <img src={iconSrc} alt="" className="size-6" />
      {label}
    </button>
  )
}
