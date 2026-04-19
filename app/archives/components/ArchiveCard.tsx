'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ArchiveItem } from '@/lib/archives'
import { safeCategoryLabel, safeTitle } from '../utils/folder-utils'
import { PinIcon } from './ArchiveIcons'

export function ArchiveCard({
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
          {(displayTitle || item.pinned || item.artist) ? (
            <div className="archive-card-title justify-between">
              <div className="archive-card-title-row">
                {item.pinned ? <PinIcon className="archive-pin-icon flex-shrink-0" /> : null}
                <div className="title-container flex-1 min-w-0">
                  <span className="marquee-text">
                    {displayTitle ? displayTitle : null}
                    {item.category === 'Music' && item.artist ? (
                      <span className="archive-card-artist whitespace-pre">
                        {displayTitle ? ' - ' : ''}{item.artist}
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  )
}
