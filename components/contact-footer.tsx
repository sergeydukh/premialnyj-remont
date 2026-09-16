'use client'

import Image from 'next/image'
import { type FormEvent } from 'react'
import { ArrowRight, CalendarCheck, Camera, FileCheck2, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getWhatsAppUrl, useI18n } from '@/lib/i18n'

const TRUST_POINTS = [
  { icon: FileCheck2, title: 'contact.estimate.title', text: 'contact.estimate.text' },
  { icon: CalendarCheck, title: 'contact.plan.title', text: 'contact.plan.text' },
  { icon: Camera, title: 'contact.reports.title', text: 'contact.reports.text' },
] as const

export function ContactFooter() {
  const { t } = useI18n()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const details = [name && `${t('contact.name')}: ${name}`, phone && `${t('contact.phone')}: ${phone}`, message].filter(Boolean).join('\n')
    window.open(getWhatsAppUrl(`${t('whatsapp.base')}\n\n${details}`), '_blank', 'noopener,noreferrer')
  }

  return (
    <footer id="contact" className="scroll-mt-24 px-4 pb-10 pt-16 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <ul className="mb-4 grid overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-sm md:grid-cols-3">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon
              return (
                <li key={point.title} className="flex gap-4 border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber/20 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display font-bold">{t(point.title)}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(point.text)}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full min-h-[25rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground md:p-9">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.23em] text-primary-foreground/65">{t('contact.eyebrow')}</p>
                <h2 className="mt-3 max-w-md font-display text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-[0.9] tracking-tight text-balance">
                  {t('contact.title')}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                  {t('contact.text')}
                </p>
              </div>
              <div className="mt-10 space-y-3">
                <div className="inline-flex w-fit items-center gap-3 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-3 text-sm font-semibold">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> {t('hero.location')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href="tel:+34611884411" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-foreground"><Phone className="h-4 w-4" /> +34 611 884 411</a>
                  <a href={getWhatsAppUrl(t('whatsapp.base'))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="h-full rounded-[2rem] border border-border bg-card p-7 shadow-sm md:p-9">
              <form onSubmit={handleSubmit} className="flex h-full flex-col">
                  <p className="font-display text-2xl font-bold">{t('contact.form.title')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t('contact.form.note')}</p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <Field label={t('contact.name')} htmlFor="name">
                      <input id="name" name="name" required placeholder={t('contact.namePlaceholder')} className="calculator-input" />
                    </Field>
                    <Field label={t('contact.phone')} htmlFor="phone">
                      <input id="phone" name="phone" type="tel" required placeholder="+34 ___ ___ ___" className="calculator-input" />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label={t('contact.comment')} htmlFor="message">
                      <textarea id="message" name="message" rows={4} placeholder={t('contact.commentPlaceholder')} className="calculator-input resize-none" />
                    </Field>
                  </div>
                  <button type="submit" className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                    {t('contact.whatsapp')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                    {t('contact.privacy.prefix')} <a href="/privacy" className="underline decoration-primary/40 underline-offset-2 hover:text-foreground">{t('contact.privacy.link')}</a>.
                  </p>
                </form>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/adelfia-flow-mark.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display font-bold text-foreground">Adelfia Flow</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <a href="/privacy" className="hover:text-foreground">{t('contact.privacy.link')}</a>
            <p>{t('footer.tagline')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
