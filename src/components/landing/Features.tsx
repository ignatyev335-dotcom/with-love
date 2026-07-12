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
    <section id="features" className="relative border-y border-[#EDE7DD] bg-white/70 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-8 lg:gap-1">
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group flex flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center transition-all hover:bg-[#FAF7F2]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#C4A35A] ring-1 ring-[#EDE7DD] transition-colors group-hover:bg-[#F8E8E8] group-hover:text-[#E8A09A]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-medium tracking-wide text-charcoal sm:text-xs">
                  {isEn ? f.titleEn : f.title}
                </span>
                <span className="hidden text-[10px] leading-snug text-[#a39e97] lg:block">
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
