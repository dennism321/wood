"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/gallery-server";
import { galleryCategories, site } from "@/lib/site";
import { isStaticPreview, withBase } from "@/lib/base-path";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Close,
  Heart,
  Instagram,
  Pin,
  Share,
} from "./icons";

type Sort = "newest" | "loved";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const aspectFor = (index: number) =>
  ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]", "aspect-square"][
    index % 6
  ];

export function GalleryBoard({
  initialItems,
  initialFilter = "All",
}: {
  initialItems: GalleryItem[];
  initialFilter?: string;
}) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [filter, setFilter] = useState<string>(
    galleryCategories.includes(initialFilter as (typeof galleryCategories)[number])
      ? initialFilter
      : "All",
  );
  const [sort, setSort] = useState<Sort>("newest");
  const [likedOnly, setLikedOnly] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [progressKey, setProgressKey] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const KEY = "soraghan_visitor_id";
    let id = window.localStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `v-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      window.localStorage.setItem(KEY, id);
    }
    setVisitorId(id);
  }, []);

  // Pick up a category from the link (e.g. /gallery?filter=Kitchens).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("filter");
    if (fromUrl && galleryCategories.includes(fromUrl as (typeof galleryCategories)[number])) {
      setFilter(fromUrl);
    }
  }, []);

  // Re-hydrate this visitor's likes and saves from the database.
  useEffect(() => {
    if (!visitorId || isStaticPreview) return;
    let cancelled = false;
    fetch(`/api/gallery?visitorId=${encodeURIComponent(visitorId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { items?: GalleryItem[] } | null) => {
        if (!cancelled && data?.items?.length) setItems(data.items);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [visitorId]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const shown = useMemo(() => {
    const list = items.filter((item) => {
      const inCategory = filter === "All" || item.category === filter;
      const inLikes = !likedOnly || item.liked;
      return inCategory && inLikes;
    });
    return [...list].sort((a, b) =>
      sort === "loved"
        ? b.likes - a.likes
        : new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
    );
  }, [items, filter, sort, likedOnly]);

  const featured = useMemo(() => items.filter((item) => item.featured).slice(0, 5), [items]);

  const likedCount = items.filter((item) => item.liked).length;
  const savedCount = items.filter((item) => item.saved).length;

  const openItem = useCallback(
    (slug: string) => {
      const index = items.findIndex((item) => item.slug === slug);
      if (index >= 0) setOpenIndex(index);
    },
    [items],
  );

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, closeLightbox, step]);

  // Instagram-style stories auto-advance
  useEffect(() => {
    if (storyIndex === null) return;
    const timer = setTimeout(() => {
      setStoryIndex((current) => {
        if (current === null) return null;
        return current + 1 >= featured.length ? null : current + 1;
      });
      setProgressKey((key) => key + 1);
    }, 4600);
    return () => clearTimeout(timer);
  }, [storyIndex, progressKey, featured.length]);

  async function react(item: GalleryItem, kind: "like" | "save") {
    const active = kind === "like" ? !item.liked : !item.saved;
    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              liked: kind === "like" ? active : entry.liked,
              saved: kind === "save" ? active : entry.saved,
              likes: kind === "like" ? entry.likes + (active ? 1 : -1) : entry.likes,
            }
          : entry,
      ),
    );
    if (kind === "save") setToast(active ? "Saved to your board" : "Removed from your board");
    if (kind === "like" && active) setToast("Added to the shop's tally — thank you");

    // The static preview has no database: keep the like/save on screen only.
    if (isStaticPreview) return;

    try {
      const res = await fetch(`/api/gallery/${item.id}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, kind, active }),
      });
      if (!res.ok) throw new Error("reaction failed");
      const data = (await res.json()) as { likes?: number };
      if (typeof data.likes === "number" && kind === "like") {
        setItems((current) =>
          current.map((entry) => (entry.id === item.id ? { ...entry, likes: data.likes! } : entry)),
        );
      }
    } catch {
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? {
                ...entry,
                liked: kind === "like" ? item.liked : entry.liked,
                saved: kind === "save" ? item.saved : entry.saved,
                likes: kind === "like" ? item.likes : entry.likes,
              }
            : entry,
        ),
      );
    }
  }

  async function share(item: GalleryItem) {
    const url = `${window.location.origin}${withBase("/gallery")}#${item.slug}`;
    const payload = { title: `Soraghan Woodworking — ${item.title}`, text: item.caption, url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("Link copied to clipboard");
    } catch {
      setToast("Could not share — copy the address bar instead");
    }
  }

  const active = openIndex !== null ? items[openIndex] : null;
  const activeIsFiltered = active ? shown.some((item) => item.id === active.id) : false;

  return (
    <div>
      {/* Instagram-ish profile strip */}
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brass bg-ink font-display text-lg text-brass-soft">
            SW
          </span>
          <div>
            <p className="flex items-center gap-2 font-display text-xl">
              {site.instagramHandle}
              <span className="rounded-full bg-brass/20 px-2 py-0.5 text-[0.55rem] font-sans font-semibold uppercase tracking-[0.14em] text-walnut">
                Live feed
              </span>
            </p>
            <p className="text-[0.78rem] text-ink/55">
              {items.length} posts · {likedCount} you liked · {savedCount} saved
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-dark"
          >
            <Instagram className="h-4 w-4" /> Follow on Instagram
          </a>
          <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ink/45">
            Tap a photo to open
          </p>
        </div>
      </div>

      {/* Stories rail */}
      <div className="mt-6">
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
          {featured.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setStoryIndex(index);
                setProgressKey((key) => key + 1);
              }}
              className="group flex w-[4.6rem] shrink-0 flex-col items-center gap-1.5 sm:w-[5.2rem]"
            >
              <span
                className={`relative block h-[4.6rem] w-[4.6rem] overflow-hidden rounded-full p-[2px] sm:h-[5.2rem] sm:w-[5.2rem] ${
                  storyIndex === index
                    ? "bg-gradient-to-tr from-brass via-walnut to-brass"
                    : "bg-gradient-to-tr from-brass/70 via-sand to-timber/60 group-hover:from-brass group-hover:to-brass"
                }`}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-cream">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="90px"
                    className="object-cover"
                  />
                </span>
              </span>
              <span className="w-full truncate text-center text-[0.6rem] uppercase tracking-[0.1em] text-ink/60">
                {item.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter + sort bar */}
      <div className="sticky top-[4.5rem] z-30 -mx-5 mt-4 border-y border-ink/10 bg-cream/95 px-5 py-3 backdrop-blur md:top-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {galleryCategories.map((category) => {
              const total =
                category === "All"
                  ? items.length
                  : items.filter((item) => item.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-[0.72rem] font-medium transition ${
                    filter === category
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 bg-transparent text-ink/65 hover:border-ink/40"
                  }`}
                >
                  {category}
                  <span className="ml-1.5 opacity-50">{total}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLikedOnly((value) => !value)}
              aria-pressed={likedOnly}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[0.7rem] font-medium transition ${
                likedOnly
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-ink/15 text-ink/60 hover:border-ink/40"
              }`}
            >
              <Heart filled={likedOnly} className="h-3.5 w-3.5" /> Liked {likedCount > 0 && `(${likedCount})`}
            </button>
            <label htmlFor="gallery-sort" className="sr-only">
              Sort gallery
            </label>
            <select
              id="gallery-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="rounded-full border border-ink/15 bg-transparent px-3 py-2 text-[0.7rem] font-medium text-ink/70 focus:border-brass-deep focus:outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="loved">Most loved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-ink/20 px-6 py-14 text-center">
          <p className="font-display text-xl">Nothing here yet.</p>
          <p className="mt-1 text-sm text-ink/60">
            {likedOnly ? "You have not liked a photo yet — tap a heart you like." : "Try another category."}
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setLikedOnly(false);
            }}
            className="btn btn-outline mt-5"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {shown.map((item, index) => (
            <article
              key={item.id}
              id={item.slug}
              className={`group relative overflow-hidden rounded-sm bg-ink/5 ${
                index === 0 && filter === "All" && !likedOnly ? "col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={`relative h-full w-full ${index === 0 && filter === "All" && !likedOnly ? "aspect-[16/10]" : aspectFor(index)}`}>
                <button
                  type="button"
                  onClick={() => openItem(item.slug)}
                  className="absolute inset-0 z-10 h-full w-full"
                  aria-label={`Open ${item.title} — ${item.category} project photo`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-80 transition group-hover:opacity-95" />
                  <span className="absolute bottom-3 left-3 right-14 text-left">
                    <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-brass-soft">
                      {item.category}
                    </span>
                    <span className="mt-0.5 line-clamp-1 block font-display text-sm text-cream sm:text-base">
                      {item.title}
                    </span>
                  </span>
                </button>

                <div className="absolute right-2 top-2 z-20 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => react(item, "like")}
                    aria-pressed={item.liked}
                    aria-label={item.liked ? `Unlike ${item.title}` : `Like ${item.title}`}
                    className={`flex h-9 min-w-9 items-center justify-center gap-1 rounded-full bg-ink/55 px-2 text-[0.68rem] text-cream backdrop-blur transition hover:bg-ink ${
                      item.liked ? "text-red-300" : ""
                    }`}
                  >
                    <Heart filled={item.liked} className="h-4 w-4" />
                    <span className="tabular-nums">{item.likes}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => react(item, "save")}
                    aria-pressed={item.saved}
                    aria-label={item.saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-ink/55 text-cream backdrop-blur transition hover:bg-ink ${
                      item.saved ? "text-brass-soft" : ""
                    }`}
                  >
                    <Bookmark filled={item.saved} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} project details`}
          className="fixed inset-0 z-[80] flex items-stretch justify-center bg-ink/90 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative flex h-full w-full max-w-6xl flex-col overflow-y-auto bg-espresso text-cream sm:max-h-[92vh] sm:flex-row sm:rounded-sm"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStart.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
              if (Math.abs(delta) > 55) step(delta > 0 ? -1 : 1);
              touchStart.current = null;
            }}
          >
            <div className="relative w-full shrink-0 bg-black/40 sm:w-[60%]">
              <div className="relative aspect-[4/3] w-full sm:h-full sm:aspect-auto">
                <Image
                  src={active.imageUrl}
                  alt={active.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 60vw"
                  className="object-contain sm:object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-cream backdrop-blur transition hover:bg-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="text-[0.66rem] uppercase tracking-[0.16em] text-cream/70">
                  {activeIsFiltered
                    ? `${shown.findIndex((item) => item.id === active.id) + 1} / ${shown.length}`
                    : ""}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-cream backdrop-blur transition hover:bg-ink"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col p-5 sm:w-[40%] sm:overflow-y-auto sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass bg-ink font-display text-sm text-brass-soft">
                    SW
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{site.instagramHandle}</p>
                    <p className="flex items-center gap-1 text-[0.68rem] text-cream/50">
                      <Pin className="h-3 w-3" /> {active.site ?? "Connecticut"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  autoFocus
                  aria-label="Close gallery viewer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition hover:border-brass hover:text-brass"
                >
                  <Close className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4 border-y border-cream/10 py-3">
                <button
                  type="button"
                  onClick={() => react(active, "like")}
                  aria-pressed={active.liked}
                  className={`inline-flex items-center gap-1.5 text-sm transition ${
                    active.liked ? "text-red-300" : "text-cream/80 hover:text-red-300"
                  }`}
                >
                  <Heart filled={active.liked} className="h-5 w-5" />
                  <span className="tabular-nums">{active.likes}</span>
                </button>
                <button
                  type="button"
                  onClick={() => react(active, "save")}
                  aria-pressed={active.saved}
                  className={`inline-flex items-center gap-1.5 text-sm transition ${
                    active.saved ? "text-brass-soft" : "text-cream/80 hover:text-brass-soft"
                  }`}
                >
                  <Bookmark filled={active.saved} className="h-5 w-5" /> Save
                </button>
                <button
                  type="button"
                  onClick={() => share(active)}
                  className="ml-auto inline-flex items-center gap-1.5 text-sm text-cream/80 transition hover:text-brass-soft"
                >
                  <Share className="h-5 w-5" /> Share
                </button>
              </div>

              <p className="mt-4 font-display text-xl leading-snug">{active.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{active.caption}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <span key={tag} className="text-[0.75rem] text-brass-soft">
                    #{tag.replace(/-/g, "")}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-[0.66rem] uppercase tracking-[0.14em] text-cream/40">
                {fmtDate(active.postedAt)} · {active.category}
              </p>

              <div className="mt-6 rounded-sm border border-brass/30 bg-brass/10 p-4">
                <p className="text-sm font-medium text-cream">Like this room?</p>
                <p className="mt-1 text-[0.8rem] leading-relaxed text-cream/65">
                  We can build something close to it — measured for your space, in the wood and
                  finish you prefer.
                </p>
                <Link
                  href={`/contact?project=${encodeURIComponent(active.category)}`}
                  className="btn btn-primary mt-3 w-full"
                >
                  Ask about this project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex items-center justify-center gap-2 rounded-sm border border-cream/20 px-3 py-2.5 text-[0.7rem] uppercase tracking-[0.12em] text-cream/75 transition hover:border-brass"
                >
                  <ArrowLeft className="h-4 w-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex items-center justify-center gap-2 rounded-sm border border-cream/20 px-3 py-2.5 text-[0.7rem] uppercase tracking-[0.12em] text-cream/75 transition hover:border-brass"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story viewer */}
      {storyIndex !== null && featured[storyIndex] && (
        <StoryViewer
          item={featured[storyIndex]}
          index={storyIndex}
          total={featured.length}
          progressKey={progressKey}
          onClose={() => setStoryIndex(null)}
          onNext={() =>
            setStoryIndex((current) =>
              current === null || current + 1 >= featured.length ? null : current + 1,
            )
          }
          onPrev={() =>
            setStoryIndex((current) => (current === null || current === 0 ? 0 : current - 1))
          }
          onOpen={() => {
            const slug = featured[storyIndex].slug;
            setStoryIndex(null);
            openItem(slug);
          }}
          onLike={() => react(featured[storyIndex], "like")}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-[0.75rem] text-cream shadow-xl lg:bottom-8"
        >
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-brass" /> {toast}
          </span>
        </div>
      )}
    </div>
  );
}

function StoryViewer({
  item,
  index,
  total,
  progressKey,
  onClose,
  onNext,
  onPrev,
  onOpen,
  onLike,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  progressKey: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpen: () => void;
  onLike: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${item.title}`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative h-full w-full max-w-md overflow-hidden bg-espresso sm:h-[85vh] sm:rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={item.imageUrl}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, 420px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/10 to-ink/90" />

        <div className="absolute inset-x-0 top-0 flex gap-1 p-3">
          {Array.from({ length: total }).map((_, barIndex) => (
            <span key={barIndex} className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream/25">
              <span
                key={`${barIndex}-${progressKey}`}
                className={`block h-full rounded-full bg-cream ${
                  barIndex < index ? "w-full" : barIndex === index ? "story-progress" : "w-0"
                }`}
                style={barIndex === index ? { animation: "storyGrow 4.6s linear forwards" } : undefined}
              />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 top-6 flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brass bg-ink text-[0.65rem] text-brass-soft">
              SW
            </span>
            <div>
              <p className="text-[0.78rem] font-semibold text-cream">{site.instagramHandle}</p>
              <p className="text-[0.6rem] uppercase tracking-[0.1em] text-cream/60">
                {item.category}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close stories"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/50 text-cream"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous story"
          className="absolute left-0 top-16 bottom-24 w-1/4"
        />
        <button
          type="button"
          onClick={onNext}
          aria-label="Next story"
          className="absolute right-0 top-16 bottom-24 w-1/4"
        />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-xl leading-tight text-cream">{item.title}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cream/75">{item.caption}</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onOpen}
              className="btn btn-primary flex-1 !min-h-10 text-[0.65rem]"
            >
              View details <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onLike}
              aria-label="Like this post"
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-ink/40 ${
                item.liked ? "text-red-300" : "text-cream"
              }`}
            >
              <Heart filled={item.liked} className="h-4 w-4" />
            </button>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open Instagram profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-cream"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
