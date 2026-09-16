'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const CASES = [
  { title: 'cases.villa.title', text: 'cases.villa.desc', image: '/images/levels/premium.webp', color: 'bg-amber' },
  { title: 'cases.apartment.title', text: 'cases.apartment.desc', image: '/images/levels/comfort.webp', color: 'bg-cyan' },
  { title: 'cases.old.title', text: 'cases.old.desc', image: '/images/levels/lux.webp', color: 'bg-lime' },
] as const

export function CaseInspirations() {
  const { t } = useI18n()

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-9">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.23em] text-primary">{t('cases.eyebrow')}</p>
            <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-balance">{t('cases.title')}</h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {CASES.map((item, index) => (
            <Reveal key={item.title} delay={index * 55} as="article">
              <div className="group h-full overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
                <div className="relative aspect-[4/2.8] overflow-hidden">
                  <Image src={item.image} alt={t(item.title)} fill sizes="(min-width: 768px) 33vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold">{t(item.title)}</h3>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color} text-white`}><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(item.text)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
