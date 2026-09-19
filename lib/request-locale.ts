import 'server-only'

import { cookies, headers } from 'next/headers'
import { LANGUAGE_COOKIE, detectLocale, isLocale, type Locale } from '@/lib/locale'

export async function getRequestLocale(): Promise<{ locale: Locale; shouldPrompt: boolean }> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()])
  const savedLocale = cookieStore.get(LANGUAGE_COOKIE)?.value

  if (isLocale(savedLocale)) return { locale: savedLocale, shouldPrompt: false }

  return {
    locale: detectLocale(headerStore.get('accept-language')),
    shouldPrompt: true,
  }
}
