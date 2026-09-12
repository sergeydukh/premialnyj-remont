import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { ServicesBento } from '@/components/services-bento'
import { BeforeAfter } from '@/components/before-after'
import { ProcessTimeline } from '@/components/process-timeline'
import { Portfolio } from '@/components/portfolio'
import { Transparency } from '@/components/transparency'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ServicesBento />
        <BeforeAfter />
        <ProcessTimeline />
        <Portfolio />
        <Transparency />
        <ContactFooter />
      </main>
    </>
  )
}
