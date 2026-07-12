"use client";

import { Countdown } from "@/components/invitation/Countdown";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import type { ScheduleItem } from "@/types";
import {
  Car,
  ChevronDown,
  Clock,
  Gift,
  Heart,
  MapPin,
  Music,
  Shirt,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { use, useMemo, useState } from "react";

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
  const addWish = useAppStore((s) => s.addWish);
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const isDemo =
    invitation &&
    (invitation.slug === slug || slug === "demo" || slug === "aleksandr-ekaterina");

  const config = invitation?.config;
  const blocks = useMemo(
    () =>
      (config?.blocks ?? [])
        .filter((b) => b.enabled)
        .sort((a, b) => a.order - b.order),
    [config]
  );

  if (!isDemo || !config) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4 text-center">
        <Logo href={`/${locale}`} />
        <h1 className="mt-6 font-heading text-2xl text-charcoal">
          Приглашение не найдено
        </h1>
        <p className="mt-2 text-muted">Проверьте ссылку или создайте своё</p>
        <Link href={`/${locale}`} className="mt-6">
          <Button>На главную</Button>
        </Link>
      </div>
    );
  }

  const hero = blocks.find((b) => b.type === "hero");
  const heroData = (hero?.data ?? {}) as {
    partner1?: string;
    partner2?: string;
    date?: string;
    tagline?: string;
    image?: string;
  };
  const isLuxury = config.theme === "luxury";

  return (
    <div
      className={`min-h-screen ${
        isLuxury ? "bg-dark-bg text-white" : "bg-ivory text-charcoal"
      }`}
    >
      {/* nav */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md ${
          isLuxury
            ? "border-white/10 bg-dark-bg/90"
            : "border-border/50 bg-ivory/90"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Logo href={`/${locale}`} dark={isLuxury} size="sm" />
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#story" className="opacity-70 hover:opacity-100">
              О нас
            </a>
            <a href="#schedule" className="opacity-70 hover:opacity-100">
              Программа
            </a>
            <a href="#details" className="opacity-70 hover:opacity-100">
              Детали
            </a>
            <a href="#faq" className="opacity-70 hover:opacity-100">
              FAQ
            </a>
            <a href="#wishes" className="opacity-70 hover:opacity-100">
              Пожелания
            </a>
          </nav>
          <a href="#rsvp">
            <Button size="sm" className={isLuxury ? "bg-gold hover:bg-[#c49530]" : ""}>
              RSVP ♥
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-12">
          <div className="relative min-h-[320px] lg:col-span-5 lg:min-h-[480px]">
            {heroData.image && (
              <Image
                src={heroData.image}
                alt={`${heroData.partner1} & ${heroData.partner2}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            )}
          </div>

          <div
            className={`flex flex-col justify-center px-6 py-10 text-center lg:col-span-4 lg:px-8 ${
              isLuxury ? "bg-dark-surface" : "bg-cream"
            }`}
          >
            <h1 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
              {heroData.partner1}
              <br />
              <span className={isLuxury ? "text-gold" : "text-blush"}>&</span>{" "}
              {heroData.partner2}
            </h1>
            <p className={`mt-3 text-sm ${isLuxury ? "text-white/60" : "text-muted"}`}>
              {heroData.date &&
                new Date(heroData.date).toLocaleDateString(
                  locale === "en" ? "en-US" : "ru-RU",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
            </p>
            <p
              className={`mt-2 font-heading text-lg italic ${
                isLuxury ? "text-gold" : "text-gold"
              }`}
            >
              {heroData.tagline} ♥
            </p>
            <a href="#rsvp" className="mt-6">
              <Button
                size="lg"
                className={isLuxury ? "bg-gold hover:bg-[#c49530]" : ""}
              >
                {t("confirm")}
              </Button>
            </a>
            <p className={`mt-2 text-xs ${isLuxury ? "text-white/40" : "text-muted"}`}>
              Мы будем рады видеть вас!
            </p>
          </div>

          <div
            className={`space-y-4 px-6 py-8 lg:col-span-3 lg:px-5 ${
              isLuxury ? "bg-dark-bg" : "bg-white"
            }`}
          >
            {blocks.find((b) => b.type === "countdown") && (
              <div
                className={`rounded-2xl border p-4 text-center ${
                  isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-ivory"
                }`}
              >
                <p className="mb-2 flex items-center justify-center gap-1 text-xs font-medium opacity-60">
                  <Clock size={12} /> {t("countdown")}
                </p>
                <Countdown
                  targetDate={
                    String(
                      blocks.find((b) => b.type === "countdown")?.data
                        .targetDate ?? "2025-06-20T15:00:00"
                    )
                  }
                  labels={{
                    days: t("days"),
                    hours: t("hours"),
                    minutes: t("minutes"),
                    seconds: t("seconds"),
                  }}
                  compact
                />
              </div>
            )}
            {blocks.find((b) => b.type === "location") && (
              <div
                className={`rounded-2xl border p-4 ${
                  isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-ivory"
                }`}
              >
                <p className="mb-1 flex items-center gap-1 text-xs font-medium opacity-60">
                  <MapPin size={12} className="text-gold" /> {t("location")}
                </p>
                <p className="text-sm font-medium">
                  {String(
                    blocks.find((b) => b.type === "location")?.data.name ?? ""
                  )}
                </p>
                <p className="mt-1 text-xs opacity-60">
                  {String(
                    blocks.find((b) => b.type === "location")?.data.address ?? ""
                  )}
                </p>
                <a
                  href="#"
                  className={`mt-2 inline-block text-xs font-medium ${
                    isLuxury ? "text-gold" : "text-blush"
                  }`}
                >
                  {t("showMap")} →
                </a>
              </div>
            )}
            {blocks.find((b) => b.type === "transfer") && (
              <div
                className={`rounded-2xl border p-4 ${
                  isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-ivory"
                }`}
              >
                <p className="mb-1 flex items-center gap-1 text-xs font-medium opacity-60">
                  <Car size={12} className="text-gold" /> {t("transfer")}
                </p>
                <p className="text-xs leading-relaxed opacity-70">
                  {String(
                    blocks.find((b) => b.type === "transfer")?.data.text ?? ""
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      {blocks.find((b) => b.type === "schedule") && (
        <section id="schedule" className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-8 text-center font-heading text-2xl sm:text-3xl">
            {t("schedule")}
          </h2>
          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
            {(
              (blocks.find((b) => b.type === "schedule")?.data.items ??
                []) as ScheduleItem[]
            ).map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className={`mb-2 flex h-12 w-12 items-center justify-center rounded-2xl ${
                    isLuxury ? "bg-dark-surface text-gold" : "bg-warm-beige text-gold"
                  }`}
                >
                  <Heart size={18} />
                </div>
                <p className="font-heading text-lg font-semibold">{item.time}</p>
                <p className="mt-0.5 max-w-[100px] text-xs opacity-70">
                  {item.title}
                </p>
                {i < 5 && (
                  <div className="absolute hidden" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTENT GRID */}
      <section
        id="details"
        className="mx-auto grid max-w-6xl gap-4 px-4 pb-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {blocks.find((b) => b.type === "story") && (
          <div
            id="story"
            className={`rounded-3xl border p-5 ${
              isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-white"
            }`}
          >
            <h3 className="font-heading text-lg">{t("story")}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">
              {String(blocks.find((b) => b.type === "story")?.data.text ?? "")}
            </p>
            {Boolean(blocks.find((b) => b.type === "story")?.data.image) && (
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={String(
                    blocks.find((b) => b.type === "story")?.data.image
                  )}
                  alt="Story"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            )}
          </div>
        )}

        {blocks.find((b) => b.type === "dresscode") && (
          <div
            className={`rounded-3xl border p-5 ${
              isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-white"
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <Shirt size={18} className="text-gold" />
              <h3 className="font-heading text-lg">{t("dresscode")}</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              {String(
                blocks.find((b) => b.type === "dresscode")?.data.text ?? ""
              )}
            </p>
            <div className="mt-4 flex gap-2">
              {(
                (blocks.find((b) => b.type === "dresscode")?.data.colors ??
                  []) as string[]
              ).map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border border-black/5 shadow-sm"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}

        {blocks.find((b) => b.type === "gifts") && (
          <div
            className={`rounded-3xl border p-5 ${
              isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-white"
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <Gift size={18} className="text-gold" />
              <h3 className="font-heading text-lg">{t("gifts")}</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              {String(blocks.find((b) => b.type === "gifts")?.data.text ?? "")}
            </p>
          </div>
        )}

        {config.music?.enabled && (
          <div
            className={`rounded-3xl border p-5 ${
              isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-white"
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <Music size={18} className="text-gold" />
              <h3 className="font-heading text-lg">{t("music")}</h3>
            </div>
            <p className="text-sm opacity-70">
              {config.music.trackName || "Фоновая музыка"}
            </p>
          </div>
        )}
      </section>

      {/* RSVP */}
      {blocks.find((b) => b.type === "rsvp") && (
        <section id="rsvp" className="mx-auto max-w-lg px-4 py-10">
          <RsvpForm
            deadline={
              blocks.find((b) => b.type === "rsvp")?.data.deadline as
                | string
                | undefined
            }
          />
        </section>
      )}

      {/* FAQ */}
      {blocks.find((b) => b.type === "faq") && (
        <section id="faq" className="mx-auto max-w-2xl px-4 py-10">
          <h2 className="mb-6 text-center font-heading text-2xl">{t("faq")}</h2>
          <div className="space-y-2">
            {(
              (blocks.find((b) => b.type === "faq")?.data.items ?? []) as {
                question: string;
                answer: string;
              }[]
            ).map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border ${
                  isLuxury
                    ? "border-white/10 bg-dark-surface"
                    : "border-border/60 bg-white"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.question}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border/40 px-5 py-3 text-sm opacity-70">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WISHES */}
      {blocks.find((b) => b.type === "wishes") && (
        <section id="wishes" className="mx-auto max-w-2xl px-4 py-10">
          <h2 className="mb-2 text-center font-heading text-2xl">{t("wishes")}</h2>
          <p className="mb-6 text-center text-sm opacity-60">
            {String(blocks.find((b) => b.type === "wishes")?.data.text ?? "")}
          </p>
          <div className="mb-6 space-y-3">
            {wishes.map((w) => (
              <div
                key={w.id}
                className={`rounded-2xl border p-4 ${
                  isLuxury
                    ? "border-white/10 bg-dark-surface"
                    : "border-border/60 bg-white"
                }`}
              >
                <p className="text-sm leading-relaxed opacity-80">«{w.text}»</p>
                <p className="mt-2 text-xs font-medium text-gold">— {w.authorName}</p>
              </div>
            ))}
          </div>
          <div
            className={`space-y-3 rounded-3xl border p-5 ${
              isLuxury ? "border-white/10 bg-dark-surface" : "border-border/60 bg-white"
            }`}
          >
            <input
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder="Ваше имя"
              className={`h-11 w-full rounded-2xl border px-4 text-sm ${
                isLuxury
                  ? "border-white/10 bg-dark-bg text-white"
                  : "border-border bg-ivory"
              }`}
            />
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Ваше пожелание..."
              rows={3}
              className={`w-full rounded-2xl border px-4 py-3 text-sm ${
                isLuxury
                  ? "border-white/10 bg-dark-bg text-white"
                  : "border-border bg-ivory"
              }`}
            />
            <Button
              className="w-full"
              onClick={() => {
                if (!wishName.trim() || !wishText.trim()) return;
                addWish(wishName.trim(), wishText.trim());
                setWishName("");
                setWishText("");
              }}
            >
              Оставить пожелание
            </Button>
          </div>
        </section>
      )}

      <footer
        className={`border-t py-8 text-center text-xs opacity-50 ${
          isLuxury ? "border-white/10" : "border-border/50"
        }`}
      >
        <Logo href={`/${locale}`} dark={isLuxury} size="sm" />
        <p className="mt-3">
          {heroData.partner1} & {heroData.partner2} · Сделано с любовью
        </p>
        {invitation.watermark && (
          <p className="mt-1">Создано на With Love</p>
        )}
      </footer>

      {config.music?.enabled && config.music.trackUrl && (
        <MusicPlayer
          trackUrl={config.music.trackUrl}
          trackName={config.music.trackName}
          autoplay={config.music.autoplay}
          labels={{ play: t("playMusic"), pause: t("pauseMusic") }}
        />
      )}
    </div>
  );
}
