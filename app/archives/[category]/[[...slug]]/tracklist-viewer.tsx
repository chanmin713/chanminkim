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
    <div className="archive-detail-tracklist mt-12 pt-8 border-t border-gray-100/50">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold m-0 text-gray-800 tracking-wider">TRACKLIST</h2>
        <span className="text-[11px] text-gray-400 tracking-wide uppercase">
          {tracks.length} Tracks, {formatTotalDuration(totalTime)}
        </span>
      </div>

      <div className="flex flex-col gap-[0.15rem]">
        {tracks.map((track) => (
          <div 
            key={track.id} 
            className="flex items-center justify-between py-[0.4rem] border-b border-gray-50/50 group hover:opacity-75 transition-opacity"
          >
            <div className="flex items-center min-w-0 flex-1">
              <span className="text-gray-400 text-[10px] w-6 text-left tabular-nums flex-shrink-0 tracking-widest">
                {String(track.trackNumber).padStart(2, '0')}
              </span>
              
              <div className="flex flex-col min-w-0 flex-1 pl-1">
                <span className="text-[0.85rem] text-gray-800 truncate">
                  {track.title}
                </span>
              </div>
            </div>

            <div className="flex items-center pl-4 flex-shrink-0">
              <span className="text-[11px] text-gray-400 tabular-nums">
                {formatDuration(track.durationMillis)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
