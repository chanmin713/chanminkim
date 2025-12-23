import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { IBM_Plex_Mono, Newsreader } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import PageBackground from '@/components/PageBackground'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
  preload: true,
  fallback: ['IBM Plex Mono', 'monospace'],
})

const newsReader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-news-reader',
  preload: true,
  fallback: ['serif'],
})

export const metadata: Metadata = {
  title: 'Chanmin Kim',
  metadataBase: new URL('https://chanminkim.com'),
  openGraph: {
    title: 'Chanmin Kim',
    url: 'https://chanminkim.com',
    siteName: 'Chanmin Kim',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/chanminkim.png',
        width: 1200,
        height: 630,
        alt: 'Chanmin Kim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chanmin Kim',
    images: ['/chanminkim.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" className={`${ibmPlexMono.variable} ${newsReader.variable}`} style={{ backgroundColor: '#000000' }}>
      <body style={{ backgroundColor: '#000000' }}>
        <PageBackground />
        <Header />
        {children}
      </body>
    </html>
  )
}

