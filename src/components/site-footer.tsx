import Link from "next/link";
import { services, site, navLinks, galleryCategories } from "@/lib/site";
import { Brand } from "./brand";
import { isStaticPreview } from "@/lib/base-path";
import { NewsletterForm } from "./newsletter-form";
import { ArrowUpRight, Instagram, Mail, Phone, Pin, Clock } from "./icons";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="shell pb-28 pt-14 lg:pb-20 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <Brand theme="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              A family-owned design-build studio and woodworking shop, founded in 1987 by Irish
              master joiners Paul and Brian Soraghan.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Soraghan Woodworking on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-cream/20 transition hover:border-brass hover:text-brass"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.houzzUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-10 items-center gap-2 rounded-sm border border-cream/20 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition hover:border-brass hover:text-brass"
              >
                Houzz <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer services">
            <h2 className="eyebrow text-brass">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-brass-soft">
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer pages">
            <h2 className="eyebrow text-brass">Studio</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brass-soft">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-brass-soft">
                  Contact
                </Link>
              </li>
            </ul>
            <h2 className="eyebrow mt-7 text-brass">Gallery</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {galleryCategories.slice(1, 4).map((category) => (
                <li key={category}>
                  <Link
                    href={`/gallery?filter=${encodeURIComponent(category)}`}
                    className="hover:text-brass-soft"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-brass">Visit / contact</h2>
            <ul className="mt-4 space-y-4 text-sm text-cream/70">
              <li className="flex gap-3">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <span>
                  <span className="block text-cream/50">{site.office.label}</span>
                  {site.office.street}
                  <br />
                  {site.office.city}, {site.office.state} {site.office.zip}
                </span>
              </li>
              <li className="flex gap-3">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <span>
                  <span className="block text-cream/50">{site.shop.label}</span>
                  {site.shop.street}
                  <br />
                  {site.shop.city}, {site.shop.state} {site.shop.zip}
                </span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-brass-soft">
                  <Phone className="h-4 w-4 text-brass" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 break-all hover:text-brass-soft"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brass" /> {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <span>
                  Mon–Fri 7am–5pm
                  <br />
                  Saturday by appointment
                </span>
              </li>
            </ul>

            <div className="mt-7">
              <h2 className="eyebrow mb-3 text-brass">Notes from the shop</h2>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-6 text-[0.72rem] text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved. Licensed &amp;
            insured in Connecticut.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Serving {site.serviceRegion}</span>
            {!isStaticPreview && (
              <Link href="/download" className="hover:text-brass-soft">
                Download site package
              </Link>
            )}
            <Link href="/sitemap.xml" className="hover:text-brass-soft">
              Sitemap
            </Link>
            <Link href="/faq" className="hover:text-brass-soft">
              FAQ
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
