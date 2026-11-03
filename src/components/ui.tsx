import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Star } from "./icons";
import { services, site, stats } from "@/lib/site";

export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`eyebrow rule-brass ${tone === "light" ? "text-brass-soft" : "text-brass-deep"} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`mt-3 text-[1.9rem] leading-[1.1] sm:text-4xl lg:text-[2.9rem] ${
          tone === "light" ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-[0.98rem] leading-relaxed sm:text-base ${
            tone === "light" ? "text-cream/70" : "text-ink/70"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.7rem] uppercase tracking-[0.14em]">
      <ol className="flex flex-wrap items-center gap-2 text-cream/55">
        {trail.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === trail.length - 1 ? (
              <span aria-current="page" className="text-brass-soft">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="transition hover:text-cream">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  image,
  imageAlt,
  actions = true,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  trail: { name: string; path: string }[];
  image?: string;
  imageAlt?: string;
  actions?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-espresso text-cream">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-espresso/40" />
        </>
      )}
      <div className="shell relative z-10 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
        <Breadcrumbs trail={trail} />
        <div className="mt-8 max-w-3xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-3 text-[2.1rem] leading-[1.05] text-cream sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              {intro}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/gallery" className="btn btn-ghost-light">
                View the work
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function StatStrip({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <section
      className={tone === "dark" ? "bg-ink text-cream" : "border-y border-ink/10 bg-parchment"}
    >
      <div className="shell grid grid-cols-2 gap-y-8 py-10 sm:py-12 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`px-2 text-center lg:px-6 ${
              tone === "dark" ? "lg:border-r lg:border-cream/10 lg:last:border-0" : ""
            }`}
          >
            <p
              className={`font-display text-4xl leading-none sm:text-5xl ${
                tone === "dark" ? "text-brass-soft" : "text-walnut"
              }`}
            >
              {stat.value}
              {stat.suffix}
            </p>
            <p
              className={`mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
                tone === "dark" ? "text-cream/55" : "text-ink/55"
              }`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Have a room, a wall or a whole house in mind?",
  intro = "Tell us what you are planning. We will come and look, give you an honest read on scope and cost, and show you what is possible in the space you already have.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-walnut text-cream grain">
      <div className="shell relative z-10 grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:py-20">
        <div>
          <Eyebrow tone="light">Next step</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-[1.8rem] leading-[1.12] sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
            {intro}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
            Request a consultation <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a href={site.phoneHref} className="btn btn-ghost-light w-full sm:w-auto">
            Call {site.phone}
          </a>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cream/50 lg:text-right">
            Mon–Fri 7am–5pm · Shop visits by appointment
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServiceCards({ exclude }: { exclude?: string }) {
  const list = services.filter((service) => service.slug !== exclude).slice(0, 3);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group card-hover flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="eyebrow text-brass-deep">{service.eyebrow}</p>
            <h3 className="mt-2 font-display text-xl leading-snug">{service.shortTitle}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{service.summary}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-walnut group-hover:text-brass-deep">
              Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CheckList({ items, tone = "dark" }: { items: string[]; tone?: "dark" | "light" }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
          <Check
            className={`mt-0.5 h-4 w-4 shrink-0 ${tone === "light" ? "text-brass" : "text-brass-deep"}`}
          />
          <span className={tone === "light" ? "text-cream/75" : "text-ink/72"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Stars() {
  return (
    <span className="flex gap-0.5 text-brass" aria-label="Five star workmanship">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} filled className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}
