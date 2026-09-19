import type { Metadata } from 'next'
import { PRIVACY_METADATA } from '@/lib/locale'
import { getRequestLocale } from '@/lib/request-locale'

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLocale()
  return PRIVACY_METADATA[locale]
}

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
