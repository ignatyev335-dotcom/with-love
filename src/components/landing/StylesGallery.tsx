"use client";

import { TEMPLATES } from "@/lib/seed";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function StylesGallery({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const styles = TEMPLATES.slice(0, 6);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
              {isEn ? "Templates" : "Шаблоны"}
            </p>
            <h2 className="mt-2 font-heading text-3xl text-[#1C1917] sm:text-4xl">
              {isEn ? "Designs that feel like stationery" : "Дизайны как из типографии"}
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#6B6560]">
              {isEn
                ? "Start from a polished look. Customize colors, photos and blocks in minutes."
                : "Начните с готового вайба. Цвета, фото и блоки — за минуты."}
            </p>
          </div>
          <Link
            href={`/${locale}/templates`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#EDE8E1] bg-[#FAF8F5] px-4 py-2 text-sm font-medium text-[#1C1917] transition hover:border-[#1C1917] hover:bg-[#1C1917] hover:text-white"
          >
            {isEn ? "View all templates" : "Все шаблоны"}
            <ArrowRight
              size={14}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/${locale}/templates`}
                className="group block overflow-hidden rounded-[1.5rem] bg-[#FAF8F5] ring-1 ring-[#EDE8E1] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#D4C5A8]/60"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={tpl.preview}
                    alt={isEn ? tpl.nameEn : tpl.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-heading text-xl text-white">
                      {isEn ? tpl.nameEn : tpl.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-white/70">
                      {isEn ? tpl.descriptionEn : tpl.description}
                    </p>
                  </div>
                  {tpl.premium && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1C1917] shadow-sm">
                      Premium
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
