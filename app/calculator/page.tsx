import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { Calculator } from '@/components/calculator'

export const metadata: Metadata = {
  title: 'Расчёт стоимости ремонта — Adelfia Flow',
  description: 'Пошаговый предварительный расчёт стоимости ремонта ванной, кухни или всего объекта в Валенсии.',
}

export default function CalculatorPage() {
  return (
    <>
      <SiteHeader />
      <Calculator />
    </>
  )
}
