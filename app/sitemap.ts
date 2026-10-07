import { MetadataRoute } from "next";
import { DEFAULT_ARTICLES } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.toponbd.com";
  const now = new Date();

  const articleRoutes: MetadataRoute.Sitemap = DEFAULT_ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    // 1. Primary Homepage
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // 2. Core Division Pages (High Priority)
    {
      url: `${baseUrl}/divisions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/divisions/trading-topontech`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/divisions/express-topexpress`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/divisions/logistics-dailyshipping`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/divisions/agro-toponagro`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/divisions/consultancy-toponsolution`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // 3. Corporate Hub Pages
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...articleRoutes,
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // 4. Executive & Leadership Information
    {
      url: `${baseUrl}/about/about-ceo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about/message`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about/journey`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/values`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/milestones`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
