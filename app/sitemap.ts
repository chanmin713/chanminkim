import type { MetadataRoute } from 'next'
import { getArchives } from '@/lib/archives'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const archives = await getArchives()

  const archiveEntries: MetadataRoute.Sitemap = archives
    .filter((item) => item.slugPath)
    .map((item) => ({
      url: `https://chanminkim.com/archives/${item.slugPath}`,
    }))

  return [
    { url: 'https://chanminkim.com' },
    { url: 'https://chanminkim.com/archives' },
    { url: 'https://chanminkim.com/experience/bio-lounge' },
    { url: 'https://chanminkim.com/experience/esoop' },
    { url: 'https://chanminkim.com/experience/gustovenue' },
    { url: 'https://chanminkim.com/experience/pluto' },
    { url: 'https://chanminkim.com/experience/csm17' },
    { url: 'https://chanminkim.com/awards/kaps-startup-competition' },
    { url: 'https://chanminkim.com/awards/qwen-base-skyst-finalist' },
    ...archiveEntries,
  ]
}
