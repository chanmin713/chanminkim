import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KNAPS Startup Project Competition | Chanmin Kim',
}

export default function Page() {
  return <main><div className="page-shell"><a className="back-link" href="/" aria-label="Back to home">← Back</a><h1>KNAPS Startup Project Competition</h1><p>2nd Place (2025.07)</p><p>Issued by KNAPS (Korean National Association for Pharmaceutical Students).</p><p>Won with a personalized health meal &amp; supplement all-in-one subscription business plan based on personal health data.</p></div></main>
}
