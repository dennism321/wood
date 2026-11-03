import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckList,
  CtaBand,
  Eyebrow,
  JsonLd,
  PageHero,
  SectionHeading,
  ServiceCards,
  StatStrip,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { site, values } from "@/lib/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { ArrowUpRight, Hammer, Pin, Ruler } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "About — A Family Woodshop Since 1987",
  description:
    "Founded in 1987 by Irish brothers Paul and Brian Soraghan, Soraghan Woodworking is a family-owned design-build firm and woodshop in Bristol and Barkhamsted, Connecticut. Meet the team and the values behind the work.",
  path: "/about",
  image: "/images/gallery/g06.jpg",
  keywords: ["Soraghan Woodworking about", "family owned woodshop Connecticut", "Irish joiners CT"],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const milestones = [
  {
    year: "1987",
    title: "Two brothers, one tool chest",
    body: "Paul and Brian Soraghan found Soraghan Woodworking in northwest Connecticut after training with master joiners in Ireland. The first decade is kitchens, built-ins, trim and additions.",
  },
  {
    year: "1990s",
    title: "The shop becomes the advantage",
    body: "A dedicated woodworking shop in Barkhamsted lets the firm control quality and schedule. Cabinetmaking stops being subcontracted and becomes the centre of the business.",
  },
  {
    year: "2000s",
    title: "Estate and library work",
    body: "Whole-home commissions, hand-carved bars, libraries and curved stair work across Litchfield County and the Hartford area build the firm's reputation for detail.",
  },
  {
    year: "Today",
    title: "Design-build with a bench",
    body: "Design, general contracting and custom fabrication under one roof, serving Connecticut and select projects in New York, Massachusetts, Vermont and New Hampshire.",
  },
];

