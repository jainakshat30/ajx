"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'

type NowPlaying = {
  playing: boolean
  title?: string
  artists?: string
  album?: string
  albumImage?: string | null
  external_url?: string | null
  error?: string
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlaying | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastTrack, setLastTrack] = useState<NowPlaying | null>(null)
  
  // Load persisted last track from localStorage (so it survives reloads)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('spotify_last_track')
      if (raw) {
        setLastTrack(JSON.parse(raw))
      }
    } catch (e) {
      // ignore
    }
  }, [])
  async function fetchNow() {
    try {
      const res = await axios.get('/api/spotify/now-playing')
      const json = res.data
      setData(json)
      // If the API returned a track (title present), update lastTrack
      if (json && json.title) {
        setLastTrack(json)
        try {
          localStorage.setItem('spotify_last_track', JSON.stringify(json))
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNow()
    const id = setInterval(fetchNow, 15000)
    return () => clearInterval(id)
  }, [])

  if (loading) return <div className="text-xs text-neutral-500">Loading Spotify…</div>
  if (!data && !lastTrack) return <div className="text-xs text-neutral-500">No data</div>
  if (data && data.error) return <div className="text-xs text-red-500">Error: {data.error}</div>

  // Prefer live data if playing, otherwise fall back to lastTrack
  const display = data && data.playing ? data : lastTrack || data
  const isLive = Boolean(data && data.playing)

  if (!display || !display.title) return <div className="text-xs text-neutral-500">akshat is not listening to any songs right now</div>

  return (
    <div className="w-full">
  <div className="mb-2 text-xs text-neutral-300 dark:text-neutral-400">{isLive ? 'Akshat is now listening to :' : 'Last played:'}</div>
      <a
      href={display.external_url || '#'}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center gap-3 rounded-md border border-neutral-800/40 p-2 hover:shadow-sm bg-neutral-900/10"
    >
      {display.albumImage ? (
        <img src={display.albumImage} alt={display.album} className="h-12 w-12 rounded-sm object-cover" />
      ) : (
        <div className="h-12 w-12 rounded-sm bg-neutral-800" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <img src="/Spotify_Primary_Logo_RGB_Black.png" alt="Spotify" className="h-4 w-4 shrink-0 object-contain" />
          <div className="font-medium text-white text-sm truncate">{display.title}</div>
        </div>
        <div className="text-xs text-neutral-300 truncate">{display.artists}</div>
      </div>
    </a>
    </div>
  )
}

export default SpotifyNowPlaying
