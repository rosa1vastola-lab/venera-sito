import Image from "next/image"
import { LashMatchButton } from "./lash-match-button"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-notte"
    >
      {/* Background "video" — high-def lash detail with slow zoom */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-lashes.png"
          alt="Dettaglio in alta definizione di extension ciglia"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-notte/70 via-notte/40 to-notte/85" />
        <div className="absolute inset-0 bg-selva/25 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pb-16 pt-28 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.4em] text-star">
          Ogni sguardo, una storia
        </span>
        <h1 className="mt-6 text-balance font-serif text-5xl font-medium leading-[1.05] text-luna sm:text-6xl md:text-7xl">
          Svegliati già perfetta, ogni singolo giorno
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-luna/80">
          Extension ciglia e laminazione su misura che valorizzano il tuo sguardo
          naturale. Nessun mascara, nessuna fatica: solo occhi luminosi dal risveglio.
        </p>
        <div className="mt-10">
          <LashMatchButton />
        </div>
        <p className="mt-6 text-sm text-luna/60">
          Su appuntamento &middot; Campania &amp; Marche
        </p>
      </div>
    </section>
  )
}
