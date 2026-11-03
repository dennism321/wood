import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs, faqCategories, site } from "@/lib/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { ArrowUpRight, Clock, Instagram, Mail, Phone, Pin } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Project Enquiries — Bristol, CT",
  description:
    "Start a custom kitchen, millwork, furniture or construction project with Soraghan Woodworking. Call 860-379-9837, email soraghanwoodworking@gmail.com, or send a project brief. Studio in Bristol, shop in Barkhamsted, CT.",
  path: "/contact",
  image: "/images/gallery/g02.jpg",
  keywords: ["contact Soraghan Woodworking", "woodworker Bristol CT", "kitchen quote Connecticut"],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Soraghan Woodworking",
      mainEntity: {
        "@type": "HomeAndConstructionBusiness",
        name: site.name,
        telephone: site.phone,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.office.street,
          addressLocality: site.office.city,
          addressRegion: site.office.state,
          postalCode: site.office.zip,
          addressCountry: "US",
        },
      },
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Contact · free first walkthrough"
        title={
          <>
            Let us look at the space {" "}<span className="italic text-brass-soft">together.</span>
          </>
        }
        intro="Tell us what you are planning. We will arrange a walkthrough, give you an honest read on scope and budget, and follow up in writing within one business day."
        trail={trail}
        image="/images/gallery/g02.jpg"
        imageAlt="Custom kitchen with a blue island and timber beams"
        actions={false}
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <QuoteForm source="contact-page" />
          </div>

          <aside className="space-y-5">
            <div className="rounded-sm bg-ink p-5 text-cream sm:p-6">
              <Eyebrow tone="light">Talk to a joiner</Eyebrow>
              <a href={site.phoneHref} className="mt-3 flex items-center gap-3 font-display text-2xl hover:text-brass-soft">
                <Phone className="h-5 w-5 text-brass" /> {site.phone}
              </a>
              <a href={site.emailHref} className="mt-3 flex items-center gap-3 break-all text-sm text-cream/75 hover:text-brass-soft">
                <Mail className="h-4 w-4 shrink-0 text-brass" /> {site.email}
              </a>
              <a href={site.instagramUrl} target="_blank" rel="noreferrer noopener" className="mt-3 flex items-center gap-3 text-sm text-cream/75 hover:text-brass-soft">
                <Instagram className="h-4 w-4 text-brass" /> {site.instagramHandle}
              </a>
              <div className="mt-5 flex items-start gap-3 border-t border-cream/10 pt-4 text-sm text-cream/65">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <div>
                  <p className="font-medium text-cream">Studio hours</p>
                  {site.hours.map((entry) => (
                    <p key={entry.day} className="text-cream/60">
                      {entry.day}: {entry.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-ink/10 bg-white p-5">
              <p className="eyebrow text-brass-deep">Where to find us</p>
              <div className="mt-3 space-y-4 text-sm text-ink/70">
                <div className="flex gap-3">
                  <Pin className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                  <div>
                    <p className="font-semibold text-ink">{site.office.label}</p>
                    <p>
                      {site.office.street}
                      <br />
                      {site.office.city}, {site.office.state} {site.office.zip}
                    </p>
                    <a
                      href="https://maps.google.com/?q=374+West+Street+Suite+100+Bristol+CT+06010"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1 inline-flex items-center gap-1 text-brass-deep hover:underline"
                    >
                      Open in Maps <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Pin className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                  <div>
                    <p className="font-semibold text-ink">{site.shop.label}</p>
                    <p>
                      {site.shop.street}
                      <br />
                      {site.shop.city}, {site.shop.state} {site.shop.zip}
                    </p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-ink/45">
                      Visits by appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-ink/10">
              <iframe
                title="Map showing Soraghan Woodworking at 374 West Street, Bristol, Connecticut"
                src="https://www.google.com/maps?q=374+West+Street+Suite+100+Bristol+CT+06010&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full border-0 grayscale-[35%]"
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment py-12 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="After you press send"
            title="What happens next — three steps."
            intro="No call centre, no automated funnel. Here is exactly what follows a project brief."
          />
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Reply within one business day",
                body: "A real person reads your brief, checks availability and asks any clarifying questions by email or phone.",
              },
              {
                step: "02",
                title: "Walkthrough at the space",
                body: "We measure, photograph and listen. About an hour, no charge, and you keep our notes either way.",
              },
              {
                step: "03",
                title: "Written scope and range",
                body: "A clear proposal with allowances, a realistic schedule and the next decision dates — before any commitment.",
              },
            ].map((item) => (
              <li key={item.step} className="rounded-sm border border-ink/10 bg-white p-5">
                <span className="font-display text-3xl text-brass-deep">{item.step}</span>
                <h3 className="mt-2 font-display text-lg leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink/60">
            Prefer to send photos first? Email{" "}
            <a href={site.emailHref} className="text-brass-deep underline">
              {site.email}
            </a>{" "}
            or message{" "}
            <a href={site.instagramUrl} target="_blank" rel="noreferrer noopener" className="text-brass-deep underline">
              {site.instagramHandle}
            </a>{" "}
            on Instagram.
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell">
          <SectionHeading eyebrow="Before you write" title="Quick answers to common questions." />
          <div className="mt-7">
            <FaqAccordion items={faqs.slice(0, 5)} categories={faqCategories} compact />
          </div>
          <p className="mt-4 text-sm text-ink/60">
            <Link href="/faq" className="text-brass-deep underline">
              See all {faqs.length} questions
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Not ready to write a brief?"
        intro="Call the shop and describe the room. Ten minutes on the phone usually clarifies the whole project."
      />
    </>
  );
}
