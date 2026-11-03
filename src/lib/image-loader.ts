// Used only by the static GitHub Pages build: Pages can't resize images, so
// serve the original file from the right folder. (The width keeps Next happy.)
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = src.startsWith("/") ? `${base}${src}` : src;
  return `${path}?w=${width}`;
}
