import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  theme?: "light" | "dark";
  className?: string;
  /** Kept for compatibility; the official logo always includes "Woodworking". */
  showTag?: boolean;
};

/**
 * The studio's official logo (from soraghanwoodworking.net).
 * `theme="dark"` means a dark background, so it uses the cream-lettered version;
 * `theme="light"` uses the original charcoal-lettered version.
 */
export function Brand({ theme = "dark", className = "" }: BrandProps) {
  const src = theme === "dark" ? "/images/brand/logo-light.png" : "/images/brand/logo-dark.png";

  return (
    <Link
      href="/"
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
