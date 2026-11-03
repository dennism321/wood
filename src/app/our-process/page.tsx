import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { faqs, faqCategories, processSteps } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, Check, Clock, Ruler } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Our Process — From First Walkthrough to Final Walkthrough",
  description:
    "How a Soraghan Woodworking project runs: consultation, design and samples, proposal and schedule, shop build, installation and follow-up. Clear timelines for Connecticut kitchens, millwork and additions.",
  path: "/our-process",
  image: "/images/gallery/g09.jpg",
  keywords: ["custom woodworking process", "design build process Connecticut", "kitchen renovation timeline CT"],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/our-process" },
];

export default function ProcessPage() {
  const processFaqs = faqs.filter((faq) => faq.category === "Cost & timelines" || faq.category === "Working together").slice(0, 6);
  const schema = [breadcrumbSchema(trail), faqSchema(processFaqs)];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Our process · six stages"
        title={
          <>
            You should always know {" "}<span className="italic text-brass-soft">what happens next.</span>
          </>
        }
        intro="No mystery, no disappearing contractor. We work to a published sequence with decision dates, shop milestones and one point of contact from first visit to final walkthrough."
        trail={trail}
        image="/images/gallery/g09.jpg"
        imageAlt="Curved walnut handrail detail from a Soraghan Woodworking staircase"
      />

      <section className="bg-cream py-14 sm:py-20">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>The sequence</Eyebrow>
              <h2 className="mt-3 text-[1.9rem] leading-tight sm:text-4xl">
                Design in weeks. Build in months. Details for decades.
              </h2>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-ink/70">
                Timelines vary with scope and permitting, but the order never does. Below is the
                sequence we use on every project, plus the honest reason each stage takes the time
                it takes.
              </p>
              <div className="mt-6 space-y-3 rounded-sm border border-ink/10 bg-white p-5">
                {[
                  "Free first walkthrough and budget reality check",
                  "Written scope with allowances stated as numbers",
                  "Shop-built cabinetry, not subcontracted boxes",
                  "Weekly updates and a named project lead",
                ].map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-ink/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-dark">
                  Book a walkthrough <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/faq" className="btn btn-outline">
                  Read the FAQs
                </Link>
              </div>
            </div>

            <ol className="space-y-5">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} delay={index * 40}>
                  <li className="relative overflow-hidden rounded-sm border border-ink/10 bg-white p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-ink font-display text-sm text-brass-soft">
                          {step.step}
                        </span>
                        <h3 className="font-display text-xl">{step.title}</h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-walnut">
                        <Clock className="h-3.5 w-3.5" /> {step.detail}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.body}</p>
                    {index === 0 && (
                      <p className="mt-3 rounded-sm border border-brass/30 bg-brass/10 px-3 py-2 text-[0.75rem] text-ink/70">
                        Bring photos, rough measurements and a budget range if you have one. No
                        drawings needed at this stage.
                      </p>
                    )}
                    {index === 1 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Paint samples", "Wood samples", "Hardware", "Counter options"].map((tag) => (
                          <span key={tag} className="rounded-full border border-ink/15 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-ink/55">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment py-14 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/gallery/g08.jpg"
              alt="Inset cabinetry being fitted with hardware in the shop"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why the shop matters"
              title="Half the project happens before your house is touched."
              intro="Shop time overlaps with site preparation. Cabinetry is milled, finished and dry-fitted indoors, which shortens the disruptive part of the build and improves the fit."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: <Ruler className="h-5 w-5" />, title: "Measured, not guessed", body: "Every run is drawn to the actual opening, including out-of-square walls." },
                { icon: <Check className="h-5 w-5" />, title: "Dry-fitted", body: "Doors, drawers and hardware are fitted before the truck leaves the shop." },
                { icon: <Clock className="h-5 w-5" />, title: "Parallel work", body: "Shop fabrication runs while site work happens, saving weeks." },
                { icon: <ArrowRight className="h-5 w-5" />, title: "Fewer surprises", body: "Finish samples approved in person, in your light, before spraying." },
              ].map((benefit) => (
                <div key={benefit.title} className="rounded-sm border border-ink/10 bg-white p-4">
                  <span className="text-brass-deep">{benefit.icon}</span>
                  <p className="mt-2 font-display text-lg">{benefit.title}</p>
                  <p className="mt-1 text-sm text-ink/60">{benefit.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="shell">
          <SectionHeading eyebrow="Process questions" title="Timelines, decisions and access." />
          <div className="mt-7">
            <FaqAccordion items={processFaqs} categories={faqCategories} compact />
          </div>
        </div>
      </section>

      <section id="brief" className="bg-parchment py-14 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Stage one"
              title="Start with the walkthrough."
              intro="It is free, it takes about an hour, and you leave with a realistic idea of scope and cost — whether or not you hire us."
            />
            <ul className="mt-5 space-y-3 text-sm text-ink/70">
              {[
                "Measurements and photographs of the space",
                "A conversation about how you actually use it",
                "An honest read on what your budget buys",
                "A follow-up summary with next steps",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm source="process-page" compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
