import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { ImageResponseOptions } from '@vercel/og/dist/types'

export const config = {
  runtime: 'edge',
}

export const alt = 'GetMyBoat Engineering Values, by Michael McGreal'

export default function handler(req: NextRequest) {
  const country = req.geo?.country

  const el = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(https://www.getmyboat.com/static-images/fb-open-graph.png)`,
      }}>
      <div
        style={{
          display: 'flex',
          width: '700px',
          height: '100px',
          marginLeft: 60,
          marginBottom: '5px',
          border: '2px solid lightgray',
          alignItems: 'center',
          fontSize: 40,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          color: '#5d6466',
          justifyItems: 'center',
        }}>
        <p>{`Ahoy ${country}!`}</p>
        <div>🐬</div>
      </div>
    </div>
  )

  const opts: ImageResponseOptions = {
    width: 1080,
    height: 565,
    status: 200,
    emoji: 'twemoji',
  }

  return new ImageResponse(el, opts)
}
