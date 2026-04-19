import type { ArchiveFolder, ArchiveItem } from '@/lib/archives'
import { timeValue } from '@/lib/archive-utils'

export type ArchiveFolderNode = ArchiveFolder & {
  children: ArchiveFolderNode[]
  items: ArchiveItem[]
}

export function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase()
}

export function safeCategoryLabel(category?: string) {
  const normalized = (category || '').trim()
  return normalized || 'Archive'
}

export function safeTitle(value?: string) {
  const normalized = (value || '').trim()
  return normalized || 'Untitled'
}

export function buildFolderTree(folders: ArchiveFolder[], items: ArchiveItem[]) {
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

export function getFolderLatestDate(folder: ArchiveFolderNode): number {
  let maxTime = Number.NEGATIVE_INFINITY
  
  if (folder.items && folder.items.length > 0) {
    const itemTimes = folder.items.map(item => timeValue(item.date))
    maxTime = Math.max(...itemTimes)
  }
  
  if (folder.children && folder.children.length > 0) {
    const childTimes = folder.children.map(child => getFolderLatestDate(child))
    maxTime = Math.max(maxTime, ...childTimes)
  }
  
  return maxTime
}
