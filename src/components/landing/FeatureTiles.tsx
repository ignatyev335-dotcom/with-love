"use client";

import {
  Camera,
  Gift,
  HelpCircle,
  MapPinned,
  PartyPopper,
  Shirt,
} from "lucide-react";

const tiles = [
  {
    icon: Camera,
    title: "Главное фото",
    titleEn: "Hero photo",
    desc: "Обложка вашей истории",
    descEn: "Cover of your story",
  },
  {
    icon: PartyPopper,
    title: "Программа дня",
    titleEn: "Day schedule",
    desc: "Тайминг и ключевые события",
    descEn: "Timing & key moments",
  },
  {
    icon: Gift,
    title: "After Wedding",
    titleEn: "After Wedding",
    desc: "Пост-праздник и brunch",
    descEn: "After-party & brunch",
  },
  {
    icon: Shirt,
    title: "Дресс-код",
    titleEn: "Dress code",
    desc: "Пожелания к наряду",
    descEn: "Outfit guidance",
  },
  {
    icon: MapPinned,
    title: "Карта и локация",
    titleEn: "Map & venue",
    desc: "Адрес в один клик",
    descEn: "Address in one tap",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    titleEn: "FAQ",
    desc: "Ответы до вопросов",
    descEn: "Answers before questions",
  },
];

export function FeatureTiles({ locale }: { locale: string }) {
  const isEn = locale === "en";
  return (
    <section className="bg-[#FBF8F3] py-10">
      <div className="mx-auto grid max-w-[1120px] gap-3 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              className="flex flex-col items-start gap-2 rounded-2xl border border-[#EFE9E0] bg-white/80 px-4 py-4 shadow-[0_2px_10px_-4px_rgba(40,43,43,0.06)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBF8F3] text-[#C4A35A]">
                <Icon size={18} strokeWidth={1.4} />
              </div>
              <p className="text-[13px] font-medium text-[#3A3632]">
                {isEn ? t.titleEn : t.title}
              </p>
              <p className="text-[11px] leading-snug text-[#A39E96]">
                {isEn ? t.descEn : t.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
