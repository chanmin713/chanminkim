export type ArchiveTrack = {
  id: string
  title: string
  artist: string
  durationMillis: number
  trackNumber: number
}

export type ArchiveItem = {
  id: string
  title: string
  date?: string
  category: string
  folderId?: string | null
  pinned: boolean
  image?: string
  images?: string[]
  description?: string
  link?: string
  artist?: string
  appleMusic?: string
  spotify?: string
  youtubeMusic?: string
  trackCount?: number
  copyright?: string
  tracks?: ArchiveTrack[]
  metadataMode?: 'manual' | 'apple-auto'
  linkMode?: 'manual' | 'songlink-auto'
  unreleased?: boolean
  slugPath?: string
}

export type ArchiveFolder = {
  id: string
  name: string
  parentId?: string | null
  category: string
  pinned?: boolean
}
