import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Pluto | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="Pluto">
      <p>Co-founder &amp; CPO (2025.09 – 2025.12)</p>
      <p>Built an AI-powered study platform for university students and led early product execution.</p>
    </DetailPage>
  )
}
