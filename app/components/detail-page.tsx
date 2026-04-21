import Link from 'next/link'
import type { ReactNode } from 'react'

type DetailPageProps = {
  category: string
  meta: string
  summary: ReactNode
  title: string
  children: ReactNode
}

export default function DetailPage({ category, meta, summary, title, children }: DetailPageProps) {
  return (
    <main>
      <article className="page-shell detail-page">
        <Link className="back-link" href="/" aria-label="Back to home">
          ← Back
        </Link>
        <header className="detail-header">
          <p className="detail-category">{category}</p>
          <h1>{title}</h1>
          <p className="detail-meta">{meta}</p>
          <div className="detail-summary">{summary}</div>
        </header>
        <div className="detail-body">{children}</div>
      </article>
    </main>
  )
}
