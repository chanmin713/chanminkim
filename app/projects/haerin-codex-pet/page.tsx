import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Haerin Kang Codex Pet | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Project"
      meta="Solo build · 2026"
      summary={
        <>
          An unofficial fan-made Codex desktop pet inspired by Haerin's black-cat energy, packaged as a custom pet with a manifest, animated spritesheet, and preview assets.
        </>
      }
      title="Haerin Kang Codex Pet"
    >
      <section className="detail-section">
        <h2>Repository</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>
              <a href="https://github.com/chanmin713/haerin-codex-pet" target="_blank" rel="noopener noreferrer">
                github.com/chanmin713/haerin-codex-pet
              </a>
              {" — installable as a custom pet for Codex."}
            </span>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>What I shipped</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>A Codex-ready pet package with `pet.json` and an animated `spritesheet.webp`.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Preview assets including a contact sheet and short clips for idle, running, waving, and review states.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Simple install instructions so the pet can be copied into `~/.codex/pets/haerin-kang/` and selected in Codex.</span>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>Character</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Pixel-adjacent chibi styling with black cat ears, long dark hair, and a neon yellow outfit.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Designed as a tiny on-screen companion to make Codex sessions feel more playful without changing the workflow.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
