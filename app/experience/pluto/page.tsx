import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Pluto | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Experience"
      meta="Co-founder & CPO · 2025.09 – 2025.12"
      summary="An AI-powered study platform for university students built around everyday learning workflows."
      title="Pluto"
    >
      <section className="detail-section">
        <h2>Contributions</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Led early product execution as co-founder and CPO.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Shaped the product around real university study behaviors and needs.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
