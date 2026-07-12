"use client";

import { REVIEWS } from "@/lib/seed";
import { Star } from "lucide-react";
import Image from "next/image";

export function Reviews({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const featured = REVIEWS[0];
  const rest = REVIEWS.slice(1);

  return (
    <section className="bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
            {isEn ? "Loved by couples" : "Нам доверяют"}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-[#1C1917] sm:text-4xl">
            {isEn ? "Stories from real weddings" : "Истории с настоящих свадеб"}
          </h2>
        </div>

        {/* Featured quote */}
        {featured && (
          <figure className="mb-6 overflow-hidden rounded-[1.75rem] border border-[#EDE8E1] bg-white p-8 shadow-sm sm:p-10 md:flex md:items-center md:gap-10">
            <div className="relative mx-auto mb-6 h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-[#FAF8F5] md:mx-0 md:mb-0 md:h-24 md:w-24">
              <Image
                src={featured.avatar}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="mb-3 flex justify-center gap-0.5 md:justify-start">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#B8956C] text-[#B8956C]"
                  />
                ))}
              </div>
              <blockquote className="font-heading text-xl leading-snug text-[#1C1917] sm:text-2xl">
                «{isEn ? featured.textEn : featured.text}»
              </blockquote>
              <figcaption className="mt-4 text-sm text-[#6B6560]">
                <span className="font-medium text-[#1C1917]">{featured.name}</span>
                <span className="mx-2 text-[#D4C5A8]">·</span>
                {isEn ? "With Love couple" : "Пара With Love"}
              </figcaption>
            </div>
          </figure>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-[1.5rem] border border-[#EDE8E1] bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-[#B8956C] text-[#B8956C]"
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-[#6B6560]">
                «{isEn ? r.textEn : r.text}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-[#F0EBE3] pt-4">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-[#1C1917]">{r.name}</p>
                  <p className="text-xs text-[#9C948C]">
                    {isEn ? "With Love couple" : "Пара With Love"}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
