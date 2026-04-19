'use client'

import type { ArchiveTrack } from '@/lib/archives'

export function formatDuration(millis: number) {
  const totalSeconds = Math.floor(millis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatTotalDuration(millis: number) {
  const totalSeconds = Math.floor(millis / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  if (hours > 0) {
    return `${hours} hr ${minutes} min`
  }
  return `${minutes} min ${seconds} sec`
}

export function TracklistViewer({ tracks }: { tracks: ArchiveTrack[] }) {
  const totalTime = tracks.reduce((acc, t) => acc + (t.durationMillis || 0), 0)

  return (
    <div className="archive-detail-tracklist">
      <div className="archive-tracklist-header">
        <h2 className="archive-tracklist-title">TRACKLIST</h2>
        <span className="archive-tracklist-summary">
          {tracks.length} Tracks, {formatTotalDuration(totalTime)}
        </span>
      </div>

      <div className="archive-track-list">
        {tracks.map((track) => (
          <div key={track.id} className="archive-track-item">
            <div className="archive-track-info">
              <span className="archive-track-number">
                {String(track.trackNumber).padStart(2, '0')}
              </span>
              <span className="archive-track-title">
                {track.title}
              </span>
            </div>

            <div className="archive-track-duration">
              {formatDuration(track.durationMillis)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
