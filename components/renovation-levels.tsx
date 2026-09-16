'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const LEVELS = [
  {
    name: 'levels.economy.name', tagline: 'levels.economy.tag', description: 'levels.economy.desc',
    features: ['levels.features.standardMaterials', 'levels.features.basicEngineering', 'levels.features.simpleLight'],
    image: '/images/levels/economy.webp',
    color: 'bg-amber',
    surface: 'bg-amber/12',
  },
  {
    name: 'levels.comfort.name', tagline: 'levels.comfort.tag', description: 'levels.comfort.desc',
    features: ['levels.features.betterFinish', 'levels.features.lightScenes', 'levels.features.storage'],
    image: '/images/levels/comfort.webp',
    color: 'bg-lime',
    surface: 'bg-lime/10',
  },
  {
    name: 'levels.lux.name', tagline: 'levels.lux.tag', description: 'levels.lux.desc',
    features: ['levels.features.natural', 'levels.features.customFurniture', 'levels.features.climate'],
    image: '/images/levels/lux.webp',
    color: 'bg-cyan',
    surface: 'bg-cyan/9',
  },
  {
    name: 'levels.premium.name', tagline: 'levels.premium.tag', description: 'levels.premium.desc',
    features: ['levels.features.customProject', 'levels.features.complex', 'levels.features.complete'],
    image: '/images/levels/premium.webp',
    color: 'bg-primary',
    surface: 'bg-primary/8',
  },
] as const

export function RenovationLevels() {
  const { t } = useI18n()
  return (
    <section id="levels" className="relative scroll-mt-24 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-9">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.23em] text-primary">{t('levels.eyebrow')}</p>
            <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-balance">
              {t('levels.title')}
            </h2>
          </div>
        </Reveal>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
          {LEVELS.map((level, index) => (
            <Reveal key={level.name} delay={index * 55} className="min-w-[82vw] snap-center sm:min-w-[21rem] md:min-w-0">
              <article className={`group h-full overflow-hidden rounded-[1.75rem] border border-border ${level.surface} shadow-[0_18px_50px_-38px] shadow-foreground/30`}>
                <div className="relative aspect-[4/2.65] overflow-hidden">
                  <Image
                    src={level.image}
                    alt={`${t('levels.visual')}: ${t(level.name)}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 82vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-semibold text-white/90">{t('levels.visual')}</span>
                  <span className={`absolute right-4 top-4 h-3 w-3 rounded-full ${level.color} ring-4 ring-white/70`} />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{t(level.tagline)}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{t(level.name)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(level.description)}</p>
                  <ul className="mt-5 space-y-2" aria-label={t(level.name)}>
                    {level.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs font-semibold">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${level.color} text-white`}>
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {t(feature)}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
