"use client";

import { motion } from "framer-motion";
import { Link2, Palette, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Palette,
    n: "01",
    title: "Выберите шаблон",
    titleEn: "Pick a design",
    desc: "Классика, минимализм, luxury или travel — под настроение вашей свадьбы",
    descEn: "Classic, minimal, luxury or travel — match your wedding vibe",
  },
  {
    icon: Sparkles,
    n: "02",
    title: "Соберите страницу",
    titleEn: "Build your page",
    desc: "Имена, фото, программа, дресс-код, музыка — без дизайнера и кода",
    descEn: "Names, photos, schedule, dress code, music — no designer needed",
  },
  {
    icon: Link2,
    n: "03",
    title: "Отправьте ссылку",
    titleEn: "Share the link",
    desc: "Гости открывают с телефона, подтверждают RSVP — вы видите ответы live",
    descEn: "Guests open on mobile, RSVP instantly — you track replies live",
  },
];

export function HowItWorks({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section id="how" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
            {isEn ? "How it works" : "Как это работает"}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-[#1C1917] sm:text-4xl">
            {isEn ? "From idea to link in three steps" : "От идеи до ссылки — три шага"}
          </h2>
          <p className="mt-3 text-[15px] text-[#6B6560]">
            {isEn
              ? "No learning curve. Publish something guests are proud to open."
              : "Без обучения. Публикуете то, что гости рады открыть."}
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* connector line desktop */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-[#EDE8E1] to-transparent md:block" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-[1.75rem] border border-[#EDE8E1] bg-[#FAF8F5]/80 p-7 transition hover:border-[#D4C5A8]/70 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1C1917] text-white shadow-md">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <span className="font-heading text-3xl text-[#E8E2D9]">{s.n}</span>
                </div>
                <h3 className="font-heading text-xl text-[#1C1917]">
                  {isEn ? s.titleEn : s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#6B6560]">
                  {isEn ? s.descEn : s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
