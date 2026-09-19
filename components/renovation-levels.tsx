'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Plus, X } from 'lucide-react'
import { LevelGallery } from '@/components/level-gallery'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const LEVELS = [
  {
    name: 'levels.economy.name', tagline: 'levels.economy.tag', description: 'levels.economy.desc',
    features: ['levels.features.standardMaterials', 'levels.features.basicEngineering', 'levels.features.simpleLight'],
    images: [
      '/images/levels/real/economy-1.webp',
      '/images/levels/real/economy-2.webp',
      '/images/levels/real/economy-3.webp',
    ],
    realProject: true,
    color: 'bg-amber', surface: 'bg-amber/12', darkCard: false,
    works: ['levels.economy.work.1', 'levels.economy.work.2', 'levels.economy.work.3', 'levels.economy.work.4'],
    examples: ['levels.economy.example.1', 'levels.economy.example.2', 'levels.economy.example.3'],
  },
  {
    name: 'levels.comfort.name', tagline: 'levels.comfort.tag', description: 'levels.comfort.desc',
    features: ['levels.features.betterFinish', 'levels.features.lightScenes', 'levels.features.storage'],
    images: [
      '/images/levels/real/comfort-1.webp',
      '/images/levels/real/comfort-2.webp',
      '/images/levels/real/comfort-3.webp',
    ],
    realProject: true,
    projectArea: '50 м²',
    color: 'bg-lime', surface: 'bg-lime/10', darkCard: false,
    works: ['levels.comfort.work.1', 'levels.comfort.work.2', 'levels.comfort.work.3', 'levels.comfort.work.4'],
    examples: ['levels.comfort.example.1', 'levels.comfort.example.2', 'levels.comfort.example.3'],
  },
  {
    name: 'levels.lux.name', tagline: 'levels.lux.tag', description: 'levels.lux.desc',
    features: ['levels.features.natural', 'levels.features.customFurniture', 'levels.features.climate'],
    images: [
      '/images/levels/real/lux-2.webp',
      '/images/levels/real/lux-3.webp',
      '/images/levels/real/lux-6.webp',
      '/images/levels/real/lux-5.webp',
      '/images/levels/real/lux-4.webp',
      '/images/levels/real/lux-1.webp',
    ],
    realProject: true,
    collection: true,
    imagePosition: 'object-[center_72%]',
    color: 'bg-[#d14d57]', surface: 'border-white/10 bg-[#4b171d] text-white', darkCard: true,
    works: ['levels.lux.work.1', 'levels.lux.work.2', 'levels.lux.work.3', 'levels.lux.work.4'],
    examples: ['levels.lux.example.1', 'levels.lux.example.2', 'levels.lux.example.3'],
  },
  {
    name: 'levels.premium.name', tagline: 'levels.premium.tag', description: 'levels.premium.desc',
    features: ['levels.features.customProject', 'levels.features.complex', 'levels.features.complete'],
    images: [
      '/images/levels/real/premium-4.webp',
      '/images/levels/real/premium-1.webp',
      '/images/levels/real/premium-5.webp',
      '/images/levels/real/premium-6.webp',
      '/images/levels/real/premium-2.webp',
      '/images/levels/real/premium-3.webp',
    ],
    realProject: true,
    collection: true,
    color: 'bg-primary', surface: 'border-white/10 bg-[#18352f] text-white', darkCard: true,
    works: ['levels.premium.work.1', 'levels.premium.work.2', 'levels.premium.work.3', 'levels.premium.work.4'],
    examples: ['levels.premium.example.1', 'levels.premium.example.2', 'levels.premium.example.3'],
  },
] as const

type Level = (typeof LEVELS)[number]
const DISPLAY_LEVELS = [LEVELS[0], LEVELS[1], LEVELS[3], LEVELS[2]] as const

type LevelCardProps = {
  index: number
  level: Level
  onOpenDetails: () => void
  onOpenGallery: (imageIndex: number, trigger: HTMLButtonElement) => void
  t: ReturnType<typeof useI18n>['t']
}

