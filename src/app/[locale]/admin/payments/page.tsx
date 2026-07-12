"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const TX = [
  {
    name: "Александр & Екатерина",
    date: "15.05.2024",
    amount: "7 990 ₽",
    status: "Успешно",
  },
  {
    name: "Дмитрий & Мария",
    date: "15.05.2024",
    amount: "4 990 ₽",
    status: "Успешно",
  },
  {
    name: "Иван & Ольга",
    date: "15.05.2024",
    amount: "2 490 ₽",
    status: "Успешно",
  },
  {
    name: "Елена & Сергей",
    date: "14.05.2024",
    amount: "−2 490 ₽",
    status: "Возврат",
  },
  {
    name: "Кирилл & Анна",
    date: "14.05.2024",
    amount: "4 990 ₽",
    status: "Успешно",
  },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">Платежи и финансы</h1>
        <p className="mt-1 text-sm text-muted">
          Транзакции, комиссии, возвраты
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Доход за период", value: "5 682 400 ₽" },
          { label: "Успешные платежи", value: "3 247" },
          { label: "Средний чек", value: "2 138 ₽" },
          { label: "Комиссии", value: "568 240 ₽" },
          { label: "Возвраты", value: "42" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-4">
              <p className="text-xs text-muted">{k.label}</p>
              <p className="mt-1 font-heading text-xl">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-heading text-lg">Недавние транзакции</h2>
          </CardHeader>
          <CardContent className="space-y-2">
            {TX.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-warm-beige/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{t.amount}</span>
                  <Badge
                    variant={t.status === "Успешно" ? "success" : "danger"}
                  >
                    {t.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Возвраты и споры</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Ожидают рассмотрения", value: 8 },
              { label: "Одобрено", value: 12 },
              { label: "Отклонено", value: 22 },
              { label: "В процессе", value: 5 },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between text-sm"
              >
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
