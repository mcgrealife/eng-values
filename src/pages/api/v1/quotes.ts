import { baseQuotes } from '@/lib/quotes'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export type Quote = (typeof quotesWithBase64)[number]

//imgix requires quote as base64
const quotesWithBase64 = baseQuotes.map((q) => ({
  ...q,
  quoteb64: btoa(q.quote),
}))

export default function handler(req: NextRequest) {
  return new Response(JSON.stringify(quotesWithBase64), {
    headers: {
      'content-type': 'application/json',
    },
    status: 200,
  })
}

// from headless CMS
