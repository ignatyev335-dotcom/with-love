"use client";

import { Button } from "@/components/ui/Button";
import { HERO_IMAGE } from "@/lib/seed";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/40 via-ivory to-light-sage/30" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-blush/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative order-2 overflow-hidden rounded-[2rem] shadow-soft-lg lg:order-1"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={HERO_IMAGE}
              alt="Wedding couple"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/40 bg-white/85 px-4 py-3 backdrop-blur-md">
            <div>
              <p className="text-xs text-muted">
                {isEn ? "Live demo" : "Живое демо"}
              </p>
              <p className="font-heading text-sm text-charcoal">
                Александр & Екатерина
              </p>
            </div>
            <Link href={`/${locale}/invite/aleksandr-ekaterina`}>
              <Button size="sm" variant="primary" className="gap-1.5">
                <Play size={12} className="fill-current" />
                {isEn ? "Open" : "Открыть"}
              </Button>
            </Link>
          </div>
          <div className="absolute -bottom-2 -left-2 h-24 w-24 rounded-full bg-soft-pink/50 blur-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="order-1 space-y-6 text-center lg:order-2 lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/80 px-3 py-1 text-xs text-muted shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            {isEn ? "Freemium · one-time upgrades" : "Freemium · разовые платежи"}
          </div>
          <h1 className="font-heading text-4xl leading-[1.15] tracking-tight text-charcoal sm:text-5xl lg:text-[3.25rem]">
            {t("heroTitle1")}
            <br />
            {t("heroTitle2")}
            <br />
            <span className="text-blush">{t("heroTitle3")}</span>
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-muted lg:mx-0 sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="min-w-[200px]">
                {t("heroCta")}
              </Button>
            </Link>
            <Link href={`/${locale}/templates`}>
              <Button size="lg" variant="secondary" className="min-w-[180px]">
                {t("viewTemplates")}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted/80">{t("heroHint")}</p>
        </motion.div>
      </div>
    </section>
  );
}
