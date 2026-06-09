import { NextRequest } from 'next/server'

function parseMetaTags(html: string): Record<string, string> {
  const result: Record<string, string> = {}
  const metaRegex = /<meta\s([^>]+)\/?>/gi
  let match

  while ((match = metaRegex.exec(html)) !== null) {
    const attrs = match[1]
    const property =
      attrs.match(/property=["']([^"']+)["']/i)?.[1] ||
      attrs.match(/name=["']([^"']+)["']/i)?.[1]
    const content = attrs.match(/content=["']([^"']+)["']/i)?.[1]

    if (property && content) {
      result[property.toLowerCase()] = content
    }
  }

  return result
}

function getTitleTag(html: string): string {
  return html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || ''
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return Response.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; OneBiteLink/1.0; +https://onebite.link)',
      },
      redirect: 'follow',
    })

    const html = await res.text()
    const meta = parseMetaTags(html)

    const title = meta['og:title'] || meta['twitter:title'] || getTitleTag(html)
    const description =
      meta['og:description'] || meta['twitter:description'] || meta['description'] || ''
    const image = meta['og:image'] || meta['twitter:image'] || ''

    return Response.json({ title, description, image })
  } catch {
    return Response.json({ error: 'Failed to fetch URL' }, { status: 500 })
  }
}
