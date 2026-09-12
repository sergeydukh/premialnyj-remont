'use client'

import { useEffect, useRef } from 'react'
import { ClipboardCheck, FileSignature, ScanLine, ShieldCheck, Sparkles, Video } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from '@/components/reveal'

const STEPS = [
  { n: '01', title: '3D-сканирование и ТЗ', text: 'Выезжаем на объект, снимаем размеры лазером и превращаем задачу в точный технический бриф.', icon: ScanLine },
  { n: '02', title: '3D-проект и чертежи', text: 'Показываем будущий интерьер в реальном времени и выпускаем полный комплект инженерных чертежей.', icon: ClipboardCheck },
  { n: '03', title: 'Смета и договор', text: 'Фиксируем состав работ, стоимость и сроки. Любое изменение проходит через ваше согласование.', icon: FileSignature },
  { n: '04', title: 'Стройка под контролем', text: 'Прораб ведёт журнал работ, проверяет скрытые этапы и регулярно сообщает о ходе проекта.', icon: Video },
  { n: '05', title: 'Комплектация и финальная отделка', text: 'Организуем поставки, монтаж чистовых материалов, света, сантехники и мебели по утверждённой спецификации.', icon: Sparkles },
  { n: '06', title: 'Сдача и гарантия 5 лет', text: 'Проводим клининг и финальную приёмку, передаём документы и остаёмся на связи по гарантии.', icon: ShieldCheck },
] as const

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !sectionRef.current || !progressRef.current) return

    const context = gsap.context(() => {
      gsap.to(progressRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          end: 'bottom 72%',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">/ 03 — Процесс</p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-balance">Шесть этапов от идеи до ключей.</h2>
      </Reveal>

      <div className="relative">
        <div className="absolute bottom-4 left-5 top-4 w-px bg-border md:left-1/2" aria-hidden="true">
          <div ref={progressRef} className="h-0 w-full origin-top bg-primary shadow-[0_0_14px] shadow-primary" />
        </div>
        <ol className="space-y-4 md:space-y-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal as="li" key={step.n} delay={index * 70} className="relative flex gap-5 md:min-h-[11rem] md:gap-0">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-sm font-semibold text-primary md:absolute md:left-1/2 md:-translate-x-1/2">
                  {step.n}
                </div>
                <div className={`w-full rounded-3xl border border-border bg-card/80 p-6 md:w-[calc(50%-3.5rem)] md:p-7 ${index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}>
                  <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Этап {step.n}</p>
                      <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
