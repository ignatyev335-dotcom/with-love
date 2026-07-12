"use client";

import { motion } from "framer-motion";
import {
  Camera,
  HelpCircle,
  MapPinned,
  Palette,
  Shield,
  Smartphone,
} from "lucide-react";

const items = [
  {
    icon: Smartphone,
    title: "Мобильный-first",
    titleEn: "Mobile-first",
    desc: "Гости открывают приглашение с телефона — всё крупно и понятно",
    descEn: "Guests open on phone — large, clear, effortless",
  },
  {
    icon: Palette,
    title: "Стиль под вашу свадьбу",
    titleEn: "Your wedding style",
    desc: "Классика, минимализм, роскошь, ботаника, путешествия",
    descEn: "Classic, minimal, luxury, botanic, travel",
  },
  {
    icon: MapPinned,
    title: "Локация и трансфер",
    titleEn: "Location & transfer",
    desc: "Адрес, карта и логистика в одном месте",
    descEn: "Address, map and logistics in one place",
  },
  {
    icon: Camera,
    title: "Живые фото пары",
    titleEn: "Couple photos",
    desc: "Hero и история с вашими кадрами создают атмосферу",
    descEn: "Hero and story with your photos set the mood",
  },
  {
    icon: HelpCircle,
    title: "FAQ для гостей",
    titleEn: "Guest FAQ",
    desc: "Дресс-код, дети, подарки — меньше вопросов в мессенджерах",
    descEn: "Dress code, kids, gifts — fewer messenger questions",
  },
  {
    icon: Shield,
    title: "Без регистрации для гостей",
    titleEn: "No guest accounts",
    desc: "RSVP за 30 секунд — имя и ответ, без приложений",
    descEn: "RSVP in 30 seconds — name and answer, no apps",
  },
];

export function BenefitsGrid({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="border-y border-[#EDE7DD]/40 bg-white/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl text-charcoal sm:text-4xl">
            {isEn ? "Everything guests need" : "Всё, что нужно гостям"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#8a8580]">
            {isEn
              ? "One elegant page instead of endless chat threads"
              : "Одна элегантная страница вместо бесконечных переписок"}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-3xl border border-[#EDE7DD]/70 bg-[#FAF7F2]/80 p-5 shadow-card transition-shadow hover:shadow-soft"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8E8E8] text-[#E8A09A]">
                  <Icon size={18} />
                </div>
                <h3 className="font-heading text-lg text-charcoal">
                  {isEn ? item.titleEn : item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#8a8580]">
                  {isEn ? item.descEn : item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
