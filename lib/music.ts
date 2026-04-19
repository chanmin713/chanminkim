import type { ArchiveItem } from './archives'

type ITunesLookupResult = {
  artistName?: string
  collectionName?: string
  trackName?: string
  artworkUrl100?: string
  releaseDate?: string
}

type ITunesLookupResponse = {
  resultCount?: number
  results?: ITunesLookupResult[]
}

type SongLinkPlatform = {
  url?: string
}

type SongLinkResponse = {
  linksByPlatform?: {
    spotify?: SongLinkPlatform
    youtubeMusic?: SongLinkPlatform
    appleMusic?: SongLinkPlatform
  }
}

function resolveAppleMusicId(url: string) {
  try {
    const parsed = new URL(url)
    const segments = parsed.pathname.split('/').filter(Boolean)

    for (let index = segments.length - 1; index >= 0; index -= 1) {
      if (/^\d+$/.test(segments[index])) return segments[index]
    }
  } catch {
    return null
  }

  return null
}

async function fetchAppleMusicMetadata(url: string) {
  const appleId = resolveAppleMusicId(url)
  if (!appleId) return null

  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${appleId}`, {
      next: { revalidate: 60 * 60 * 24 },
    })

    if (!response.ok) return null

    const payload = (await response.json()) as ITunesLookupResponse
    const first = payload.results?.[0]
    if (!first) return null

    return {
      title: first.trackName || first.collectionName,
      artist: first.artistName,
      image: first.artworkUrl100?.replace('100x100bb', '1200x1200bb'),
      date: first.releaseDate?.slice(0, 10),
    }
  } catch {
    return null
  }
}

async function fetchSongLinkMappings(sourceUrl: string) {
  try {
    const endpoint = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(sourceUrl)}`
    const response = await fetch(endpoint, { next: { revalidate: 60 * 60 * 24 } })
    if (!response.ok) return null

    const payload = (await response.json()) as SongLinkResponse
    return {
      appleMusic: payload.linksByPlatform?.appleMusic?.url || '',
      spotify: payload.linksByPlatform?.spotify?.url || '',
      youtubeMusic: payload.linksByPlatform?.youtubeMusic?.url || '',
    }
  } catch {
    return null
  }
}

export async function hydrateMusicItem(item: ArchiveItem): Promise<ArchiveItem> {
  const metadataMode = item.metadataMode || 'manual'
  if (item.category !== 'Music') return item

  let nextItem = { ...item }

  if (metadataMode === 'apple-auto' && item.appleMusic) {
    const metadata = await fetchAppleMusicMetadata(item.appleMusic)

    const artist = item.artist || metadata?.artist || ''

    nextItem = {
      ...nextItem,
      title: item.title === 'Untitled' ? (metadata?.title || item.title) : item.title,
      artist,
      image: item.image || metadata?.image,
      date: item.date || metadata?.date || '',
    }
  }

  const linkMode = item.linkMode || 'manual'
  const sourceUrl = nextItem.appleMusic || nextItem.spotify || nextItem.youtubeMusic

  if (linkMode === 'songlink-auto' && sourceUrl) {
    const links = await fetchSongLinkMappings(sourceUrl)
    if (links) {
      nextItem = {
        ...nextItem,
        appleMusic: nextItem.appleMusic || links.appleMusic || '',
        spotify: nextItem.spotify || links.spotify || '',
        youtubeMusic: nextItem.youtubeMusic || links.youtubeMusic || '',
      }
    }
  }

  return nextItem
}
