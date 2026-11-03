"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./brand";
import { navLinks, site } from "@/lib/site";
import { ArrowUpRight, Close, Instagram, Mail, Menu, Phone, Clock } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="hidden bg-ink text-cream/70 lg:block">
        <div className="shell flex h-9 items-center justify-between text-[0.68rem] tracking-[0.08em]">
          <p className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-brass" />
            Design studio &amp; shop open Monday–Friday, 7:00am–5:00pm
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.emailHref}
              className="flex items-center gap-2 transition hover:text-brass-soft"
            >
              <Mail className="h-3.5 w-3.5" /> {site.email}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 transition hover:text-brass-soft"
            >
              <Instagram className="h-3.5 w-3.5" /> {site.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-espresso/97 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]" : ""
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-4 border-b border-cream/10 md:h-20">
          <Brand theme="dark" />

          <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative py-2 text-[0.73rem] font-medium uppercase tracking-[0.14em] transition-colors ${
                  isActive(link.href)
                    ? "text-brass-soft"
                    : "text-cream/75 hover:text-cream"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brass transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[0.78rem] font-medium tracking-[0.08em] text-cream transition hover:text-brass-soft sm:flex"
            >
              <Phone className="h-4 w-4 text-brass" />
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-primary hidden md:inline-flex">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/25 text-cream transition hover:border-brass hover:text-brass xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-[70] xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/70 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute right-0 top-0 flex h-[100dvh] w-[min(24rem,90vw)] flex-col bg-espresso text-cream transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4">
            <Brand theme="dark" onNavigate={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/20 text-cream transition hover:border-brass hover:text-brass"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="divide-y divide-cream/10">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-4 font-display text-xl transition-colors ${
                      isActive(link.href) ? "text-brass-soft" : "text-cream hover:text-brass"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <Link href="/contact" className="btn btn-primary w-full">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light w-full">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </div>

            <div className="mt-8 space-y-3 text-sm text-cream/65">
              <p className="eyebrow text-brass">Visit the studio</p>
              <p>
                {site.office.street}
                <br />
                {site.office.city}, {site.office.state} {site.office.zip}
              </p>
              <a href={site.emailHref} className="block break-all hover:text-brass-soft">
                {site.email}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 hover:text-brass-soft"
              >
                <Instagram className="h-4 w-4" /> {site.instagramHandle}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
