"use client";

import { Button } from "@/components/ui/Button";
import { HERO_IMAGE } from "@/lib/seed";
import { motion } from "framer-motion";
import { ArrowRight, Check, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5]">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-[#E8D5CF]/40 blur-[100px]" />
        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#D4C5A8]/30 blur-[90px]" />
        <div className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#EDE8E1] to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-20 lg:px-8">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8E2D9] bg-white/90 px-3.5 py-1.5 text-xs font-medium text-[#5C564F] shadow-sm backdrop-blur">
            <Sparkles size={12} className="text-[#B8956C]" />
            {isEn
              ? "Free forever · One-time upgrades"
              : "Бесплатно навсегда · Разовый апгрейд"}
          </div>

          <h1 className="font-heading text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.04]">
            {isEn ? (
              <>
                The wedding site
                <br />
                guests actually
                <br />
                <span className="italic text-[#B8956C]">open &amp; love</span>
              </>
            ) : (
              <>
                Сайт-приглашение,
                <br />
                которое гости
                <br />
                <span className="italic text-[#B8956C]">открывают с улыбкой</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#6B6560] sm:text-lg lg:mx-0">
            {isEn
              ? "Design a beautiful invitation, collect RSVPs, share venue & schedule — one elegant link instead of endless group chats."
              : "Красивое приглашение, RSVP, локация и программа — одна элегантная ссылка вместо бесконечных чатов в WhatsApp."}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="min-w-[210px] gap-2 rounded-full bg-[#1C1917] px-8 text-[15px] text-white shadow-[0_12px_40px_-12px_rgba(28,25,23,0.55)] hover:bg-[#2d2926]"
              >
                {isEn ? "Create free site" : "Создать бесплатно"}
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href={`/${locale}/invite/aleksandr-ekaterina`}>
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[190px] gap-2 rounded-full border-[#E8E2D9] bg-white/80 text-[15px] backdrop-blur"
              >
                <Play size={13} className="fill-current" />
                {isEn ? "See live demo" : "Живое демо"}
              </Button>
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[#6B6560] lg:justify-start">
            {(isEn
              ? ["No credit card", "Ready in 15 min", "RU & English"]
              : ["Без карты", "Готово за 15 мин", "RU и English"]
            ).map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50">
                  <Check size={11} className="text-emerald-600" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Product stage */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
        >
          {/* Soft stage shadow */}
          <div className="absolute inset-x-8 bottom-4 h-16 rounded-[100%] bg-[#1C1917]/10 blur-2xl" />

          {/* Floating photo card (back) */}
          <div className="absolute -right-1 top-6 hidden w-[48%] rotate-[7deg] overflow-hidden rounded-[1.4rem] border border-white/80 bg-white shadow-2xl sm:block">
            <div className="relative aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="180px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 font-heading text-sm text-white">
                {isEn ? "Save the date" : "Save the date"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="relative z-10 mx-auto w-[248px] sm:w-[270px]">
            <div className="rounded-[2.35rem] border-[9px] border-[#1C1917] bg-[#1C1917] p-[3px] shadow-[0_40px_80px_-20px_rgba(28,25,23,0.55)]">
              {/* notch */}
              <div className="absolute left-1/2 top-[14px] z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#1C1917]" />
              <div className="overflow-hidden rounded-[1.75rem] bg-[#FAF8F5]">
                <div className="relative aspect-[9/17.5]">
                  <Image
                    src={HERO_IMAGE}
                    alt="Demo invitation"
                    fill
                    priority
                    className="object-cover object-[center_18%]"
                    sizes="270px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center text-white">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                      {isEn ? "You are invited" : "Вы приглашены"}
                    </p>
                    <p className="mt-1.5 font-heading text-[1.65rem] leading-tight">
                      Александр
                      <br />
                      <span className="text-[#E8D5CF]">&</span> Екатерина
                    </p>
                    <p className="mt-1.5 text-xs text-white/70">20 · 06 · 2025</p>
                    <div className="mt-3.5 inline-flex rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#1C1917] shadow-lg">
                      {isEn ? "Confirm RSVP" : "Подтвердить RSVP"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating RSVP badge */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="absolute -left-8 bottom-[5.5rem] z-20 rounded-2xl border border-white/80 bg-white/95 px-3.5 py-3 shadow-xl backdrop-blur sm:-left-14"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700">
                  +12
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#9C948C]">
                    RSVP
                  </p>
                  <p className="text-sm font-medium text-[#1C1917]">
                    {isEn ? "replies today" : "ответов сегодня"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating guest chip */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute -right-4 top-20 z-20 rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur sm:-right-10"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["A", "M", "K"].map((l) => (
                    <span
                      key={l}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#E8D5CF] text-[10px] font-semibold text-[#1C1917]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium text-[#1C1917]">
                  {isEn ? "Going" : "Идут"} · 84
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
