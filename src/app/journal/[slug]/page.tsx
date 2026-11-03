import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, JsonLd, PageHero } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { getJournalPost, journalPosts } from "@/lib/journal";
import { getService } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, Check } from "@/components/icons";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) {
    return pageMetadata({ title: "Article not found", description: "", path: "/journal" });
  }
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/journal/${post.slug}`,
    image: post.hero,
    type: "article",
  });
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const related = journalPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const service = getService(post.relatedService);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: post.category, path: `/journal/${post.slug}` },
  ];

  const schema = [
    breadcrumbSchema(trail),
    articleSchema({
      title: post.title,
      description: post.description,
      path: `/journal/${post.slug}`,
      date: post.date,
      image: post.hero,
    }),
    ...(post.faq ? [faqSchema([post.faq])] : []),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={`Journal · ${post.category} · ${post.readingTime}`}
        title={post.title}
        intro={post.description}
        trail={trail}
        image={post.hero}
        imageAlt={post.heroAlt}
        actions={false}
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <article>
            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ink/40">
              Published {post.dateLabel}
            </p>
            <p className="mt-4 font-display text-xl leading-relaxed text-ink/85 sm:text-2xl sm:leading-relaxed">
              {post.intro}
            </p>

            <div className="mt-8 space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl leading-snug">{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink/72">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-deep" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-9 rounded-sm border border-brass/40 bg-brass/10 p-5">
              <p className="eyebrow text-walnut">The short version</p>
              <ul className="mt-3 space-y-2">
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-2 text-sm leading-relaxed text-ink/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" /> {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            {post.faq && (
              <div className="mt-8 rounded-sm border border-ink/10 bg-white p-5">
                <h2 className="font-display text-xl">{post.faq.q}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{post.faq.a}</p>
              </div>
            )}

            <div className="mt-8 border-t border-ink/10 pt-6">
              <h2 className="text-xl">Keep reading</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/journal/${item.slug}`}
                      className="group flex h-full flex-col rounded-sm border border-ink/10 bg-white p-4"
                    >
                      <span className="text-[0.6rem] uppercase tracking-[0.14em] text-brass-deep">
                        {item.category}
                      </span>
                      <span className="mt-1.5 font-display text-base leading-snug group-hover:text-brass-deep">
                        {item.title}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink/45">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-ink p-5 text-cream sm:p-6">
              <p className="eyebrow text-brass">Related service</p>
              <p className="mt-2 font-display text-xl leading-snug">
                {service ? service.shortTitle : "Custom woodworking"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">
                {service?.summary ??
                  "Design, shop fabrication and installation by one family-owned team in Connecticut."}
              </p>
              <Link
                href={service ? `/services/${service.slug}` : "/services"}
                className="btn btn-primary mt-4 w-full"
              >
                Explore the service <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="hidden rounded-sm border border-ink/10 bg-white p-4 lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={post.hero}
                  alt={post.heroAlt}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[0.72rem] uppercase tracking-[0.12em] text-ink/45">
                From a completed Soraghan project
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <p className="eyebrow text-brass-deep">Put this to use</p>
            <h2 className="mt-2 text-[1.8rem] leading-tight sm:text-3xl">
              Running these numbers on your own house?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              Send the room and what you are hoping to spend. We will tell you what that buys in
              Connecticut today — and where the budget will actually go.
            </p>
          </div>
          <QuoteForm source={`journal-${post.slug}`} compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
