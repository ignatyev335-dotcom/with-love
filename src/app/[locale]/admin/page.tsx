"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
  Activity,
  Eye,
  Heart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const KPIS = [
  {
    label: "Всего пользователей",
    value: "12 458",
    change: "+8,2%",
    icon: Users,
  },
  {
    label: "Активных сайтов",
    value: "3 247",
    change: "+6,1%",
    icon: Heart,
  },
  {
    label: "Опубликованные",
    value: "8 936",
    change: "+7,4%",
    icon: Eye,
  },
  {
    label: "Конверсия RSVP",
    value: "68,4%",
    change: "+4,3 п.п.",
    icon: TrendingUp,
  },
  {
    label: "Выручка",
    value: "5 682 400 ₽",
    change: "+12,9%",
    icon: Wallet,
  },
  {
    label: "Здоровье системы",
    value: "99,9%",
    change: "Без сбоев",
    icon: Activity,
  },
];

const TOP_TEMPLATES = [
  { name: "Лавандовый сад", count: 1248, pct: 24.1 },
  { name: "Классика", count: 1102, pct: 21.3 },
  { name: "Пудровый нежность", count: 956, pct: 18.5 },
  { name: "Оливковая ветвь", count: 714, pct: 13.8 },
  { name: "Минимализм", count: 512, pct: 9.9 },
];

const RECENT = [
  { name: "Мария и Алексей", date: "25.06.2024", status: "published" },
  { name: "Анна и Дмитрий", date: "10.07.2024", status: "published" },
  { name: "Екатерина и Игорь", date: "14.07.2024", status: "draft" },
  { name: "Юлия и Никита", date: "20.07.2024", status: "published" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-medium text-charcoal">
          Дашборд
        </h1>
        <p className="mt-1 text-sm text-[#8a8580]">
          Обзор ключевых показателей платформы
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="pt-4 pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#D4A537] ring-1 ring-[#EDE7DD]">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-medium text-[#A7B8A1]">
                    {k.change}
                  </span>
                </div>
                <p className="text-[11px] text-[#8a8580]">{k.label}</p>
                <p className="mt-0.5 font-heading text-xl text-charcoal">
                  {k.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Подписки и тарифы</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Premium", pct: 56.7, color: "bg-[#E8A09A]" },
              { name: "Pro", pct: 30.4, color: "bg-[#D4A537]" },
              { name: "Базовый", pct: 10.9, color: "bg-[#A7B8A1]" },
              { name: "Тестовый", pct: 1.9, color: "bg-[#EDE7DD]" },
            ].map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="text-[#8a8580]">{p.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#FAF7F2]">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Топ шаблонов</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOP_TEMPLATES.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAF7F2] text-xs font-medium text-[#8a8580]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-[#8a8580]">
                    {t.count} · {t.pct}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Последние приглашения</h2>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {RECENT.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-[#8a8580]">{r.date}</p>
                </div>
                <Badge
                  variant={r.status === "published" ? "success" : "muted"}
                >
                  {r.status === "published" ? "Опубликовано" : "Черновик"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Открытые обращения</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="font-heading text-2xl text-amber-700">18</p>
                <p className="text-xs text-[#8a8580]">Новые</p>
              </div>
              <div className="rounded-2xl bg-[#F8E8E8] p-4">
                <p className="font-heading text-2xl text-[#B76E6E]">16</p>
                <p className="text-xs text-[#8a8580]">В работе</p>
              </div>
              <div className="rounded-2xl bg-[#E8EDE5] p-4">
                <p className="font-heading text-2xl text-[#4a6344]">8</p>
                <p className="text-xs text-[#8a8580]">Ожидают</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Состояние системы</h2>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              "Веб-приложение",
              "База данных",
              "Платежи",
              "Почтовый сервис",
              "Интеграции",
            ].map((s) => (
              <div
                key={s}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm"
              >
                <span>{s}</span>
                <Badge variant="success">OK</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
