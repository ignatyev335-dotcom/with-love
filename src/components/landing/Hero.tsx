"use client";

import {
  FloralBouquet,
  GoldFlourish,
  PaperWash,
} from "@/components/decor/Floral";
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
    <section className="relative overflow-hidden bg-[#FBF8F3]">
      <PaperWash />
      {/* page-edge florals like ref mockup background */}
      <FloralBouquet className="pointer-events-none absolute -right-4 top-8 z-0 hidden h-[22rem] w-[26rem] opacity-70 lg:block" />
      <FloralBouquet
        flip
        className="pointer-events-none absolute -left-16 bottom-0 z-0 h-64 w-72 opacity-40 lg:hidden"
      />

      <div className="relative z-10 mx-auto grid max-w-[1120px] items-stretch gap-0 px-4 pt-6 pb-2 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:px-8 lg:pt-10 lg:pb-4">
        {/* LEFT photo — full soft card with bouquet overlay (ref 01) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_24px_60px_-20px_rgba(60,50,40,0.22)] lg:rounded-br-none lg:rounded-tr-none lg:rounded-l-[1.5rem]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={HERO_IMAGE}
                alt="Wedding couple"
                fill
                priority
                className="object-cover object-[center_18%]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a3030]/20 via-transparent to-white/10" />
            </div>
            {/* bouquet sits on photo bottom-left — key ref detail */}
            <FloralBouquet className="pointer-events-none absolute -bottom-8 -left-10 h-52 w-60 drop-shadow-md sm:h-56 sm:w-64" />
          </div>
        </motion.div>

        {/* RIGHT copy panel — cream, airy (ref 01) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="order-1 flex flex-col justify-center rounded-[1.5rem] bg-[#FBF6F0]/90 px-6 py-10 text-center sm:px-10 lg:order-2 lg:rounded-l-none lg:rounded-r-[1.5rem] lg:py-14 lg:text-left lg:shadow-[0_24px_60px_-24px_rgba(60,50,40,0.12)]"
        >
          <div className="mb-5 flex justify-center lg:justify-start">
            <GoldFlourish className="h-7 w-36" />
          </div>
          <h1 className="font-heading text-[2.4rem] font-normal leading-[1.12] tracking-[-0.01em] text-[#2C2926] sm:text-[2.85rem] lg:text-[3.15rem]">
            <span className="block">{t("heroTitle1")}</span>
            <span className="block">{t("heroTitle2")}</span>
            <span className="block">{t("heroTitle3")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[280px] text-[14.5px] leading-relaxed text-[#8F8880] lg:mx-0 lg:max-w-[300px]">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="min-w-[190px] rounded-full bg-[#D4A39C] px-8 text-[14px] font-medium tracking-wide shadow-[0_8px_20px_-6px_rgba(212,163,156,0.55)] hover:bg-[#c9948d]"
              >
                {t("heroCta")}
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-[12px] tracking-wide text-[#B0A9A0]">
            {isEn
              ? "✦ Create an invitation in 10 minutes"
              : "✦ Создайте приглашение за 10 минут"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
