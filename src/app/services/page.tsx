import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { faqCategories, faqs, services, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Services — Custom Kitchens, Cabinetry, Millwork & Construction",
  description:
    "Custom kitchens, architectural millwork, bars and libraries, bespoke furniture, historic restoration and full design-build construction across Connecticut. Design, shop and installation under one roof.",
  path: "/services",
  image: "/images/gallery/g08.jpg",
  keywords: [
    "custom cabinetry Connecticut",
    "millwork contractor CT",
    "kitchen design build Connecticut",
    "bespoke furniture maker CT",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Soraghan Woodworking services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `${site.url}/services/${service.slug}`,
        description: service.summary,
      })),
    },
    faqSchema(faqs.slice(0, 5)),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Services · design, build, install"
        title={
          <>
            Every part of the job, {" "}<span className="italic text-brass-soft">under one roof.</span>
          </>
        }
        intro="A woodworking shop that can also carry the contract. Choose a service below — or tell us the problem and we will point you at the right one."
        trail={trail}
        image="/images/gallery/g08.jpg"
        imageAlt="Custom inset cabinetry with glass-front uppers and brass hardware"
      />

      <section className="bg-cream py-14 sm:py-20">
        <div className="shell space-y-12 lg:space-y-16">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <article
                className={`grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12 ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-cream/90 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-walnut">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1} · {service.eyebrow}
                  </span>
                </div>
                <div>
                  <h2 className="text-[1.8rem] leading-tight sm:text-3xl">{service.title}</h2>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-ink/70">{service.summary}</p>
                  <ul className="mt-4 space-y-1.5">
                    {service.highlights.slice(0, 4).map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-ink/65">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-deep" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-ink/45">
                    {service.timeline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/services/${service.slug}`} className="btn btn-dark">
                      Explore this service <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      Ask a question
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment py-14 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <SectionHeading
            eyebrow="Not sure where to start?"
            title="Most projects are two of these at once."
            intro="A kitchen usually brings millwork and sometimes a structural change. A bar brings cabinetry and finishing. We scope them together so you have one schedule and one price."
          />
          <div className="overflow-hidden rounded-sm border border-ink/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-cream">
                <tr>
                  <th scope="col" className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
                    If you are planning
                  </th>
                  <th scope="col" className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
                    We usually include
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {[
                  ["A new kitchen", "Design, cabinetry, counters, install, lighting"],
                  ["A home office or library", "Millwork, shelving, desk, lighting, paint"],
                  ["A basement bar", "Bar, back bar, refrigeration, glass, finishes"],
                  ["An addition", "Design-build, envelope, interior millwork"],
                  ["An antique house", "Profile matching, restoration, discreet upgrades"],
                  ["A single furniture piece", "Design, sample, build, delivery"],
                ].map(([planning, include]) => (
                  <tr key={planning}>
                    <th scope="row" className="px-4 py-3 font-medium text-ink">
                      {planning}
                    </th>
                    <td className="px-4 py-3 text-ink/65">{include}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Service questions"
            title="Practical answers before you commit."
          />
          <div className="mt-7">
            <FaqAccordion items={faqs.slice(0, 6)} categories={faqCategories} compact />
          </div>
          <div className="mt-6">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
            >
              All frequently asked questions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
