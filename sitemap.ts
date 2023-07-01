import { MetadataRoute } from 'next'
export const baseUrl =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000'
    : 'https://gmb-eng-values.vercel.app'

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
