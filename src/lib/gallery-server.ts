import { count, eq, and } from "drizzle-orm";
import { db } from "@/db";
import { galleryPosts, galleryReactions } from "@/db/schema";
import { gallerySeed } from "./site";
import { isStaticPreview } from "./base-path";

export type GalleryItem = {
  id: number;
  slug: string;
  title: string;
  caption: string;
  alt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  site: string | null;
  postedAt: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  featured: boolean;
};

function fallbackItems(): GalleryItem[] {
  return gallerySeed.map((seed, index) => ({
    id: index + 1,
    slug: seed.slug,
    title: seed.title,
    caption: seed.caption,
    alt: seed.alt,
    imageUrl: seed.imageUrl,
    category: seed.category,
    tags: seed.tags,
    site: seed.site,
    postedAt: new Date(Date.now() - seed.daysAgo * 86_400_000).toISOString(),
    likes: seed.baseLikes,
    liked: false,
    saved: false,
    featured: Boolean(seed.featured),
  }));
}

async function seedIfEmpty() {
  const [{ total }] = await db.select({ total: count() }).from(galleryPosts);
  if (Number(total) > 0) return;
  await db
    .insert(galleryPosts)
    .values(
      gallerySeed.map((seed, index) => ({
        slug: seed.slug,
        title: seed.title,
        caption: seed.caption,
        alt: seed.alt,
        imageUrl: seed.imageUrl,
        category: seed.category,
        tags: seed.tags,
        site: seed.site,
        postedAt: new Date(Date.now() - seed.daysAgo * 86_400_000),
        baseLikes: seed.baseLikes,
        featured: Boolean(seed.featured),
        sortOrder: index,
      })),
    )
    .onConflictDoNothing();
}

export async function getGalleryItems(visitorId?: string): Promise<GalleryItem[]> {
  if (isStaticPreview) return fallbackItems();
  try {
    await seedIfEmpty();
    const posts = await db.select().from(galleryPosts).orderBy(galleryPosts.sortOrder);
    if (posts.length === 0) return fallbackItems();

    const reactionCounts = await db
      .select({
        postId: galleryReactions.postId,
        kind: galleryReactions.kind,
        total: count(),
      })
      .from(galleryReactions)
      .groupBy(galleryReactions.postId, galleryReactions.kind);

    const mine = visitorId
      ? await db
          .select({ postId: galleryReactions.postId, kind: galleryReactions.kind })
          .from(galleryReactions)
          .where(eq(galleryReactions.visitorId, visitorId))
      : [];

    const likeMap = new Map<number, number>();
    reactionCounts.forEach((row) => {
      if (row.kind === "like") likeMap.set(row.postId, Number(row.total));
    });
    const mineLikes = new Set(mine.filter((r) => r.kind === "like").map((r) => r.postId));
    const mineSaves = new Set(mine.filter((r) => r.kind === "save").map((r) => r.postId));

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      caption: post.caption,
      alt: post.alt,
      imageUrl: post.imageUrl,
      category: post.category,
      tags: post.tags,
      site: post.site,
      postedAt: post.postedAt.toISOString(),
      likes: post.baseLikes + (likeMap.get(post.id) ?? 0),
      liked: mineLikes.has(post.id),
      saved: mineSaves.has(post.id),
      featured: post.featured,
    }));
  } catch (error) {
    console.error("[gallery] falling back to static content:", error);
    return fallbackItems();
  }
}

export async function reactToPost(input: {
  postId: number;
  visitorId: string;
  kind: "like" | "save";
  active: boolean;
}) {
  const { postId, visitorId, kind, active } = input;
  const where = and(
    eq(galleryReactions.postId, postId),
    eq(galleryReactions.visitorId, visitorId),
    eq(galleryReactions.kind, kind),
  );

  if (active) {
    await db
      .insert(galleryReactions)
      .values({ postId, visitorId, kind })
      .onConflictDoNothing();
  } else {
    await db.delete(galleryReactions).where(where);
  }

  const [post] = await db
    .select({ baseLikes: galleryPosts.baseLikes })
    .from(galleryPosts)
    .where(eq(galleryPosts.id, postId));

  const [likes] = await db
    .select({ total: count() })
    .from(galleryReactions)
    .where(and(eq(galleryReactions.postId, postId), eq(galleryReactions.kind, "like")));

  return {
    likes: (post?.baseLikes ?? 0) + Number(likes?.total ?? 0),
    active,
    kind,
  };
}
