import { Logo } from "./logo"

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-6">
        <a href="#top" aria-label="Venere Lash — home">
          <Logo className="h-10 w-auto text-luna" />
        </a>
      </div>
    </header>
  )
}
