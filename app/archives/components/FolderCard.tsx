'use client'

import { PinIcon } from './ArchiveIcons'
import { safeCategoryLabel, type ArchiveFolderNode } from '../utils/folder-utils'

export function FolderCard({
  folder,
  onOpen,
  showCategory,
}: {
  folder: ArchiveFolderNode
  onOpen: (folderId: string) => void
  showCategory: boolean
}) {
  return (
    <button type="button" className="archive-folder-card archive-card-link" onClick={() => onOpen(folder.id)}>
      <article className="archive-card">
        <div className="flex flex-col gap-1">
          {showCategory ? <div className="archive-card-kicker">{safeCategoryLabel(folder.category)}</div> : null}
          <div className="archive-card-media archive-folder-media" aria-hidden="true">
            <img className="archive-folder-media-icon" src="/folder.webp" alt="" />
          </div>
        </div>

        <div className="archive-card-copy">
          <div className="archive-card-title">
            <div className="archive-card-title-row">
              {folder.pinned ? <PinIcon className="archive-pin-icon flex-shrink-0" /> : null}
              <span>{folder.name}</span>
            </div>
          </div>
        </div>
      </article>
    </button>
  )
}
