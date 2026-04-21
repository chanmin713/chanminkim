import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'GustoVenue | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Experience"
      meta="Co-founder · 2025.11 – 2025.12"
      summary="A seasonal flower-bouquet pre-order brokerage service built for students and local residents."
      title="GustoVenue"
    >
      <section className="detail-section">
        <h2>Contributions</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Planned and operated end-to-end order, payment, and delivery workflows.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Built florist partnerships and handled day-to-day operating coordination.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
