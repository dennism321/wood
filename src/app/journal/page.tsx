import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { journalPosts } from "@/lib/journal";
import { site } from "@/lib/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Journal — Notes on Materials, Cost & Craft",
  description:
    "Practical guides from Soraghan Woodworking: custom kitchen costs in Connecticut, renovation timelines, choosing wood species and inset cabinetry, written by the people who build the work.",
  path: "/journal",
  image: "/images/gallery/g08.jpg",
  keywords: ["custom kitchen cost guide", "woodworking blog Connecticut", "cabinetry advice"],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Journal", path: "/journal" },
];

export default function JournalPage() {
  const [lead, ...rest] = journalPosts;

  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${site.name} journal`,
      description: "Notes on materials, cost and craft from a Connecticut woodworking shop.",
      url: `${site.url}/journal`,
      blogPost: journalPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${site.url}/journal/${post.slug}`,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Journal · practical guidance"
        title={
          <>
            Notes from the bench, {" "}<span className="italic text-brass-soft">not the brochure.</span>
          </>
        }
        intro="Costs, timelines, materials and craft decisions — written to help you make a better choice, whether you hire us or not."
        trail={trail}
        actions={false}
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell">
          <Link
            href={`/journal/${lead.slug}`}
            className="group grid overflow-hidden rounded-sm border border-ink/10 bg-white md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[22rem]">
              <Image
                src={lead.hero}
                alt={lead.heroAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <p className="eyebrow text-brass-deep">
                Featured · {lead.category} · {lead.readingTime}
              </p>
              <h2 className="mt-3 font-display text-[1.7rem] leading-tight sm:text-3xl">
                {lead.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{lead.description}</p>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.14em] text-ink/40">
                {lead.dateLabel}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut group-hover:text-brass-deep">
                Read the article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="mt-10">
            <SectionHeading eyebrow="All articles" title="More from the journal" />
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group card-hover flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.hero}
                      alt={post.heroAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[0.6rem] uppercase tracking-[0.14em] text-brass-deep">
                      {post.category} · {post.readingTime}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg leading-snug">{post.title}</h3>
                    <p className="mt-2 flex-1 text-[0.83rem] leading-relaxed text-ink/60">
                      {post.description}
                    </p>
                    <span className="mt-3 text-[0.62rem] uppercase tracking-[0.12em] text-ink/40">
                      {post.dateLabel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-brass/40 bg-brass/10 px-5 py-4">
            <p className="text-sm text-ink/75">
              <span className="font-semibold">Have a question we have not written about?</span> Send
              it over — the best articles start as client questions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
            >
              Ask the shop <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
