"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

const USERS = [
  {
    name: "Ольга Смирнова",
    email: "olga@example.com",
    role: "Планировщик",
    plan: "Премиум",
    status: "Активен",
    projects: 8,
    date: "14.05.2025",
  },
  {
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "Профессионал",
    plan: "Про",
    status: "Активен",
    projects: 12,
    date: "13.05.2025",
  },
  {
    name: "Александр Кузнецов",
    email: "alex@example.com",
    role: "Администратор",
    plan: "—",
    status: "Активен",
    projects: 0,
    date: "12.05.2025",
  },
  {
    name: "Мария Белова",
    email: "maria@example.com",
    role: "Планировщик",
    plan: "Базовый",
    status: "Триал",
    projects: 2,
    date: "11.05.2025",
  },
  {
    name: "Дмитрий Соколов",
    email: "dmitry@example.com",
    role: "Профессионал",
    plan: "Про",
    status: "Активен",
    projects: 6,
    date: "10.05.2025",
  },
  {
    name: "Елена Иванова",
    email: "elena@example.com",
    role: "Планировщик",
    plan: "Базовый",
    status: "Неактивен",
    projects: 0,
    date: "08.05.2025",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-charcoal">
          Пользователи и подписки
        </h1>
        <p className="mt-1 text-sm text-muted">
          Управление аккаунтами, доступами и монетизацией
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Всего пользователей", value: "3 857" },
          { label: "Платные аккаунты", value: "1 892" },
          { label: "На триале", value: "512" },
          { label: "Отток", value: "4,8%" },
          { label: "MRR / Выручка", value: "5 682 400 ₽" },
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
          <h2 className="font-heading text-lg">Пользователи</h2>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input className="h-9 pl-9 text-sm" placeholder="Поиск..." />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-y border-border/60 bg-warm-beige/30 text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-medium">Пользователь</th>
                <th className="px-4 py-3 font-medium">Роль</th>
                <th className="px-4 py-3 font-medium">Тариф</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Проектов</th>
                <th className="px-4 py-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr
                  key={u.email}
                  className="border-b border-border/40 last:border-0 hover:bg-warm-beige/20"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal">{u.name}</p>
                    <p className="text-xs text-muted">{u.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted">{u.role}</td>
                  <td className="px-4 py-3">
                    <Badge variant="gold">{u.plan}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        u.status === "Активен"
                          ? "success"
                          : u.status === "Триал"
                            ? "warning"
                            : "muted"
                      }
                    >
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{u.projects}</td>
                  <td className="px-4 py-3 text-muted">{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
