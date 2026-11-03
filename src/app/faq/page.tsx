import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs, faqCategories, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { ArrowUpRight, Phone } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions — Cost, Timelines & Materials",
  description:
    "Straight answers from Soraghan Woodworking: custom kitchen costs in Connecticut, project timelines, wood species, permits, service area and how a family-owned design-build shop works.",
  path: "/faq",
  keywords: [
    "custom kitchen cost Connecticut",
    "how long does a kitchen remodel take CT",
    "woodworking FAQ",
    "custom cabinetry questions",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  const schema = [
    breadcrumbSchema(trail),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "QAPage",
      name: "Soraghan Woodworking — frequently asked questions",
      mainEntity: faqs.slice(0, 5).map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Answers · no sales script"
        title={
          <>
            The things people {" "}<span className="italic text-brass-soft">actually ask.</span>
          </>
        }
        intro="Costs, lead times, materials, permits and how we work. If your question is not here, call the shop — a joiner will pick up."
        trail={trail}
        actions={false}
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div>
            <FaqAccordion items={faqs} categories={faqCategories} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-ink p-5 text-cream sm:p-6">
              <Eyebrow tone="light">Straight from the shop</Eyebrow>
              <p className="mt-2 font-display text-xl leading-snug">
                The fastest answer is usually a two-minute phone call.
              </p>
              <a href={site.phoneHref} className="btn btn-primary mt-4 w-full">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-cream/45">
                Mon–Fri 7am–5pm
              </p>
            </div>

            <div className="rounded-sm border border-ink/10 bg-white p-5">
              <p className="eyebrow text-brass-deep">Quick facts</p>
              <dl className="mt-3 space-y-3 text-sm">
                {[
                  ["Founded", "1987, by Paul & Brian Soraghan"],
                  ["Based", "Bristol, CT · shop in Barkhamsted"],
                  ["Serves", "CT, NY, MA, VT, NH"],
                  ["Typical kitchen", "$90k – $250k all-in"],
                  ["First visit", "Free · about one hour"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 border-b border-ink/5 pb-2 last:border-0">
                    <dt className="text-ink/50">{label}</dt>
                    <dd className="text-right font-medium text-ink/80">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-sm border border-brass/40 bg-brass/10 p-5">
              <p className="eyebrow text-walnut">Read more</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/journal/custom-kitchen-cost-connecticut" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    Kitchen cost breakdown <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/journal/how-long-does-a-renovation-take" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    Real renovation timelines <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/journal/choosing-wood-species-cabinetry" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    Choosing a wood species <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/our-process" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    How a project runs <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment py-12 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Definitions, plainly"
            title="A short glossary of the words we use."
            intro="Useful when comparing quotes from different builders — the vocabulary changes the price."
          />
          <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                term: "Face frame",
                def: "The frame of solid wood across the front of a cabinet. Inset or overlay doors hang from it.",
              },
              {
                term: "Inset cabinetry",
                def: "Doors that sit flush inside the face frame with a consistent reveal — furniture-grade detailing.",
              },
              {
                term: "Full overlay",
                def: "Doors that cover the face frame almost entirely, giving a cleaner, more contemporary look.",
              },
              {
                term: "Millwork",
                def: "Any woodwork produced in a mill: trim, paneling, casings, doors, stairs and built-ins.",
              },
              {
                term: "Allowance",
                def: "A budget figure for an item not yet chosen, such as tile or appliances. Real amounts matter.",
              },
              {
                term: "Change order",
                def: "A written adjustment to scope, price or schedule after work begins. We prefer to settle these in design.",
              },
            ].map((item) => (
              <div key={item.term} className="rounded-sm border border-ink/10 bg-white p-4">
                <dt className="font-display text-lg">{item.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/65">{item.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="Ask us something specific."
        intro="Measurements, photos, a wish list — send it over and we will reply with a real answer, not a brochure."
      />
    </>
  );
}