function LevelCard({ index, level, onOpenDetails, onOpenGallery, t }: LevelCardProps) {
  const [activeImage, setActiveImage] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const suppressClickRef = useRef(false)
  const suppressTimerRef = useRef<number | null>(null)

  useEffect(() => () => {
    if (suppressTimerRef.current) window.clearTimeout(suppressTimerRef.current)
  }, [])

  const goToImage = (imageIndex: number) => {
    const slider = sliderRef.current
    if (!slider) return
    slider.scrollTo({ left: slider.clientWidth * imageIndex, behavior: 'smooth' })
  }

  const visualLabel = 'realProject' in level
    ? [t('collection' in level ? 'levels.realCollection' : 'levels.realObject'), 'projectArea' in level ? level.projectArea : null].filter(Boolean).join(' · ')
    : t('levels.visual')

  return (
    <Reveal delay={index * 55} className="w-[82vw] shrink-0 snap-center sm:w-[21rem] md:w-auto md:min-w-0">
      <article className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border text-left ${level.surface} shadow-[0_18px_50px_-38px] shadow-foreground/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35`}>
        <div className="relative aspect-[4/2.65] overflow-hidden">
          <div
            ref={sliderRef}
            className="level-card-slider flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label={`${t('levels.visual')}: ${t(level.name)}`}
            onScroll={(event) => {
              const slider = event.currentTarget
              setActiveImage(Math.round(slider.scrollLeft / slider.clientWidth))
            }}
            onPointerDown={(event) => {
              pointerStartRef.current = { x: event.clientX, y: event.clientY }
              suppressClickRef.current = false
            }}
            onPointerUp={(event) => {
              if (!pointerStartRef.current) return
              const distance = Math.hypot(
                event.clientX - pointerStartRef.current.x,
                event.clientY - pointerStartRef.current.y,
              )
              pointerStartRef.current = null
              if (distance <= 8) return
              suppressClickRef.current = true
              if (suppressTimerRef.current) window.clearTimeout(suppressTimerRef.current)
              suppressTimerRef.current = window.setTimeout(() => {
                suppressClickRef.current = false
              }, 120)
            }}
            onPointerCancel={() => {
              pointerStartRef.current = null
            }}
          >
            {level.images.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                className="relative h-full w-full shrink-0 snap-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={`Открыть фото ${imageIndex + 1}: ${t(level.name)}`}
                onClick={(event) => {
                  if (suppressClickRef.current) return
                  onOpenGallery(imageIndex, event.currentTarget)
                }}
              >
                <Image
                  src={image}
                  alt={`${t('levels.visual')}: ${t(level.name)}, ${imageIndex + 1}`}
                  fill
                  draggable={false}
                  priority={index === 0 && imageIndex === 0}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 82vw"
                  className={`object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105 ${'imagePosition' in level ? level.imagePosition : 'object-center'}`}
                />
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
          <span className="pointer-events-none absolute bottom-4 left-4 text-xs font-semibold text-white/90">{visualLabel}</span>
          <span className={`level-status-dot pointer-events-none absolute right-4 top-4 h-3 w-3 rounded-full ${level.color} ring-4 ring-white/70`} />

          <div className="absolute bottom-4 right-4 z-10 flex gap-1.5" aria-label="Навигация по фотографиям">
            {level.images.map((_, imageIndex) => (
              <button
                key={imageIndex}
                type="button"
                aria-label={`Показать фото ${imageIndex + 1}`}
                aria-current={activeImage === imageIndex ? 'true' : undefined}
                onClick={() => goToImage(imageIndex)}
                className={`h-1.5 rounded-full border border-white/70 shadow-sm transition-all ${activeImage === imageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/80'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
              />
            ))}
          </div>
        </div>

        <div className="p-5">
          <p className={`text-xs font-bold uppercase tracking-[0.15em] ${level.darkCard ? 'text-white/65' : 'text-muted-foreground'}`}>{t(level.tagline)}</p>
          <h3 className="mt-1 font-display text-2xl font-bold">{t(level.name)}</h3>
          <p className={`mt-3 text-sm leading-relaxed ${level.darkCard ? 'text-white/70' : 'text-muted-foreground'}`}>{t(level.description)}</p>
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
          <button
            type="button"
            onClick={onOpenDetails}
            className={`mt-6 inline-flex items-center gap-2 text-xs font-bold ${level.darkCard ? 'text-white' : 'text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            {t('levels.open')} <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" aria-hidden="true" />
          </button>
        </div>
      </article>
    </Reveal>
  )
}

export function RenovationLevels() {
  const { t } = useI18n()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [gallery, setGallery] = useState<{ imageIndex: number; levelIndex: number } | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const galleryTriggerRef = useRef<HTMLButtonElement | null>(null)
  const selected = selectedIndex === null ? null : DISPLAY_LEVELS[selectedIndex]
  const galleryLevel = gallery === null ? null : DISPLAY_LEVELS[gallery.levelIndex]

  const openLevel = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setSelectedIndex(index)
  }

  const closeLevel = () => {
    setSelectedIndex(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  const closeGallery = () => {
    setGallery(null)
    window.setTimeout(() => galleryTriggerRef.current?.focus(), 0)
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
          {DISPLAY_LEVELS.map((level, index) => (
            <LevelCard
              key={level.name}
              index={index}
              level={level}
              t={t}
              onOpenDetails={() => openLevel(index)}
              onOpenGallery={(imageIndex, trigger) => {
                galleryTriggerRef.current = trigger
                setGallery({ imageIndex, levelIndex: index })
              }}
            />
          ))}
        </div>
      </div>

      {galleryLevel && gallery && (
        <LevelGallery
          open
          images={galleryLevel.images}
          initialIndex={gallery.imageIndex}
          levelName={t(galleryLevel.name)}
          onClose={closeGallery}
        />
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLevel()
            }}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-labelledby="level-dialog-title"
              className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-card shadow-2xl sm:rounded-[2rem]"
              initial={{ opacity: 0, y: 32, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.22 }}
            >
              <button
                ref={closeButtonRef} type="button" onClick={closeLevel}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t('levels.close')}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                <div className="relative min-h-[16rem] overflow-hidden lg:min-h-[38rem] lg:rounded-l-[2rem]">
                  <Image
                    src={selected.images[0]} alt={t(selected.name)} fill unoptimized
                    sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover"
                  />
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
