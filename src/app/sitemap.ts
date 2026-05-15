import type { MetadataRoute } from 'next';
import { MOCK_BUSINESSES } from '@/data/mock-businesses';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://construction.lk';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Business Profile routes (from mock data)
  const businessRoutes: MetadataRoute.Sitemap = MOCK_BUSINESSES.map((business) => ({
    url: `${baseUrl}/business/${business.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...businessRoutes];
}
