"use client";

import { Badge } from "@/components/ui/Badge";
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
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl text-charcoal sm:text-4xl">
            {t("stylesTitle")}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              className="group block overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={tpl.preview}
                  alt={tpl.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {tpl.premium && (
                  <div className="absolute right-3 top-3">
                    <Badge variant="gold">Premium</Badge>
                  </div>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-lg text-charcoal">
                  {isEn ? tpl.nameEn : tpl.name}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {isEn ? tpl.descriptionEn : tpl.description}
                </p>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/templates`}
            className="text-sm font-medium text-blush hover:underline"
          >
            {t("viewTemplates")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
