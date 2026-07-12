"use client";

import { FloralCorner } from "@/components/decor/Floral";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

export function CTABanner({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#EDE7DD] bg-gradient-to-br from-[#F8E8E8]/90 via-[#FDF9F3] to-[#E8EDE5]/60 px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16"
      >
        <FloralCorner className="pointer-events-none absolute -left-6 -bottom-4 h-40 w-40 opacity-50" />
        <FloralCorner
          flip
          className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 opacity-45"
        />

        <div className="relative">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#E8A09A] shadow-sm">
            <Heart size={20} className="fill-current" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-2xl font-medium text-charcoal sm:text-3xl lg:text-[2.1rem]">
            {isEn
              ? "Create an invitation that feels like your day"
              : "Создайте приглашение, которое чувствуется как ваш день"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[#8a8580] sm:text-base">
            {isEn
              ? "Beautiful templates, live RSVP, music and guest management — free to start."
              : "Красивые шаблоны, живой RSVP, музыка и управление гостями — начните бесплатно."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="min-w-[200px]">
                {isEn ? "Create free invitation" : "Создать бесплатно"}
              </Button>
            </Link>
            <Link href={`/${locale}/invite/aleksandr-ekaterina`}>
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                {isEn ? "View demo invitation" : "Смотреть демо-приглашение"}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
