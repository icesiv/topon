import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.topongroup.com";

  const staticRoutes = [
    "",
    "/home",
    "/about",
    "/trading-topontech",
    "/express-topexpress",
    "/logistics-dailyshipping",
    "/agro-toponagro",
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
