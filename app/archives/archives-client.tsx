'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ArchiveFolder, ArchiveItem } from '@/lib/archives'

type ArchiveFolderNode = ArchiveFolder & {
  children: ArchiveFolderNode[]
  items: ArchiveItem[]
}

function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase()
}

function safeCategoryLabel(category?: string) {
  const normalized = (category || '').trim()
  return normalized || 'Archive'
}

function safeTitle(value?: string) {
  const normalized = (value || '').trim()
  return normalized || 'Untitled'
}

function buildFolderTree(folders: ArchiveFolder[], items: ArchiveItem[]) {
  const mapped = new Map<string, ArchiveFolderNode>()
  const parentById = new Map<string, string>()

  for (const folder of folders) {
    mapped.set(folder.id, { ...folder, children: [], items: [] })
  }

  const roots: ArchiveFolderNode[] = []

  for (const folder of mapped.values()) {
    const parent = folder.parentId ? mapped.get(folder.parentId) : null
    if (parent) {
      parent.children.push(folder)
      parentById.set(folder.id, parent.id)
    }
    else roots.push(folder)
  }

  for (const item of items) {
    if (item.folderId && mapped.has(item.folderId)) {
      mapped.get(item.folderId)?.items.push(item)
    }
  }

  return {
    roots,
    byId: mapped,
    parentById,
  }
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M12 17v5" />
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5l2 4.5H7l2-4.5z" />
    </svg>
  )
}

function ArchiveCard({
  item,
  showCategory,
}: {
  item: ArchiveItem
  showCategory: boolean
}) {
  const href = item.slugPath ? `/archives/${item.slugPath}` : '/archives'
  const imageList = item.images?.length
    ? item.images
    : (item.image ? [item.image] : [])
  const primaryImage = imageList[0]
  const hasMultipleImages = imageList.length > 1
  
  const displayTitle = item.category === 'Photo' && item.date 
    ? '' 
    : safeTitle(item.title)

  return (
    <Link href={href} className="archive-card-link" aria-label={`Open ${displayTitle || 'item'}`}>
      <article className="archive-card">
        <div className="flex flex-col gap-1">
          {showCategory ? <div className="archive-card-kicker">{safeCategoryLabel(item.category)}</div> : null}
          
          {primaryImage ? (
            <div className={`archive-card-media relative ${hasMultipleImages ? 'archive-card-media-multi' : ''}`}>
              {hasMultipleImages ? (
                <div className="archive-card-media-stack" aria-hidden="true">
                  {imageList.slice(0, 3).map((src, index) => (
                    <div key={`${item.id}-stack-${src}-${index}`} className={`archive-card-media-stack-layer archive-card-media-stack-layer-${index + 1}`}>
                      <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <Image src={primaryImage} alt={displayTitle || 'Archive image'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              )}
            </div>
          ) : (
            <div className="archive-card-media archive-card-media-placeholder" aria-hidden="true">
              <span>No image</span>
            </div>
          )}
        </div>

        <div className="archive-card-copy">
          {(displayTitle || item.pinned) ? (
            <div className="archive-card-title justify-between">
              <div className="archive-card-title-row">
                {item.pinned ? <PinIcon className="archive-pin-icon flex-shrink-0" /> : null}
                <div className="title-container flex-1">
                  {displayTitle ? <span className="marquee-text">{displayTitle}</span> : null}
                </div>
              </div>
              {item.category === 'Music' && item.artist ? (
                <span className="archive-card-artist">
                  - {item.artist}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  )
}

function FolderCard({
  folder,
  onOpen,
  showCategory,
}: {
  folder: ArchiveFolderNode
  onOpen: (folderId: string) => void
  showCategory: boolean
}) {
  return (
    <button type="button" className="archive-folder-card archive-card-link" onClick={() => onOpen(folder.id)}>
      <article className="archive-card">
        <div className="flex flex-col gap-1">
          {showCategory ? <div className="archive-card-kicker">{safeCategoryLabel(folder.category)}</div> : null}
          <div className="archive-card-media archive-folder-media" aria-hidden="true">
            <img className="archive-folder-media-icon" src="/folder.webp" alt="" />
          </div>
        </div>

        <div className="archive-card-copy">
          <div className="archive-card-title">
            <div className="archive-card-title-row">
              {folder.pinned ? <PinIcon className="archive-pin-icon flex-shrink-0" /> : null}
              <span>{folder.name}</span>
            </div>
          </div>
        </div>
      </article>
    </button>
  )
}

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
    ...visibleFolders.map((folder) => ({ kind: 'folder' as const, folder, key: `folder-${folder.id}` })),
    ...visibleItems.map((item) => ({ kind: 'item' as const, item, key: `item-${item.id}` })),
  ]

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
                    <FolderCard key={entry.key} folder={entry.folder} onOpen={openFolder} showCategory={showCategory} />
                  ) : (
                    <ArchiveCard key={entry.key} item={entry.item} showCategory={showCategory} />
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
