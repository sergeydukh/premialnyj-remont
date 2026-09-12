'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type Category = 'all' | 'minimal' | 'japandi' | 'classic' | 'loft'

const FILTERS: { id: Category; label: string }[] = [
  { id: 'all', label: 'Все проекты' },
  { id: 'minimal', label: 'Минимализм' },
  { id: 'japandi', label: 'Джапанди' },
  { id: 'classic', label: 'Неоклассика' },
  { id: 'loft', label: 'Лофт' },
]

const PROJECTS = [
  {
    id: 'minimal',
    title: 'Резиденция «Тишина»',
    meta: '112 м² · 3 месяца',
    img: '/images/project-minimal.png',
    tag: 'Минимализм',
  },
  {
    id: 'japandi',
    title: 'Квартира «Оникс»',
    meta: '86 м² · 2.5 месяца',
    img: '/images/project-japandi.png',
    tag: 'Джапанди',
  },
  {
    id: 'classic',
    title: 'Апартаменты «Грация»',
    meta: '140 м² · 4 месяца',
    img: '/images/project-neoclassic.png',
    tag: 'Неоклассика',
  },
  {
    id: 'loft',
    title: 'Пентхаус «Индастри»',
    meta: '175 м² · 5 месяцев',
    img: '/images/project-loft.png',
    tag: 'Лофт',
  },
] as const

export function Portfolio() {
  const [active, setActive] = useState<Category>('all')
  const visible = PROJECTS.filter((p) => active === 'all' || p.id === active)

  return (
    <section id="portfolio" className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
      <Reveal className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / 04 — Портфолио
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-balance">
            Реализованные объекты
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                active === f.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={i * 80} as="article">
            <a
              href="#contact"
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-border"
            >
              <Image
                src={project.img}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-border glass px-3 py-1 text-xs font-medium">
                {project.tag}
              </span>
              <span className="absolute right-5 top-5 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.meta}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
