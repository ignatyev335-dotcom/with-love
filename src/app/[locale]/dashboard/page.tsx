"use client";

import { SharePanel } from "@/components/dashboard/SharePanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  Baby,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  MapPin,
  Users,
  Wand2,
  XCircle,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const isEn = locale === "en";
  const user = useAppStore((s) => s.user);
  const wedding = useAppStore((s) => s.wedding);
  const invitation = useAppStore((s) => s.invitation);
  const guests = useAppStore((s) => s.guests);

  const stats = useMemo(() => {
    const confirmed = guests.filter((g) => g.status === "confirmed");
    const declined = guests.filter((g) => g.status === "declined");
    const pending = guests.filter(
      (g) => g.status === "pending" || g.status === "maybe"
    );
    const children = guests.reduce((s, g) => s + g.children, 0);
    const totalPeople = confirmed.reduce((s, g) => s + 1 + g.plusOnes, 0);
    return {
      invited: wedding?.guestCount ?? guests.length,
      confirmed: confirmed.length,
      confirmedPct: guests.length
        ? Math.round((confirmed.length / guests.length) * 100)
        : 0,
      declined: declined.length,
      declinedPct: guests.length
        ? Math.round((declined.length / guests.length) * 100)
        : 0,
      pending: pending.length,
      pendingPct: guests.length
        ? Math.round((pending.length / guests.length) * 100)
        : 0,
      children,
      totalPeople,
      listSize: guests.length,
    };
  }, [guests, wedding]);

  const recent = [...guests]
    .filter((g) => g.respondedAt)
    .sort(
      (a, b) =>
        new Date(b.respondedAt!).getTime() - new Date(a.respondedAt!).getTime()
    )
    .slice(0, 5);

  const scheduleItems =
    (invitation?.config.blocks.find((b) => b.type === "schedule")?.data
      .items as { time: string; title: string }[]) || [];

  if (!wedding || !invitation) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-heading text-2xl text-charcoal">{t("noWedding")}</h2>
        <Link href={`/${locale}/dashboard/editor`} className="mt-4">
          <Button>{t("createFirst")}</Button>
        </Link>
      </div>
    );
  }

  const checklist = [
    {
      done: invitation.published,
      label: isEn ? "Publish invitation" : "Опубликовать приглашение",
      href: `/${locale}/dashboard/editor`,
    },
    {
      done: stats.listSize >= 5,
      label: isEn ? "Add guest list" : "Добавить список гостей",
      href: `/${locale}/dashboard/guests`,
    },
    {
      done: Boolean(
        invitation.config.blocks.find((b) => b.type === "location")?.enabled
      ),
      label: isEn ? "Set venue & address" : "Указать локацию",
      href: `/${locale}/dashboard/editor`,
    },
    {
      done: Boolean(invitation.config.music?.enabled),
      label: isEn ? "Choose background music" : "Выбрать музыку",
      href: `/${locale}/dashboard/editor`,
    },
    {
      done: stats.confirmed > 0,
      label: isEn ? "Collect first RSVPs" : "Получить первые RSVP",
      href: `/${locale}/invite/${invitation.slug}`,
    },
  ];

  const kpi = [
    {
      label: t("guestsInvited"),
      value: stats.invited,
      icon: Users,
      tone: "bg-[#FAF7F2] text-charcoal",
    },
    {
      label: t("confirmed"),
      value: stats.confirmed,
      sub: `${stats.confirmedPct}%`,
      icon: CheckCircle2,
      tone: "bg-[#E8EDE5] text-[#4a6344]",
    },
    {
      label: t("declined"),
      value: stats.declined,
      sub: `${stats.declinedPct}%`,
      icon: XCircle,
      tone: "bg-[#F8E8E8] text-[#B76E6E]",
    },
    {
      label: t("pending"),
      value: stats.pending,
      sub: `${stats.pendingPct}%`,
      icon: HelpCircle,
      tone: "bg-[#FDF6E3] text-[#8B7355]",
    },
    {
      label: t("children"),
      value: stats.children,
      icon: Baby,
      tone: "bg-[#F8F0DC] text-[#D4A537]",
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Title row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-[#8a8580]">
            {t("greeting")}, {user?.name}
          </p>
          <h1 className="mt-0.5 font-heading text-2xl font-medium text-charcoal sm:text-[1.75rem]">
            {isEn ? "Wedding of" : "Свадьба"} {wedding.coupleNames}
          </h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#8a8580]">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} className="text-[#D4A537]" strokeWidth={1.5} />
              {formatDate(wedding.date, isEn ? "en-US" : "ru-RU")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} className="text-[#D4A537]" strokeWidth={1.5} />
              {wedding.venue}
            </span>
            <Badge variant={invitation.published ? "success" : "warning"}>
              {invitation.published
                ? isEn
                  ? "Published"
                  : "Опубликовано"
                : isEn
                  ? "Draft"
                  : "Черновик"}
            </Badge>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/${locale}/invite/${invitation.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink size={14} strokeWidth={1.5} />
              {t("viewInvitation")}
            </Button>
          </Link>
          <Link href={`/${locale}/dashboard/editor`}>
            <Button size="sm">
              <Wand2 size={14} strokeWidth={1.5} />
              {t("openEditor")}
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI row — ref 04 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kpi.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 pt-4 pb-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.tone}`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[11px] text-[#8a8580]">{s.label}</p>
                  <p className="font-heading text-2xl leading-none text-charcoal">
                    {s.value}
                    {s.sub && (
                      <span className="ml-1 text-sm text-[#a39e97]">{s.sub}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <SharePanel locale={locale} slug={invitation.slug} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Status donut-ish */}
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg text-charcoal">
              {isEn ? "Guests by status" : "Гости по статусу"}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-center">
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#A7B8A1 0 ${stats.confirmedPct}%, #C98B88 ${stats.confirmedPct}% ${stats.confirmedPct + stats.declinedPct}%, #D4A537 ${stats.confirmedPct + stats.declinedPct}% 100%)`,
                }}
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
                  <span className="font-heading text-xl text-charcoal">
                    {stats.confirmedPct}%
                  </span>
                  <span className="text-[10px] text-[#a39e97]">
                    {isEn ? "yes" : "да"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                {
                  label: t("confirmed"),
                  n: stats.confirmed,
                  pct: stats.confirmedPct,
                  c: "bg-[#A7B8A1]",
                },
                {
                  label: t("declined"),
                  n: stats.declined,
                  pct: stats.declinedPct,
                  c: "bg-[#C98B88]",
                },
                {
                  label: t("pending"),
                  n: stats.pending,
                  pct: stats.pendingPct,
                  c: "bg-[#D4A537]",
                },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${row.c}`} />
                  <span className="flex-1 text-[#8a8580]">{row.label}</span>
                  <span className="font-medium text-charcoal">
                    {row.n} ({row.pct}%)
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/dashboard/guests`}
              className="mt-4 inline-block text-xs font-medium text-[#E8A09A] hover:underline"
            >
              {isEn ? "Open guest list →" : "Перейти к списку гостей →"}
            </Link>
          </CardContent>
        </Card>

        {/* Recent RSVP */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="font-heading text-lg text-charcoal">
              {t("recentRsvp")}
            </h2>
            <Link
              href={`/${locale}/dashboard/guests`}
              className="text-xs text-[#E8A09A] hover:underline"
            >
              {isEn ? "All →" : "Все →"}
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {recent.length === 0 && (
              <p className="text-sm text-[#8a8580]">
                {isEn ? "No responses yet" : "Пока нет ответов"}
              </p>
            )}
            {recent.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-charcoal">
                    {g.name}
                    {g.plusOnes > 0 && (
                      <span className="ml-1 text-xs text-[#a39e97]">
                        +{g.plusOnes}
                      </span>
                    )}
                  </p>
                  {g.message && (
                    <p className="truncate text-xs text-[#8a8580]">{g.message}</p>
                  )}
                </div>
                <Badge
                  variant={
                    g.status === "confirmed"
                      ? "success"
                      : g.status === "declined"
                        ? "danger"
                        : "warning"
                  }
                >
                  {g.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Checklist / Today */}
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg text-charcoal">
              {isEn ? "Checklist" : "Чек-лист"}
            </h2>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {checklist.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[#FAF7F2]"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    item.done
                      ? "bg-[#A7B8A1] text-white"
                      : "border border-[#EDE7DD] bg-white text-[#a39e97]"
                  }`}
                >
                  {item.done ? "✓" : ""}
                </span>
                <span
                  className={`text-sm ${
                    item.done ? "text-[#a39e97] line-through" : "text-charcoal"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Timeline + reminders */}
      <div className="grid gap-4 lg:grid-cols-2">
        {scheduleItems.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="font-heading text-lg text-charcoal">
                {isEn ? "Day timeline" : "Тайминг дня"}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {scheduleItems.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="font-heading text-sm font-semibold text-charcoal">
                        {item.time}
                      </span>
                      {i < scheduleItems.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-[#EDE7DD]" />
                      )}
                    </div>
                    <p className="pb-4 text-sm text-[#8a8580]">{item.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="font-heading text-lg text-charcoal">
              {isEn ? "Reminders" : "Напоминания"}
            </h2>
            <Badge variant="blush">
              {stats.pending} {isEn ? "pending" : "без ответа"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-[#8a8580]">
              {isEn
                ? "Send a gentle reminder to guests who have not responded yet."
                : "Отправьте мягкое напоминание гостям без ответа."}
            </p>
            <p className="text-xs text-[#a39e97]">
              {isEn ? "Attending (with +1):" : "Придут (с +1):"}{" "}
              <strong className="text-charcoal">{stats.totalPeople}</strong>
              {" · "}
              {isEn ? "Views:" : "Просмотры:"}{" "}
              <strong className="text-charcoal">{invitation.views}</strong>
            </p>
            <Button
              size="sm"
              variant="secondary"
              disabled={stats.pending === 0}
              onClick={() => {
                const pending = guests.filter(
                  (g) => g.status === "pending" || g.status === "maybe"
                );
                alert(
                  isEn
                    ? `Demo: reminder queued for ${pending.length} guests`
                    : `Демо: напоминание для ${pending.length} гостей`
                );
              }}
            >
              {isEn ? "Send reminders" : "Отправить напоминания"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
