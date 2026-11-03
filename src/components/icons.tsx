import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.5h-2A1.5 1.5 0 0 0 3 5c0 8.8 7.2 16 16 16a1.5 1.5 0 0 0 1.5-1.5v-2a1.5 1.5 0 0 0-1.2-1.47l-2.6-.52a1.5 1.5 0 0 0-1.47.53l-1 1.22a13.5 13.5 0 0 1-5.4-5.4l1.22-1a1.5 1.5 0 0 0 .53-1.47l-.52-2.6A1.5 1.5 0 0 0 6.5 3.5Z" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

export const Pin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Heart = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3c0 4.8-7.5 9.4-7.5 9.4Z" />
  </svg>
);

export const Bookmark = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M6.5 4h11A1.5 1.5 0 0 1 19 5.5V21l-7-4-7 4V5.5A1.5 1.5 0 0 1 6.5 4Z" />
  </svg>
);

export const Share = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 16V4M8 8l4-4 4 4" />
    <path d="M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
  </svg>
);

export const Comment = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 12a7.5 7.5 0 0 1-11 6.7L4 20l1.4-4.6A7.5 7.5 0 1 1 20 12Z" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 13 4.5 4.5L19 7" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Star = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} fill={filled ? "currentColor" : "none"} strokeWidth={1.2}>
    <path d="m12 3.6 2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 16.98 6.75 19.7l1-5.86L3.5 9.76l5.9-.86Z" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);

export const Ruler = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="8" width="19" height="8" rx="1.5" />
    <path d="M7 8v3M11 8v3M15 8v3M19 8v3" />
  </svg>
);

export const Hammer = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 7 9.5 3.5 3.5 9.5 7 13M10.5 6.5l7 7M14.5 3.5l3 3M17.5 9.5 21 13l-6 6-3.5-3.5" />
  </svg>
);
