import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'GustoVenue | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage title="GustoVenue">
      <p>Co-founder (2025.11 – 2025.12)</p>
      <p>Planned and operated a seasonal flower-bouquet pre-order brokerage service for students and local residents.</p>
      <p>Built florist partnerships and managed end-to-end order/payment/delivery operations.</p>
    </DetailPage>
  )
}
