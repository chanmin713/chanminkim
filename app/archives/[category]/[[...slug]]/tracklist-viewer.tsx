'use client'

import { useState, useRef, useEffect } from 'react'
import type { ArchiveTrack } from '@/lib/archives'

export function formatDuration(millis: number) {
  const totalSeconds = Math.floor(millis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatTotalDuration(millis: number) {
  const totalSeconds = Math.floor(millis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `총 ${minutes}분 ${seconds}초`
}

export function TracklistViewer({ tracks }: { tracks: ArchiveTrack[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const totalTime = tracks.reduce((acc, t) => acc + (t.durationMillis || 0), 0)

  useEffect(() => {
    if (audioRef.current) {
      if (playingId) {
        audioRef.current.play().catch(() => setPlayingId(null))
      } else {
        audioRef.current.pause()
      }
    }
  }, [playingId])

  const togglePlay = (track: ArchiveTrack) => {
    if (!track.previewUrl) return
    if (playingId === track.id) {
      setPlayingId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl
      }
      setPlayingId(track.id)
    }
  }

  return (
    <div className="archive-detail-tracklist mt-12 pt-8 border-t border-gray-100">
      <audio
        ref={audioRef}
        onEnded={() => setPlayingId(null)}
        className="hidden"
        preload="none"
      />
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold m-0 text-gray-800 tracking-wider">TRACKLIST</h2>
        <span className="text-xs text-gray-400 font-medium tracking-wide">
          {tracks.length}곡, {formatTotalDuration(totalTime)}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {tracks.map((track) => (
          <div 
            key={track.id} 
            className="flex items-center justify-between py-2 border-b border-gray-50/50 group hover:bg-gray-50/50 transition-colors rounded px-1 -mx-1"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-gray-400 text-[11px] w-4 text-right tabular-nums flex-shrink-0">
                {track.trackNumber}
              </span>
              
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {track.title}
                </span>
                {track.artist ? (
                  <span className="text-[11px] text-gray-500 truncate">
                    {track.artist}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-3 pl-4 flex-shrink-0">
              <span className="text-[11px] text-gray-400 tabular-nums">
                {formatDuration(track.durationMillis)}
              </span>
              {track.previewUrl ? (
                <button
                  onClick={() => togglePlay(track)}
                  className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors focus:outline-none ${playingId === track.id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                  aria-label={playingId === track.id ? "Pause preview" : "Play preview"}
                >
                  {playingId === track.id ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-[1px]"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
              ) : (
                <div className="w-6 h-6" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
