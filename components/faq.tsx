'use client'

import { ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/lib/i18n'

const FAQS = [
  { question: 'faq.1.q', answer: 'faq.1.a' },
  { question: 'faq.2.q', answer: 'faq.2.a' },
  { question: 'faq.3.q', answer: 'faq.3.a' },
  { question: 'faq.4.q', answer: 'faq.4.a' },
] as const

export function Faq() {
  const { t } = useI18n()

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.65fr_1.35fr]">
        <Reveal>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.23em] text-primary">{t('faq.eyebrow')}</p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-balance">{t('faq.title')}</h2>
        </Reveal>
        <Reveal delay={70}>
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
            {FAQS.map((item, index) => (
              <details key={item.question} className="group border-b border-border last:border-b-0" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-display text-lg font-bold marker:hidden md:p-6">
                  {t(item.question)}
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 pr-14 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6">{t(item.answer)}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
