"use client";

import {
  Clock,
  Heart,
  MapPin,
  Music,
  Smartphone,
  Users,
} from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "Умный RSVP",
    titleEn: "Smart RSVP",
    desc: "Имя, +1, меню, комментарий. Ответы сразу в кабинете",
    descEn: "Name, +1, meal, notes. Replies land in your dashboard",
  },
  {
    icon: Clock,
    title: "Таймер и программа",
    titleEn: "Countdown & schedule",
    desc: "Обратный отсчёт и timeline дня — гости ничего не пропустят",
    descEn: "Countdown and day timeline so guests never miss a moment",
  },
  {
    icon: MapPin,
    title: "Локация и трансфер",
    titleEn: "Venue & transfer",
    desc: "Адрес, карта и логистика в одном блоке",
    descEn: "Address, map and logistics in one clean block",
  },
  {
    icon: Music,
    title: "Фоновая музыка",
    titleEn: "Background music",
    desc: "Трек, который играет на странице — мягко и по делу",
    descEn: "A track that plays on the page — soft, not spammy",
  },
  {
    icon: Users,
    title: "Список гостей",
    titleEn: "Guest list",
    desc: "Статусы, экспорт CSV, напоминания тем, кто молчит",
    descEn: "Statuses, CSV export, reminders for non-responders",
  },
  {
    icon: Smartphone,
    title: "Мобильный first",
    titleEn: "Mobile-first",
    desc: "Гости открывают ссылку с телефона — всё крупно и понятно",
    descEn: "Guests open on phones — big type, clear actions",
  },
];

export function Features({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-[1.5rem] border border-[#EDE8E1] bg-[#FAF8F5]/50 p-6 transition hover:border-[#D4C5A8]/50 hover:bg-white hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1C1917] text-white transition group-hover:scale-105">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3 className="font-heading text-lg text-[#1C1917]">
                  {isEn ? f.titleEn : f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6560]">
                  {isEn ? f.descEn : f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
