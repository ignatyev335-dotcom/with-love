"use client";

import { motion } from "framer-motion";
import { MessageSquareX, Sparkles } from "lucide-react";

export function Comparison({ locale }: { locale: string }) {
  const isEn = locale === "en";

  const before = isEn
    ? [
        "«Who is coming?» in 5 group chats",
        "Screenshots of the venue address",
        "Excel guest list that nobody updates",
        "Guests asking the same questions twice",
      ]
    : [
        "«Кто идёт?» в пяти чатах",
        "Скриншоты адреса площадки",
        "Excel со списком, который никто не обновляет",
        "Гости спрашивают одно и то же по кругу",
      ];

  const after = isEn
    ? [
        "One link — RSVP in 30 seconds",
        "Map, schedule & dress code in place",
        "Live guest list in your dashboard",
        "Reminders for those who haven’t replied",
      ]
    : [
        "Одна ссылка — RSVP за 30 секунд",
        "Карта, программа и дресс-код на месте",
        "Живой список гостей в кабинете",
        "Напоминания тем, кто ещё не ответил",
      ];

  return (
    <section className="bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
            {isEn ? "Why couples switch" : "Зачем это нужно"}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-[#1C1917] sm:text-4xl">
            {isEn
              ? "Less chaos. More elegance."
              : "Меньше хаоса. Больше элегантности."}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[#EDE8E1] bg-white p-7 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5EDE9] text-[#9C6B63]">
                <MessageSquareX size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#9C948C]">
                  {isEn ? "Before" : "Было"}
                </p>
                <h3 className="font-heading text-lg text-[#1C1917]">
                  {isEn ? "Scattered messages" : "Разрозненные сообщения"}
                </h3>
              </div>
            </div>
            <ul className="space-y-3">
              {before.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#6B6560]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A39C]" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-[#1C1917] bg-[#1C1917] p-7 text-white sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#B8956C]/25 blur-3xl" />
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-[#E8D5CF]">
                <Sparkles size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {isEn ? "With Love" : "With Love"}
                </p>
                <h3 className="font-heading text-lg text-white">
                  {isEn ? "One beautiful link" : "Одна красивая ссылка"}
                </h3>
              </div>
            </div>
            <ul className="relative space-y-3">
              {after.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm leading-relaxed text-white/80"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8956C]" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
