import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowUpRight, Mail, Phone } from "./icons";

/** Thumb-friendly sticky actions so a mobile visitor is never more than one tap from contact. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/15 bg-espresso/97 backdrop-blur lg:hidden">
      <div
        className="grid grid-cols-3 divide-x divide-cream/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={site.phoneHref}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream/85"
        >
          <Phone className="h-4 w-4 text-brass" />
          Call
        </a>
        <a
          href={site.emailHref}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream/85"
        >
          <Mail className="h-4 w-4 text-brass" />
          Email
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 bg-brass py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink"
        >
          <ArrowUpRight className="h-4 w-4" />
          Brief us
        </Link>
      </div>
    </div>
  );
}
