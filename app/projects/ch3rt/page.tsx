import type { Metadata } from 'next'
import DetailPage from '@/app/components/detail-page'

export const metadata: Metadata = {
  title: 'Ch3rt | Chanmin Kim',
}

export default function Page() {
  return (
    <DetailPage
      category="Project"
      meta="Solo build · 2026"
      summary={
        <>
          A web app for exploring equities in 3D — search a ticker and view price history as an interactive Three.js scene, with a familiar chart layer alongside.
        </>
      }
      title="Ch3rt"
    >
      <section className="detail-section">
        <h2>Live</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>
              <a href="https://ch3rt.vercel.app/" target="_blank" rel="noopener noreferrer">
                ch3rt.vercel.app
              </a>
              {" — try a symbol and orbit the chart."}
            </span>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>Stack</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Next.js (App Router), React, TypeScript, Tailwind CSS</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Three.js via React Three Fiber and Drei for the 3D view</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Market data and search wired through server routes; Vercel Analytics for usage</span>
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>What I shipped</h2>
        <div className="bullet-section">
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>End-to-end flow from symbol search to fetching OHLC history and rendering it in 3D.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>URL-driven state so shares and analytics stay aligned with what people look up.</span>
          </p>
          <p className="bullet-item">
            <span className="bullet-mark">•</span>
            <span>Polished shell: responsive layout, loading states, and a minimal product surface around the canvas.</span>
          </p>
        </div>
      </section>
    </DetailPage>
  )
}
