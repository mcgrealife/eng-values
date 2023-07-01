import { MetadataRoute } from 'next'
export const baseUrl =
  process.env.NODE_ENV == 'production'
    ? 'https://gmb.vercel.app'
    : 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
  ]
}
