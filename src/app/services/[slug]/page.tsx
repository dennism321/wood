import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckList, CtaBand, Eyebrow, JsonLd, PageHero, SectionHeading, ServiceCards } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { faqs, faqCategories, gallerySeed, processSteps, services, site, type Service } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, Hammer } from "@/components/icons";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return pageMetadata({ title: "Service not found", description: "", path: "/services" });

  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: [service.title, `${service.shortTitle} Connecticut`, `${service.shortTitle} Litchfield County`],
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service: Service | undefined = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedFaqs = service.faqIndexes.map((index) => faqs[index]).filter(Boolean);
  const relatedImages = gallerySeed
    .filter((item) => item.tags.some((tag) => service.galleryTags.includes(tag)))
    .slice(0, 3);
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortTitle, path: `/services/${service.slug}` },
  ];

  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.shortTitle,
      description: service.summary,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: site.name,
        telephone: site.phone,
        url: site.url,
      },
      areaServed: ["Connecticut", "Litchfield County", "Hartford County", "New York", "Massachusetts"],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        description: `${service.idealFor} ${service.timeline}`,
      },
    },
    faqSchema(relatedFaqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={`${service.eyebrow} · ${service.timeline}`}
        title={service.title}
        intro={service.summary}
        trail={trail}
        image={service.image}
        imageAlt={service.imageAlt}
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <Eyebrow>The approach</Eyebrow>
            <div className="prose-craft mt-4 max-w-2xl">
              {service.intro.map((paragraph) => (
                <p key={paragraph} className="text-[0.97rem] leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-9 text-2xl">What is included</h2>
            <div className="mt-4">
              <CheckList items={service.highlights} />
            </div>

            <h2 className="mt-10 text-2xl">How this project runs</h2>
            <ol className="mt-4 space-y-4 border-l border-ink/15 pl-6">
              {processSteps.slice(0, 5).map((step) => (
                <li key={step.step} className="relative">
                  <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-brass-deep bg-cream text-[0.5rem] text-brass-deep">
                    <Hammer className="h-2.5 w-2.5" />
                  </span>
                  <p className="font-display text-lg">
                    {step.step}. {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-sm border border-ink/10 bg-parchment p-5 sm:p-6">
              <h2 className="font-display text-xl">Materials we recommend</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.materials.map((material) => (
                  <span
                    key={material}
                    className="rounded-full border border-walnut/25 bg-white px-3 py-1.5 text-[0.72rem] text-walnut"
                  >
                    {material}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Best suited to: {service.idealFor} Typical schedule: {service.timeline}.
              </p>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-brass/40 bg-ink p-5 text-cream sm:p-6">
              <p className="eyebrow text-brass">Direct line</p>
              <p className="mt-2 font-display text-xl leading-snug">
                Talk it through with a joiner, not a call centre.
              </p>
              <a href={site.phoneHref} className="mt-4 block font-display text-2xl text-brass-soft">
                {site.phone}
              </a>
              <a href={site.emailHref} className="mt-1 block break-all text-sm text-cream/65 hover:text-cream">
                {site.email}
              </a>
              <Link href="/contact" className="btn btn-primary mt-5 w-full">
                Request a consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-cream/45">
                Mon–Fri 7am–5pm · free first walkthrough
              </p>
            </div>

            {relatedImages.length > 0 && (
              <div className="rounded-sm border border-ink/10 bg-white p-4">
                <p className="eyebrow text-brass-deep">Related work</p>
                <div className="mt-3 space-y-3">
                  {relatedImages.map((image) => (
                    <Link
                      key={image.slug}
                      href={`/gallery#${image.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={image.imageUrl}
                          alt={image.alt}
                          fill
                          sizes="80px"
                          className="object-cover transition group-hover:scale-105"
                        />
                      </span>
                      <span>
                        <span className="block text-sm font-medium leading-snug group-hover:text-brass-deep">
                          {image.title}
                        </span>
                        <span className="block text-[0.68rem] uppercase tracking-[0.12em] text-ink/45">
                          {image.category}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/gallery"
                  className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
                >
                  Full gallery <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            <div className="rounded-sm border border-ink/10 bg-white p-4">
              <p className="eyebrow text-brass-deep">Share this page</p>
              <p className="mt-2 text-sm text-ink/60">
                Send it to your partner, architect or designer — it usually speeds up the decision.
              </p>
              <Link href="/journal" className="btn btn-outline mt-3 w-full">
                Read related guidance
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment py-12 sm:py-14">
        <div className="shell">
          <SectionHeading
            eyebrow="Project questions"
            title={`${service.shortTitle}: what people ask us.`}
          />
          <div className="mt-6">
            <FaqAccordion items={relatedFaqs} categories={["All", ...faqCategories.slice(1)]} compact />
            <p className="mt-4 text-sm text-ink/60">
              More questions?{" "}
              <Link href="/faq" className="text-brass-deep underline">
                Read the full FAQ
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Start a conversation"
              title={`Planning ${service.shortTitle.toLowerCase()}?`}
              intro="Send the basics. We will tell you what we would do, what it would cost, and when we could start."
            />
          </div>
          <QuoteForm source={`service-${service.slug}`} compact />
        </div>
      </section>

      <section className="bg-parchment py-12 sm:py-16">
        <div className="shell">
          <SectionHeading eyebrow="Also consider" title="Often combined with" />
          <div className="mt-7">
            <ServiceCards exclude={service.slug} />
          </div>
          <div className="mt-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
            >
              All services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="sr-only">{relatedServices.map((item) => item.title).join(", ")}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
