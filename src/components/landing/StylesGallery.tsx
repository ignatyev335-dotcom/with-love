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
    <section className="relative bg-gradient-to-b from-white to-[#FDF9F3] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-heading text-3xl font-medium text-charcoal sm:text-4xl">
            {t("stylesTitle")}
          </h2>
          <GoldLine className="mt-4" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/${locale}/templates`}
                className="group block overflow-hidden rounded-[1.25rem] bg-white shadow-[0_8px_30px_-8px_rgba(40,43,43,0.1)] ring-1 ring-[#EDE7DD] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(40,43,43,0.14)]"
              >
                {/* invitation-card look */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src={tpl.preview}
                    alt={tpl.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#282B2B]/45 via-[#282B2B]/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                    <p className="font-heading text-xl text-white drop-shadow-sm">
                      {isEn ? tpl.nameEn : tpl.name}
                    </p>
                    <p className="mt-1 text-[11px] text-white/80">
                      {isEn ? tpl.descriptionEn : tpl.description}
                    </p>
                  </div>
                  {tpl.premium && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-[#C4A35A] shadow-sm">
                      Premium
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-1.5 border-t border-[#F0EBE3] bg-[#FDFCFA] px-4 py-3">
                  {tpl.colors.map((c) => (
                    <span
                      key={c}
                      className="h-3.5 w-3.5 rounded-full ring-1 ring-black/5"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/templates`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#E8A09A] transition-colors hover:text-[#d9928c]"
          >
            {t("viewTemplates")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
