import { NextResponse } from 'next/server'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

let cachedAccessToken: string | null = null
let tokenExpiresAt = 0

async function getAccessToken() {
  const now = Date.now()
  if (cachedAccessToken && now < tokenExpiresAt) return cachedAccessToken

  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Spotify credentials (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN)')
  }

  const body = new URLSearchParams({ grant_type: 'refresh_token', refresh_token })

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { Authorization: `Basic ${authHeader}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error('Failed to refresh token: ' + text)
  }

  const data = await res.json()
  cachedAccessToken = data.access_token
  // expires_in is seconds
  tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000 - 5000
  return cachedAccessToken
}

export async function GET() {
  try {
    const token = await getAccessToken()
    const res = await fetch(NOW_PLAYING_URL, { headers: { Authorization: `Bearer ${token}` } })

    if (res.status === 204) {
      return NextResponse.json({ playing: false })
    }

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: 500 })
    }

    const data = await res.json()
    // Map to a compact shape
    const item = data.item
    if (!item) return NextResponse.json({ playing: false })

    const payload = {
      playing: data.is_playing,
      title: item.name,
      artists: item.artists.map((a: any) => a.name).join(', '),
      album: item.album.name,
      albumImage: item.album.images?.[0]?.url || null,
      progress_ms: data.progress_ms || 0,
      duration_ms: item.duration_ms || 0,
      external_url: item.external_urls?.spotify || null,
    }

    return NextResponse.json(payload)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
