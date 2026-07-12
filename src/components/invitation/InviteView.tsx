"use client";

import { ConfirmedGuests } from "@/components/invitation/ConfirmedGuests";
import { Countdown } from "@/components/invitation/Countdown";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import type { Invitation, ScheduleItem, Wish } from "@/types";
import {
  Car,
  ChevronDown,
  Clock,
  Gift,
  Heart,
  Home,
  MapPin,
  Menu,
  Music,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function InviteView({
  invitation,
  wishes,
  locale,
  labels,
}: {
  invitation: Invitation;
  wishes: Wish[];
  locale: string;
  labels: Record<string, string>;
}) {
  const addWish = useAppStore((s) => s.addWish);
  const updateInvitation = useAppStore((s) => s.updateInvitation);
  const guests = useAppStore((s) => s.guests);
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const config = invitation.config;
  const blocks = useMemo(
    () =>
      [...config.blocks]
        .filter((b) => b.enabled)
        .sort((a, b) => a.order - b.order),
    [config.blocks]
  );

  useEffect(() => {
    const key = `wl-viewed-${invitation.id}`;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) {
      return;
    }
    try {
      sessionStorage.setItem(key, "1");
    } catch {
      /* ignore */
    }
    updateInvitation({ views: (invitation.views || 0) + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation.id]);

  const hero = blocks.find((b) => b.type === "hero");
  const heroData = (hero?.data ?? {}) as {
    partner1?: string;
    partner2?: string;
    date?: string;
    tagline?: string;
    image?: string;
    cta?: string;
  };

  const primary = config.colors.primary;
  const accent = config.colors.accent;
  const bg = config.colors.background;
  const text = config.colors.text;
  const isLuxury = config.theme === "luxury";
  const isMinimal = config.theme === "minimal";
  const surface = isLuxury
    ? "#1A1A1A"
    : isMinimal
      ? "#ffffff"
      : "rgba(255,255,255,0.85)";
  const border = isLuxury ? "rgba(255,255,255,0.1)" : "rgba(40,43,43,0.08)";

  const schedule = blocks.find((b) => b.type === "schedule");
  const location = blocks.find((b) => b.type === "location");
  const transfer = blocks.find((b) => b.type === "transfer");
  const countdown = blocks.find((b) => b.type === "countdown");
  const story = blocks.find((b) => b.type === "story");
  const dresscode = blocks.find((b) => b.type === "dresscode");
  const rsvp = blocks.find((b) => b.type === "rsvp");
  const faq = blocks.find((b) => b.type === "faq");
  const wishesBlock = blocks.find((b) => b.type === "wishes");
  const gifts = blocks.find((b) => b.type === "gifts");
  const musicBlock = blocks.find((b) => b.type === "music");
  const afterparty = blocks.find((b) => b.type === "afterparty");
  const payment = blocks.find((b) => b.type === "payment");
  const seating = blocks.find((b) => b.type === "seating");

  return (
    <div
      className="min-h-screen"
      style={{
        background: bg,
        color: text,
        fontFamily: `"${config.fonts.body}", system-ui, sans-serif`,
      }}
    >
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{
          borderColor: border,
          background: isLuxury ? "rgba(17,17,17,0.92)" : "rgba(250,247,242,0.92)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Logo href={`/${locale}`} dark={isLuxury} size="sm" />
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {story && (
              <a href="#story" className="opacity-70 hover:opacity-100">
                {labels.story}
              </a>
            )}
            {schedule && (
              <a href="#schedule" className="opacity-70 hover:opacity-100">
                {labels.schedule}
              </a>
            )}
            <a href="#details" className="opacity-70 hover:opacity-100">
              {labels.details || "Детали"}
            </a>
            {faq && (
              <a href="#faq" className="opacity-70 hover:opacity-100">
                {labels.faq}
              </a>
            )}
            {wishesBlock && (
              <a href="#wishes" className="opacity-70 hover:opacity-100">
                {labels.wishes}
              </a>
            )}
          </nav>
          {rsvp && (
            <a href="#rsvp">
              <Button
                size="sm"
                style={{ background: primary }}
                className="border-0 text-white hover:opacity-90"
              >
                RSVP ♥
              </Button>
            </a>
          )}
        </div>
      </header>

      {/* HERO — ref 13 */}
      {hero && (
        <section className="relative">
          <div className="mx-auto grid max-w-6xl items-stretch lg:grid-cols-12">
            <div className="relative min-h-[300px] lg:col-span-5 lg:min-h-[460px]">
              {heroData.image && (
                <Image
                  src={heroData.image}
                  alt={`${heroData.partner1} & ${heroData.partner2}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              )}
            </div>

            <div
              className="flex flex-col justify-center px-6 py-10 text-center lg:col-span-4 lg:px-8"
              style={{ background: surface }}
            >
              <h1
                className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                {heroData.partner1}
                <br />
                <span style={{ color: primary }}>&</span> {heroData.partner2}
              </h1>
              <p className="mt-3 text-sm opacity-60">
                {heroData.date &&
                  new Date(heroData.date).toLocaleDateString(
                    locale === "en" ? "en-US" : "ru-RU",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
              </p>
              <p
                className="mt-2 text-lg italic"
                style={{
                  fontFamily: `"${config.fonts.heading}", serif`,
                  color: accent,
                }}
              >
                {heroData.tagline} ♥
              </p>
              {rsvp && (
                <a href="#rsvp" className="mt-6">
                  <Button
                    size="lg"
                    style={{ background: primary }}
                    className="border-0 text-white hover:opacity-90"
                  >
                    {heroData.cta || labels.confirm}
                  </Button>
                </a>
              )}
              <p className="mt-2 text-xs opacity-40">
                {locale === "en"
                  ? "We will be happy to see you!"
                  : "Мы будем рады видеть вас!"}
              </p>
            </div>

            <div
              className="space-y-3 px-6 py-8 lg:col-span-3 lg:px-5"
              style={{
                background: isLuxury
                  ? bg
                  : isMinimal
                    ? "#fafafa"
                    : "rgba(255,255,255,0.5)",
              }}
            >
              {countdown && (
                <div
                  className="rounded-2xl border p-4 text-center"
                  style={{ background: surface, borderColor: border }}
                >
                  <p className="mb-2 flex items-center justify-center gap-1 text-xs font-medium opacity-50">
                    <Clock size={12} /> {labels.countdown}
                  </p>
                  <Countdown
                    targetDate={String(
                      countdown.data.targetDate || "2025-06-20T15:00:00"
                    )}
                    labels={{
                      days: labels.days,
                      hours: labels.hours,
                      minutes: labels.minutes,
                      seconds: labels.seconds,
                    }}
                    compact
                  />
                </div>
              )}
              {location && (
                <div
                  className="rounded-2xl border p-4"
                  style={{ background: surface, borderColor: border }}
                >
                  <p className="mb-1 flex items-center gap-1 text-xs font-medium opacity-50">
                    <MapPin size={12} style={{ color: accent }} />{" "}
                    {labels.location}
                  </p>
                  <p className="text-sm font-medium">
                    {String(location.data.name || "")}
                  </p>
                  <p className="mt-1 text-xs opacity-60 leading-relaxed">
                    {String(location.data.address || "")}
                  </p>
                  {Boolean(location.data.mapUrl) && (
                    <a
                      href={String(location.data.mapUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-medium"
                      style={{ color: primary }}
                    >
                      {labels.showMap} →
                    </a>
                  )}
                </div>
              )}
              {transfer && (
                <div
                  className="rounded-2xl border p-4"
                  style={{ background: surface, borderColor: border }}
                >
                  <p className="mb-1 flex items-center gap-1 text-xs font-medium opacity-50">
                    <Car size={12} style={{ color: accent }} /> {labels.transfer}
                  </p>
                  <p className="text-xs leading-relaxed opacity-70">
                    {String(transfer.data.text || "")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {schedule && (
        <section id="schedule" className="mx-auto max-w-6xl px-4 py-14">
          <h2
            className="mb-8 text-center text-2xl sm:text-3xl"
            style={{ fontFamily: `"${config.fonts.heading}", serif` }}
          >
            {labels.schedule}
          </h2>
          <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-7">
            {((schedule.data.items as ScheduleItem[]) || []).map((item, i) => (
              <div key={i} className="flex w-[100px] flex-col items-center text-center">
                <div
                  className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${accent}22`, color: accent }}
                >
                  <Heart size={18} />
                </div>
                <p
                  className="text-lg font-semibold"
                  style={{ fontFamily: `"${config.fonts.heading}", serif` }}
                >
                  {item.time}
                </p>
                <p className="mt-0.5 text-xs opacity-60 leading-snug">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DETAILS GRID */}
      <section
        id="details"
        className="mx-auto grid max-w-6xl gap-4 px-4 pb-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {story && (
          <div
            id="story"
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <h3
              className="text-lg"
              style={{ fontFamily: `"${config.fonts.heading}", serif` }}
            >
              {String(story.data.title || labels.story)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">
              {String(story.data.text || "")}
            </p>
            {Boolean(story.data.image) && (
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={String(story.data.image)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            )}
          </div>
        )}

        {dresscode && (
          <div
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Shirt size={18} style={{ color: accent }} />
              <h3
                className="text-lg"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                {labels.dresscode}
              </h3>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              {String(dresscode.data.text || "")}
            </p>
            <div className="mt-4 flex gap-2">
              {((dresscode.data.colors as string[]) || []).map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border border-black/5 shadow-sm"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}

        {gifts && (
          <div
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Gift size={18} style={{ color: accent }} />
              <h3
                className="text-lg"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                {String(gifts.data.title || labels.gifts)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              {String(gifts.data.text || "")}
            </p>
          </div>
        )}

        {afterparty && (
          <div
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <h3
              className="text-lg"
              style={{ fontFamily: `"${config.fonts.heading}", serif` }}
            >
              {String(afterparty.data.title || "После свадьбы")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">
              {String(afterparty.data.text || "")}
            </p>
          </div>
        )}

        {seating && (
          <div
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <h3
              className="text-lg"
              style={{ fontFamily: `"${config.fonts.heading}", serif` }}
            >
              {String(seating.data.title || "Рассадка")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">
              {String(seating.data.text || "")}
            </p>
          </div>
        )}

        {payment && (
          <div
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <h3
              className="text-lg"
              style={{ fontFamily: `"${config.fonts.heading}", serif` }}
            >
              {String(payment.data.title || "Оплата")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">
              {String(payment.data.text || "")}
            </p>
            {Boolean(payment.data.recipient) && (
              <p className="mt-2 text-sm font-medium" style={{ color: accent }}>
                {String(payment.data.recipient)}
              </p>
            )}
          </div>
        )}

        {(musicBlock || config.music?.enabled) && (
          <div
            className="rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Music size={18} style={{ color: accent }} />
              <h3
                className="text-lg"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                {labels.music}
              </h3>
            </div>
            <p className="text-sm opacity-70">
              {config.music?.trackName ||
                String(musicBlock?.data.trackName || "Фоновая музыка")}
            </p>
          </div>
        )}
      </section>

      {rsvp && (
        <section id="rsvp" className="mx-auto max-w-lg px-4 py-10">
          <RsvpForm
            deadline={
              rsvp.data.deadline ? String(rsvp.data.deadline) : undefined
            }
          />
        </section>
      )}

      {faq && (
        <section id="faq" className="mx-auto max-w-2xl px-4 py-10">
          <h2
            className="mb-6 text-center text-2xl"
            style={{ fontFamily: `"${config.fonts.heading}", serif` }}
          >
            {labels.faq}
          </h2>
          <div className="space-y-2">
            {(
              (faq.data.items as { question: string; answer: string }[]) || []
            ).map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border"
                style={{ background: surface, borderColor: border }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.question}
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div
                    className="border-t px-5 py-3 text-sm opacity-70"
                    style={{ borderColor: border }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <ConfirmedGuests
        guests={guests}
        title={locale === "en" ? "Who is coming" : "Кто уже с нами"}
        surface={surface}
        border={border}
        accent={accent}
        headingFont={config.fonts.heading}
      />

      {wishesBlock && (
        <section id="wishes" className="mx-auto max-w-2xl px-4 py-10">
          <h2
            className="mb-2 text-center text-2xl"
            style={{ fontFamily: `"${config.fonts.heading}", serif` }}
          >
            {String(wishesBlock.data.title || labels.wishes)}
          </h2>
          <p className="mb-6 text-center text-sm opacity-60">
            {String(wishesBlock.data.text || "")}
          </p>
          <div className="mb-6 space-y-3">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border p-4"
                style={{ background: surface, borderColor: border }}
              >
                <p className="text-sm leading-relaxed opacity-80">«{w.text}»</p>
                <p className="mt-2 text-xs font-medium" style={{ color: accent }}>
                  — {w.authorName}
                </p>
              </div>
            ))}
          </div>
          <div
            className="space-y-3 rounded-3xl border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <input
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder={labels.yourName || "Ваше имя"}
              className="h-11 w-full rounded-2xl border px-4 text-sm outline-none focus:ring-2"
              style={{
                borderColor: border,
                background: isLuxury ? bg : "#FAF7F2",
                color: text,
              }}
            />
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="..."
              rows={3}
              className="w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                borderColor: border,
                background: isLuxury ? bg : "#FAF7F2",
                color: text,
              }}
            />
            <Button
              className="w-full border-0 text-white hover:opacity-90"
              style={{ background: primary }}
              onClick={() => {
                if (!wishName.trim() || !wishText.trim()) return;
                addWish(wishName.trim(), wishText.trim());
                setWishName("");
                setWishText("");
              }}
            >
              {locale === "en" ? "Leave a wish" : "Оставить пожелание"}
            </Button>
          </div>
        </section>
      )}

      <footer
        className="border-t py-8 text-center text-xs opacity-50"
        style={{ borderColor: border }}
      >
        <Logo href={`/${locale}`} dark={isLuxury} size="sm" />
        <p className="mt-3">
          {heroData.partner1} & {heroData.partner2} ·{" "}
          {locale === "en" ? "Made with love" : "Сделано с любовью"}
        </p>
        {invitation.watermark && (
          <p className="mt-1">
            <Link href={`/${locale}`} className="underline-offset-2 hover:underline">
              With Love
            </Link>
          </p>
        )}
      </footer>

      {config.music?.enabled && config.music.trackUrl && (
        <MusicPlayer
          trackUrl={config.music.trackUrl}
          trackName={config.music.trackName}
          autoplay={config.music.autoplay}
          labels={{ play: labels.playMusic, pause: labels.pauseMusic }}
        />
      )}

      {/* Mobile bottom nav — ref 03 */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex border-t pb-safe md:hidden"
        style={{
          borderColor: border,
          background: isLuxury ? "rgba(17,17,17,0.96)" : "rgba(250,247,242,0.96)",
          backdropFilter: "blur(12px)",
        }}
      >
        {(
          [
            { href: "#", icon: Home, label: locale === "en" ? "Home" : "Главная" },
            {
              href: "#schedule",
              icon: Clock,
              label: locale === "en" ? "Plan" : "План",
            },
            {
              href: "#details",
              icon: MapPin,
              label: locale === "en" ? "Place" : "Место",
            },
            {
              href: "#rsvp",
              icon: Heart,
              label: "RSVP",
            },
            {
              href: "#faq",
              icon: Menu,
              label: "Menu",
            },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href + item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] opacity-70"
              style={{ color: text }}
            >
              <Icon size={18} style={{ color: accent }} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="h-16 md:hidden" />
    </div>
  );
}
