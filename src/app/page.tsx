import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { WoodSelector } from "@/components/wood-selector";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteForm } from "@/components/quote-form";
import {
  CheckList,
  CtaBand,
  Eyebrow,
  JsonLd,
  SectionHeading,
  ServiceCards,
  StatStrip,
} from "@/components/ui";
import {
  faqs,
  faqCategories,
  gallerySeed,
  processSteps,
  services,
  site,
  values,
} from "@/lib/site";
import { journalPosts } from "@/lib/journal";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, Hammer, Instagram, Ruler, Sparkle } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Custom Woodworking & Cabinetry in Connecticut — Soraghan Woodworking",
  description:
    "Family-owned design-build studio and woodworking shop in Bristol & Barkhamsted, CT. Custom kitchens, cabinetry, millwork, bars, furniture and whole-home construction since 1987. Call 860-379-9837.",
  path: "/",
  keywords: [
    "custom woodworking Connecticut",
    "custom kitchen cabinets Connecticut",
    "bespoke furniture CT",
    "general contractor Litchfield County",
    "millwork Hartford",
  ],
});

const featuredWork = gallerySeed.filter((item) => item.featured).slice(0, 4);

// Hero slideshow: each photo gets its own pan direction (--kb-x / --kb-y) and
// a staggered start so the four cross-fade in a 28s loop.
const heroSlides = [
  {
    src: "/images/gallery/g02.jpg",
    alt: "Custom kitchen with a blue island, marble counters and reclaimed oak beams built by Soraghan Woodworking",
    pan: ["-3%", "-2%"],
  },
  { src: "/images/gallery/g05.jpg", alt: "", pan: ["3%", "-1.5%"] },
  { src: "/images/gallery/hero1.jpg", alt: "", pan: ["-2.5%", "2%"] },
  { src: "/images/gallery/g03.jpg", alt: "", pan: ["2.5%", "1.5%"] },
].map((slide, index) => ({
  ...slide,
  style: {
    "--kb-x": slide.pan[0],
    "--kb-y": slide.pan[1],
    "--slide-delay": `${index * 7 - 1.2}s`,
  } as React.CSSProperties,
}));

