import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArchiveBySlugPath, getArchives } from '@/lib/archives'
import { formatDateLabel } from '@/lib/archive-utils'

type RouteParams = {
  category: string
  slug?: string[]
}

type PageProps = {
  params: Promise<RouteParams>
}

export async function generateStaticParams() {
  const items = await getArchives()

  return items
    .filter((item) => item.slugPath)
    .map((item) => {
      const segments = (item.slugPath || '').split('/').filter(Boolean)
      const [category, ...rest] = segments
      return {
        category,
        slug: rest,
      }
    })
}

function buildPath(params: RouteParams) {
  const parts = [params.category, ...(params.slug || [])]
  return parts.join('/')
}

function renderLinkifiedText(text: string) {
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlPattern)
  const isUrl = (value: string) => /^https?:\/\/[^\s]+$/.test(value)

  return parts.map((part, index) => {
    if (isUrl(part)) {
      return (
        <a key={`url-${index}`} className="archive-detail-description-link" href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      )
    }

    return <span key={`text-${index}`}>{part}</span>
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const routeParams = await params
  const item = await getArchiveBySlugPath(buildPath(routeParams))
  if (!item) return { title: 'Archive | Chanmin Kim' }

  const title = `${item.title || 'Archive'} | Archives | Chanmin Kim`
  const description = item.description || item.artist || 'Chanmin Kim Archives'
  
  return {
    title,
    description,
    openGraph: {
      title: item.title || 'Archive',
      description,
      images: item.image ? [item.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: item.image ? [item.image] : undefined,
    }
  }
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const routeParams = await params
  const item = await getArchiveBySlugPath(buildPath(routeParams))

  if (!item) notFound()

  const backHref = item.folderId ? `/archives?category=${encodeURIComponent((item.category || '').toLowerCase())}&folder=${encodeURIComponent(item.folderId)}` : '/archives'

  const dateLabel = formatDateLabel({ date: item.date, unreleased: item.unreleased })
  const hasKicker = Boolean(dateLabel || item.artist)
  const imageList = item.images?.length ? item.images : (item.image ? [item.image] : [])

  return (
    <main>
      <article className="page-shell">
        <header>
          <a className="back-link" href={backHref} aria-label="Back to archives">
            ← Back
          </a>
          <h1 className="archive-detail-title">{item.title || 'Untitled'}</h1>

        {hasKicker ? (
          <div className="archive-detail-page-kicker">
            {dateLabel ? <span>{dateLabel}</span> : null}
            {item.artist ? <span>{item.artist}</span> : null}
          </div>
        ) : null}

        </header>

        <section className="archive-detail-links" aria-label="External Links">
          {item.appleMusic ? (
            <a href={item.appleMusic} target="_blank" rel="noreferrer">
              Apple Music
            </a>
          ) : null}
          {item.spotify ? (
            <a href={item.spotify} target="_blank" rel="noreferrer">
              Spotify
            </a>
          ) : null}
          {item.youtubeMusic ? (
            <a href={item.youtubeMusic} target="_blank" rel="noreferrer">
              YouTube Music
            </a>
          ) : null}
          {item.link ? (
            <a href={item.link} target="_blank" rel="noreferrer">
              Link
            </a>
          ) : null}
        </section>

        {imageList.length ? (
          <div className="archive-detail-hero relative">
            <Image src={imageList[0]} alt={item.title || 'Archive image'} fill sizes="(max-width: 768px) 100vw, 48rem" className="object-contain" priority />
          </div>
        ) : null}

        {imageList.length > 1 ? (
          <div className="archive-detail-gallery" aria-label="Additional images">
            {imageList.slice(1).map((src, index) => (
              <div key={`${item.id}-detail-${src}-${index}`} className="archive-detail-gallery-item relative">
                <Image src={src} alt={`${item.title || 'Archive image'} ${index + 2}`} fill sizes="(max-width: 768px) 50vw, 16rem" className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}

        {item.description ? <p className="archive-detail-description">{renderLinkifiedText(item.description)}</p> : null}
      </article>
    </main>
  )
}
