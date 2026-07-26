"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const reviews = [
  {
    name: "Martina R.",
    text: "Risultato pazzesco e super naturale! Nessuno crede che siano extension. Venera è precisissima e mi ha messa subito a mio agio.",
  },
  {
    name: "Giulia P.",
    text: "Dopo tre settimane sono ancora perfette. La durata è incredibile e le mie ciglia naturali stanno benissimo. Professionale e dolcissima.",
  },
  {
    name: "Sara D.",
    text: "Mi ha consigliato l'effetto giusto per i miei occhi ed è stato amore al primo sguardo. Mi sveglio già truccata, non torno più indietro!",
  },
  {
    name: "Federica M.",
    text: "Ambiente rilassante, cura maniacale del dettaglio e mani leggerissime. Un momento tutto per me che aspetto ogni volta con gioia.",
  },
]

export function Reviews() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  const review = reviews[index]

  return (
    <section id="recensioni" className="bg-primary py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-star">
          Le parole delle mie clienti
        </span>
        <h2 className="mt-4 text-balance font-serif text-4xl leading-tight sm:text-5xl">
          Sguardi che raccontano una storia
        </h2>

        <div className="relative mt-12">
          <div
            className="rounded-[2rem] bg-luna/5 px-6 py-10 ring-1 ring-luna/10 sm:px-12"
            aria-live="polite"
          >
            <div className="flex justify-center gap-1 text-star">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 text-pretty font-serif text-2xl leading-snug text-luna sm:text-3xl">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-luna/70">
              {review.name}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Recensione precedente"
              className="flex size-11 items-center justify-center rounded-full border border-luna/25 text-luna transition-colors hover:bg-luna/10"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Vai alla recensione ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-star" : "w-2 bg-luna/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Recensione successiva"
              className="flex size-11 items-center justify-center rounded-full border border-luna/25 text-luna transition-colors hover:bg-luna/10"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
