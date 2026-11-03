import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GalleryBoard } from "@/components/gallery-board";
import { CtaBand, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { getGalleryItems } from "@/lib/gallery-server";
import { gallerySeed, shopVideo, site } from "@/lib/site";
import { withBase } from "@/lib/base-path";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { ArrowUpRight, Instagram } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Project Gallery — Kitchens, Bars, Millwork & Homes",
  description:
    "Browse Soraghan Woodworking's interactive project gallery: custom kitchens, mahogany bars, libraries, stair rails, millwork and custom homes across Connecticut. Like, save and explore by category.",
  path: "/gallery",
  image: "/images/gallery/g05.jpg",
  keywords: [
    "custom kitchen gallery Connecticut",
    "woodworking portfolio CT",
    "mahogany bar builder",
    "custom cabinetry photos",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export default async function GalleryPage() {
  const items = await getGalleryItems();

  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Soraghan Woodworking project gallery",
      description:
        "Custom kitchens, bars, libraries, millwork and homes built by Soraghan Woodworking in Connecticut.",
      about: "Custom woodworking and general contracting",
      image: gallerySeed.slice(0, 8).map((item) => item.imageUrl),
      isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={`Instagram feed · ${site.instagramHandle}`}
        title={
          <>
            The work, close up — {" "}<span className="italic text-brass-soft">and interactive.</span>
          </>
        }
        intro="Tap a photo for the full story. Like the rooms you love, save them to your own board, flip through the stories, and send us the one you want to live in."
        trail={trail}
        image="/images/gallery/g05.jpg"
        imageAlt="Mahogany bar with spiral columns and coffered ceiling"
        actions={false}
      />

      <section className="bg-cream py-10 sm:py-14">
        <div className="shell">
          <GalleryBoard initialItems={items} />

          <div className="mt-12 grid gap-6 rounded-sm border border-ink/10 bg-parchment p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div>
              <Eyebrow>More every week</Eyebrow>
              <h2 className="mt-2 font-display text-2xl">The feed lives on Instagram first.</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/65">
                We post shop progress, finish samples and finished rooms as they happen. Follow{" "}
                {site.instagramHandle} and send a DM with the photo you want to talk about.
              </p>
            </div>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-dark"
            >
              <Instagram className="h-4 w-4" /> Follow us <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-center text-[0.7rem] uppercase tracking-[0.14em] text-ink/40">
            Photography from completed Soraghan Woodworking projects
          </p>
        </div>
      </section>

      <section className="bg-espresso py-14 text-cream sm:py-20" aria-labelledby="shop-video-title">
        <div className="shell grid items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-sm border border-cream/15 bg-ink shadow-2xl">
            <video
              className="block aspect-[9/16] h-auto w-full object-cover"
              src={withBase(shopVideo.src)}
              poster={withBase(shopVideo.poster)}
              controls
              playsInline
              preload="none"
              aria-label={shopVideo.title}
            />
          </div>
          <div>
            <Eyebrow tone="light">From the shop floor</Eyebrow>
            <h2 id="shop-video-title" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              {shopVideo.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70">
              &ldquo;{shopVideo.caption}&rdquo; Forty-five seconds, start to finish — the same way
              every piece leaves our Barkhamsted shop.
            </p>
            <ol className="mt-6 space-y-3">
              {shopVideo.steps.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm text-cream/80">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brass/50 font-display text-brass">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={shopVideo.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brass-soft hover:text-brass"
            >
              <Instagram className="h-4 w-4" /> Watch on Instagram <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Behind the photographs"
            title="What you are looking at."
            intro="A finished photograph hides a lot of decisions. These are the details we actually spend our time on."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "The joinery",
                body: "Dovetailed drawers, mortise-and-tenon frames, hand-fitted doors. The parts that are never in the photograph are the parts that last.",
                image: "/images/gallery/g09.jpg",
                alt: "Curved walnut handrail with carved volute",
              },
              {
                title: "The finish",
                body: "Sprayed in the shop, not in your home. Hard-wax oil for tactile furniture, catalyzed lacquer where a surface works hard.",
                image: "/images/gallery/g08.jpg",
                alt: "Inset cabinetry with brass hardware and glass doors",
              },
              {
                title: "The room",
                body: "Timber, plaster, stone and light. We design millwork in context, so the new work reads as original to the house.",
                image: "/images/gallery/g02.jpg",
                alt: "Kitchen with timber beams and a painted island",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-sm border border-ink/10 bg-white"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
            >
              Explore the services behind the work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Found the room you want?"
        intro="Send us the photo and your dimensions. We will tell you what it would take to build it in your house — honestly, and to the inch."
      />
    </>
  );
}
