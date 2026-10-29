import type { ReactNode } from 'react'
import { ChainShape } from '../../atoms/ChainShape/ChainShape'

type AuthTemplateProps = {
  bannerSrc: string
  bannerAlt: string
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthTemplate({ bannerSrc, bannerAlt, title, subtitle, children }: AuthTemplateProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page px-4 py-10">
      <ChainShape className="absolute -top-6 left-20 w-64 max-md:hidden" />
      <ChainShape className="absolute right-20 -bottom-6 w-64 max-md:hidden" />

      <div className="relative flex w-full max-w-[40rem] gap-10 rounded-3xl bg-card p-6 md:p-12">
        <img src={bannerSrc} alt={bannerAlt} className="hidden h-auto w-60 shrink-0 self-center md:block" />
        <section className="flex flex-1 flex-col gap-6">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-offwhite">{title}</h1>
            <p className="text-offwhite">{subtitle}</p>
          </header>
          {children}
        </section>
      </div>
    </main>
  )
}
