import type { MetadataRoute } from 'next';
import { siteMetadata } from '@/config/siteMetadata';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata().siteUrl}/sitemap.xml`,
    host: siteMetadata().siteUrl,
  };
}
