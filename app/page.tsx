import { LashMatchProvider } from "@/components/lash-match"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { StylesCarousel } from "@/components/styles-carousel"
import { Lamination } from "@/components/lamination"
import { About } from "@/components/about"
import { Reviews } from "@/components/reviews"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <LashMatchProvider>
      <SiteHeader />
      <main>
        <Hero />
        <StylesCarousel />
        <Lamination />
        <About />
        <Reviews />
        <CtaBand />
      </main>
      <SiteFooter />
    </LashMatchProvider>
  )
}
