import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a plain-files copy of the site for GitHub Pages
 * (see .github/workflows/pages.yml). Without it, this is the full app with
 * the database, forms and API.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(staticExport && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  }),
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: staticExport ? "1" : "0",
  },
};

export default nextConfig;
