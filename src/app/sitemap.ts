import type { MetadataRoute } from "next";
import { services } from "@/lib/site";
import { journalPosts } from "@/lib/journal";
import { baseUrl } from "@/lib/seo";

// Plain file, so it also works in the static GitHub Pages preview.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.85, changeFrequency: "yearly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/our-process", priority: 0.75, changeFrequency: "yearly" },
    { path: "/service-area", priority: 0.75, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/journal", priority: 0.7, changeFrequency: "weekly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...journalPosts.map((post) => ({
      url: `${baseUrl}/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
