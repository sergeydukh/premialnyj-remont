import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { Calculator } from '@/components/calculator'
import { CALCULATOR_METADATA } from '@/lib/locale'
import { getRequestLocale } from '@/lib/request-locale'

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLocale()
  return CALCULATOR_METADATA[locale]
}

export default function CalculatorPage() {
  return (
    <>
      <SiteHeader />
      <Calculator />
    </>
  )
}
