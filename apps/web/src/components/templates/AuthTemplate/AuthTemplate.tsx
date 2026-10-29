import type { ReactNode } from 'react'
import { ChainShape } from '../../atoms/ChainShape/ChainShape'
import { Logo } from '../../atoms/Logo/Logo'

type AuthTemplateProps = {
  bannerSrc: string
  bannerAlt: string
  /**
   * Intrinsic size of the banner file. The container sets the rendered size (the image fills it),
   * so these only declare the file's dimensions to the browser and audits like Lighthouse.
   */
  bannerWidth?: number
  bannerHeight?: number
  /** Tailwind `object-[x_y]` class that frames the banner photo. */
  bannerPosition?: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthTemplate({
  bannerSrc,
  bannerAlt,
  bannerWidth,
  bannerHeight,
  bannerPosition = 'object-center',
  title,
  subtitle,
  children,
  footer,
}: AuthTemplateProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-grafite px-4 py-10">
      <title>{`${title} | Code Connect`}</title>
      {/* Only the decoration is clipped, so real content that overflows still scrolls (WCAG 1.4.10). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ChainShape className="absolute -top-2 left-[142px] w-[407px] opacity-30 max-lg:hidden" />
        <ChainShape className="absolute right-[142px] bottom-0 w-[407px] opacity-30 max-lg:hidden" />
      </div>

      <div className="relative flex w-full max-w-[996px] items-center justify-between rounded-[32px] border border-grafite bg-cinza-escuro px-6 py-10 md:px-[78px] md:py-14">
        <div className="relative hidden w-[407px] shrink-0 self-stretch overflow-hidden lg:block">
          <img
            src={bannerSrc}
            alt={bannerAlt}
            width={bannerWidth}
            height={bannerHeight}
            className={`absolute inset-0 size-full object-cover ${bannerPosition}`}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Logo />
          </div>
        </div>
        <section className="mx-auto flex w-full max-w-[410px] flex-col gap-6 md:px-8 lg:mx-0">
          <div className="flex flex-col gap-8">
            <header className="flex flex-col gap-6">
              <h1 className="text-3xl font-semibold text-offwhite">{title}</h1>
              <p className="text-xl text-offwhite">{subtitle}</p>
            </header>
            {children}
          </div>
          {footer}
        </section>
      </div>
    </main>
  )
}
