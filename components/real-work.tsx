'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowUpRight, Images, Maximize2 } from 'lucide-react'
import { LevelGallery } from '@/components/level-gallery'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const PROJECTS = [
  {
    slug: 'emerald',
    title: 'projects.emerald.title',
    description: 'projects.emerald.description',
    area: '50 м²',
    rooms: 'projects.rooms.2',
    imagePosition: 'object-center',
    images: Array.from({ length: 5 }, (_, index) => `/images/projects/emerald-${index + 1}.webp`),
  },
  {
    slug: 'urban',
    title: 'projects.urban.title',
    description: 'projects.urban.description',
    area: '55 м²',
    rooms: 'projects.rooms.2',
    imagePosition: 'object-center',
    images: Array.from({ length: 5 }, (_, index) => `/images/projects/urban-${index + 1}.webp`),
  },
  {
    slug: 'chocolate',
    title: 'projects.chocolate.title',
    description: 'projects.chocolate.description',
    area: '123 м²',
    rooms: 'projects.rooms.3',
    imagePosition: 'object-center',
    images: Array.from({ length: 5 }, (_, index) => `/images/projects/chocolate-${index + 1}.webp`),
  },
  {
    slug: 'cobalt',
    title: 'projects.cobalt.title',
    description: 'projects.cobalt.description',
    area: '150 м²',
    rooms: 'projects.rooms.4',
    imagePosition: 'object-center',
    images: Array.from({ length: 5 }, (_, index) => `/images/projects/cobalt-${index + 1}.webp`),
  },
  {
    slug: 'family',
    title: 'projects.family.title',
    description: 'projects.family.description',
    area: '121 м²',
    rooms: 'projects.rooms.4',
    imagePosition: 'object-center',
    images: Array.from({ length: 5 }, (_, index) => `/images/projects/family-${index + 1}.webp`),
  },
] as const

export function RealWork() {
  const { t } = useI18n()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const galleryTriggerRef = useRef<HTMLButtonElement | null>(null)

  const openGallery = (projectIndex: number, trigger: HTMLButtonElement) => {
    galleryTriggerRef.current = trigger
    setSelectedProject(projectIndex)
  }

  const closeGallery = () => {
    setSelectedProject(null)
    window.setTimeout(() => galleryTriggerRef.current?.focus(), 0)
  }

  return (
    <section id="objects" className="scroll-mt-24 bg-[#f4f0e8] px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.65fr)] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.23em] text-primary">{t('real.eyebrow')}</p>
            <h2 className="max-w-4xl font-display text-[clamp(2.55rem,5.4vw,5.3rem)] font-bold leading-[0.9] tracking-[-0.045em] text-balance">
              {t('real.title')}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-foreground/65 md:justify-self-end md:text-lg">
            {t('real.intro')}
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((project, index) => {
            const isFeatured = index === 0

            return (
              <Reveal key={project.slug} delay={index * 55} as="article" className={isFeatured ? 'lg:col-span-2' : ''}>
                <div
                  className={`group h-full overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_20px_70px_rgba(24,31,43,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(24,31,43,0.12)] ${
                    isFeatured ? 'lg:grid lg:min-h-[32rem] lg:grid-cols-[1.35fr_0.8fr]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={(event) => openGallery(index, event.currentTarget)}
                    aria-label={`${t('real.viewProject')}: ${t(project.title)}`}
                    className={`relative block w-full overflow-hidden bg-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                      isFeatured ? 'aspect-[4/3] lg:aspect-auto lg:min-h-full' : 'aspect-[16/11]'
                    }`}
                  >
                    <Image
                      src={project.images[0]}
                      alt={t(project.title)}
                      fill
                      sizes={isFeatured ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 48vw, 100vw'}
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${project.imagePosition}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101722]/65 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                      <Images className="h-3.5 w-3.5" aria-hidden="true" />
                      {t('real.fivePhotos')}
                    </span>
                    <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-foreground">
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>

                  <div className={`flex flex-col p-6 sm:p-8 ${isFeatured ? 'lg:justify-center lg:p-10 xl:p-12' : ''}`}>
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                        {t('real.project')} · {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-foreground/10" aria-hidden="true" />
                    </div>

                    <h3 className={`font-display font-bold leading-[1.02] tracking-[-0.025em] ${isFeatured ? 'text-4xl xl:text-5xl' : 'text-3xl'}`}>
                      {t(project.title)}
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-foreground/62">{t(project.description)}</p>

                    <dl className="mt-6 flex flex-wrap gap-2 text-sm">
                      <div className="rounded-full bg-secondary px-3.5 py-2">
                        <dt className="sr-only">{t('real.area')}</dt>
                        <dd>{project.area}</dd>
                      </div>
                      <div className="rounded-full bg-secondary px-3.5 py-2">
                        <dt className="sr-only">{t('real.rooms')}</dt>
                        <dd>{t(project.rooms)}</dd>
                      </div>
                      <div className="rounded-full bg-secondary px-3.5 py-2">
                        <dt className="sr-only">{t('real.format')}</dt>
                        <dd>{t('real.fullRenovation')}</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      onClick={(event) => openGallery(index, event.currentTarget)}
                      className="mt-7 inline-flex w-fit items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-semibold transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                    >
                      {t('real.viewProject')}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {selectedProject !== null && (
        <LevelGallery
          open
          images={PROJECTS[selectedProject].images}
          initialIndex={0}
          levelName={t(PROJECTS[selectedProject].title)}
          onClose={closeGallery}
        />
      )}
    </section>
  )
}
