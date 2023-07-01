import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}
export default function handler(req: NextRequest) {
  const lat = req.geo?.latitude ?? -33.918861
  const lng = req.geo?.longitude ?? 18.4233

  return new Response(JSON.stringify({ lat, lng }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
  })
}
