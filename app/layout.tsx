import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
  preload: true,
  fallback: ['IBM Plex Mono', 'monospace'],
})

export const metadata: Metadata = {
  title: 'Chanmin Kim',
  description: 'Dreamer. Builder. Learner.',
  metadataBase: new URL('https://chanminkim.com'),
  openGraph: {
    title: 'Chanmin Kim',
    description: 'Dreamer. Builder. Learner.',
    url: 'https://chanminkim.com',
    siteName: 'Chanmin Kim',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/chanminkim.svg',
        width: 1200,
        height: 630,
        alt: 'Chanmin Kim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chanmin Kim',
    description: 'Dreamer. Builder. Learner.',
    images: ['/chanminkim.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={ibmPlexMono.variable}>
      <body>{children}</body>
    </html>
  )
}

