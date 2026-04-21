import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Esoop Company | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="Esoop Company">
      <p>Business Development Intern (2026.01 – 2026.02)</p>
      <p>Contributed to frontend development and UX optimization for a due diligence project.</p>
      <p>Supported CRM email automation workflow development.</p>
    </DetailPage>
  )
}
