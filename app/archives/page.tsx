import type { Metadata } from 'next'
import './archives.css'
import ArchivesClient from './archives-client'
import { getArchiveFolders, getArchives } from '@/lib/archives'

export const dynamic = 'force-static'

const archiveCategories = ['All', 'Music', 'Photo', 'Scrap', 'Thoughts', 'Works'] as const

export const metadata: Metadata = {
  title: 'Archives | Chanmin Kim',
}

export default async function ArchivesPage() {
  const items = await getArchives()
  const folders = getArchiveFolders()

  return (
    <main>
      <div className="page-shell">
        <ArchivesClient items={items} categories={archiveCategories} folders={folders} />
      </div>
    </main>
  )
}
