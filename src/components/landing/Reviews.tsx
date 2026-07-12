"use client";

import { GoldLine } from "@/components/decor/Floral";
import { REVIEWS } from "@/lib/seed";
import { Star } from "lucide-react";
import Image from "next/image";

export function Reviews({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-heading text-3xl font-medium text-charcoal sm:text-4xl">
            {isEn ? "With love from our couples" : "С любовью от наших пар"}
          </h2>
          <GoldLine className="mt-4" />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-[1.25rem] border border-[#EDE7DD] bg-[#FDFCFA] p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-[#D4A537] text-[#D4A537]"
                  />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-[#8a8580]">
                «{isEn ? r.textEn : r.text}»
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-white"
                />
                <span className="text-sm font-medium text-charcoal">
                  {r.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
