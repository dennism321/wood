import type { Metadata } from "next";
import Link from "next/link";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { Eyebrow, JsonLd, PageHero } from "@/components/ui";
import { ArrowRight, ArrowUpRight, Check, Hammer } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Download the website package",
  description: "Download the complete Soraghan Woodworking website source, including all images.",
  robots: { index: false, follow: false },
};

const ARCHIVE = "soraghan-woodworking-site.zip";
const ARCHIVE_HREF = `/downloads/${ARCHIVE}`;

const trail = [
  { name: "Home", path: "/" },
  { name: "Download", path: "/download" },
];

async function archiveInfo() {
  const filePath = path.join(process.cwd(), "public", "downloads", ARCHIVE);
  try {
    const info = await stat(filePath);
    const imagesDir = path.join(process.cwd(), "public", "images", "gallery");
    const gallery = await readdir(imagesDir).catch(() => [] as string[]);
    return {
      exists: true,
      bytes: info.size,
      updated: info.mtime.toISOString(),
      imageCount: gallery.filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file)).length,
    };
  } catch {
    return { exists: false, bytes: 0, updated: new Date().toISOString(), imageCount: 0 };
  }
}

export default async function DownloadPage() {
  const info = await archiveInfo();
  const megabytes = (info.bytes / (1024 * 1024)).toFixed(1);
  const updatedLabel = new Date(info.updated).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const included = [
    "Complete Next.js 16 (App Router) source in TypeScript",
    "Tailwind CSS v4 design system and global styles",
    "Drizzle schema for gallery, reactions, inquiries and subscribers",
    "All site content: services, FAQs, process, town pages and 5 journal articles",
    "Interactive gallery components, API routes and SEO helpers",
    `${info.imageCount} project photographs + the Soraghan Woodworking logo`,
    "README with setup, database and deployment instructions",
    ".env.example and Drizzle config (no secrets included)",
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Download the Soraghan Woodworking website package",
    description:
      "Source archive of the Soraghan Woodworking website, including all project photography and brand assets.",
    isPartOf: { "@type": "WebSite", name: "Soraghan Woodworking" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Site package · source + assets"
        title={
          <>
            Take the whole site <span className="italic text-brass-soft">with you.</span>
          </>
        }
        intro="Everything behind this website in one archive — the code, the content, the database schema and every project photograph. Unzip, install, and it runs."
        trail={trail}
        image="/images/gallery/g08.jpg"
        imageAlt="Custom inset cabinetry with brass hardware"
        actions={false}
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <div className="rounded-sm border border-ink/10 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-ink text-brass-soft">
                  <Hammer className="h-6 w-6" />
                </span>
                <div>
                  <h1 className="font-display text-2xl leading-tight sm:text-3xl">
                    {ARCHIVE}
                  </h1>
                  <p className="mt-1 text-sm text-ink/60">
                    {info.exists ? (
                      <>
                        ZIP archive · {megabytes} MB · updated {updatedLabel}
                      </>
                    ) : (
                      "The archive is being prepared — please refresh in a moment."
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={ARCHIVE_HREF}
                  download
                  className={`btn btn-primary w-full sm:w-auto ${
                    info.exists ? "" : "pointer-events-none opacity-50"
                  }`}
                  aria-disabled={!info.exists}
                >
                  Download ZIP <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="/" className="btn btn-outline w-full sm:w-auto">
                  Back to the site
                </a>
              </div>

              <div className="mt-6 border-t border-ink/10 pt-5">
                <p className="eyebrow text-brass-deep">Included in the package</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {included.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-sm bg-parchment p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-walnut">
                  Run it locally
                </p>
                <pre className="mt-2 overflow-x-auto rounded-sm bg-ink p-3 text-[0.72rem] leading-relaxed text-cream/85">
{`npm install
cp .env.example .env
npx drizzle-kit push
npm run dev`}
                </pre>
                <p className="mt-2 text-[0.75rem] leading-relaxed text-ink/55">
                  Requires Node.js 20+ and a PostgreSQL database. Set <code>DATABASE_URL</code> in{" "}
                  <code>.env</code>; the gallery seeds itself on first load.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-brass/40 bg-brass/10 p-5 text-sm leading-relaxed text-ink/70">
              <span className="font-semibold text-ink">Note on the environment file:</span> the
              preview&apos;s <code>.env</code> is deliberately excluded from the archive so no
              credentials are distributed. Use <code>.env.example</code> as the template.
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-sm bg-ink p-5 text-cream sm:p-6">
              <Eyebrow tone="light">Package contents</Eyebrow>
              <dl className="mt-3 space-y-3 text-sm">
                {[
                  ["Pages", "16 routes incl. 6 service + 5 journal pages"],
                  ["Components", "Header, footer, gallery, forms, FAQ, UI kit"],
                  ["Database", "4 tables (Drizzle / PostgreSQL)"],
                  ["API routes", "5 (health, inquiries, newsletter, gallery ×2)"],
                  ["Photography", `${info.imageCount} project images + logo`],
                  ["Docs", "README with setup and next steps"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 border-b border-cream/10 pb-2 last:border-0">
                    <dt className="text-cream/50">{label}</dt>
                    <dd className="text-right text-cream/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-sm border border-ink/10 bg-white p-5">
              <p className="eyebrow text-brass-deep">Also useful</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/gallery" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    Browse the live gallery <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    Review the services <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center gap-2 text-ink/75 hover:text-brass-deep">
                    Send a project brief <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
