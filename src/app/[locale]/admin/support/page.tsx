"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const TICKETS = [
  {
    client: "Елена Морозова",
    topic: "Проблема с оплатой",
    priority: "Высокий",
    status: "В работе",
    date: "15.05, 14:32",
  },
  {
    client: "Дмитрий Волков",
    topic: "Вопрос по шаблону",
    priority: "Средний",
    status: "Новый",
    date: "15.05, 13:21",
  },
  {
    client: "Анна Кузнецова",
    topic: "API интеграция",
    priority: "Высокий",
    status: "Новый",
    date: "15.05, 11:05",
  },
  {
    client: "Сергей Лебедев",
    topic: "Возврат средств",
    priority: "Высокий",
    status: "Закрыт",
    date: "14.05, 18:40",
  },
  {
    client: "Мария Соколова",
    topic: "Проблема с доменом",
    priority: "Низкий",
    status: "В работе",
    date: "14.05, 10:15",
  },
];

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">Поддержка</h1>
        <p className="mt-1 text-sm text-[#8a8580]">Тикеты и обращения клиентов</p>
      </div>
      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">Обращения</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          {TICKETS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-2xl border border-[#EDE7DD]/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium">{t.client}</p>
                <p className="text-xs text-[#8a8580]">{t.topic}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    t.priority === "Высокий"
                      ? "danger"
                      : t.priority === "Средний"
                        ? "warning"
                        : "muted"
                  }
                >
                  {t.priority}
                </Badge>
                <Badge
                  variant={
                    t.status === "Закрыт"
                      ? "success"
                      : t.status === "Новый"
                        ? "blush"
                        : "gold"
                  }
                >
                  {t.status}
                </Badge>
                <span className="text-xs text-[#8a8580]">{t.date}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
