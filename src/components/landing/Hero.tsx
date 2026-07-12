"use client";

import { FloralCorner, GoldFlourish } from "@/components/decor/Floral";
import { Button } from "@/components/ui/Button";
import { HERO_IMAGE } from "@/lib/seed";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF9F3] via-ivory to-[#F8F4EE]">
      {/* soft ambient florals */}
      <FloralCorner className="pointer-events-none absolute -left-8 top-24 h-56 w-56 opacity-70 lg:h-72 lg:w-72" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-6 bottom-0 h-64 w-64 opacity-60 lg:h-80 lg:w-80"
      />
      <div className="pointer-events-none absolute right-1/4 top-16 h-40 w-40 rounded-full bg-[#F8E8E8]/50 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 bottom-10 h-32 w-32 rounded-full bg-[#E8EDE5]/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
        {/* Photo — left, soft rounded, florals peeking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto max-w-lg">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#F8E8E8]/80 via-transparent to-[#E8EDE5]/50 blur-sm" />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_-12px_rgba(40,43,43,0.15)] ring-1 ring-white/80">
              <div className="relative aspect-[5/4]">
                <Image
                  src={HERO_IMAGE}
                  alt="Wedding couple"
                  fill
                  priority
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#282B2B]/15 via-transparent to-transparent" />
              </div>
            </div>
            {/* floral overlays on photo corners */}
            <FloralCorner className="pointer-events-none absolute -bottom-6 -left-6 h-36 w-36 drop-shadow-sm" />
            <FloralCorner
              flip
              className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 opacity-90"
            />
          </div>
        </motion.div>

        {/* Copy — right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left"
        >
          <GoldFlourish className="mb-4 h-8 w-28 opacity-80" />
          <h1 className="font-heading text-[2.35rem] font-medium leading-[1.18] tracking-tight text-charcoal sm:text-5xl lg:text-[3.15rem]">
            <span className="block">{t("heroTitle1")}</span>
            <span className="block">{t("heroTitle2")}</span>
            <span className="mt-1 block text-charcoal">{t("heroTitle3")}</span>
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#8a8580] sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="min-w-[200px] rounded-full bg-[#E8A09A] px-8 shadow-soft hover:bg-[#d9928c]"
              >
                {t("heroCta")}
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs tracking-wide text-[#a39e97]">
            {isEn ? "Create an invitation in 10 minutes" : "Создайте приглашение за 10 минут"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
