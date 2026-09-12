'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowDown, Clock3 } from 'lucide-react'
import { Magnetic } from '@/components/magnetic'

export function Hero() {
  const layerRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = layerRef.current
    if (!el) return
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 2
    const y = (e.clientY / innerHeight - 0.5) * 2
    el.style.transform = `scale(1.08) translate(${x * -14}px, ${y * -14}px)`
  }

  return (
    <section id="top" onMouseMove={handleMove} className="relative min-h-svh overflow-hidden">
      {/* Background image layer with parallax */}
      <div
        ref={layerRef}
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: 'scale(1.08)' }}
      >
        <Image
          src="/images/hero-interior.png"
          alt="Премиальный интерьер после реновации"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
      <div className="absolute inset-0 grid-noise opacity-60" />

      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-4 pb-14 pt-32 md:pb-20">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Архитектурная студия реновации · Валенсия
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-balance">
            Реновация и архитектурный ремонт{' '}
            <span className="text-primary text-glow">премиум-класса</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Инженерный подход, 3D-визуализация в реальном времени и прозрачная смета без
            сюрпризов.
          </p>

          <div className="mt-9 flex flex-col items-start gap-y-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <Magnetic strength={0.18} className="shrink-0">
              <a
                href="/calculator"
                className="group inline-flex items-center gap-3 rounded-full border border-primary/70 bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_-10px] shadow-primary transition-shadow hover:shadow-[0_0_46px_-6px] hover:shadow-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Рассчитать стоимость ремонта
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border glass px-4 py-3">
              <Clock3 className="h-5 w-5 text-primary" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">от 45 дней</p>
                <p className="text-xs text-muted-foreground">средний срок реализации</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8">
          {[
            ['5 лет', 'гарантия на работы'],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {value}
              </span>
              <span className="max-w-[9rem] text-xs leading-tight text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
