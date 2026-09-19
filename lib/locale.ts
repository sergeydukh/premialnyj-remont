export type Locale = 'ru' | 'es' | 'en' | 'fr'

export const LANGUAGE_COOKIE = 'adelfia-locale'
export const LANGUAGE_STORAGE_KEY = 'forma-locale'

export const LOCALES: Array<{ code: Locale; label: string; name: string }> = [
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
]

export const SITE_METADATA: Record<Locale, { title: string; description: string }> = {
  ru: {
    title: 'Adelfia Flow — Ремонт и реконструкция в Валенсии',
    description: 'Ремонт квартир, домов и коммерческих помещений в Валенсии — от оценки и проекта до готового объекта.',
  },
  es: {
    title: 'Adelfia Flow — Reformas y rehabilitación en Valencia',
    description: 'Reformas de pisos, casas y locales en Valencia: desde la evaluación y el proyecto hasta la entrega.',
  },
  en: {
    title: 'Adelfia Flow — Renovation and remodelling in Valencia',
    description: 'Apartment, house and commercial renovations in Valencia — from assessment and design to handover.',
  },
  fr: {
    title: 'Adelfia Flow — Rénovation et réhabilitation à Valence',
    description: 'Rénovation d’appartements, de maisons et de locaux à Valence, de l’étude à la livraison.',
  },
}

export const CALCULATOR_METADATA: Record<Locale, { title: string; description: string }> = {
  ru: { title: 'Расчёт стоимости ремонта — Adelfia Flow', description: 'Пошаговый предварительный расчёт стоимости работ для ванной, кухни или комплексного ремонта в Валенсии.' },
  es: { title: 'Calculadora de reformas — Adelfia Flow', description: 'Cálculo orientativo paso a paso de los trabajos para baño, cocina o reforma integral en Valencia.' },
  en: { title: 'Renovation cost calculator — Adelfia Flow', description: 'A step-by-step preliminary labour estimate for a bathroom, kitchen or full renovation in Valencia.' },
  fr: { title: 'Calculateur de rénovation — Adelfia Flow', description: 'Estimation préliminaire des travaux, étape par étape, pour une salle de bains, une cuisine ou une rénovation complète à Valence.' },
}

export const PRIVACY_METADATA: Record<Locale, { title: string; description: string }> = {
  ru: { title: 'Политика конфиденциальности — Adelfia Flow', description: 'Как Adelfia Flow обрабатывает данные посетителей сайта и запросы на расчёт ремонта.' },
  es: { title: 'Política de privacidad — Adelfia Flow', description: 'Cómo trata Adelfia Flow los datos de visitantes y las solicitudes de presupuesto.' },
  en: { title: 'Privacy policy — Adelfia Flow', description: 'How Adelfia Flow handles visitor data and renovation estimate enquiries.' },
  fr: { title: 'Politique de confidentialité — Adelfia Flow', description: 'Comment Adelfia Flow traite les données des visiteurs et les demandes de devis.' },
}

export function getPageMetadata(locale: Locale, pathname: string) {
  if (pathname.startsWith('/calculator')) return CALCULATOR_METADATA[locale]
  if (pathname.startsWith('/privacy')) return PRIVACY_METADATA[locale]
  return SITE_METADATA[locale]
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ru' || value === 'es' || value === 'en' || value === 'fr'
}

export function detectLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return 'es'

  const preferences = acceptLanguage
    .split(',')
    .map((entry, index) => {
      const [tag, ...parameters] = entry.trim().toLowerCase().split(';')
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='))
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1
      return { tag, quality: Number.isFinite(quality) ? quality : 0, index }
    })
    .sort((a, b) => b.quality - a.quality || a.index - b.index)

  for (const preference of preferences) {
    const language = preference.tag.split('-')[0]
    if (isLocale(language)) return language
  }

  return 'es'
}
