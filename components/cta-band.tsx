import Image from "next/image"
import { LashMatchButton } from "./lash-match-button"

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-notte py-24 text-center">
      <Image
        src="/images/studio-detail.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-notte/60" />
      <div className="relative z-10 mx-auto max-w-xl px-6">
        <h2 className="text-balance font-serif text-4xl leading-tight text-luna sm:text-5xl">
          Pronta a scoprire il tuo effetto?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-luna/75">
          Fai il tuo Lash Match: carica una foto e ricevi il consiglio su misura per il tuo
          sguardo, direttamente da Venera.
        </p>
        <div className="mt-9">
          <LashMatchButton />
        </div>
      </div>
    </section>
  )
}