export default function AboutPage() {
  const schema = [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: `About ${site.name}`,
      mainEntity: {
        "@type": "HomeAndConstructionBusiness",
        name: site.name,
        foundingDate: "1987",
        founder: [
          { "@type": "Person", name: "Paul Soraghan", jobTitle: "Co-founder, master joiner" },
          { "@type": "Person", name: "Brian Soraghan", jobTitle: "Co-founder, master joiner" },
        ],
        numberOfEmployees: "10-25",
      },
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="About · family-owned since 1987"
        title={
          <>
            Trained in Ireland. {" "}<span className="italic text-brass-soft">Built in Connecticut.</span>
          </>
        }
        intro="Soraghan Woodworking is a family-owned-and-operated construction and woodworking firm. Two brothers, one standard, four decades of houses that still close properly."
        trail={trail}
        image="/images/gallery/g06.jpg"
        imageAlt="Georgian-style estate home built by Soraghan Woodworking"
      />

      <StatStrip tone="light" />

      <section className="bg-cream py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 text-[1.9rem] leading-[1.1] sm:text-4xl">
              The firm began at a workbench, not a desk.
            </h2>
            <div className="prose-craft mt-4">
              <p className="text-[0.97rem] leading-relaxed text-ink/75">
                Paul and Brian Soraghan began their trade at a young age in their homeland of
                Ireland, training with the most sought-after master joiners. They developed their
                knowledge across every aspect of general construction before moving to northwest
                Connecticut and founding Soraghan Woodworking in 1987.
              </p>
              <p className="text-[0.97rem] leading-relaxed text-ink/75">
                What began as a small construction firm became a full-service design, general
                contracting and woodworking shop serving the Litchfield Hills and Greater Hartford.
                The shop is the difference: because the cabinetry is made a short drive from where
                it is installed, drawings get tested against real timber and real hardware before
                your walls are opened.
              </p>
              <p className="text-[0.97rem] leading-relaxed text-ink/75">
                Today the firm is proud to be a leader in the industry, with core values present in
                every project: integrity, quality, innovation, creativity and precision design.
                Those values turn client dreams into built realities — and turn first-time clients
                into second-generation ones.
              </p>
            </div>
            <div className="mt-6">
              <CheckList
                items={[
                  "Family owned and operated since 1987",
                  "Master joiners trained in Ireland",
                  "Fully equipped shop in Barkhamsted, CT",
                  "Design-build — one contract, one accountable team",
                ]}
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/gallery" className="btn btn-dark">
                See the work <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Meet at the shop
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-sm">
                <Image
                  src="/images/gallery/g03.jpg"
                  alt="Traditional custom kitchen with copper hood and marble island"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/gallery/g09.jpg"
                  alt="Curved walnut stair handrail with carved volute"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/gallery/g05.jpg"
                  alt="Handcrafted mahogany bar with spiral columns"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-4 rounded-sm border border-ink/10 bg-white p-5">
              <Image
                src="/images/brand/logo.png"
                alt="Soraghan Woodworking logo"
                width={260}
                height={70}
                className="h-auto w-[210px]"
              />
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Our mark: two brass rules framing an interlocking S and W — the bench and the
                square, if you look closely.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment py-14 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="The short history"
            title="Four decades, one continuous standard."
            intro="A family business grows in steps. These are the ones that changed how we work."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item, index) => (
              <Reveal key={item.year} delay={index * 60}>
                <div className="h-full rounded-sm border border-ink/10 bg-white p-5">
                  <p className="font-display text-3xl text-brass-deep">{item.year}</p>
                  <h3 className="mt-2 font-display text-lg leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 text-cream sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="What we stand for"
              title="Five values, written on the wall of the shop."
              intro="They are not decoration. They are how we decide what to quote, what to redo, and what to tell a client even when it is not what they hoped to hear."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={value.title} className="rounded-sm border border-cream/15 p-4">
                  <span className="text-brass">
                    {index % 2 === 0 ? <Ruler className="h-5 w-5" /> : <Hammer className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-cream">{value.title}</h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-cream/60">{value.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm">
            <Image
              src="/images/gallery/g04.jpg"
              alt="Panelled mahogany bar and coffered ceiling in a Soraghan Woodworking project"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5 pt-16">
              <p className="eyebrow text-brass">The workshop</p>
              <p className="mt-1 font-display text-xl text-cream">
                4 Old North Road, Barkhamsted
              </p>
              <p className="mt-1 text-sm text-cream/65">
                Where every cabinet, rail and table in this site was made. Visits by appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Our teams"
              title="Small, senior and on site."
              intro="We keep the team deliberately tight so the person who drew your kitchen is the person you can call about it."
            />
            <ul className="mt-6 space-y-4">
              {[
                {
                  role: "Paul & Brian Soraghan",
                  detail:
                    "Founders and master joiners. Still involved in design review, joinery standards and the final walkthrough.",
                },
                {
                  role: "Design & estimating",
                  detail:
                    "Measurements, drawings, samples, allowances and the decision calendar that keeps a project moving.",
                },
                {
                  role: "The shop",
                  detail:
                    "Cabinetmakers, finishers and a spray booth in Barkhamsted. Your project is built by the people who sign it.",
                },
                {
                  role: "Site & installation",
                  detail:
                    "Lead carpenters and installers who protect, fit, adjust and clean up — the same crew from first day to punch list.",
                },
              ].map((team) => (
                <li key={team.role} className="border-l-2 border-brass/50 pl-4">
                  <p className="font-display text-lg">{team.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{team.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-ink/10 bg-parchment p-6 sm:p-8">
            <Eyebrow>Visit us</Eyebrow>
            <div className="mt-4 space-y-5 text-sm text-ink/70">
              <div className="flex gap-3">
                <Pin className="mt-0.5 h-5 w-5 shrink-0 text-brass-deep" />
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
                    Directions <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Pin className="mt-0.5 h-5 w-5 shrink-0 text-brass-deep" />
                <div>
                  <p className="font-semibold text-ink">{site.shop.label}</p>
                  <p>
                    {site.shop.street}
                    <br />
                    {site.shop.city}, {site.shop.state} {site.shop.zip}
                  </p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-ink/45">
                    Shop visits by appointment
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-ink/10 pt-5">
              <p className="eyebrow text-brass-deep">Get in touch</p>
              <a href={site.phoneHref} className="mt-2 block font-display text-2xl hover:text-brass-deep">
                {site.phone}
              </a>
              <a href={site.emailHref} className="mt-1 block break-all text-sm text-ink/65 hover:text-brass-deep">
                {site.email}
              </a>
              <a href={site.instagramUrl} target="_blank" rel="noreferrer noopener" className="mt-2 block text-sm text-ink/65 hover:text-brass-deep">
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-14 sm:py-16">
        <div className="shell">
          <SectionHeading eyebrow="What we do" title="Explore the services" />
          <div className="mt-7">
            <ServiceCards />
          </div>
        </div>
      </section>

      <CtaBand
        title="Come and see the shop."
        intro="Finish samples, half-built cabinetry and a pot of coffee. An hour in Barkhamsted answers more than a month of emails."
      />
    </>
  );
}
