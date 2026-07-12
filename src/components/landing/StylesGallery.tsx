"use client";

import { GoldLine } from "@/components/decor/Floral";
import { TEMPLATES } from "@/lib/seed";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function StylesGallery({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";
  const styles = TEMPLATES.slice(0, 6);

  return (
    <section className="relative bg-[#FFFCFA] py-14 lg:py-18">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col items-center text-center">
          <h2 className="font-heading text-[1.85rem] font-normal text-[#2C2926] sm:text-[2.15rem]">
            {t("stylesTitle")}
          </h2>
          <GoldLine className="mt-3.5" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {styles.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/${locale}/templates`}
                className="group block overflow-hidden rounded-[1.1rem] bg-white shadow-[0_6px_28px_-12px_rgba(50,40,30,0.14)] ring-1 ring-[#EFE9E0] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(50,40,30,0.18)]"
              >
                {/* invitation-card vertical */}
                <div className="relative aspect-[5/6] overflow-hidden bg-[#F7F1EA]">
                  <Image
                    src={tpl.preview}
                    alt={tpl.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2926]/55 via-[#2C2926]/10 to-transparent" />
                  {/* faux invitation label overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                    <p className="font-heading text-[1.35rem] text-white drop-shadow">
                      {isEn ? tpl.nameEn : tpl.name}
                    </p>
                    <p className="mt-1 text-[11px] text-white/75">
                      {isEn ? tpl.descriptionEn : tpl.description}
                    </p>
                  </div>
                  {tpl.premium && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/92 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-[#C4A35A] shadow-sm">
                      Premium
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-1.5 border-t border-[#F3EEE6] bg-[#FFFCFA] px-4 py-2.5">
                  {tpl.colors.map((c) => (
                    <span
                      key={c}
                      className="h-3 w-3 rounded-full ring-1 ring-black/5"
                      style={{ background: c }}
                    />
                  ))}
                  <span className="ml-2 text-[11px] text-[#A39E96]">
                    {isEn ? tpl.nameEn : tpl.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link
            href={`/${locale}/templates`}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#D4A39C] transition-colors hover:text-[#c9948d]"
          >
            {t("viewTemplates")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
