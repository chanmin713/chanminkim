import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Qwen Base SKYST Hackathon | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Award"
      meta="Finalist · 2025.11"
      summary="Reached the final round with BaseQ, an AI conversational survey platform."
      title="Qwen Base SKYST Hackathon by FLock.io"
    >
      <section className="detail-section">
        <h2>Project</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Planned BaseQ and led frontend implementation for the team.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Designed the end-to-end survey flow from prompt-based generation to response, rewards, and AI insight analysis.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
