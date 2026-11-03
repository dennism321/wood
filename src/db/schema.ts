import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Gallery posts mirror the studio's Instagram feed: every entry is a real
 * project photograph from Soraghan Woodworking with editable captions.
 */
export const galleryPosts = pgTable(
  "gallery_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull().unique(),
    title: varchar("title", { length: 160 }).notNull(),
    caption: text("caption").notNull(),
    alt: text("alt").notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    tags: text("tags").array().notNull().default([]),
    site: varchar("site", { length: 120 }),
    postedAt: timestamp("posted_at", { withTimezone: true }).notNull().defaultNow(),
    baseLikes: integer("base_likes").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("gallery_posts_category_idx").on(table.category)],
);

/** Idempotent per-visitor reactions so like counts stay honest. */
export const galleryReactions = pgTable(
  "gallery_reactions",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id")
      .notNull()
      .references(() => galleryPosts.id, { onDelete: "cascade" }),
    visitorId: varchar("visitor_id", { length: 64 }).notNull(),
    kind: varchar("kind", { length: 16 }).notNull().default("like"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("gallery_reactions_unique").on(table.postId, table.visitorId, table.kind),
  ],
);

/** Quote requests / project briefs submitted through the site. */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  town: varchar("town", { length: 120 }),
  projectType: varchar("project_type", { length: 80 }).notNull(),
  budget: varchar("budget", { length: 60 }),
  timeline: varchar("timeline", { length: 60 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 60 }).notNull().default("website"),
  status: varchar("status", { length: 32 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Newsletter / "notes from the shop" subscribers. */
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
