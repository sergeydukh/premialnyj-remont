'use client'

import { ClipboardCheck, FileSignature, HardHat, KeyRound } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const STEPS = [
  {
    number: '01',
    title: 'process.1.title', text: 'process.1.desc',
    icon: ClipboardCheck,
    color: 'bg-amber',
  },
  {
    number: '02',
    title: 'process.2.title', text: 'process.2.desc',
    icon: FileSignature,
    color: 'bg-cyan',
  },
  {
    number: '03',
    title: 'process.3.title', text: 'process.3.desc',
    icon: HardHat,
    color: 'bg-primary',
  },
  {
    number: '04',
    title: 'process.4.title', text: 'process.4.desc',
    icon: KeyRound,
    color: 'bg-lime',
  },
] as const

export function ProcessTimeline() {
  const { t } = useI18n()
  return (
    <section id="process" className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-foreground px-5 py-8 text-white md:px-9 md:py-10">
        <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.23em] text-amber">{t('process.eyebrow')}</p>
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[0.96] tracking-tight">
              {t('process.title')}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/62">
            {t('process.note')}
          </p>
        </Reveal>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.number} as="li" delay={index * 55}>
                <div className="h-full rounded-2xl border border-white/12 bg-white/6 p-5">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.color} text-white`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-white/45">{step.number}</span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-bold">{t(step.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">{t(step.text)}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
