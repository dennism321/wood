import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

// Plain file, so it also works in the static GitHub Pages preview.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
