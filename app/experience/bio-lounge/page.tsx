import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Bio Lounge | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="Bio Lounge">
      <p>Founder (2026.01 – )</p>
      <p>Curate and share biotech/healthcare industry news in an anonymous, insight-driven chat community.</p>
      <p>Facilitate discussions among students and professionals across investment, research, and business.</p>
    </DetailPage>
  )
}
