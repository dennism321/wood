"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type BrandProps = {
  theme?: "light" | "dark";
  className?: string;
  /** Kept for compatibility; the official logo always includes "Woodworking". */
  showTag?: boolean;
  /** Runs on click, e.g. to close the mobile menu. */
  onNavigate?: () => void;
};

/** Set when the logo is clicked on another page, so the home page opens at the very top. */
let pendingTopScroll = false;

function scrollToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

/**
 * The studio's official logo (from soraghanwoodworking.net). Clicking anywhere on it
 * always lands at the top of the home page, including when already on the home page.
 * `theme="dark"` means a dark background, so it uses the cream-lettered version;
 * `theme="light"` uses the original charcoal-lettered version.
 */
export function Brand({ theme = "dark", className = "", onNavigate }: BrandProps) {
  const pathname = usePathname();
  const src = theme === "dark" ? "/images/brand/logo-light.png" : "/images/brand/logo-dark.png";

  useEffect(() => {
    if (pathname !== "/" || !pendingTopScroll) return;
    pendingTopScroll = false;
    // Next.js scrolls to where the page content starts; go above the top bar too.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    // Let modified clicks (new tab, etc.) behave normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    if (pathname === "/") {
      // Next.js won't scroll for a link to the current page, so do it here.
      event.preventDefault();
      if (window.location.hash || window.location.search) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      // Wait a moment so an open mobile menu can unlock page scrolling first.
      window.setTimeout(scrollToTop, 60);
    } else {
      pendingTopScroll = true;
    }
  }

  return (
    <Link
      href="/"
      scroll
      onClick={handleClick}
      aria-label="Soraghan Woodworking — home"
      className={`group flex shrink-0 items-center ${className}`}
    >
      <Image
        src={src}
        alt="Soraghan Woodworking"
        width={1093}
        height={253}
        priority
        sizes="(min-width: 640px) 220px, 180px"
        className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-85 sm:h-12"
      />
    </Link>
  );
}
