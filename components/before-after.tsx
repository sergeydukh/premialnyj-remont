'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Gem, MoveHorizontal } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Hotspot = {
  id: string
  label: string
  detail: string
  price: string
  x: number
  y: number
  accent: 'lime' | 'cyan' | 'amber'
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'stone',
    label: 'Керамогранит Atlas Concorde',
    detail: '120 × 60 см · матовый графит',
    price: 'от 48 €/м²',
    x: 25,
    y: 62,
    accent: 'cyan',
  },
  {
    id: 'light',
    label: 'Световая система Flos',
    detail: 'Трековый свет · DALI-сценарии',
    price: 'от 860 €',
    x: 61,
    y: 24,
    accent: 'amber',
  },
  {
    id: 'wood',
    label: 'Инженерная доска Coswick',
    detail: 'Дуб селект · натуральное масло',
    price: 'от 99 €/м²',
    x: 78,
    y: 72,
    accent: 'lime',
  },
]

export function BeforeAfter() {
  const [position, setPosition] = useState(54)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateFromClientX = useCallback((clientX: number) => {
    const element = containerRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      setPosition((value) => Math.max(0, value - 4))
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      setPosition((value) => Math.min(100, value + 4))
    }
    if (event.key === 'Home') setPosition(0)
    if (event.key === 'End') setPosition(100)
  }

  return (
    <section id="transformation" className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
      <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / 02 — Трансформация
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-balance">
            Было и стало. Один объект.
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          Сдвиньте шторку и изучите материалы, из которых собран готовый интерьер.
        </p>
      </Reveal>

      <Reveal>
        <div
          ref={containerRef}
          onPointerMove={(event) => event.buttons > 0 && updateFromClientX(event.clientX)}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            updateFromClientX(event.clientX)
          }}
          onPointerUp={(event) => event.currentTarget.releasePointerCapture?.(event.pointerId)}
          className="relative aspect-[16/11] w-full select-none overflow-hidden rounded-3xl border border-border bg-card md:aspect-[21/9]"
        >
          <Image
            src="/images/after-finished.png"
            alt="Готовый премиальный интерьер после ремонта"
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
          />
          <span className="absolute right-4 top-4 z-10 rounded-full border border-primary/40 bg-background/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            После
          </span>

          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
            <div className="absolute inset-0 w-[100vw] max-w-none md:w-[calc(100vw-2rem)] lg:w-[calc(100vw-8rem)]">
              <Image
                src="/images/before-raw.png"
                alt="Черновое состояние помещения до ремонта"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              До
            </span>
          </div>

          {HOTSPOTS.map((hotspot) => {
            const isActive = activeHotspot === hotspot.id
            const color = hotspot.accent === 'lime' ? 'bg-lime' : hotspot.accent === 'cyan' ? 'bg-cyan' : 'bg-amber'
            return (
              <div
                key={hotspot.id}
                className="absolute z-20"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                <button
                  type="button"
                  aria-label={`Показать материал: ${hotspot.label}`}
                  aria-expanded={isActive}
                  onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                  onFocus={() => setActiveHotspot(hotspot.id)}
                  onBlur={() => setActiveHotspot(null)}
                  className={`relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background ${color} shadow-lg transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  <span className={`absolute inset-[-7px] animate-ping rounded-full ${color} opacity-30`} />
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      className="absolute bottom-5 left-1/2 w-56 -translate-x-1/2 rounded-2xl border border-border bg-background/95 p-4 text-left shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex items-start gap-2">
                        <Gem className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{hotspot.label}</p>
                          <p className="mt-1 text-[11px] text-muted-foreground">{hotspot.detail}</p>
                          <p className="mt-2 font-mono text-xs text-primary">{hotspot.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}

          <div className="absolute inset-y-0 z-30 w-px bg-primary shadow-[0_0_24px_2px] shadow-primary/70" style={{ left: `${position}%` }}>
            <button
              type="button"
              role="slider"
              aria-label="Ползунок сравнения до и после"
              aria-valuenow={Math.round(position)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${Math.round(position)} процентов готового интерьера открыто`}
              tabIndex={0}
              onPointerDown={(event) => {
                event.stopPropagation()
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerMove={(event) => event.buttons > 0 && updateFromClientX(event.clientX)}
              onKeyDown={handleKeyDown}
              className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-[0_0_28px_-4px] shadow-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
