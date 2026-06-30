import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://worklife.alight.com/ah-angular-afirst-web'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/new-user',
          '/new-user-code',
          '/new-user-password',
          '/verify',
          '/verify-choice',
          '/verify-details',
          '/forgot-password',
          '/forgot-password-code',
          '/forgot-password-found',
          '/forgot-password-verify',
          '/blocked',
          '/api',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
