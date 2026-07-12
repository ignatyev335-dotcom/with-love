"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { useLocale } from "next-intl";
import { useMemo } from "react";

export default function AnalyticsPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const guests = useAppStore((s) => s.guests);
  const invitation = useAppStore((s) => s.invitation);
  const wishes = useAppStore((s) => s.wishes);

  const data = useMemo(() => {
    const confirmed = guests.filter((g) => g.status === "confirmed").length;
    const declined = guests.filter((g) => g.status === "declined").length;
    const pending = guests.filter(
      (g) => g.status === "pending" || g.status === "maybe"
    ).length;
    const plusOnes = guests
      .filter((g) => g.status === "confirmed")
      .reduce((s, g) => s + g.plusOnes, 0);
    const totalAttending = confirmed + plusOnes;
    const conversion = guests.length
      ? Math.round(((confirmed + declined) / guests.length) * 100)
      : 0;
    const dietary = guests.filter((g) => g.dietary).length;

    return {
      confirmed,
      declined,
      pending,
      plusOnes,
      totalAttending,
      conversion,
      views: invitation?.views ?? 0,
      wishes: wishes.length,
      dietary,
    };
  }, [guests, invitation, wishes]);

  const cards = [
    {
      label: isEn ? "Invitation views" : "Просмотры",
      value: data.views,
    },
    {
      label: isEn ? "Response rate" : "Конверсия ответов",
      value: `${data.conversion}%`,
    },
    {
      label: isEn ? "Confirmed" : "Подтвердили",
      value: data.confirmed,
    },
    {
      label: isEn ? "Attending (+1)" : "Гостей (с +1)",
      value: data.totalAttending,
    },
    {
      label: isEn ? "Declined" : "Отказались",
      value: data.declined,
    },
    {
      label: isEn ? "No response" : "Без ответа",
      value: data.pending,
    },
    {
      label: isEn ? "Wishes" : "Пожеланий",
      value: data.wishes,
    },
    {
      label: isEn ? "Dietary notes" : "Диета",
      value: data.dietary,
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-medium text-charcoal sm:text-[1.75rem]">
          {isEn ? "Analytics" : "Аналитика"}
        </h1>
        <p className="mt-1 text-sm text-[#8a8580]">
          {isEn
            ? "RSVP performance for your wedding invitation"
            : "Эффективность RSVP по вашему приглашению"}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="pt-4 pb-4">
              <p className="text-[11px] text-[#8a8580]">{c.label}</p>
              <p className="mt-1 font-heading text-3xl text-charcoal">
                {c.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">
              {isEn ? "Response distribution" : "Распределение ответов"}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex h-3 overflow-hidden rounded-full bg-[#FAF7F2]">
              {data.confirmed > 0 && (
                <div
                  className="bg-[#A7B8A1] transition-all"
                  style={{
                    width: `${(data.confirmed / Math.max(guests.length, 1)) * 100}%`,
                  }}
                />
              )}
              {data.declined > 0 && (
                <div
                  className="bg-[#C98B88] transition-all"
                  style={{
                    width: `${(data.declined / Math.max(guests.length, 1)) * 100}%`,
                  }}
                />
              )}
              {data.pending > 0 && (
                <div
                  className="bg-[#D4A537]/70 transition-all"
                  style={{
                    width: `${(data.pending / Math.max(guests.length, 1)) * 100}%`,
                  }}
                />
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#8a8580]">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#A7B8A1]" />{" "}
                {isEn ? "Confirmed" : "Подтвердили"} ({data.confirmed})
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C98B88]" />{" "}
                {isEn ? "Declined" : "Отказались"} ({data.declined})
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4A537]/70" />{" "}
                {isEn ? "Pending" : "Без ответа"} ({data.pending})
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">
              {isEn ? "Funnel" : "Воронка"}
            </h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                label: isEn ? "Views" : "Просмотры",
                value: data.views,
                max: Math.max(data.views, 1),
              },
              {
                label: isEn ? "In guest list" : "В списке",
                value: guests.length,
                max: Math.max(data.views, guests.length, 1),
              },
              {
                label: isEn ? "Responded" : "Ответили",
                value: data.confirmed + data.declined,
                max: Math.max(guests.length, 1),
              },
              {
                label: isEn ? "Coming" : "Придут",
                value: data.totalAttending,
                max: Math.max(data.totalAttending, guests.length, 1),
              },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-[#8a8580]">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[#FAF7F2]">
                  <div
                    className="h-full rounded-full bg-[#E8A09A]/85"
                    style={{
                      width: `${Math.min(100, (row.value / row.max) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
