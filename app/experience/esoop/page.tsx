import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Esoop Company | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Experience"
      meta="Business Development Intern · 2026.01 – 2026.02"
      summary="Worked across product and growth tasks for a due diligence workflow."
      title="Esoop Company"
    >
      <section className="detail-section">
        <h2>Contributions</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Contributed to frontend development and UX optimization for a due diligence project.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Supported CRM email automation workflow development.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
