import Link from 'next/link'
import type { ReactNode } from 'react'

type DetailPageProps = {
  title: string
  children: ReactNode
}

export default function DetailPage({ title, children }: DetailPageProps) {
  return (
    <main>
      <div className="page-shell">
        <Link className="back-link" href="/" aria-label="Back to home">
          ← Back
        </Link>
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  )
}
