/**
 * Folder the site is served from. Empty for a normal deploy; "/wood" for the
 * GitHub Pages preview (dennism321.github.io/wood), set at build time.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True for the static GitHub Pages build, which has no database or API. */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/** Prefix a root-relative path ("/images/x.jpg") with the base folder. */
export function withBase(path: string) {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}

/** Shown when a form is used on the static preview, which can't store submissions. */
export const previewFormMessage =
  "This is a preview of the new site, so the form isn't connected yet. Please call 860-379-9837 or email soraghanwoodworking@gmail.com.";
