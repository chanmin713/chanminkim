import { cache } from 'react'
import archiveData from '@/data/archives.json'
import folderData from '@/data/archive-folders.json'
import { hydrateMusicItem } from './music'
import { hydrateScrapItem } from './og'
import { ArchiveItem, ArchiveFolder } from './archive-types'
import { 
  timeValue, 
  slugify, 
  buildItemId, 
  buildFolderId, 
  buildItemSlugPath 
} from './archive-utils'

export type { ArchiveTrack, ArchiveItem, ArchiveFolder } from './archive-types'

type ArchiveDataFile = {
  items: Array<Partial<ArchiveItem>>
}

type ArchiveFolderFile = {
  folders: Array<Partial<ArchiveFolder>>
}

function sortArchives(items: ArchiveItem[]) {
  return [...items].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return timeValue(b.date) - timeValue(a.date)
  })
}

export const getArchives = cache(async function getArchives(): Promise<ArchiveItem[]> {
  const data = archiveData as ArchiveDataFile
  const nonDemoItems = data.items.filter((raw) => {
    const title = String(raw.title || '').toLowerCase()
    const desc = String(raw.description || '').toLowerCase()
    const unreleased = !!raw.unreleased
    const isDemo = unreleased || title.includes('demo') || desc.includes('demo')
    return !isDemo
  })
  const seenIds = new Map<string, number>()
  const folderMap = new Map(getArchiveFolders().map((folder) => [folder.id, folder]))
  const hydrated = await Promise.all(
    nonDemoItems.map(async (raw, index) => {
      const rawFolderId = raw.folderId ? String(raw.folderId).trim() : ''
      const normalizedFolderId = rawFolderId || null
      const safeFolderId = normalizedFolderId && folderMap.has(normalizedFolderId) ? normalizedFolderId : null
      const normalizedImages = Array.isArray(raw.images)
        ? raw.images
          .map((value) => (typeof value === 'string' ? value.trim() : ''))
          .filter(Boolean)
        : []
      const normalizedImage = typeof raw.image === 'string' ? raw.image.trim() : ''
      const seedImages = normalizedImages.length ? normalizedImages : (normalizedImage ? [normalizedImage] : [])

      const isAutoMusic = raw.category === 'Music'
      const isManualMusic = raw.category === 'Music (unreleased)'
      const normalizedCategory = raw.category === 'Travel' ? 'Photo' : raw.category
      const finalCategory = isAutoMusic || isManualMusic ? 'Music' : (normalizedCategory || 'Scrap')

      const musicHydrated = await hydrateMusicItem({
        id: buildItemId(raw, index, seenIds),
        title: raw.title || 'Untitled',
        category: finalCategory,
        date: raw.date || '',
        folderId: safeFolderId,
        pinned: raw.pinned || false,
        image: seedImages[0] || '',
        images: seedImages,
        description: raw.description || '',
        link: raw.link || '',
        artist: raw.artist || '',
        appleMusic: raw.appleMusic || '',
        spotify: raw.spotify || '',
        youtubeMusic: raw.youtubeMusic || '',
        trackCount: raw.trackCount,
        copyright: raw.copyright || '',
        tracks: raw.tracks || undefined,
        metadataMode: isAutoMusic ? 'apple-auto' : 'manual',
        linkMode: (isAutoMusic || isManualMusic) ? 'songlink-auto' : 'manual',
        unreleased: isManualMusic ? true : (raw.unreleased || false),
      })

      const hydrated = await hydrateScrapItem(musicHydrated)

      const imagesFromHydrated = Array.isArray(hydrated.images)
        ? hydrated.images.map((value) => (typeof value === 'string' ? value.trim() : '')).filter(Boolean)
        : []
      const primaryImage = typeof hydrated.image === 'string' ? hydrated.image.trim() : ''

      const mergedImages = imagesFromHydrated.length ? [...imagesFromHydrated] : []
      if (primaryImage && !mergedImages.includes(primaryImage)) mergedImages.unshift(primaryImage)

      const finalPrimaryImage = primaryImage || mergedImages[0] || ''

      return {
        ...hydrated,
        image: finalPrimaryImage,
        images: mergedImages,
      }
    }),
  )

  const seenPaths = new Map<string, number>()
  const withPaths = hydrated.map((item) => {
    const base = buildItemSlugPath(item, folderMap)
    const count = (seenPaths.get(base) || 0) + 1
    seenPaths.set(base, count)

    const slugPath = count === 1 ? base : `${base}-${count}`

    return {
      ...item,
      slugPath,
    }
  })

  return sortArchives(withPaths)
})

export async function getArchiveBySlugPath(path: string): Promise<ArchiveItem | null> {
  const normalized = path.replace(/^\/+|\/+$/g, '')
  const items = await getArchives()
  return items.find((item) => item.slugPath === normalized) || null
}

export function getArchiveFolders(): ArchiveFolder[] {
  const data = folderData as ArchiveFolderFile
  const seenIds = new Map<string, number>()

  const prelim = data.folders.map((raw, index) => {
    const id = buildFolderId(raw, index, seenIds)
    const name = raw.name || 'Untitled Folder'
    const category = raw.category === 'Travel' ? 'Photo' : (raw.category || 'Scrap')

    return {
      id,
      name,
      category,
      pinned: raw.pinned || false,
      rawParentId: raw.parentId || null,
    }
  })

  const idSet = new Set(prelim.map((folder) => folder.id))
  const prelimById = new Map(prelim.map((folder) => [folder.id, folder]))

  const normalizeParentId = (folderId: string, rawParentId: string | null): string | null => {
    if (!rawParentId) return null
    const ref = slugify(rawParentId)
    if (!ref) return null

    if (!idSet.has(ref)) return null
    if (ref === folderId) return null

    const parent = prelimById.get(ref)
    const current = prelimById.get(folderId)

    if (parent && current && parent.category !== current.category) return null

    return ref
  }

  const hydrated = prelim.map((folder) => ({
    id: folder.id,
    name: folder.name,
    category: folder.category,
    parentId: normalizeParentId(folder.id, folder.rawParentId),
    pinned: folder.pinned,
  }))

  return hydrated.sort((a, b) => {
    if ((a.pinned ?? false) !== (b.pinned ?? false)) return a.pinned ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}
