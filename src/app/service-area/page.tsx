import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { site, towns } from "@/lib/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { ArrowUpRight, Pin } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Service Area — Litchfield Hills, Greater Hartford & Beyond",
  description:
    "Soraghan Woodworking serves Bristol, Barkhamsted, Avon, Simsbury, West Hartford, Litchfield, Torrington, Salisbury and greater Connecticut, plus select projects in New York, Massachusetts, Vermont and New Hampshire.",
  path: "/service-area",
  image: "/images/gallery/hero1.jpg",
  keywords: [
    "woodworker near me Connecticut",
    "custom cabinetry Litchfield County",
    "kitchen remodeler Hartford County",
    "millwork Bristol CT",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Service Area", path: "/service-area" },
];

export default function ServiceAreaPage() {
  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      telephone: site.phone,
      areaServed: towns.map((town) => ({
        "@type": "City",
        name: `${town.name}, CT`,
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.office.street,
        addressLocality: site.office.city,
        addressRegion: site.office.state,
        postalCode: site.office.zip,
        addressCountry: "US",
      },
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Service area · Connecticut & beyond"
        title={
          <>
            Local enough to know the {" "}<span className="italic text-brass-soft">housing stock.</span>
          </>
        }
        intro="We work within about an hour of our Bristol studio and Barkhamsted shop as standard, and take on select larger commissions across New England."
        trail={trail}
        image="/images/gallery/hero1.jpg"
        imageAlt="Shingle-style custom home built in Litchfield County"
      />

      <section className="bg-cream py-14 sm:py-20">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Where we build"
                title="The Litchfield Hills and Greater Hartford, town by town."
                intro="These are the towns we know best — their permit offices, their inspectors, their old houses and their driveways."
              />
              <div className="mt-6 rounded-sm border border-ink/10 bg-white p-5">
                <Eyebrow>Also available</Eyebrow>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink/70">
                  {[
                    "Connecticut (statewide)",
                    "New York",
                    "Massachusetts",
                    "Vermont",
                    "New Hampshire",
                    "Rhode Island (select)",
                  ].map((state) => (
                    <li key={state} className="flex items-start gap-2">
                      <Pin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-deep" />
                      {state}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.8rem] leading-relaxed text-ink/55">
                  For projects beyond 60 miles we work in scheduled blocks and can manage the build
                  remotely with a local site representative. Ask us about travel and staging.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-dark">
                  Check your town <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://maps.google.com/?q=374+West+Street+Suite+100+Bristol+CT+06010"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-outline"
                >
                  Studio directions
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {towns.map((town, index) => (
                <Reveal key={town.name} delay={index * 40}>
                  <div className="h-full rounded-sm border border-ink/10 bg-white p-5">
                    <h3 className="flex items-center gap-2 font-display text-lg">
                      <Pin className="h-4 w-4 text-brass-deep" />
                      {town.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{town.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-espresso py-14 text-cream sm:py-16">
        <Image
          src="/images/gallery/g07.jpg"
          alt="Garden pool house and grounds at a Connecticut estate"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="shell relative z-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Local knowledge"
              title="Why proximity is part of the quality."
              intro="A cabinetmaker forty minutes away can come back. A factory eight states away cannot."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Permit offices",
                body: "Bristol, Barkhamsted, Avon, Simsbury, West Hartford and Torrington are regular stops. Reviews move faster when the drawings already meet expectations.",
              },
              {
                title: "Old houses",
                body: "We know what 1790s post-and-beam, 1920s plaster and 1970s framing each demand from new millwork.",
              },
              {
                title: "The right trades",
                body: "Electricians, plasterers, masons and stone fabricators we have worked with for years, not a rotating list.",
              },
              {
                title: "Aftercare",
                body: "A hinge adjusts or a drawer needs re-setting three years later. We are close enough to come back.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-cream/15 bg-espresso/70 p-4">
                <h3 className="font-display text-lg text-cream">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cream/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Nationwide enquiries"
            title="Not in Connecticut? Build the furniture anyway."
            intro="A dining table or a run of cabinetry can be crated and shipped. We measure remotely with a template you fill in, review samples by video, then build, finish and crating in the shop."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              ["1. Remote measure", "We send a measuring guide and short video call to check dimensions twice."],
              ["2. Finish approval", "Sample boards ship to you, or we video the spray booth under daylight."],
              ["3. Crated shipping", "Blanket-wrapped, crated and freighted with installation instructions."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-sm border border-ink/10 bg-white p-5">
                <p className="font-display text-lg">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Wondering if we cover your street?"
        intro="Send the town and a sentence about the project. If it is a stretch, we will say so honestly — and suggest someone good."
      />
    </>
  );
}
