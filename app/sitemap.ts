import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.toponbd.com";

  const staticRoutes = [
    "",
    "/about",
    "/about/about-ceo",
    "/about/journey",
    "/about/message",
    "/about/values",
    "/about/milestones",
    "/divisions",
    "/divisions/trading-topontech",
    "/divisions/express-topexpress",
    "/divisions/logistics-dailyshipping",
    "/divisions/agro-toponagro",
    "/divisions/consultancy-toponsolution",
    "/services",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}
