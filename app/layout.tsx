import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import IabBreakout from './iab-breakout'

export const metadata: Metadata = {
  metadataBase: new URL('https://chanminkim.com'),
  title: 'Chanmin Kim',
  description: 'Pharmacy student at Seoul National University and builder.',
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
      </body>
    </html>
  )
}
