'use client'

import Image from 'next/image'
import { Camera } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const ITEMS = [
  {
    image: '/images/real-work/commercial-space.webp',
    title: 'real.item.commercial', source: 'real.photo',
    icon: Camera,
    className: 'md:col-span-6 md:row-span-2',
    position: 'object-center',
  },
  {
    image: '/images/real-work/floor-finish.webp',
    title: 'real.item.finish', source: 'real.photo',
    icon: Camera,
    className: 'md:col-span-6',
    position: 'object-center',
  },
  {
    image: '/images/real-work/corridor-work.webp',
    title: 'real.item.floor', source: 'real.photo',
    icon: Camera,
    className: 'md:col-span-6',
    position: 'object-center',
  },
] as const

export function RealWork() {
  const { t } = useI18n()
  return (
    <section id="objects" className="scroll-mt-24 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-9">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.23em] text-primary">{t('real.eyebrow')}</p>
            <h2 className="font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-balance">
              {t('real.title')}
            </h2>
          </div>
        </Reveal>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:h-[34rem] md:grid-cols-12 md:grid-rows-2 md:overflow-visible md:px-0">
          {ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.image} delay={index * 45} as="article" className={`min-w-[78vw] snap-center sm:min-w-[20rem] md:min-w-0 ${item.className}`}>
                <div className="group relative h-full min-h-[25rem] overflow-hidden rounded-[1.6rem] bg-secondary md:min-h-0">
                  <Image
                    src={item.image}
                    alt={t(item.title)}
                    fill
                    sizes="(min-width: 768px) 50vw, 78vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${item.position}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/68">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {t(item.source)}
                    </span>
                    <h3 className="mt-2 max-w-sm font-display text-xl font-bold leading-tight">{t(item.title)}</h3>
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
