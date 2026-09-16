'use client'

import Image from 'next/image'
import { ArrowRight, Building2, Home, MapPin, Store } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const OBJECT_TYPES = [
  { label: 'hero.apartments', icon: Building2 },
  { label: 'hero.houses', icon: Home },
  { label: 'hero.commercial', icon: Store },
] as const

export function Hero() {
  const { t } = useI18n()
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-14 pt-28 md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-45" />
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-amber/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-cyan/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/80 px-3.5 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {t('hero.location')}
          </div>

          <h1 className="font-display text-[clamp(3rem,7.2vw,6.7rem)] font-bold leading-[0.88] tracking-[-0.055em] text-balance">
            {t('hero.title.before')}{' '}
            <span className="relative inline-block text-primary">
              {t('hero.title.accent')}
              <span className="absolute -bottom-1 left-0 -z-10 h-2 w-full -rotate-1 rounded-full bg-amber/65" />
            </span>{' '}
            {t('hero.title.after')}
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t('hero.subtitle')}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5" aria-label={t('hero.subtitle')}>
            {OBJECT_TYPES.map((item, index) => {
              const Icon = item.icon
              const colors = [
                'border-cyan/25 bg-cyan/10 text-cyan',
                'border-lime/25 bg-lime/10 text-lime',
                'border-amber/35 bg-amber/15 text-foreground',
              ]
              return (
                <span key={item.label} className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold ${colors[index]}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {t(item.label)}
                </span>
              )
            })}
          </div>

          <a
            href="/calculator"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-[0_16px_40px_-18px] shadow-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            {t('hero.cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[38rem] lg:max-w-none">
          <div className="relative aspect-[4/4.25] overflow-hidden rounded-[2.25rem] border-[6px] border-card bg-secondary shadow-[0_30px_90px_-35px] shadow-cyan/40">
            <Image
              src="/images/levels/premium.webp"
              alt={t('hero.imageAlt')}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full border border-white/35 bg-white/85 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md">
              {t('common.visualReference')}
            </span>
          </div>
          <div className="absolute -bottom-5 -left-4 rounded-2xl bg-cyan px-5 py-4 text-white shadow-xl md:-left-8">
            <p className="font-display text-2xl font-bold">{t('hero.turnkey')}</p>
            <p className="mt-0.5 text-xs text-white/80">{t('hero.oneTeam')}</p>
          </div>
          <div className="absolute -right-3 -top-5 h-24 w-24 rounded-[2rem] bg-amber shadow-lg md:-right-6" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
