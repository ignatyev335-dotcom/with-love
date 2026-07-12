"use client";

import { FloralCorner, GoldFlourish } from "@/components/decor/Floral";
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

  const primary = config.colors.primary || "#E8A09A";
  const accent = config.colors.accent || "#D4A537";
  const isLuxury = config.theme === "luxury";
  const bg = config.colors.background || (isLuxury ? "#111111" : "#FAF7F2");
  const text = config.colors.text || (isLuxury ? "#FAF7F2" : "#282B2B");
  const surface = isLuxury ? "#1A1A1A" : "#FFFFFF";
  const border = isLuxury ? "rgba(255,255,255,0.1)" : "#EDE7DD";
  const muted = isLuxury ? "rgba(255,255,255,0.55)" : "#8a8580";

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

  const headingStyle = { fontFamily: `"${config.fonts.heading}", Georgia, serif` };

  return (
    <div
      className="min-h-screen"
      style={{
        background: bg,
        color: text,
        fontFamily: `"${config.fonts.body}", system-ui, sans-serif`,
      }}
    >
      {/* soft ambient for classic themes */}
      {!isLuxury && (
        <>
          <FloralCorner className="pointer-events-none fixed -left-10 bottom-20 h-64 w-64 opacity-40" />
          <FloralCorner
            flip
            className="pointer-events-none fixed -right-8 top-32 h-56 w-56 opacity-35"
          />
        </>
      )}

      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{
          borderColor: border,
          background: isLuxury
            ? "rgba(17,17,17,0.92)"
            : "rgba(253,252,250,0.92)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Logo href={`/${locale}`} dark={isLuxury} size="sm" />
          <nav
            className="hidden items-center gap-7 text-[13px] tracking-wide md:flex"
            style={{ color: muted }}
          >
            {story && (
              <a href="#story" className="hover:opacity-100" style={{ opacity: 0.85 }}>
                {labels.story}
              </a>
            )}
            {schedule && (
              <a href="#schedule" className="hover:opacity-100" style={{ opacity: 0.85 }}>
                {labels.schedule}
              </a>
            )}
            <a href="#details" className="hover:opacity-100" style={{ opacity: 0.85 }}>
              {labels.details || "Детали"}
            </a>
            {faq && (
              <a href="#faq" className="hover:opacity-100" style={{ opacity: 0.85 }}>
                {labels.faq}
              </a>
            )}
            {wishesBlock && (
              <a href="#wishes" className="hover:opacity-100" style={{ opacity: 0.85 }}>
                {labels.wishes}
              </a>
            )}
          </nav>
          {rsvp && (
            <a href="#rsvp">
              <Button
                size="sm"
                className="border-0 text-white shadow-none"
                style={{ background: primary }}
              >
                RSVP ♥
              </Button>
            </a>
          )}
        </div>
      </header>

      {/* HERO — ref 13 layout */}
      {hero && (
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 pt-6 lg:px-6 lg:pt-8">
            <div
              className="overflow-hidden rounded-[1.75rem] border shadow-[0_20px_50px_-16px_rgba(40,43,43,0.12)]"
              style={{
                background: surface,
                borderColor: border,
              }}
            >
              <div className="grid lg:grid-cols-12">
                {/* Photo */}
                <div className="relative min-h-[280px] lg:col-span-5 lg:min-h-[420px]">
                  {heroData.image && (
                    <Image
                      src={heroData.image}
                      alt={`${heroData.partner1} & ${heroData.partner2}`}
                      fill
                      priority
                      className="object-cover object-[center_15%]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  )}
                  {!isLuxury && (
                    <FloralCorner className="pointer-events-none absolute -bottom-4 -left-4 h-40 w-40 drop-shadow" />
                  )}
                </div>

                {/* Names + CTA */}
                <div className="relative flex flex-col items-center justify-center px-6 py-10 text-center lg:col-span-4 lg:px-8">
                  <GoldFlourish className="mb-3 h-7 w-24" />
                  <h1
                    className="text-[2rem] leading-[1.15] sm:text-[2.5rem]"
                    style={headingStyle}
                  >
                    {heroData.partner1}
                    <br />
                    <span style={{ color: primary }}>&</span> {heroData.partner2}
                  </h1>
                  <p className="mt-3 text-sm" style={{ color: muted }}>
                    {heroData.date &&
                      new Date(heroData.date).toLocaleDateString(
                        locale === "en" ? "en-US" : "ru-RU",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                  </p>
                  <p
                    className="mt-2 text-lg italic"
                    style={{ ...headingStyle, color: accent }}
                  >
                    {heroData.tagline} ♥
                  </p>
                  {rsvp && (
                    <a href="#rsvp" className="mt-6">
                      <Button
                        size="lg"
                        className="border-0 px-8 text-white shadow-none"
                        style={{ background: primary }}
                      >
                        {heroData.cta || labels.confirm}
                      </Button>
                    </a>
                  )}
                  <p className="mt-3 text-xs" style={{ color: muted }}>
                    {locale === "en"
                      ? "We will be happy to see you!"
                      : "Мы будем рады видеть вас!"}
                  </p>
                </div>

                {/* Side cards */}
                <div
                  className="space-y-3 border-t px-5 py-6 lg:col-span-3 lg:border-l lg:border-t-0 lg:px-4 lg:py-6"
                  style={{
                    borderColor: border,
                    background: isLuxury ? bg : "#FDFCFA",
                  }}
                >
                  {countdown && (
                    <div
                      className="rounded-2xl border p-4 text-center"
                      style={{ background: surface, borderColor: border }}
                    >
                      <p
                        className="mb-2 flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-wider"
                        style={{ color: muted }}
                      >
                        <Clock size={12} style={{ color: accent }} />{" "}
                        {labels.countdown}
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
                      className="rounded-2xl border p-4 text-left"
                      style={{ background: surface, borderColor: border }}
                    >
                      <p
                        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
                        style={{ color: muted }}
                      >
                        <MapPin size={12} style={{ color: accent }} />{" "}
                        {labels.location}
                      </p>
                      <p className="text-sm font-medium">
                        {String(location.data.name || "")}
                      </p>
                      <p
                        className="mt-1 text-xs leading-relaxed"
                        style={{ color: muted }}
                      >
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
                      className="rounded-2xl border p-4 text-left"
                      style={{ background: surface, borderColor: border }}
                    >
                      <p
                        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
                        style={{ color: muted }}
                      >
                        <Car size={12} style={{ color: accent }} />{" "}
                        {labels.transfer}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: muted }}>
                        {String(transfer.data.text || "")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE timeline */}
      {schedule && (
        <section id="schedule" className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-center text-2xl sm:text-3xl" style={headingStyle}>
              {labels.schedule}
            </h2>
            <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#D4A537]/50 to-transparent" />
          </div>
          <div className="relative flex flex-wrap items-start justify-center gap-3 sm:gap-1">
            {((schedule.data.items as ScheduleItem[]) || []).map((item, i, arr) => (
              <div key={i} className="relative flex w-[100px] flex-col items-center text-center sm:w-[110px]">
                {i < arr.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+28px)] top-6 hidden h-px w-[calc(100%-16px)] sm:block"
                    style={{ background: `${accent}33` }}
                  />
                )}
                <div
                  className="relative z-10 mb-2.5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: isLuxury ? "#1A1A1A" : "#FAF7F2",
                    color: accent,
                    boxShadow: isLuxury ? "none" : "0 0 0 1px #EDE7DD",
                  }}
                >
                  <Heart size={18} strokeWidth={1.5} />
                </div>
                <p className="text-base font-semibold tracking-tight" style={headingStyle}>
                  {item.time}
                </p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: muted }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Content cards grid */}
      <section
        id="details"
        className="mx-auto grid max-w-6xl gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {story && (
          <div
            id="story"
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-lg" style={headingStyle}>
              {String(story.data.title || labels.story)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
              {String(story.data.text || "")}
            </p>
            {Boolean(story.data.image) && (
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={String(story.data.image)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            )}
            <span className="mt-3 inline-block text-xs font-medium" style={{ color: primary }}>
              {locale === "en" ? "Read story →" : "Читать историю →"}
            </span>
          </div>
        )}

        {afterparty && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-lg" style={headingStyle}>
              {String(afterparty.data.title || "После свадьбы")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
              {String(afterparty.data.text || "")}
            </p>
          </div>
        )}

        {seating && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-lg" style={headingStyle}>
              {String(seating.data.title || "План рассадки")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
              {String(seating.data.text || "")}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-40">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className="flex h-10 w-10 items-center justify-center rounded-full border text-[10px]"
                  style={{ borderColor: accent }}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {dresscode && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Shirt size={18} strokeWidth={1.5} style={{ color: accent }} />
              <h3 className="text-lg" style={headingStyle}>
                {labels.dresscode}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              {String(dresscode.data.text || "")}
            </p>
            <div className="mt-4 flex gap-2">
              {((dresscode.data.colors as string[]) || []).map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full shadow-sm ring-1 ring-black/5"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}

        {(musicBlock || config.music?.enabled) && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Music size={18} strokeWidth={1.5} style={{ color: accent }} />
              <h3 className="text-lg" style={headingStyle}>
                {labels.music}
              </h3>
            </div>
            <p className="text-sm" style={{ color: muted }}>
              {config.music?.trackName ||
                String(musicBlock?.data.trackName || "Фоновая музыка")}
            </p>
          </div>
        )}

        {wishesBlock && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Gift size={18} strokeWidth={1.5} style={{ color: accent }} />
              <h3 className="text-lg" style={headingStyle}>
                {String(wishesBlock.data.title || labels.wishes)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              {String(wishesBlock.data.text || "")}
            </p>
            <a href="#wishes" className="mt-3 inline-block text-xs font-medium" style={{ color: primary }}>
              {locale === "en" ? "Leave a wish →" : "Оставить пожелание →"}
            </a>
          </div>
        )}

        {faq && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-lg" style={headingStyle}>
              {labels.faq}
            </h3>
            <p className="mt-2 text-sm" style={{ color: muted }}>
              {locale === "en"
                ? "Answers to common questions about the day"
                : "Ответы на частые вопросы о свадьбе"}
            </p>
            <a href="#faq" className="mt-3 inline-block text-xs font-medium" style={{ color: primary }}>
              {locale === "en" ? "Go to FAQ →" : "Перейти к FAQ →"}
            </a>
          </div>
        )}

        {gifts && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Gift size={18} strokeWidth={1.5} style={{ color: accent }} />
              <h3 className="text-lg" style={headingStyle}>
                {String(gifts.data.title || labels.gifts)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              {String(gifts.data.text || "")}
            </p>
          </div>
        )}

        {payment && (
          <div
            className="rounded-[1.25rem] border p-5 shadow-sm"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-lg" style={headingStyle}>
              {String(payment.data.title || "Оплата")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
              {String(payment.data.text || "")}
            </p>
            {Boolean(payment.data.recipient) && (
              <p className="mt-2 text-sm font-medium" style={{ color: accent }}>
                {String(payment.data.recipient)}
              </p>
            )}
          </div>
        )}
      </section>

      {rsvp && (
        <section id="rsvp" className="mx-auto max-w-lg px-4 py-12">
          <RsvpForm
            deadline={
              rsvp.data.deadline ? String(rsvp.data.deadline) : undefined
            }
          />
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

      {faq && (
        <section id="faq" className="mx-auto max-w-2xl px-4 py-10">
          <h2 className="mb-6 text-center text-2xl" style={headingStyle}>
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
                    style={{ color: muted }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    className="border-t px-5 py-3 text-sm"
                    style={{ borderColor: border, color: muted }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {wishesBlock && (
        <section id="wishes" className="mx-auto max-w-2xl px-4 py-10">
          <h2 className="mb-2 text-center text-2xl" style={headingStyle}>
            {String(wishesBlock.data.title || labels.wishes)}
          </h2>
          <p className="mb-6 text-center text-sm" style={{ color: muted }}>
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
            className="space-y-3 rounded-[1.25rem] border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <input
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder={labels.yourName || "Ваше имя"}
              className="h-11 w-full rounded-full border px-4 text-sm outline-none focus:ring-2"
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
              className="w-full border-0 text-white shadow-none"
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
        className="border-t py-10 text-center text-xs"
        style={{ borderColor: border, color: muted }}
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

      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex border-t pb-safe md:hidden"
        style={{
          borderColor: border,
          background: isLuxury
            ? "rgba(17,17,17,0.96)"
            : "rgba(253,252,250,0.96)",
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
            { href: "#rsvp", icon: Heart, label: "RSVP" },
            { href: "#faq", icon: Menu, label: "Menu" },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href + item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px]"
              style={{ color: muted }}
            >
              <Icon size={18} strokeWidth={1.5} style={{ color: accent }} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="h-16 md:hidden" />
    </div>
  );
}
