"use client";

import {
  BookOpen,
  Car,
  Clock,
  CreditCard,
  Heart,
  Layout,
  Music,
  Users,
} from "lucide-react";

const items = [
  { icon: Heart, title: "RSVP", titleEn: "RSVP", desc: "Удобный сбор ответов", descEn: "Collect replies" },
  { icon: Clock, title: "Таймер", titleEn: "Countdown", desc: "Обратный отсчёт", descEn: "Days to go" },
  { icon: Car, title: "Трансфер", titleEn: "Transfer", desc: "Как добраться", descEn: "Getting there" },
  { icon: BookOpen, title: "Love story", titleEn: "Love story", desc: "Ваша история", descEn: "Your story" },
  { icon: Music, title: "Музыка", titleEn: "Music", desc: "Плейлист", descEn: "Playlist" },
  { icon: Users, title: "Рассадка", titleEn: "Seating", desc: "Схема столов", descEn: "Table chart" },
  { icon: Layout, title: "Шаблоны", titleEn: "Templates", desc: "Стильные дизайны", descEn: "Stylish designs" },
  { icon: CreditCard, title: "Оплата", titleEn: "Gifts", desc: "Подарки онлайн", descEn: "Online gifts" },
];

export function Features({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section
      id="features"
      className="relative border-y border-[#EFE9E0] bg-white/80 py-6 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-1 lg:grid-cols-8">
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group flex flex-col items-center gap-1.5 rounded-2xl px-1 py-3 text-center transition-colors hover:bg-[#FBF8F3]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#C4A35A] transition-colors group-hover:bg-[#F8E8E8] group-hover:text-[#D4A39C]">
                  <Icon size={20} strokeWidth={1.35} />
                </div>
                <span className="text-[11px] font-medium tracking-wide text-[#3A3632] sm:text-xs">
                  {isEn ? f.titleEn : f.title}
                </span>
                <span className="hidden max-w-[90px] text-[10px] leading-snug text-[#A39E96] lg:block">
                  {isEn ? f.descEn : f.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
