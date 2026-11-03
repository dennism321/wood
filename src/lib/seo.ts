import type { Metadata } from "next";
import { faqs, site, formatAddress, type Faq } from "./site";

export const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.soraghanwoodworking.net"
).replace(/\/$/, "");

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/gallery/g02.jpg",
  type = "website",
  keywords,
}: PageMetaInput): Metadata {
  const url = `${baseUrl}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type,
      images: [{ url: image, width: 1600, height: 1067, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "FurnitureStore", "GeneralContractor"],
    "@id": `${baseUrl}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: baseUrl,
    logo: `${baseUrl}/images/brand/logo.png`,
    image: [`${baseUrl}/images/gallery/g02.jpg`, `${baseUrl}/images/gallery/g05.jpg`],
    description: site.shortDescription,
    telephone: site.phone,
    email: site.email,
    foundingDate: "1987",
    founder: [
      { "@type": "Person", name: "Paul Soraghan" },
      { "@type": "Person", name: "Brian Soraghan" },
    ],
    address: [
      {
        "@type": "PostalAddress",
        name: site.office.label,
        streetAddress: site.office.street,
        addressLocality: site.office.city,
        addressRegion: site.office.state,
        postalCode: site.office.zip,
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        name: site.shop.label,
        streetAddress: site.shop.street,
        addressLocality: site.shop.city,
        addressRegion: site.shop.state,
        postalCode: site.shop.zip,
        addressCountry: "US",
      },
    ],
    areaServed: [
      "Connecticut",
      "New York",
      "Massachusetts",
      "Vermont",
      "New Hampshire",
      "Litchfield County",
      "Hartford County",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    sameAs: [site.instagramUrl, site.houzzUrl],
    priceRange: "$$$",
    slogan: site.tagline,
    knowsAbout: [
      "custom cabinetry",
      "bespoke furniture",
      "architectural millwork",
      "kitchen remodeling",
      "general contracting",
      "historic restoration",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Woodworking and construction services",
      itemListElement: [
        "Custom kitchens",
        "Custom cabinetry and millwork",
        "Bars and libraries",
        "Custom homes and additions",
        "Bespoke furniture",
        "Historic restoration",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function faqSchema(items: Pick<Faq, "q" | "a">[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    image: `${baseUrl}${input.image}`,
    mainEntityOfPage: `${baseUrl}${input.path}`,
    author: { "@type": "Organization", name: site.name, url: baseUrl },
    publisher: { "@type": "Organization", name: site.name, url: baseUrl },
  };
}

export const addressLine = formatAddress(site.office);
