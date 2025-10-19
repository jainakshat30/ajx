import { NextResponse } from 'next/server'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const origin = process.env.SPOTIFY_REDIRECT_BASE || url.origin

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const redirect_uri = `${origin}/api/spotify/callback`

  if (!client_id || !client_secret) {
    return NextResponse.json({ error: 'Missing Spotify client credentials' }, { status: 500 })
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri,
  })

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  const data = await res.json()

  // For security: show brief instructions and the refresh token so user can copy it into their env
  // Don't persist tokens server-side in this example.
  if (!data.refresh_token) {
    return NextResponse.json({ error: 'No refresh token returned', details: data }, { status: 500 })
  }

  const html = `<html><body>
    <h2>Spotify Authorization Successful</h2>
    <p>Please copy the refresh token below and add it to your environment variables as <code>SPOTIFY_REFRESH_TOKEN</code>.</p>
    <pre style="padding:12px;background:#f6f8fa;border-radius:6px;">${data.refresh_token}</pre>
    <p>After adding it to your environment, redeploy the site. You can close this window.</p>
  </body></html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}
