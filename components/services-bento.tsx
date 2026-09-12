'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Boxes,
  Compass,
  Home,
  Ruler,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Service = {
  title: string
  text: string
  icon: typeof Compass
  tone: 'lime' | 'cyan' | 'amber'
  className: string
  image?: string
}

const SERVICES: Service[] = [
  {
    title: 'Design & Fit-out',
    text: 'Дизайн-проект, инженерия, чистовая отделка и комплектация под ключ.',
    icon: Compass,
    tone: 'lime',
    className: 'md:col-span-2 md:row-span-2',
    image: '/images/service-turnkey.png',
  },
  {
    title: 'Project Management',
    text: 'Рабочие чертежи, координация мастеров и поэтапная проверка качества.',
    icon: Ruler,
    tone: 'cyan',
    className: 'md:col-span-2',
  },
  {
    title: 'Smart Home Integration',
    text: 'Сценарии света, климата и безопасности в единой системе.',
    icon: Home,
    tone: 'amber',
    className: 'md:col-span-2',
  },
  {
    title: 'Commercial Renovation',
    text: 'Офисы, ритейл и HoReCa с точным соблюдением сроков запуска.',
    icon: Building2,
    tone: 'cyan',
    className: 'md:col-span-2',
  },
  {
    title: 'Material Supply',
    text: 'Подбор и поставка материалов напрямую от проверенных фабрик.',
    icon: Boxes,
    tone: 'lime',
    className: 'md:col-span-2',
  },
]

const TONE_STYLES = {
  lime: 'text-lime border-lime/30 hover:border-lime/70 hover:shadow-[0_0_35px_-18px] hover:shadow-lime',
  cyan: 'text-cyan border-cyan/25 hover:border-cyan/60 hover:shadow-[0_0_35px_-18px] hover:shadow-cyan',
  amber: 'text-amber border-amber/25 hover:border-amber/60 hover:shadow-[0_0_35px_-18px] hover:shadow-amber',
} as const

export function ServicesBento() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
      <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / 01 — Направления
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-balance">
            Один контур ответственности. Пять точек экспертизы.
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          От первого замера до последнего светильника — проект, стройка и комплектация работают как
          единая система.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          return (
            <Reveal key={service.title} className={service.className} delay={index * 70} as="article">
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className={`group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl border bg-card/80 p-6 transition-colors duration-300 md:p-8 ${TONE_STYLES[service.tone]}`}
              >
                {service.image && (
                  <Image
                    src={service.image}
                    alt="Команда ФОРМА выполняет ремонт под ключ"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-card/50 via-card/80 to-card" />
                <div className="relative flex items-start justify-between">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-current/25 bg-background/60"
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                  <Sparkles className="h-4 w-4 opacity-50" aria-hidden="true" />
                </div>
                <div className="relative mt-12">
                  <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-current">
                    Explore <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
