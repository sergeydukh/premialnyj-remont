'use client'

import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Портфолио', href: '/#portfolio' },
  { label: 'Калькулятор', href: '/calculator' },
  { label: 'Процесс', href: '/#process' },
  { label: 'Контакты', href: '/#contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            'flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 transition-all duration-500 md:px-6',
            scrolled && 'glass border-border',
          )}
        >
          <a href="/" className="group flex items-center gap-2.5" aria-label="ФОРМА — на главную">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-md border border-primary/60 transition-transform duration-500 group-hover:rotate-45" />
              <span className="h-2 w-2 rounded-[2px] bg-primary transition-transform duration-500 group-hover:scale-150" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">ФОРМА</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/calculator"
              className="group hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_-4px] hover:shadow-primary/60 md:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
              </span>
              Быстрый расчёт
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="glass mt-2 flex flex-col rounded-2xl border border-border p-2 lg:hidden">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/calculator"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Быстрый расчёт
              <MessageCircle className="h-4 w-4" />
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
