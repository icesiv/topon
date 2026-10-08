import type { Metadata } from "next";
import ArticlesDirectory from "@/components/ArticlesDirectory";
import { DEFAULT_ARTICLES, fetchArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Freight Forwarding & Supply Chain Articles | Top On Group",
  description:
    "Explore authoritative insights on freight forwarding, Chittagong Port operations, C&F customs clearance, ASYCUDA World, and multimodal supply chains in Bangladesh.",
  keywords: [
    "Freight Forwarding Bangladesh",
    "Chittagong Port Logistics",
    "Customs Clearing C&F Bangladesh",
    "ASYCUDA World Bangladesh",
    "Ocean Freight Dhaka",
    "Daily Shipping & Logistics Articles",
    "Top Express Customs Insights",
    "Bangladesh Supply Chain Guide",
  ],
};

export default async function ArticlesPage() {
  const articles = await fetchArticles();
  return <ArticlesDirectory initialArticles={articles.length > 0 ? articles : DEFAULT_ARTICLES} />;
}
