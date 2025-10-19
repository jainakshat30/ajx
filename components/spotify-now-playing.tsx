"use client"

import { useEffect, useState } from 'react'

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

  async function fetchNow() {
    try {
      const res = await fetch('/api/spotify/now-playing')
      const json = await res.json()
      setData(json)
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
  if (!data) return <div className="text-xs text-neutral-500">No data</div>
  if (data.error) return <div className="text-xs text-red-500">Error: {data.error}</div>
  if (!data.playing) return <div className="text-xs text-neutral-500">Not playing</div>

  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-neutral-300 dark:text-neutral-400">Akshat is now listening to :</div>
      <a
      href={data.external_url || '#'}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center gap-3 rounded-md border border-neutral-800/40 p-2 hover:shadow-sm bg-neutral-900/10"
    >
      {data.albumImage ? (
        <img src={data.albumImage} alt={data.album} className="h-12 w-12 rounded-sm object-cover" />
      ) : (
        <div className="h-12 w-12 rounded-sm bg-neutral-800" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <img src="/Spotify_Primary_Logo_RGB_Black.png" alt="Spotify" className="h-4 w-4 shrink-0 object-contain" />
          <div className="font-medium text-white text-sm truncate">{data.title}</div>
        </div>
        <div className="text-xs text-neutral-300 truncate">{data.artists}</div>
      </div>
    </a>
    </div>
  )
}

export default SpotifyNowPlaying
