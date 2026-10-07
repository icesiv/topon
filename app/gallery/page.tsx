import type { Metadata } from "next";
import PublicGallery from "@/components/PublicGallery";
import { DEFAULT_GALLERY, fetchGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Corporate & Port Operations Photo Gallery | Top On Group",
  description:
    "Explore photographic highlights of Top On Group's maritime port operations, international trade delegations, executive leadership summits, and logistics fleet.",
  keywords: [
    "Top On Group Gallery",
    "Chittagong Port Operations Photos",
    "Md. Abdullah Al Mamun Photos",
    "Daily Shipping Logistics Gallery",
    "Bangladesh Freight Forwarding Photos",
    "Customs Clearing C&F Operations",
    "Top On Group Media",
  ],
};

export default async function GalleryPage() {
  const items = await fetchGallery();
  return <PublicGallery initialItems={items.length > 0 ? items : DEFAULT_GALLERY} />;
}
