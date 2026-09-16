'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Plus, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const LEVELS = [
  {
    name: 'levels.economy.name', tagline: 'levels.economy.tag', description: 'levels.economy.desc',
    features: ['levels.features.standardMaterials', 'levels.features.basicEngineering', 'levels.features.simpleLight'],
    image: '/images/levels/economy.webp',
    color: 'bg-amber',
    surface: 'bg-amber/12',
    works: ['levels.economy.work.1', 'levels.economy.work.2', 'levels.economy.work.3', 'levels.economy.work.4'],
    examples: ['levels.economy.example.1', 'levels.economy.example.2', 'levels.economy.example.3'],
  },
  {
    name: 'levels.comfort.name', tagline: 'levels.comfort.tag', description: 'levels.comfort.desc',
    features: ['levels.features.betterFinish', 'levels.features.lightScenes', 'levels.features.storage'],
    image: '/images/levels/comfort.webp',
    color: 'bg-lime',
    surface: 'bg-lime/10',
    works: ['levels.comfort.work.1', 'levels.comfort.work.2', 'levels.comfort.work.3', 'levels.comfort.work.4'],
    examples: ['levels.comfort.example.1', 'levels.comfort.example.2', 'levels.comfort.example.3'],
  },
  {
    name: 'levels.lux.name', tagline: 'levels.lux.tag', description: 'levels.lux.desc',
    features: ['levels.features.natural', 'levels.features.customFurniture', 'levels.features.climate'],
    image: '/images/levels/lux.webp',
    color: 'bg-cyan',
    surface: 'bg-cyan/9',
    works: ['levels.lux.work.1', 'levels.lux.work.2', 'levels.lux.work.3', 'levels.lux.work.4'],
    examples: ['levels.lux.example.1', 'levels.lux.example.2', 'levels.lux.example.3'],
  },
  {
    name: 'levels.premium.name', tagline: 'levels.premium.tag', description: 'levels.premium.desc',
    features: ['levels.features.customProject', 'levels.features.complex', 'levels.features.complete'],
    image: '/images/levels/premium.webp',
    color: 'bg-primary',
    surface: 'bg-primary/8',
    works: ['levels.premium.work.1', 'levels.premium.work.2', 'levels.premium.work.3', 'levels.premium.work.4'],
    examples: ['levels.premium.example.1', 'levels.premium.example.2', 'levels.premium.example.3'],
  },
] as const

export function RenovationLevels() {
  const { t } = useI18n()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const selected = selectedIndex === null ? null : LEVELS[selectedIndex]

  const openLevel = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setSelectedIndex(index)
  }

  const closeLevel = () => {
    setSelectedIndex(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (selectedIndex === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLevel()
    }
    window.addEventListener('keydown', onKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedIndex])

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
              <article className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border text-left ${level.surface} shadow-[0_18px_50px_-38px] shadow-foreground/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35`}>
                <button
                  type="button"
                  onClick={() => openLevel(index)}
                  aria-haspopup="dialog"
                  aria-label={`${t('levels.open')}: ${t(level.name)}`}
                  className="absolute inset-0 z-10 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                />
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
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    {t('levels.open')} <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLevel()
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="level-dialog-title"
              className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-card shadow-2xl sm:rounded-[2rem]"
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLevel}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t('levels.close')}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                <div className="relative min-h-[16rem] overflow-hidden lg:min-h-[38rem] lg:rounded-l-[2rem]">
                  <Image src={selected.image} alt={t(selected.name)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">{t(selected.tagline)}</p>
                    <h3 id="level-dialog-title" className="mt-2 font-display text-4xl font-bold">{t(selected.name)}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{t(selected.description)}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t('levels.scope')}</p>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {selected.works.map((work) => (
                        <li key={work} className="flex gap-3 rounded-2xl border border-border bg-background/60 p-4 text-sm font-semibold leading-snug">
                          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selected.color} text-white`}>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          {t(work)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-border pt-7">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t('levels.tasks')}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selected.examples.map((example) => (
                        <span key={example} className="rounded-full border border-border bg-secondary/55 px-4 py-2 text-xs font-semibold">{t(example)}</span>
                      ))}
                    </div>
                  </div>

                  <a href="/calculator" className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                    {t('hero.cta')} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
