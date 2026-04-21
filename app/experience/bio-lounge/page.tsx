import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Bio Lounge | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Experience"
      meta="Founder · 2026.01 –"
      summary="An anonymous, insight-driven community for people working on or around biotech and healthcare."
      title="Bio Lounge"
    >
      <section className="detail-section">
        <h2>Focus</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Curate and share biotech and healthcare industry news in a signal-first community format.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Facilitate practical discussion across investment, research, and business.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
