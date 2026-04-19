import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import './archives.css'
import './details.css'
import IabBreakout from './iab-breakout'

export const metadata: Metadata = {
  metadataBase: new URL('https://chanminkim.com'),
  title: 'Chanmin Kim',
  description: 'A pharmacy student and builder wandering in search of something only I can do.',
  icons: { icon: '/favicon.png' },
  openGraph: { images: ['/og.webp'] },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <IabBreakout />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
