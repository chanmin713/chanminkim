import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pluto | Chanmin Kim',
}

export default function Page() {
  return (
    <main>
      <div className="page-shell">
        <a className="back-link" href="/" aria-label="Back to home">
          ← Back
        </a>
        <h1>Pluto</h1>
        <p>Co-founder &amp; CPO (2025.09 – 2025.12)</p>
        <p>Built an AI-powered study platform for university students and led early product execution.</p>
      </div>
    </main>
  )
}
