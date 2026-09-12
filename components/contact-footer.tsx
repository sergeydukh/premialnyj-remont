'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Phone, Mail, MapPin } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function ContactFooter() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer id="contact" className="relative mx-auto max-w-7xl px-4 pb-12 pt-24 md:pt-32">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Left: pitch + contacts */}
        <Reveal className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 md:p-10">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                / 06 — Контакты
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-tight text-balance">
                Обсудим ваш проект
              </h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                Оставьте заявку — перезвоним в течение 15 минут в рабочее время и предложим дату
                бесплатного замера.
              </p>
            </div>

            <ul className="mt-10 space-y-4">
              <li>
                <a href="tel:+34960123456" className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-semibold">+34 960 12 34 56</span>
                </a>
              </li>
              <li>
                <a href="mailto:studio@forma.es" className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    studio@forma.es
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-muted-foreground">Валенсия, Carrer de Colón, 12</span>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal className="lg:col-span-3" delay={120}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10">
            {submitted ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">Заявка отправлена</h3>
                <p className="mt-2 max-w-sm text-pretty text-sm text-muted-foreground">
                  Спасибо! Наш менеджер свяжется с вами в ближайшее время, чтобы уточнить детали.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex h-full flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Имя" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Как к вам обращаться"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                    />
                  </Field>
                  <Field label="Телефон" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+34 ___ ___ ___"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                    />
                  </Field>
                </div>

                  <Field label="Площадь объекта, м²" htmlFor="contact-area">
                    <input
                    id="contact-area"
                    name="area"
                    type="number"
                    min={1}
                    placeholder="Например, 85"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </Field>

                <Field label="Комментарий" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Расскажите о задаче, сроках и пожеланиях"
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </Field>

                <button
                  type="submit"
                  className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_36px_-6px] hover:shadow-primary/70"
                >
                  Отправить заявку
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-md border border-primary/60" />
            <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
          </span>
          <span className="font-display font-bold text-foreground">ФОРМА</span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>
        <p>Архитектурная студия реновации · Валенсия</p>
      </div>
    </footer>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
