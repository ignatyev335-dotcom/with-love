"use client";

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
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-blush/20 bg-gradient-to-br from-soft-pink via-cream to-light-sage px-6 py-12 text-center shadow-soft-lg sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blush/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-blush shadow-soft">
            <Heart size={22} className="fill-current" />
          </div>
          <h2 className="font-heading text-2xl text-charcoal sm:text-3xl lg:text-4xl">
            {isEn
              ? "Create an invitation that feels like your day"
              : "Создайте приглашение, которое чувствуется как ваш день"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
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
