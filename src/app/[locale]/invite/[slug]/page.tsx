"use client";

import { InviteView } from "@/components/invitation/InviteView";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { use } from "react";

export default function InvitePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations("invite");
  const locale = useLocale();
  const invitation = useAppStore((s) => s.invitation);
  const wishes = useAppStore((s) => s.wishes);

  const isDemo =
    invitation &&
    (invitation.slug === slug ||
      slug === "demo" ||
      slug === "aleksandr-ekaterina");

  if (!isDemo || !invitation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFCFA] px-4 text-center">
        <Logo href={`/${locale}`} />
        <h1 className="mt-6 font-heading text-2xl text-charcoal">
          {locale === "en" ? "Invitation not found" : "Приглашение не найдено"}
        </h1>
        <p className="mt-2 text-[#8a8580]">
          {locale === "en"
            ? "Check the link or create your own"
            : "Проверьте ссылку или создайте своё"}
        </p>
        <Link href={`/${locale}`} className="mt-6">
          <Button>{locale === "en" ? "Home" : "На главную"}</Button>
        </Link>
      </div>
    );
  }

  const labels: Record<string, string> = {
    confirm: t("confirm"),
    countdown: t("countdown"),
    days: t("days"),
    hours: t("hours"),
    minutes: t("minutes"),
    seconds: t("seconds"),
    schedule: t("schedule"),
    location: t("location"),
    showMap: t("showMap"),
    transfer: t("transfer"),
    dresscode: t("dresscode"),
    story: t("story"),
    wishes: t("wishes"),
    faq: t("faq"),
    gifts: t("gifts"),
    music: t("music"),
    playMusic: t("playMusic"),
    pauseMusic: t("pauseMusic"),
    yourName: t("yourName"),
    details: locale === "en" ? "Details" : "Детали",
  };

  return (
    <InviteView
      invitation={invitation}
      wishes={wishes}
      locale={locale}
      labels={labels}
    />
  );
}
