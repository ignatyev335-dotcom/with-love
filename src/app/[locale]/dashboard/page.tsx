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
      pending: pending.length,
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
    .slice(0, 6);

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

  const statCards = [
    {
      label: t("guestsInvited"),
      value: stats.invited,
      icon: Users,
      color: "text-charcoal",
      bg: "bg-warm-beige",
    },
    {
      label: t("confirmed"),
      value: `${stats.confirmed}`,
      sub: `${stats.confirmedPct}%`,
      icon: CheckCircle2,
      color: "text-[#4a6344]",
      bg: "bg-light-sage",
    },
    {
      label: t("declined"),
      value: stats.declined,
      icon: XCircle,
      color: "text-deep-rose",
      bg: "bg-soft-pink",
    },
    {
      label: t("pending"),
      value: stats.pending,
      icon: HelpCircle,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      label: t("children"),
      value: stats.children,
      icon: Baby,
      color: "text-gold",
      bg: "bg-[#f8f0dc]",
    },
  ];

  const checklist = [
    {
      done: invitation.published,
      label: locale === "en" ? "Publish invitation" : "Опубликовать приглашение",
      href: `/${locale}/dashboard/editor`,
    },
    {
      done: stats.listSize >= 5,
      label: locale === "en" ? "Add guest list" : "Добавить список гостей",
      href: `/${locale}/dashboard/guests`,
    },
    {
      done: Boolean(
        invitation.config.blocks.find((b) => b.type === "location")?.enabled
      ),
      label: locale === "en" ? "Set venue & address" : "Указать локацию",
      href: `/${locale}/dashboard/editor`,
    },
    {
      done: Boolean(invitation.config.music?.enabled),
      label: locale === "en" ? "Choose background music" : "Выбрать музыку",
      href: `/${locale}/dashboard/editor`,
    },
    {
      done: stats.confirmed > 0,
      label: locale === "en" ? "Collect first RSVPs" : "Получить первые RSVP",
      href: `/${locale}/invite/${invitation.slug}`,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {t("greeting")}, {user?.name}
          </p>
          <h1 className="mt-1 font-heading text-2xl text-charcoal sm:text-3xl">
            {t("weddingOf")} {wedding.coupleNames}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock size={14} className="text-gold" />
              {formatDate(wedding.date, locale === "en" ? "en-US" : "ru-RU")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} className="text-gold" />
              {wedding.venue}
            </span>
            <Badge variant={invitation.published ? "success" : "warning"}>
              {invitation.published
                ? locale === "en"
                  ? "Published"
                  : "Опубликовано"
                : locale === "en"
                  ? "Draft"
                  : "Черновик"}
            </Badge>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/${locale}/invite/${invitation.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink size={14} />
              {t("viewInvitation")}
            </Button>
          </Link>
          <Link href={`/${locale}/dashboard/editor`}>
            <Button size="sm">
              <Wand2 size={14} />
              {t("openEditor")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 pt-5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.bg} ${s.color}`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted">{s.label}</p>
                  <p className="font-heading text-2xl text-charcoal">
                    {s.value}
                    {s.sub && (
                      <span className="ml-1 text-sm text-muted">{s.sub}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <SharePanel locale={locale} slug={invitation.slug} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="font-heading text-lg text-charcoal">
              {t("quickStats")}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  label: t("confirmed"),
                  pct: stats.confirmedPct,
                  color: "bg-sage",
                },
                {
                  label: t("declined"),
                  pct: guests.length
                    ? Math.round((stats.declined / guests.length) * 100)
                    : 0,
                  color: "bg-dusty-rose",
                },
                {
                  label: t("pending"),
                  pct: guests.length
                    ? Math.round((stats.pending / guests.length) * 100)
                    : 0,
                  color: "bg-gold",
                },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted">{row.label}</span>
                    <span className="font-medium text-charcoal">{row.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-warm-beige">
                    <div
                      className={`h-full rounded-full ${row.color} transition-all`}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              {locale === "en" ? "Attending (with +1)" : "Придут (с +1)"}:{" "}
              <strong className="text-charcoal">{stats.totalPeople}</strong>
              {" · "}
              {locale === "en" ? "Views" : "Просмотры"}:{" "}
              <strong className="text-charcoal">{invitation.views}</strong>
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="font-heading text-lg text-charcoal">
              {t("recentRsvp")}
            </h2>
            <Link
              href={`/${locale}/dashboard/guests`}
              className="text-xs text-blush hover:underline"
            >
              {locale === "en" ? "All guests →" : "Все гости →"}
            </Link>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {recent.length === 0 && (
              <p className="text-sm text-muted">
                {locale === "en" ? "No responses yet" : "Пока нет ответов"}
              </p>
            )}
            {recent.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-2xl bg-warm-beige/50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-charcoal">
                    {g.name}
                    {g.plusOnes > 0 && (
                      <span className="ml-1 text-xs text-muted">
                        +{g.plusOnes}
                      </span>
                    )}
                  </p>
                  {g.message && (
                    <p className="truncate text-xs text-muted">{g.message}</p>
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

        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="font-heading text-lg text-charcoal">
              {locale === "en" ? "Checklist" : "Чек-лист"}
            </h2>
          </CardHeader>
          <CardContent className="space-y-2">
            {checklist.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-warm-beige/50"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    item.done
                      ? "bg-sage text-white"
                      : "border border-border bg-white text-muted"
                  }`}
                >
                  {item.done ? "✓" : ""}
                </span>
                <span
                  className={`text-sm ${
                    item.done ? "text-muted line-through" : "text-charcoal"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {scheduleItems.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-heading text-lg text-charcoal">
              {locale === "en" ? "Day timeline" : "Тайминг дня"}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {scheduleItems.map((item, i) => (
                <div
                  key={i}
                  className="flex min-w-[100px] flex-col items-center rounded-2xl bg-warm-beige/40 px-3 py-3 text-center"
                >
                  <p className="font-heading text-base font-semibold text-charcoal">
                    {item.time}
                  </p>
                  <p className="mt-1 text-xs text-muted">{item.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="font-heading text-lg text-charcoal">
            {locale === "en" ? "Reminders" : "Напоминания"}
          </h2>
          <Badge variant="blush">
            {stats.pending} {locale === "en" ? "pending" : "без ответа"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">
            {locale === "en"
              ? "Send a gentle reminder to guests who have not responded yet. Email delivery hooks into Resend when configured."
              : "Отправьте мягкое напоминание гостям без ответа. Рассылка подключится через Resend, когда будет ключ."}
          </p>
          <Button
            size="sm"
            variant="secondary"
            disabled={stats.pending === 0}
            onClick={() => {
              const pending = guests.filter(
                (g) => g.status === "pending" || g.status === "maybe"
              );
              console.info(
                "[reminders:demo]",
                pending.map((g) => g.name)
              );
              alert(
                locale === "en"
                  ? `Demo: reminder queued for ${pending.length} guests`
                  : `Демо: напоминание поставлено в очередь для ${pending.length} гостей`
              );
            }}
          >
            {locale === "en"
              ? "Send reminders"
              : "Отправить напоминания"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
