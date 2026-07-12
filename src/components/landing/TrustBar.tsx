"use client";

export function TrustBar({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const stats = isEn
    ? [
        { value: "12 000+", label: "couples" },
        { value: "89 000+", label: "RSVPs collected" },
        { value: "4.9 ★", label: "average rating" },
        { value: "15 min", label: "to publish" },
      ]
    : [
        { value: "12 000+", label: "пар" },
        { value: "89 000+", label: "ответов RSVP" },
        { value: "4.9 ★", label: "средняя оценка" },
        { value: "15 мин", label: "до публикации" },
      ];

  return (
    <section className="border-y border-[#EDE8E1] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-[#F0EBE3] sm:grid-cols-4 sm:divide-y-0">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center px-4 py-8 text-center sm:py-10"
          >
            <p className="font-heading text-2xl tracking-tight text-[#1C1917] sm:text-[1.85rem]">
              {s.value}
            </p>
            <p className="mt-1.5 text-xs text-[#9C948C] sm:text-[13px]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
