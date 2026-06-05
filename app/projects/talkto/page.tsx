import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'TalkTo | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Project"
      meta="Medilux project · Backend developer · Selected for U300"
      summary={
        <>
          TalkTo is an Archive-first product from Medilux for preserving family stories through subjects, guided questions, voice recordings, memories, and Voice Persona flows. I was responsible for backend development.
        </>
      }
      title="TalkTo"
    >
      <section className="detail-section">
        <h2>Context</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Built as a Medilux (Healthcare Startup Club) project.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Selected for U300 after the team advanced through the final acceptance process.</span>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>Backend role</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Designed and implemented the Archive-first backend foundation for subject profiles, guided questions, and voice recording workflows.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Built recording upload and playback URL flows with ownership checks around authenticated users and archived subjects.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Kept the API surface documented and validated with backend tests and build checks.</span>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>Product scope</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Archive-first flow: define people, collect family glossary terms, deliver question cards, and store original voice recordings.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Designed to support later Memories and Voice Persona layers while keeping consent and original voice playback central.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
