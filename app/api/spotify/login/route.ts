import { NextResponse } from 'next/server'

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const base = process.env.SPOTIFY_REDIRECT_BASE || url.origin
  const redirect_uri = `${base}/api/spotify/callback`
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const scope = encodeURIComponent('user-read-currently-playing user-read-playback-state')

  if (!client_id) {
    return NextResponse.json({ error: 'Missing SPOTIFY_CLIENT_ID env' }, { status: 500 })
  }

  const authUrl = `${SPOTIFY_AUTH_URL}?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}`

  // Debug mode: return the constructed URL so you can verify the redirect URI
  if (url.searchParams.get('debug') === '1') {
    return NextResponse.json({ authUrl, redirect_uri })
  }

  return NextResponse.redirect(authUrl)
}
