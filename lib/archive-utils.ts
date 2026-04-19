import { ArchiveFolder, ArchiveItem } from './archive-types'

export function timeValue(date?: string) {
  if (!date) return Number.NEGATIVE_INFINITY
  const value = new Date(date).getTime()
  return Number.isNaN(value) ? Number.NEGATIVE_INFINITY : value
}

export function formatDate(date?: string | null) {
  if (!date) return ''
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime())
    ? ''
    : parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateLabel(options: {
  date?: string | null
  unreleased?: boolean
}) {
  if (options.unreleased) return 'Unreleased'
  return formatDate(options.date)
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function buildItemId(raw: Partial<ArchiveItem>, index: number, seen: Map<string, number>) {
  const direct = slugify(raw.id || '')
  if (direct) return direct

  const base = slugify([raw.category, raw.title, raw.date].filter(Boolean).join('-')) || `archive-item-${index + 1}`
  const count = (seen.get(base) || 0) + 1
  seen.set(base, count)

  return count === 1 ? base : `${base}-${count}`
}

export function buildFolderId(raw: Partial<ArchiveFolder>, index: number, seen: Map<string, number>) {
  const direct = slugify(raw.id || '')
  if (direct) return direct

  const base = slugify([raw.category, raw.name].filter(Boolean).join('-')) || `archive-folder-${index + 1}`
  
  const count = (seen.get(base) || 0) + 1
  seen.set(base, count)

  return count === 1 ? base : `${base}-${count}`
}

export function buildFolderAncestors(folderId: string | null | undefined, foldersById: Map<string, ArchiveFolder>) {
  const segments: string[] = []
  const seen = new Set<string>()

  if (folderId && !foldersById.has(folderId)) return segments

  let current = folderId ? foldersById.get(folderId) : undefined

  while (current && !seen.has(current.id)) {
    seen.add(current.id)
    const segment = slugify(current.name || current.id)
    if (segment) segments.unshift(segment)
    if (current.parentId && !foldersById.has(current.parentId)) break
    current = current.parentId ? foldersById.get(current.parentId) : undefined
  }

  return segments
}

export function buildItemSlugPath(item: ArchiveItem, foldersById: Map<string, ArchiveFolder>) {
  const category = slugify(item.category || 'archive') || 'archive'
  const folderSegments = buildFolderAncestors(item.folderId, foldersById)
  const titleSegment = slugify(item.title || item.id || 'item') || 'item'

  return [category, ...folderSegments, titleSegment].join('/')
}

