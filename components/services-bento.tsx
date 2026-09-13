'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Building2,
  Boxes,
  Compass,
  Home,
  Ruler,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Service = {
  title: string
  text: string
  icon: typeof Compass
  tone: 'lime' | 'cyan' | 'amber'
  className: string
  features: string[]
  image?: string
}

const SERVICES: Service[] = [
  {
    title: 'Ремонт под ключ',
    text: 'Создаём интерьер и полностью реализуем его — от обмеров и планировки до финальной комплектации.',
    icon: Compass,
    tone: 'lime',
    className: 'md:col-span-7 md:row-span-2 md:min-h-[34rem]',
    features: ['Дизайн-проект', 'Инженерия', 'Реализация'],
    image: '/images/service-turnkey.png',
  },
  {
    title: 'Управление стройкой',
    text: 'Составляем график, координируем специалистов и проверяем качество каждого этапа.',
    icon: Ruler,
    tone: 'cyan',
    className: 'md:col-span-5',
    features: ['Смета и график', 'Контроль качества'],
  },
  {
    title: 'Умный дом и климат',
    text: 'Объединяем освещение, климат и безопасность в понятную систему управления.',
    icon: Home,
    tone: 'amber',
    className: 'md:col-span-5',
    features: ['Световые сценарии', 'Климат-контроль'],
  },
  {
    title: 'Коммерческие интерьеры',
    text: 'Проектируем и обновляем офисы, магазины, рестораны и другие пространства для бизнеса.',
    icon: Building2,
    tone: 'cyan',
    className: 'md:col-span-6',
    features: ['Срок запуска', 'Работа по нормам'],
  },
  {
    title: 'Комплектация объекта',
    text: 'Подбираем отделку, свет, сантехнику и мебель — и организуем поставки на объект.',
    icon: Boxes,
    tone: 'lime',
    className: 'md:col-span-6',
    features: ['Подбор материалов', 'Закупка и доставка'],
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
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / 01 — Услуги
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-balance">
            Одна команда. Весь путь от идеи до готового пространства.
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          Проектируем, строим и комплектуем объекты в Валенсии. У вас один план и понятный бюджет,
          а за результат отвечает одна команда.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          return (
            <Reveal key={service.title} className={service.className} delay={index * 70} as="article">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className={`group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl border bg-card/80 p-6 transition-colors duration-300 md:p-8 ${TONE_STYLES[service.tone]}`}
              >
                {service.image && (
                  <Image
                    src={service.image}
                    alt="Команда ФОРМА выполняет ремонт под ключ"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-card/35 via-card/80 to-card" />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-current/25 bg-background/60 backdrop-blur-md">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground">
                    / {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative mt-14">
                  <h3 className="max-w-lg font-display text-2xl font-bold text-foreground md:text-[1.75rem]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Состав услуги">
                    {service.features.map((feature) => (
                      <li key={feature} className="rounded-full border border-current/20 bg-background/45 px-3 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur-md">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
