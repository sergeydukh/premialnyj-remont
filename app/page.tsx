import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TrustFacts } from '@/components/trust-facts'
import { RenovationLevels } from '@/components/renovation-levels'
import { ServicesBento } from '@/components/services-bento'
import { ProcessTimeline } from '@/components/process-timeline'
import { CaseInspirations } from '@/components/case-inspirations'
import { RealWork } from '@/components/real-work'
import { Faq } from '@/components/faq'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustFacts />
        <RenovationLevels />
        <ServicesBento />
        <ProcessTimeline />
        <CaseInspirations />
        <RealWork />
        <Faq />
        <ContactFooter />
      </main>
    </>
  )
}
