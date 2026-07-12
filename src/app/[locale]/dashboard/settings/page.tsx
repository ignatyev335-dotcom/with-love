"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PLANS } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const user = useAppStore((s) => s.user);
  const wedding = useAppStore((s) => s.wedding);
  const invitation = useAppStore((s) => s.invitation);
  const setSlug = useAppStore((s) => s.setSlug);
  const unpublishInvitation = useAppStore((s) => s.unpublishInvitation);
  const publishInvitation = useAppStore((s) => s.publishInvitation);
  const [name, setName] = useState(user?.name ?? "");
  const [slug, setSlugLocal] = useState(invitation?.slug ?? "");
  const [saved, setSaved] = useState(false);

  const plan = PLANS.find((p) => p.id === user?.plan) || PLANS[0];

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
        {isEn ? "Settings" : "Настройки"}
      </h1>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">
            {isEn ? "Profile" : "Профиль"}
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              {isEn ? "Name" : "Имя"}
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">Email</label>
            <Input value={user?.email ?? ""} disabled />
          </div>
          <Button
            onClick={() => {
              if (user) {
                useAppStore.setState({
                  user: { ...user, name: name.trim() || user.name },
                });
              }
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved
              ? isEn
                ? "Saved!"
                : "Сохранено!"
              : isEn
                ? "Save"
                : "Сохранить"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="font-heading text-lg">
            {isEn ? "Plan" : "Тариф"}
          </h2>
          <Badge variant={plan.id === "free" ? "muted" : "gold"}>
            {isEn ? plan.nameEn : plan.name}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">
            {plan.price === 0
              ? isEn
                ? "Free plan with limits"
                : "Бесплатный тариф с ограничениями"
              : formatPrice(plan.price, isEn ? "en-US" : "ru-RU")}
            {" · "}
            {plan.guestLimit} {isEn ? "guests max" : "гостей макс."}
          </p>
          {invitation?.watermark && (
            <p className="text-xs text-deep-rose">
              {isEn
                ? "Watermark is enabled on your invitation."
                : "На приглашении включён водяной знак."}
            </p>
          )}
          <Link href={`/${locale}/pricing`}>
            <Button variant="secondary" size="sm">
              {isEn ? "Upgrade plan" : "Улучшить тариф"}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg">
            {isEn ? "Wedding" : "Свадьба"}
          </h2>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted">
          <p>
            <span className="text-charcoal">{isEn ? "Couple:" : "Пара:"}</span>{" "}
            {wedding?.coupleNames}
          </p>
          <p>
            <span className="text-charcoal">{isEn ? "Date:" : "Дата:"}</span>{" "}
            {wedding?.date
              ? new Date(wedding.date).toLocaleDateString(
                  isEn ? "en-US" : "ru-RU"
                )
              : "—"}
          </p>
          <p>
            <span className="text-charcoal">{isEn ? "Venue:" : "Место:"}</span>{" "}
            {wedding?.venue}
          </p>
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              {isEn ? "Public link slug" : "Slug публичной ссылки"}
            </label>
            <div className="flex gap-2">
              <Input
                value={slug}
                onChange={(e) => setSlugLocal(e.target.value)}
                className="font-mono text-sm"
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  if (setSlug(slug)) setSaved(true);
                }}
              >
                OK
              </Button>
            </div>
            <p className="mt-1 text-xs text-muted">
              /{locale}/invite/{invitation?.slug}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {invitation?.published ? (
              <Button size="sm" variant="outline" onClick={unpublishInvitation}>
                {isEn ? "Unpublish" : "Снять с публикации"}
              </Button>
            ) : (
              <Button size="sm" onClick={publishInvitation}>
                {isEn ? "Publish" : "Опубликовать"}
              </Button>
            )}
          </div>
          <p className="text-xs">
            {isEn
              ? "Rule: 1 organizer = 1 active wedding"
              : "Правило: 1 организатор = 1 активная свадьба"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
