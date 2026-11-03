"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { isStaticPreview, previewFormMessage } from "@/lib/base-path";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    try {
      if (isStaticPreview) throw new Error(previewFormMessage);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Something went wrong");
      setState("done");
      setMessage(data.message ?? "You're on the list.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-start gap-2 text-sm text-brass-soft">
        <Check className="mt-0.5 h-4 w-4 shrink-0" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 border-b border-cream/25 pb-2 focus-within:border-brass">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe to notes from the shop"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-brass text-ink transition hover:bg-brass-soft disabled:opacity-60"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-[0.7rem] leading-relaxed text-cream/45">
        {state === "error" ? message : "One short letter a season. Projects, materials, no noise."}
      </p>
    </form>
  );
}
