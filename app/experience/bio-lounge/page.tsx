import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bio Lounge | Chanmin Kim',
}

export default function Page() {
  return <main><div className="page-shell"><a className="back-link" href="/" aria-label="Back to home">← Back</a><h1>Bio Lounge</h1><p>Founder (2026.01 – )</p><p>Curate and share biotech/healthcare industry news in an anonymous, insight-driven chat community.</p><p>Facilitate discussions among students and professionals across investment, research, and business.</p></div></main>
}
