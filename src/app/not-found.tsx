import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-espresso py-20 text-cream sm:py-28">
      <div className="shell max-w-2xl">
        <p className="eyebrow rule-brass text-brass">404 · offcuts</p>
        <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
          That page is not on the bench.
        </h1>
        <p className="mt-4 text-cream/70">
          The link may be old or mistyped. Try the gallery, the services, or call the shop on{" "}
          <a href={site.phoneHref} className="text-brass-soft underline">
            {site.phone}
          </a>
          .
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/gallery" className="btn btn-ghost-light">
            View the gallery
          </Link>
          <Link href="/contact" className="btn btn-ghost-light">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
