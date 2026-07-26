"use client"

import Image from "next/image"
import { LashMatchButton } from "./lash-match-button"

const styles = [
  {
    src: "/images/style-one-to-one.png?v=3",
    name: "One to One",
    caption: "Effetto naturale, una ciglia per ogni ciglia",
    client: "Martina R.",
  },
  {
    src: "/images/style-2d-v4.jpg",
    name: "Volume 2D",
    caption: "Un pieno delicato e luminoso",
    client: "Giulia B.",
  },
  {
    src: "/images/style-wispy.png?v=3",
    name: "Wispy",
    caption: "Texture mista, sguardo definito",
    client: "Sofia M.",
  },
  {
    src: "/images/style-volume.png?v=3",
    name: "Volume 8D",
    caption: "Massima intensità, glamour puro",
    client: "Chiara L.",
  },
]

// Duplicated list to allow a seamless infinite marquee loop.
const track = [...styles, ...styles]

export function StylesCarousel() {
  return (
    <section id="stili" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          I miei stili
        </span>
        <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-secondary-foreground sm:text-5xl">
              Specializzata in One to One, Volume 2D&ndash;8D e laminazione ciglia
        </h2>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          Ogni sguardo è unico: scorri le foto e scopri lo stile.
          <span className="hidden md:inline">
            {" "}
            Passa il mouse sulle immagini per i dettagli.
          </span>{" "}
          Non sai quale fa per te? Il{" "}
          <strong className="font-semibold text-secondary-foreground">Lash Match è gratuito</strong>{" "}
          &mdash; inviami una tua foto e ti dirò l&apos;effetto perfetto per i tuoi occhi.
        </p>
      </div>

      {/* Auto-scrolling marquee — pauses on hover of the whole row */}
      <div className="group relative mt-14 overflow-hidden">
        {/* soft fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-secondary to-transparent" />

        <ul className="flex w-max animate-marquee gap-5 px-5 group-hover:[animation-play-state:paused]">
          {track.map((style, i) => (
            <li key={i} className="shrink-0">
              <figure className="group/card relative h-96 w-64 overflow-hidden rounded-[1.75rem] ring-1 ring-border sm:h-[28rem] sm:w-72">
                <Image
                  src={style.src || "/placeholder.svg"}
                  alt={`Extension ciglia stile ${style.name} — ${style.client}`}
                  fill
                  sizes="(max-width: 640px) 16rem, 18rem"
                  className="object-cover transition-transform duration-700 ease-out md:group-hover/card:scale-110"
                />

                {/* Soft gradient: always on, so the client name stays readable */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-notte/75 to-transparent" />

                {/* Full overlay: always open on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-notte/85 via-notte/20 to-transparent opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover/card:opacity-100" />

                {/* Client name — desktop only (mobile already shows the exploded caption) */}
                <p className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden p-5 text-left transition-opacity duration-500 md:block md:group-hover/card:opacity-0">
                  <span className="font-serif text-2xl font-medium text-luna">
                    {style.client}
                  </span>
                </p>

                {/* Style details: always on mobile, on hover desktop */}
                <figcaption className="absolute inset-x-0 bottom-0 z-[3] translate-y-0 p-5 text-left opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100">
                  <p className="font-serif text-xl font-medium text-luna sm:text-2xl">
                    {style.client}
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-star">
                    {style.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-luna/80">{style.caption}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-14 flex max-w-xl flex-col items-center px-6 text-center">
        <p className="text-pretty font-serif text-2xl leading-snug text-secondary-foreground">
          Scopri il tuo stile ideale con una consulenza gratuita e senza impegno.
        </p>
        <div className="mt-8">
          <LashMatchButton />
        </div>
      </div>
    </section>
  )
}
