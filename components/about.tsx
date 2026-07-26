import Image from "next/image"
import { InstagramIcon } from "./instagram-icon"

export function About() {
  return (
    <section id="chi-e-venera" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/venera-portrait.png?v=3"
              alt="Venera, Lash Maker freelance nel suo studio"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Chi è Venera
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-primary sm:text-5xl">
            La cura del dettaglio, al servizio del tuo sguardo
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            Sono una Lash Maker freelance e per me ogni ciglia conta. Lavoro con tecniche{" "}
            <strong className="font-semibold text-foreground">One-to-One</strong>,{" "}
            <strong className="font-semibold text-foreground">Volume 2D-8D</strong> e{" "}
            <strong className="font-semibold text-foreground">laminazione ciglia</strong>,
            scegliendo con te l&apos;effetto più adatto alla forma dei tuoi occhi e al tuo
            stile di vita.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            La salute delle tue ciglia naturali viene sempre prima di tutto: materiali
            professionali, applicazione precisa e un ambiente rilassante, così ti alzi dal
            lettino con uno sguardo curato e leggerissimo.
          </p>

          <a
            href="https://instagram.com/venerelashstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <InstagramIcon className="size-4" />
            Scrivimi su Instagram!
          </a>
        </div>
      </div>
    </section>
  )
}
