"use client";

import type { Guest } from "@/types";

/** Optional public wall of confirmed guests (MVP, seating deferred). */
export function ConfirmedGuests({
  guests,
  title,
  surface,
  border,
  accent,
  headingFont,
}: {
  guests: Guest[];
  title: string;
  surface: string;
  border: string;
  accent: string;
  headingFont: string;
}) {
  const confirmed = guests.filter((g) => g.status === "confirmed");
  if (confirmed.length === 0) return null;

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h2
        className="mb-2 text-center text-2xl"
        style={{ fontFamily: `"${headingFont}", serif` }}
      >
        {title}
      </h2>
      <p className="mb-6 text-center text-sm opacity-50">
        {confirmed.length}{" "}
        {confirmed.length === 1 ? "гость" : "гостей"} подтвердили
      </p>
      <div
        className="flex flex-wrap justify-center gap-2 rounded-3xl border p-5"
        style={{ background: surface, borderColor: border }}
      >
        {confirmed.map((g) => (
          <span
            key={g.id}
            className="rounded-full px-3 py-1.5 text-sm"
            style={{ background: `${accent}18`, color: accent }}
          >
            {g.name}
            {g.plusOnes > 0 ? ` +${g.plusOnes}` : ""}
          </span>
        ))}
      </div>
    </section>
  );
}
