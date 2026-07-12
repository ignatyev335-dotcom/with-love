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
  ExternalLink,
  HelpCircle,
  Users,
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
    const pending = guests.filter((g) => g.status === "pending" || g.status === "maybe");
    const children = guests.reduce((s, g) => s + g.children, 0);
    const totalPeople =
      confirmed.reduce((s, g) => s + 1 + g.plusOnes, 0);
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
    };
  }, [guests, wedding]);

  const recent = [...guests]
    .filter((g) => g.respondedAt)
    .sort(
      (a, b) =>
        new Date(b.respondedAt!).getTime() - new Date(a.respondedAt!).getTime()
    )
    .slice(0, 5);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {t("greeting")}, {user?.name}
          </p>
          <h1 className="mt-1 font-heading text-2xl text-charcoal sm:text-3xl">
            {t("weddingOf")} {wedding.coupleNames}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {formatDate(wedding.date, locale === "en" ? "en-US" : "ru-RU")} ·{" "}
            {wedding.venue}
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
            <Button size="sm">{t("openEditor")}</Button>
          </Link>
        </div>
      </div>

      <SharePanel locale={locale} slug={invitation.slug} />

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

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="font-heading text-lg text-charcoal">
              {t("recentRsvp")}
            </h2>
            <Link
              href={`/${locale}/dashboard/guests`}
              className="text-xs text-blush hover:underline"
            >
              Все гости →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.length === 0 && (
              <p className="text-sm text-muted">Пока нет ответов</p>
            )}
            {recent.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-2xl bg-warm-beige/50 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-charcoal">{g.name}</p>
                  {g.message && (
                    <p className="text-xs text-muted line-clamp-1">{g.message}</p>
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
      </div>
    </div>
  );
}
