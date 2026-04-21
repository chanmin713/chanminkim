import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'KNAPS Startup Project Competition | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Award"
      meta="2nd Place · 2025.07"
      summary="Recognized for a personalized health meal and supplement subscription business plan grounded in individual health data."
      title="KNAPS Startup Project Competition"
    >
      <section className="detail-section">
        <h2>Recognition</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Issued by KNAPS (Korean National Association for Pharmaceutical Students).</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Presented an all-in-one subscription model combining personalized meals and supplements.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
