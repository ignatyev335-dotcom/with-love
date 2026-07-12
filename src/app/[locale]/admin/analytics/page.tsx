"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">Аналитика</h1>
        <p className="mt-1 text-sm text-muted">
          Отчёты, конверсии и источники трафика
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Приглашения", value: "1 240" },
          { label: "Ответы", value: "856" },
          { label: "Гости", value: "1 018" },
          { label: "Оплата", value: "846 900 ₽" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-4">
              <p className="text-xs text-muted">{k.label}</p>
              <p className="mt-1 font-heading text-2xl">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Источники трафика</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Ссылка", pct: 45, color: "bg-blush" },
              { name: "Соц. сети", pct: 30, color: "bg-gold" },
              { name: "QR-код", pct: 15, color: "bg-sage" },
              { name: "Другое", pct: 10, color: "bg-dusty-rose" },
            ].map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="text-muted">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-warm-beige">
                  <div
                    className={`h-full rounded-full ${s.color}`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Финансы</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: "Всего сборов", value: "846 900 ₽" },
              { label: "Средний чек", value: "3 520 ₽" },
              { label: "Возвраты", value: "12 300 ₽" },
              { label: "Ожидается", value: "93 600 ₽" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between">
                <span className="text-muted">{r.label}</span>
                <span className="font-medium">{r.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
