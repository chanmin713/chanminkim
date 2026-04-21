import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://chanminkim.com' },
    { url: 'https://chanminkim.com/experience/bio-lounge' },
    { url: 'https://chanminkim.com/experience/esoop' },
    { url: 'https://chanminkim.com/experience/gustovenue' },
    { url: 'https://chanminkim.com/experience/pluto' },
    { url: 'https://chanminkim.com/experience/csm17' },
    { url: 'https://chanminkim.com/awards/kaps-startup-competition' },
    { url: 'https://chanminkim.com/awards/qwen-base-skyst-finalist' },
  ]
}
