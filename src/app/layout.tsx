import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { PreviewWatermark } from "@/components/preview-watermark";
import { baseUrl, localBusinessSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { withBase } from "@/lib/base-path";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "WONK"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — Custom Woodworking & General Contracting in Connecticut`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  category: "Home improvement",
  keywords: [
    "custom woodworking Connecticut",
    "custom cabinetry Bristol CT",
    "kitchen remodel Litchfield County",
    "bespoke furniture Connecticut",
    "millwork Hartford",
    "general contractor Barkhamsted",
    "Soraghan Woodworking",
  ],
  icons: {
    icon: [{ url: withBase("/icon.svg"), type: "image/svg+xml" }],
    apple: [{ url: withBase("/images/brand/logo.png") }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: baseUrl,
    title: `${site.name} — Custom Woodworking & General Contracting`,
    description: site.shortDescription,
    images: [
      {
        url: "/images/gallery/g02.jpg",
        width: 1600,
        height: 1067,
        alt: "Custom kitchen with blue island built by Soraghan Woodworking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Custom Woodworking in Connecticut`,
    description: site.shortDescription,
    images: ["/images/gallery/g02.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#221b14",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = localBusinessSchema();
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pb-16 lg:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <PreviewWatermark />
        <script
          type="application/ld+json"
          // LocalBusiness structured data for search + AI answer engines.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
