'use client'

import { Boxes, DraftingCompass, Hammer } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const SERVICES = [
  {
    title: 'services.renovation.title', text: 'services.renovation.desc',
    tags: ['hero.apartments', 'hero.houses', 'hero.commercial'],
    icon: Hammer,
    style: 'bg-primary text-white',
  },
  {
    title: 'services.design.title', text: 'services.design.desc',
    tags: ['services.tags.project', 'services.tags.drawings', 'services.tags.engineering'],
    icon: DraftingCompass,
    style: 'bg-cyan text-white',
  },
  {
    title: 'services.supply.title', text: 'services.supply.desc',
    tags: ['services.tags.selection', 'services.tags.purchase', 'services.tags.delivery'],
    icon: Boxes,
    style: 'bg-lime text-white',
  },
] as const

export function ServicesBento() {
  const { t } = useI18n()
  return (
    <section id="services" className="relative scroll-mt-24 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-9 max-w-3xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.23em] text-primary">{t('services.eyebrow')}</p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-balance">
            {t('services.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t('services.note')}
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 60} as="article">
                <div className={`flex h-full min-h-[20rem] flex-col rounded-[1.75rem] p-6 shadow-[0_24px_60px_-40px] shadow-foreground/40 md:p-7 ${service.style}`}>
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/16">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-white/65">/ 0{index + 1}</span>
                  </div>
                  <div className="mt-auto pt-10">
                    <h3 className="font-display text-2xl font-bold">{t(service.title)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/78">{t(service.text)}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={t(service.title)}>
                      {service.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold">
                          {t(tag)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
