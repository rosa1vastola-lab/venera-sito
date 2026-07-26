import { Mail, MapPin, Phone } from "lucide-react"
import { InstagramIcon } from "./instagram-icon"
import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-selva text-luna">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo className="h-12 w-auto items-start text-luna" />
          <p className="mt-5 max-w-xs text-pretty leading-relaxed text-luna/70">
            Extension ciglia e laminazione su misura. Ogni sguardo, una storia.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-star">
            Contatti
          </h3>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-luna/85">
            <li>
              <a
                href="mailto:venere.lashstudio@gmail.com"
                className="inline-flex items-center gap-3 transition-colors hover:text-star"
              >
                <Mail className="size-4 shrink-0 text-star" />
                venere.lashstudio@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+393714737323"
                className="inline-flex items-center gap-3 transition-colors hover:text-star"
              >
                <Phone className="size-4 shrink-0 text-star" />
                +39 371 473 7323
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/venerelashstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-star"
              >
                <InstagramIcon className="size-4 shrink-0 text-star" />
                @venerelashstudio
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-star">
            Aree servite
          </h3>
          <p className="mt-5 inline-flex items-start gap-3 text-sm leading-relaxed text-luna/85">
            <MapPin className="mt-0.5 size-4 shrink-0 text-star" />
            <span>
              Campania &amp; Marche
              <br />
              <span className="text-luna/60">Solo su appuntamento</span>
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-luna/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-luna/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Venere Lash Studio. Tutti i diritti riservati.</p>
          <nav className="flex gap-6">
            <a href="#footer" className="transition-colors hover:text-star">
              Privacy Policy
            </a>
            <a href="#footer" className="transition-colors hover:text-star">
              Termini
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
