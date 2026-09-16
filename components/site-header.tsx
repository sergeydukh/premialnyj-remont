'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWhatsAppUrl, LOCALES, useI18n, type Locale } from '@/lib/i18n'

const NAV = [
  { label: 'nav.services', href: '/#services' },
  { label: 'nav.levels', href: '/#levels' },
  { label: 'nav.objects', href: '/#objects' },
  { label: 'nav.contacts', href: '/#contact' },
]

export function SiteHeader() {
  const { locale, setLocale, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            'relative z-20 flex items-center justify-between rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-sm backdrop-blur-xl transition-all duration-500 md:px-6',
            scrolled && 'shadow-[0_16px_45px_-30px] shadow-foreground/45',
          )}
        >
          <a href="/" onClick={() => setOpen(false)} className="group flex min-w-0 items-center gap-2" aria-label={t('brand.home')}>
            <Image src="/brand/adelfia-flow-mark.png" alt="" width={40} height={40} priority className="h-9 w-9 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="truncate font-display text-base font-bold tracking-tight sm:text-lg">Adelfia Flow</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+34611884411"
              className="hidden items-center gap-1.5 rounded-full px-2 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground xl:inline-flex"
              aria-label={`${t('contact.call')}: +34 611 884 411`}
            >
              <Phone className="h-3.5 w-3.5" />
              +34 611 884 411
            </a>
            <label className="relative">
              <span className="sr-only">{t('nav.language')}</span>
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                className="h-10 cursor-pointer appearance-none rounded-lg border border-border bg-card px-2.5 pr-7 text-xs font-bold text-foreground outline-none transition-colors hover:border-primary/45 focus:border-primary"
                aria-label={t('nav.language')}
              >
                {LOCALES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground">▼</span>
            </label>
            <a
              href="/calculator"
              className="group hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_-4px] hover:shadow-primary/60 md:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
              </span>
              {t('nav.estimate')}
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
              aria-label={open ? t('nav.close') : t('nav.open')}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <>
            <button type="button" onClick={() => setOpen(false)} className="fixed inset-0 z-0 bg-foreground/25 backdrop-blur-[2px] lg:hidden" aria-label={t('nav.close')} />
            <nav className="relative z-20 mt-2 flex max-h-[calc(100svh-6.5rem)] flex-col overflow-y-auto rounded-2xl border border-border bg-card p-3 shadow-[0_24px_70px_-20px] shadow-foreground/45 lg:hidden">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border-b border-border px-4 py-3.5 text-base font-semibold text-foreground transition-colors last:border-b-0 hover:bg-accent"
                >
                  {t(item.label)}
                </a>
              ))}
              <a
                href="/calculator"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground"
              >
                {t('nav.estimate')}
                <MessageCircle className="h-4 w-4" />
              </a>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-2">
                <a href="tel:+34611884411" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-bold text-foreground">
                  <Phone className="h-4 w-4" /> {t('contact.call')}
                </a>
                <a href={getWhatsAppUrl(t('whatsapp.base'))} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-bold text-foreground">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}
