import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'CSM17 | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Experience"
      meta="Backend Developer · 2025.07 – 2025.08"
      summary="Backend-focused contribution for service implementation during a short product build cycle."
      title="CSM17"
    >
      <section className="detail-section">
        <h2>Contributions</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Developed backend features needed for the product scope.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Supported overall service implementation and delivery.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
