import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'KNAPS Startup Project Competition | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="KNAPS Startup Project Competition">
      <p>2nd Place (2025.07)</p>
      <p>Issued by KNAPS (Korean National Association for Pharmaceutical Students).</p>
      <p>Won with a personalized health meal &amp; supplement all-in-one subscription business plan based on personal health data.</p>
    </DetailPage>
  )
}
