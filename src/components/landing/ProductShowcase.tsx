"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Music2, Users } from "lucide-react";

export function ProductShowcase({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section id="features" className="bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
            {isEn ? "Product" : "Продукт"}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-[#1C1917] sm:text-4xl">
            {isEn
              ? "Everything guests need. Nothing they don’t."
              : "Всё, что нужно гостям. Ничего лишнего."}
          </h2>
          <p className="mt-3 text-[15px] text-[#6B6560]">
            {isEn
              ? "A focused invitation experience — RSVP, schedule, venue, music — not a bloated planner."
              : "Сфокусированное приглашение: RSVP, программа, локация, музыка — без перегруза планировщика."}
          </p>
        </div>

        {/* Bento */}
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {/* RSVP card — large */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 md:row-span-2 overflow-hidden rounded-[1.75rem] border border-[#EDE8E1] bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C1917] text-white">
                  <Users size={18} strokeWidth={1.6} />
                </div>
                <h3 className="font-heading text-2xl text-[#1C1917]">
                  {isEn ? "Smart RSVP" : "Умный RSVP"}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6B6560]">
                  {isEn
                    ? "Name, +1, meal preference, notes. Replies land in your dashboard the moment guests submit."
                    : "Имя, +1, меню, комментарий. Ответы сразу в кабинете — как только гость нажал «Отправить»."}
                </p>
              </div>
            </div>

            {/* Mini form mock */}
            <div className="rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#9C948C]">
                {isEn ? "Guest form preview" : "Превью формы гостя"}
              </p>
              <div className="space-y-3">
                <div className="h-10 rounded-xl border border-[#EDE8E1] bg-white px-3 text-sm leading-10 text-[#9C948C]">
                  {isEn ? "Your full name" : "Ваше имя и фамилия"}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border-2 border-[#1C1917] bg-white px-3 py-2.5 text-center text-sm font-medium text-[#1C1917]">
                    {isEn ? "Attending" : "Приду"}
                  </div>
                  <div className="rounded-xl border border-[#EDE8E1] bg-white px-3 py-2.5 text-center text-sm text-[#9C948C]">
                    {isEn ? "Can’t make it" : "Не смогу"}
                  </div>
                </div>
                <div className="h-10 rounded-xl border border-[#EDE8E1] bg-white px-3 text-sm leading-10 text-[#9C948C]">
                  {isEn ? "Meal preference" : "Предпочтения по меню"}
                </div>
                <div className="rounded-full bg-[#1C1917] py-2.5 text-center text-sm font-medium text-white">
                  {isEn ? "Send RSVP" : "Отправить RSVP"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="md:col-span-5 overflow-hidden rounded-[1.75rem] border border-[#EDE8E1] bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C1917] text-white">
              <Calendar size={18} strokeWidth={1.6} />
            </div>
            <h3 className="font-heading text-xl text-[#1C1917]">
              {isEn ? "Countdown & schedule" : "Таймер и программа"}
            </h3>
            <p className="mt-1.5 text-sm text-[#6B6560]">
              {isEn
                ? "Day timeline so nobody misses the first dance."
                : "Timeline дня — никто не пропустит первый танец."}
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {(isEn
                ? [
                    ["42", "days"],
                    ["08", "hrs"],
                    ["16", "min"],
                    ["03", "sec"],
                  ]
                : [
                    ["42", "дн"],
                    ["08", "ч"],
                    ["16", "мин"],
                    ["03", "сек"],
                  ]
              ).map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-xl bg-[#FAF8F5] py-3 text-center"
                >
                  <p className="font-heading text-xl text-[#1C1917]">{v}</p>
                  <p className="text-[10px] uppercase tracking-wide text-[#9C948C]">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Venue + Music row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 overflow-hidden rounded-[1.75rem] border border-[#EDE8E1] bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C1917] text-white">
              <MapPin size={18} strokeWidth={1.6} />
            </div>
            <h3 className="font-heading text-lg text-[#1C1917]">
              {isEn ? "Venue" : "Локация"}
            </h3>
            <p className="mt-1 text-sm text-[#6B6560]">
              {isEn ? "Map, address, transfer tips." : "Карта, адрес, трансфер."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="md:col-span-2 overflow-hidden rounded-[1.75rem] border border-[#EDE8E1] bg-[#1C1917] p-6 text-white shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#E8D5CF]">
              <Music2 size={18} strokeWidth={1.6} />
            </div>
            <h3 className="font-heading text-lg">{isEn ? "Music" : "Музыка"}</h3>
            <p className="mt-1 text-sm text-white/60">
              {isEn ? "Soft ambient track." : "Мягкий фон."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
