"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { useMemo } from "react";

export default function AnalyticsPage() {
  const guests = useAppStore((s) => s.guests);
  const invitation = useAppStore((s) => s.invitation);

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

    return {
      confirmed,
      declined,
      pending,
      plusOnes,
      totalAttending,
      conversion,
      views: invitation?.views ?? 0,
    };
  }, [guests, invitation]);

  const cards = [
    { label: "Просмотры приглашения", value: data.views },
    { label: "Конверсия ответов", value: `${data.conversion}%` },
    { label: "Подтвердили", value: data.confirmed },
    { label: "Всего гостей (с +1)", value: data.totalAttending },
    { label: "Отказались", value: data.declined },
    { label: "Без ответа", value: data.pending },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
        Аналитика
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="pt-5">
              <p className="text-sm text-muted">{c.label}</p>
              <p className="mt-1 font-heading text-3xl text-charcoal">
                {c.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">Распределение ответов</h2>
        </CardHeader>
        <CardContent>
          <div className="flex h-8 overflow-hidden rounded-full">
            {data.confirmed > 0 && (
              <div
                className="bg-sage"
                style={{
                  width: `${(data.confirmed / guests.length) * 100}%`,
                }}
                title="Подтвердили"
              />
            )}
            {data.declined > 0 && (
              <div
                className="bg-dusty-rose"
                style={{
                  width: `${(data.declined / guests.length) * 100}%`,
                }}
                title="Отказались"
              />
            )}
            {data.pending > 0 && (
              <div
                className="bg-gold/60"
                style={{
                  width: `${(data.pending / guests.length) * 100}%`,
                }}
                title="Без ответа"
              />
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-sage" /> Подтвердили
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-dusty-rose" /> Отказались
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gold/60" /> Без ответа
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
