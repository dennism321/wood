"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Faq } from "@/lib/site";
import { ArrowUpRight, Close, Plus } from "./icons";

type Props = {
  items: Faq[];
  categories: string[];
  compact?: boolean;
};

export function FaqAccordion({ items, categories, compact = false }: Props) {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory = active === "All" || item.category === active;
      const inQuery =
        !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [items, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
          {categories.map((category) => {
            const count =
              category === "All"
                ? items.length
                : items.filter((item) => item.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActive(category);
                  setOpen(0);
                }}
                aria-pressed={active === category}
                className={`shrink-0 rounded-sm border px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition ${
                  active === category
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 bg-white/60 text-ink/70 hover:border-ink/40"
                }`}
              >
                {category}
                <span className="ml-1.5 opacity-50">{count}</span>
              </button>
            );
          })}
        </div>

        <label className="relative flex items-center" htmlFor="faq-search">
          <span className="sr-only">Search frequently asked questions</span>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions…"
            className="h-11 w-full rounded-sm border border-ink/15 bg-white px-4 pr-10 text-sm placeholder:text-ink/40 focus:border-brass-deep focus:outline-none lg:w-72"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 flex h-7 w-7 items-center justify-center text-ink/50 hover:text-ink"
            >
              <Close className="h-4 w-4" />
            </button>
          ) : null}
        </label>
      </div>

      <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink/60">
            No question matches “{query}”. Try a different word, or{" "}
            <Link href="/contact" className="text-brass-deep underline">
              ask us directly
            </Link>
            .
          </p>
        )}
        {filtered.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={`${item.q}-${index}`}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={`font-display text-[1.05rem] leading-snug transition-colors sm:text-lg ${
                      isOpen ? "text-brass-deep" : "text-ink"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "rotate-45 border-brass-deep text-brass-deep"
                        : "border-ink/20 text-ink/60"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
              </h3>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl pb-5 pr-8 text-sm leading-relaxed text-ink/70">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-brass/40 bg-brass/10 px-5 py-4">
          <p className="text-sm text-ink/75">
            <span className="font-semibold">Still deciding?</span> Send the measurements and a
            photo — we will tell you what is realistic.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-walnut hover:text-brass-deep"
          >
            Ask a question <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
