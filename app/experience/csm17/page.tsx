import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'CSM17 | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="CSM17">
      <p>Backend Developer (2025.07 – 2025.08)</p>
      <p>Developed backend features and supported service implementation.</p>
    </DetailPage>
  )
}
