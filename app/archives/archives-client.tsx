'use client'

import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ArchiveFolder, ArchiveItem } from '@/lib/archives'
import { timeValue } from '@/lib/archive-utils'

import { 
  normalize, 
  buildFolderTree, 
  getFolderLatestDate 
} from './utils/folder-utils'
import { ArchiveCard } from './components/ArchiveCard'
import { FolderCard } from './components/FolderCard'

export default function ArchivesClient({
  items,
  categories,
  folders,
}: {
  items: ArchiveItem[]
  categories: readonly string[]
  folders: ArchiveFolder[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeFilter = searchParams.get('category')
  const activeFolder = searchParams.get('folder')
  const normalizedFilter = activeFilter && categories.some((category) => normalize(category) === normalize(activeFilter))
    ? normalize(activeFilter)
    : null

  const selectedCategoryLabel = useMemo(() => {
    if (normalizedFilter == null) return null
    const matched = categories.find((category) => normalize(category) === normalizedFilter)
    if (!matched || matched === 'All') return null
    return matched
  }, [categories, normalizedFilter])

  const visible = useMemo(
    () => (normalizedFilter == null ? items : items.filter((item) => normalize(item.category) === normalizedFilter)),
    [items, normalizedFilter],
  )

  const filteredFolders = useMemo(() => {
    return normalizedFilter
      ? folders.filter((folder) => !folder.category || normalize(folder.category) === normalizedFilter)
      : folders
  }, [folders, normalizedFilter])

  const folderTree = useMemo(() => buildFolderTree(filteredFolders, visible), [filteredFolders, visible])

  const currentFolder = useMemo(() => {
    if (!activeFolder) return null
    return folderTree.byId.get(activeFolder) || null
  }, [activeFolder, folderTree])

  useEffect(() => {
    if (!activeFolder) return
    if (folderTree.byId.has(activeFolder)) return

    const params = new URLSearchParams(searchParams.toString())
    params.delete('folder')
    const nextQuery = params.toString()
    router.replace(nextQuery ? pathname + '?' + nextQuery : pathname, { scroll: false })
  }, [activeFolder, folderTree, searchParams, router, pathname])

  const rootItems = useMemo(() => visible.filter((item) => !item.folderId), [visible])

  const visibleFolders = currentFolder ? currentFolder.children : folderTree.roots
  const visibleItems = currentFolder ? currentFolder.items : rootItems

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category === 'All') params.delete('category')
    else params.set('category', normalize(category))

    params.delete('folder')

    const nextQuery = params.toString()
    router.replace(nextQuery ? pathname + '?' + nextQuery : pathname, { scroll: false })
  }

  const openFolder = (folderId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('folder', folderId)
    const nextQuery = params.toString()
    router.replace(nextQuery ? pathname + '?' + nextQuery : pathname, { scroll: false })
  }

  const backWithinFolders = () => {
    if (!currentFolder) return

    const params = new URLSearchParams(searchParams.toString())
    const structuralParentId = folderTree.parentById.get(currentFolder.id)

    if (structuralParentId) {
      params.set('folder', structuralParentId)
    } else {
      params.delete('folder')
    }

    const nextQuery = params.toString()
    router.replace(nextQuery ? pathname + '?' + nextQuery : pathname, { scroll: false })
  }

  const showCategory = normalizedFilter == null
  const headingText = useMemo(() => {
    if (!currentFolder) {
      return selectedCategoryLabel ? `Archives / ${selectedCategoryLabel}` : 'Archives'
    }

    const names: string[] = [currentFolder.name]
    let cursor = folderTree.parentById.get(currentFolder.id)

    while (cursor) {
      const parent = folderTree.byId.get(cursor)
      if (!parent) break
      names.unshift(parent.name)
      cursor = folderTree.parentById.get(parent.id)
    }

    const folderCategory = (currentFolder.category || '').trim()
    const categoryLabel = folderCategory || selectedCategoryLabel
    if (categoryLabel) return `Archives / ${categoryLabel} / ${names.join(' / ')}`
    return `Archives / ${names.join(' / ')}`
  }, [currentFolder, folderTree, selectedCategoryLabel])

  const gridEntries = [
    ...visibleFolders.map((folder, i) => ({ kind: 'folder' as const, folder, key: `folder-${folder.id}`, index: i })),
    ...visibleItems.map((item, i) => ({ kind: 'item' as const, item, key: `item-${item.id}`, index: visibleFolders.length + i })),
  ].sort((a, b) => {
    const aPinned = a.kind === 'folder' ? a.folder.pinned : a.item.pinned
    const bPinned = b.kind === 'folder' ? b.folder.pinned : b.item.pinned
    
    if (aPinned !== bPinned) return aPinned ? -1 : 1

    const aTime = a.kind === 'folder' ? getFolderLatestDate(a.folder) : timeValue(a.item.date)
    const bTime = b.kind === 'folder' ? getFolderLatestDate(b.folder) : timeValue(b.item.date)

    if (aTime !== bTime) {
      return bTime - aTime
    }

    if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1
    return a.index - b.index
  })

  return (
    <div>
      {currentFolder ? (
        <button type="button" className="back-link archive-back-button" onClick={backWithinFolders}>
          ← Back
        </button>
      ) : (
        <Link className="back-link" href="/" aria-label="Back to home">
          ← Back
        </Link>
      )}

      <h1>{headingText}</h1>

      <div className="archive-content">
        <nav className="archive-filter-nav" aria-label="Archive filters">
          {categories.map((category) => {
            const isActive = category === 'All' ? normalizedFilter == null : normalize(category) === normalizedFilter

            return (
              <button
                key={category}
                type="button"
                onClick={() => updateCategory(category)}
                className={isActive ? 'archive-filter archive-filter-active' : 'archive-filter'}
              >
                {category}
              </button>
            )
          })}
        </nav>

        <div className="archive-groups">
          {gridEntries.length ? (
            <section className="archive-group">
              <div className="archive-group-list">
                {gridEntries.map((entry) =>
                  entry.kind === 'folder' ? (
                    <FolderCard 
                      key={entry.key} 
                      folder={entry.folder} 
                      onOpen={openFolder} 
                      showCategory={showCategory} 
                    />
                  ) : (
                    <ArchiveCard 
                      key={entry.key} 
                      item={entry.item} 
                      showCategory={showCategory} 
                    />
                  ),
                )}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}
