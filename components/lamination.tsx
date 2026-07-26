import Image from "next/image"
import { LashMatchButton } from "./lash-match-button"

export function Lamination() {
  return (
    <section id="laminazione" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Two overlapping photos */}
          <div className="relative mx-auto w-full max-w-sm pb-10 md:max-w-none md:pb-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-border">
              <Image
                src="/images/lamination-1.png?v=3"
                alt="Ciglia naturali dopo il trattamento di laminazione"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 aspect-square w-28 overflow-hidden rounded-[1.25rem] ring-4 ring-background sm:-bottom-8 sm:-right-4 sm:w-40 sm:rounded-[1.5rem] lg:w-48">
              <Image
                src="/images/lamination-2.png?v=3"
                alt="Trattamento di laminazione ciglia in corso"
                fill
                sizes="(max-width: 640px) 7rem, 12rem"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Novità in studio
            </span>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-primary sm:text-5xl">
              Ciglia naturali, effetto wow — senza extension
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Vuoi valorizzare le tue ciglia senza applicare extension? La{" "}
              <strong className="font-semibold text-foreground">laminazione ciglia</strong>{" "}
              solleva, curva e nutre le tue ciglia naturali, per uno sguardo aperto e
              luminoso che dura settimane. Zero mascara, effetto assolutamente naturale.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              {[
                "Effetto lifting naturale che dura fino a 6-8 settimane",
                "Trattamento nutriente che rispetta le tue ciglia",
                "Perfetta da sola o in alternativa alle extension",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-pretty leading-relaxed text-muted-foreground">
              Non sai se scegliere extension o laminazione? Il{" "}
              <strong className="font-semibold text-foreground">Lash Match è gratuito</strong>{" "}
              &mdash; inviami una tua foto e ti consiglio il trattamento perfetto per te.
            </p>

            <div className="mt-8">
              <LashMatchButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
