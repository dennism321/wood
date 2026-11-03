"use client";

import { useState } from "react";
import { woodSpecies } from "@/lib/site";
import { ArrowUpRight } from "./icons";

/** Small interactive sampler — the digital equivalent of three boards on the bench. */
export function WoodSelector() {
  const [active, setActive] = useState(1);
  const wood = woodSpecies[active];

  return (
    <div className="grid gap-6 rounded-sm border border-cream/15 bg-espresso/60 p-5 text-cream sm:p-7 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      <div>
        <div
          className="relative h-40 w-full overflow-hidden rounded-sm border border-cream/15 sm:h-52"
          style={{ backgroundColor: wood.color }}
        >
          <span className="absolute inset-0 wood-grain" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 rounded-sm bg-ink/60 px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-cream/85 backdrop-blur">
            {wood.name}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {woodSpecies.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              className={`h-9 w-9 rounded-full border-2 transition ${
                active === index ? "border-brass scale-110" : "border-cream/25 hover:border-cream/60"
              }`}
              style={{ backgroundColor: item.color }}
              aria-label={`Preview ${item.name}`}
              title={item.name}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow text-brass">The material board</p>
        <h3 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{wood.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/70">{wood.note}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-cream/15 pt-4 text-sm">
          <div>
            <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-cream/45">Best for</dt>
            <dd className="mt-1 text-cream/85">{wood.best}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-cream/45">Finish</dt>
            <dd className="mt-1 text-cream/85">Hard-wax oil or lacquer</dd>
          </div>
        </dl>
        <a
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brass-soft hover:text-cream"
        >
          Request a sample board <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
