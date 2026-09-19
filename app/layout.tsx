import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'
import { SITE_METADATA } from '@/lib/locale'
import { getRequestLocale } from '@/lib/request-locale'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLocale()
  return SITE_METADATA[locale]
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffaf2',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { locale, shouldPrompt } = await getRequestLocale()

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider initialLocale={locale} shouldPrompt={shouldPrompt}>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
