"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

const ROWS = [
  {
    couple: "Александр & Екатерина",
    owner: "anna@example.com",
    status: "published",
    views: 342,
    rsvp: 89,
    plan: "Premium",
    date: "20.06.2025",
  },
  {
    couple: "Мария и Алексей",
    owner: "maria@example.com",
    status: "published",
    views: 210,
    rsvp: 54,
    plan: "Basic",
    date: "25.06.2024",
  },
  {
    couple: "Анна и Дмитрий",
    owner: "anna.d@example.com",
    status: "published",
    views: 156,
    rsvp: 40,
    plan: "Lux",
    date: "10.07.2024",
  },
  {
    couple: "Екатерина и Игорь",
    owner: "kate@example.com",
    status: "draft",
    views: 12,
    rsvp: 0,
    plan: "Free",
    date: "14.07.2024",
  },
  {
    couple: "Юлия и Никита",
    owner: "yulia@example.com",
    status: "published",
    views: 98,
    rsvp: 31,
    plan: "Premium",
    date: "20.07.2024",
  },
];

export default function AdminInvitationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">Приглашения</h1>
        <p className="mt-1 text-sm text-muted">
          Все опубликованные и черновые сайты платформы
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Всего", value: "8 936" },
          { label: "Опубликовано", value: "7 412" },
          { label: "Черновики", value: "1 524" },
          { label: "Ср. конверсия RSVP", value: "68%" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-4">
              <p className="text-xs text-muted">{k.label}</p>
              <p className="mt-1 font-heading text-xl">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-lg">Список</h2>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input className="h-9 pl-9 text-sm" placeholder="Поиск пары…" />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-y border-border/60 bg-warm-beige/30 text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-medium">Пара</th>
                <th className="px-4 py-3 font-medium">Организатор</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Просмотры</th>
                <th className="px-4 py-3 font-medium">RSVP</th>
                <th className="px-4 py-3 font-medium">Тариф</th>
                <th className="px-4 py-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={r.couple}
                  className="border-b border-border/40 last:border-0 hover:bg-warm-beige/20"
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {r.couple}
                  </td>
                  <td className="px-4 py-3 text-muted">{r.owner}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        r.status === "published" ? "success" : "muted"
                      }
                    >
                      {r.status === "published" ? "Опубликовано" : "Черновик"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{r.views}</td>
                  <td className="px-4 py-3 text-muted">{r.rsvp}</td>
                  <td className="px-4 py-3">
                    <Badge variant="gold">{r.plan}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
