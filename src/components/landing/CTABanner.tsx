"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTABanner({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#1C1917] px-6 py-16 text-center sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-[#B8956C]/25 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#E8D5CF]/15 blur-[70px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />

        <div className="relative">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#B8956C]">
            {isEn ? "Start today" : "Начните сегодня"}
          </p>
          <h2 className="font-heading text-3xl leading-tight text-white sm:text-4xl md:text-[2.75rem]">
            {isEn
              ? "Ready for a link guests will love?"
              : "Готовы к ссылке, которую полюбят гости?"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
            {isEn
              ? "Create a free invitation in minutes. Upgrade later if you need more guests or no watermark."
              : "Создайте бесплатное приглашение за минуты. Апгрейд — когда понадобится больше гостей или снять водяной знак."}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="min-w-[210px] gap-2 rounded-full bg-white px-8 text-[15px] text-[#1C1917] shadow-lg hover:bg-white/90"
              >
                {isEn ? "Start free" : "Начать бесплатно"}
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href={`/${locale}/invite/aleksandr-ekaterina`}>
              <Button
                size="lg"
                className="min-w-[180px] rounded-full border border-white/20 bg-transparent text-[15px] text-white hover:bg-white/10"
              >
                {isEn ? "View demo" : "Смотреть демо"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
