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
    up: true,
  },
  {
    label: "Активных сайтов",
    value: "3 247",
    change: "+6,1%",
    icon: Heart,
    up: true,
  },
  {
    label: "Опубликованные",
    value: "8 936",
    change: "+7,4%",
    icon: Eye,
    up: true,
  },
  {
    label: "Конверсия RSVP",
    value: "68,4%",
    change: "+4,3 п.п.",
    icon: TrendingUp,
    up: true,
  },
  {
    label: "Выручка",
    value: "5 682 400 ₽",
    change: "+12,9%",
    icon: Wallet,
    up: true,
  },
  {
    label: "Здоровье системы",
    value: "99,9%",
    change: "Без сбоев",
    icon: Activity,
    up: true,
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
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">Дашборд</h1>
        <p className="mt-1 text-sm text-muted">
          Обзор ключевых показателей платформы
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm-beige text-gold">
                    <Icon size={16} />
                  </div>
                  <span className="text-[11px] font-medium text-sage">
                    {k.change}
                  </span>
                </div>
                <p className="text-xs text-muted">{k.label}</p>
                <p className="mt-0.5 font-heading text-xl text-charcoal">
                  {k.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="font-heading text-lg">Подписки и тарифы</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Premium", pct: 56.7, color: "bg-blush" },
              { name: "Pro", pct: 30.4, color: "bg-gold" },
              { name: "Базовый", pct: 10.9, color: "bg-sage" },
              { name: "Тестовый", pct: 1.9, color: "bg-border" },
            ].map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="text-muted">{p.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-warm-beige">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="font-heading text-lg">Топ шаблонов</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOP_TEMPLATES.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warm-beige text-xs font-medium text-muted">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.count} · {t.pct}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="font-heading text-lg">Последние приглашения</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-xl bg-warm-beige/40 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted">{r.date}</p>
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

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Открытые обращения</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="font-heading text-2xl text-amber-700">18</p>
                <p className="text-xs text-muted">Новые</p>
              </div>
              <div className="rounded-2xl bg-soft-pink p-4">
                <p className="font-heading text-2xl text-deep-rose">16</p>
                <p className="text-xs text-muted">В работе</p>
              </div>
              <div className="rounded-2xl bg-light-sage p-4">
                <p className="font-heading text-2xl text-[#4a6344]">8</p>
                <p className="text-xs text-muted">Ожидают</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg">Состояние системы</h2>
          </CardHeader>
          <CardContent className="space-y-2">
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
