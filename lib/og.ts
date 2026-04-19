import type { ArchiveItem } from './archives'

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
      headers: { 'User-Agent': 'bot' },
      redirect: 'follow',
    })

    if (!response.ok) return null

    const html = await response.text()
    const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)

    return match?.[1] || null
  } catch {
    return null
  }
}

export async function hydrateScrapItem(item: ArchiveItem): Promise<ArchiveItem> {
  if (item.category !== 'Scrap') return item
  if (item.image || !item.link) return item

  const ogImage = await fetchOgImage(item.link)
  if (!ogImage) return item

  return { ...item, image: ogImage }
}
