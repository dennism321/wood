"use client";

import { useState } from "react";
import Link from "next/link";
import { services, site } from "@/lib/site";
import { ArrowRight, Check, Phone } from "./icons";
import { isStaticPreview, previewFormMessage } from "@/lib/base-path";

const projectTypes = [
  ...services.map((service) => service.shortTitle),
  "Something else",
];

const budgets = [
  "Under $25k",
  "$25k – $75k",
  "$75k – $150k",
  "$150k – $300k",
  "$300k+",
  "Not sure yet",
];

const timelines = ["As soon as possible", "3–6 months", "6–12 months", "Just planning"];

export function QuoteForm({
  source = "contact-page",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState<string>("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[2]);
  const [timeline, setTimeline] = useState(timelines[1]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("company")) {
      setState("sent");
      return;
    }
    setState("sending");
    setError("");
    try {
      const payload = {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        town: String(formData.get("town") ?? "").trim(),
        projectType,
        budget,
        timeline,
        message: String(formData.get("message") ?? "").trim(),
        source,
      };
      if (isStaticPreview) throw new Error(previewFormMessage);
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        reference?: string;
      };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Please check the form and retry.");
      setReference(data.reference ?? "");
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-sm border border-brass/40 bg-white p-6 sm:p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brass/20 text-brass-deep">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-2xl">Thank you — it is in the right hands.</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {reference && (
            <>
              Your reference is <span className="font-semibold text-ink">{reference}</span>.{" "}
            </>
          )}
          A member of the Soraghan team will reply within one business day. If your project is
          time-sensitive, calling is always fastest.
        </p>
        <ol className="mt-5 space-y-2 text-sm text-ink/70">
          <li>1. We review your brief and check availability.</li>
          <li>2. We call to arrange a walkthrough at the space.</li>
          <li>3. You receive a written scope and realistic budget range.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.phoneHref} className="btn btn-dark">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <Link href="/gallery" className="btn btn-outline">
            Browse the gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "h-12 w-full rounded-sm border border-ink/15 bg-white px-3.5 text-sm text-ink placeholder:text-ink/40 focus:border-brass-deep focus:outline-none";
  const labelClass = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/60";

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-sm border border-ink/10 bg-white ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
      noValidate={false}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl leading-tight sm:text-[1.7rem]">
            Tell us about the project
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Two minutes now saves weeks later. All fields marked * are required.
          </p>
        </div>
        <p className="rounded-sm bg-parchment px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-walnut">
          Replies in 1 business day
        </p>
      </div>

      <fieldset className="mt-6">
        <legend className="sr-only">Your project type</legend>
        <span className={labelClass}>What are you planning? *</span>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProjectType(type)}
              aria-pressed={projectType === type}
              className={`rounded-sm border px-3 py-2 text-[0.73rem] font-medium transition ${
                projectType === type
                  ? "border-walnut bg-walnut text-cream"
                  : "border-ink/15 bg-cream/50 text-ink/70 hover:border-walnut/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="First and last name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(860) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="town">
            Project town
          </label>
          <input
            id="town"
            name="town"
            autoComplete="address-level2"
            placeholder="Bristol, CT"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="budget">
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={inputClass}
          >
            {budgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="timeline">
            Ideal start
          </label>
          <select
            id="timeline"
            name="timeline"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
            className={inputClass}
          >
            {timelines.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="message">
          The details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Room size, what is not working today, the look you have in mind, and anything already drawn or ordered."
          className="w-full rounded-sm border border-ink/15 bg-white p-3.5 text-sm leading-relaxed placeholder:text-ink/40 focus:border-brass-deep focus:outline-none"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-800">
          {error} You can also call{" "}
          <a className="underline" href={site.phoneHref}>
            {site.phone}
          </a>
          .
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full sm:w-auto">
          {state === "sending" ? "Sending…" : "Send project brief"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-[0.7rem] leading-relaxed text-ink/45 sm:max-w-[17rem]">
          No sales list, no spam. We use your details only to reply about this project.
        </p>
      </div>
    </form>
  );
}
