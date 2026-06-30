import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://worklife.alight.com/ah-angular-afirst-web'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