export default function HomePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${site.url}/gallery?filter={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Custom woodworking, cabinetry and general contracting",
      provider: { "@type": "HomeAndConstructionBusiness", name: site.name },
      areaServed: ["Connecticut", "New York", "Massachusetts", "Vermont", "New Hampshire"],
      description:
        "Design-build custom kitchens, architectural millwork, bars, libraries, bespoke furniture, additions and whole-home construction across the Litchfield Hills and Greater Hartford.",
    },
    faqSchema(faqs.slice(0, 6)),
  ];

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        {/* Cross-fading slideshow with a slow pan-and-zoom on each photo */}
        {/* Brighter on phones, where the text and overlay cover most of the photo */}
        <div className="hero-slides absolute inset-0 opacity-80 sm:opacity-60">
          {heroSlides.map((slide, index) => (
            <div key={slide.src} className="hero-slide" style={slide.style}>
              <Image
                src={slide.src}
                alt={index === 0 ? slide.alt : ""}
                aria-hidden={index === 0 ? undefined : true}
                fill
                priority={index === 0}
                sizes="100vw"
                className="hero-slide-img object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        <div className="shell relative z-10 flex min-h-[76svh] flex-col justify-end pb-12 pt-16 sm:min-h-[80svh] sm:pb-16 lg:min-h-[86svh] lg:pb-20">
          <div className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3 text-brass-soft">
              <span className="inline-block h-px w-8 bg-brass" />
              Est. 1987 · Litchfield Hills &amp; Greater Hartford
            </p>
            <h1 className="mt-4 text-[2.35rem] leading-[1.02] text-cream sm:text-6xl lg:text-[4.35rem]">
              Woodwork that{" "}
              <span className="block italic text-brass-soft">belongs in the house</span>{" "}
              it was built for.
            </h1>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-cream/75 sm:text-lg">
              A family-owned design-build studio and working woodshop. We draw, mill and install
              custom kitchens, cabinetry, bars and furniture — and build the homes they live in.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/gallery" className="btn btn-ghost-light">
                Explore the gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-cream/60">
              <li>Master joiners · trained in Ireland</li>
              <li aria-hidden="true" className="text-brass">
                ◆
              </li>
              <li>Four decades in Connecticut</li>
              <li aria-hidden="true" className="text-brass">
                ◆
              </li>
              <li>CT · NY · MA · VT · NH</li>
            </ul>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-10 hidden w-[19rem] border-l border-t border-cream/15 bg-espresso/90 p-5 backdrop-blur lg:block">
          <p className="eyebrow text-brass">Now in the shop</p>
          <p className="mt-2 font-display text-lg leading-snug">
            A mahogany pub bar with hand-turned columns
          </p>
          <Link
            href="/gallery#mahogany-pub-bar"
            className="mt-3 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream/75 hover:text-brass-soft"
          >
            See the build <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <StatStrip tone="dark" />

      {/* INTRO / WHO WE ARE (AEO answer block) */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="/images/gallery/g05.jpg"
                  alt="Handcrafted mahogany bar with spiral columns and coffered ceiling by Soraghan Woodworking"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 hidden w-48 overflow-hidden rounded-sm border-4 border-cream shadow-lg sm:block lg:-right-8 lg:w-56">
                <Image
                  src="/images/gallery/g09.jpg"
                  alt="Curved walnut handrail with a carved volute over turned white spindles"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -left-2 -top-4 hidden rounded-sm bg-ink px-4 py-3 text-cream shadow-xl sm:block">
                <p className="font-display text-2xl leading-none text-brass-soft">1987</p>
                <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-cream/60">
                  Founded in CT
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-3 text-[1.9rem] leading-[1.1] sm:text-4xl">
              One team, one roof, one accountable standard.
            </h2>
            <p className="mt-4 text-[0.97rem] leading-relaxed text-ink/70">
              Soraghan Woodworking is a family-owned-and-operated construction and woodworking firm
              founded in 1987 by brothers <strong className="font-semibold">Paul and Brian Soraghan</strong>.
              They learned their trade in Ireland with master joiners, then brought that standard to
              northwest Connecticut.
            </p>
            <p className="mt-3 text-[0.97rem] leading-relaxed text-ink/70">
              Design, general contracting and a fully equipped shop in Barkhamsted sit under one
              company — so drawings, timber and installation are never handed between strangers.
            </p>
            <div className="mt-6">
              <CheckList
                items={[
                  "Custom kitchens, baths and cabinetry",
                  "Architectural millwork and period restoration",
                  "Bars, libraries and statement rooms",
                  "Additions, new homes and general contracting",
                ]}
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-dark">
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/our-process" className="btn btn-outline">
                How we work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-ink/10 bg-parchment py-14 sm:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title="Six ways we put a house together properly."
              intro="Every service below is delivered by the same in-house team, from the first sketch to the final coat of finish."
            />
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
            >
              All services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 50}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group card-hover flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-white"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-sm bg-cream/90 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-walnut">
                      {service.eyebrow}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl leading-snug">{service.shortTitle}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-walnut group-hover:text-brass-deep">
                      Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Recent from the shop"
              title="A feed of finished rooms and honest joinery."
              intro="These are real Soraghan projects. Open the gallery to like, save and browse the full feed by category."
            />
            <Link href="/gallery" className="btn btn-dark shrink-0">
              <Instagram className="h-4 w-4" /> Open the interactive gallery
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {featuredWork.map((item, index) => (
              <Reveal key={item.slug} delay={index * 60}>
                <Link
                  href={`/gallery#${item.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-ink/10"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute inset-x-3 bottom-3">
                    <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-brass-soft">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-base leading-snug text-cream">
                      {item.title}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-ink py-14 text-cream sm:py-20">
        <div className="shell">
          <SectionHeading
            tone="light"
            eyebrow="How we hold ourselves"
            title="Integrity, quality, innovation, creativity, precision."
            intro="These are the values the firm was built on in 1987, and they still decide how we quote, build and finish a job."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60}>
                <div className="h-full rounded-sm border border-cream/15 bg-espresso/60 p-5 transition hover:border-brass/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-brass/40 text-brass">
                    {index === 0 && <Ruler className="h-5 w-5" />}
                    {index === 1 && <Hammer className="h-5 w-5" />}
                    {index === 2 && <Sparkle className="h-5 w-5" />}
                    {index === 3 && <Ruler className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-4 font-display text-xl">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The process"
              title="No mystery between the drawing and the drill."
              intro="Six stages, one point of contact, and a schedule you can plan your life around. Here is the shape of a Soraghan project."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/our-process" className="btn btn-dark">
                See the full process <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/faq" className="btn btn-outline">
                Read the FAQs
              </Link>
            </div>
          </div>
          <ol className="space-y-0 border-l border-ink/15">
            {processSteps.slice(0, 4).map((step) => (
              <li key={step.step} className="relative pb-7 pl-7 last:pb-0">
                <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-brass-deep bg-cream" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-2xl text-brass-deep">{step.step}</span>
                  <h3 className="font-display text-lg">{step.title}</h3>
                  <span className="text-[0.62rem] uppercase tracking-[0.14em] text-ink/45">
                    {step.detail}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="relative overflow-hidden bg-walnut py-14 text-cream sm:py-20 grain">
        <div className="shell relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Materials & craft"
              title="The wood decides how the room feels."
              intro="We keep sample boards of every species we build with. Tap through them — then come to the shop and hold them in your own hands."
            />
            <div className="mt-6">
              <CheckList
                tone="light"
                items={[
                  "Solid stock and shop-sawn veneer, never filler cores",
                  "Hard-wax oil or catalyzed lacquer finishes",
                  "Hand-cut dovetails and mortise-and-tenon joinery",
                  "Reclaimed regional lumber where it suits the room",
                ]}
              />
            </div>
          </div>
          <WoodSelector />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-parchment py-14 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Frequently asked"
            title="The questions every client asks first."
            intro="Clear answers on cost, lead times, materials and how we work. Search or filter for what matters to you."
          />
          <div className="mt-8">
            <FaqAccordion items={faqs} categories={faqCategories} />
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="brief" className="bg-cream py-14 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Start here"
              title="Tell us about the room — we will tell you what is possible."
              intro="A short brief is enough to begin. We reply within one business day, and the first walkthrough is free."
            />
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="eyebrow text-brass-deep">Call</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="font-display text-xl hover:text-brass-deep">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-brass-deep">Email</dt>
                <dd className="mt-1 break-all">
                  <a href={site.emailHref} className="hover:text-brass-deep">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-brass-deep">Studio</dt>
                <dd className="mt-1 text-ink/70">
                  {site.office.street}
                  <br />
                  {site.office.city}, {site.office.state} {site.office.zip}
                </dd>
              </div>
            </dl>
          </div>
          <QuoteForm source="home-page" />
        </div>
      </section>

      {/* JOURNAL */}
      <section className="bg-cream pb-16 sm:pb-20">
        <div className="shell">
          <div className="flex flex-col gap-4 border-t border-ink/10 pt-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The journal"
              title="Notes on materials, cost and craft."
              intro="Long-form answers to the questions we hear on site — written by the people who build the work."
            />
            <Link
              href="/journal"
              className="inline-flex shrink-0 items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
            >
              All articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {journalPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group card-hover flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.hero}
                    alt={post.heroAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-brass-deep">
                    {post.category} · {post.readingTime}
                  </p>
                  <h3 className="mt-2 font-display text-lg leading-snug">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                    {post.description}
                  </p>
                  <span className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">
                    {post.dateLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
