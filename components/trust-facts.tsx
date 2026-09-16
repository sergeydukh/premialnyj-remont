'use client'

import { Building2, FileSignature, MapPin } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const FACTS = [
  { value: 'facts.projects.value', label: 'facts.projects.label', icon: Building2, color: 'bg-primary' },
  { value: 'facts.location.value', label: 'facts.location.label', icon: MapPin, color: 'bg-cyan' },
  { value: 'facts.contract.value', label: 'facts.contract.label', icon: FileSignature, color: 'bg-lime' },
] as const

export function TrustFacts() {
  const { t } = useI18n()

  return (
    <section className="px-4 pb-4" aria-label={t('facts.projects.label')}>
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-sm sm:grid-cols-3">
        {FACTS.map((fact) => {
          const Icon = fact.icon
          return (
            <div key={fact.value} className="flex items-center gap-4 border-b border-border p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${fact.color} text-white`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-xl font-bold leading-none">{t(fact.value)}</p>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{t(fact.label)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
