"use client";

import { FloralBouquet, GoldFlourish } from "@/components/decor/Floral";
import { ConfirmedGuests } from "@/components/invitation/ConfirmedGuests";
import { Countdown } from "@/components/invitation/Countdown";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { STORY_IMAGE } from "@/lib/seed";
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

  const primary =
    config.colors.primary === "#F76E62" || !config.colors.primary
      ? "#D4A39C"
      : config.colors.primary;
  const accent = config.colors.accent || "#C4A35A";
  const isLuxury = config.theme === "luxury";
  const bg = isLuxury ? "#111111" : "#FBF8F3";
  const text = isLuxury ? "#FAF7F2" : "#2C2926";
  const surface = isLuxury ? "#1A1A1A" : "#FFFCFA";
  const border = isLuxury ? "rgba(255,255,255,0.1)" : "#EFE9E0";
  const muted = isLuxury ? "rgba(255,255,255,0.55)" : "#8F8880";
  const cream = isLuxury ? "#1A1A1A" : "#F7F1EA";

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

  const headingStyle = {
    fontFamily: `"${config.fonts.heading}", Georgia, "Times New Roman", serif`,
  };

  const softBtn = {
    background: primary,
    color: "#fff",
    border: "none",
    boxShadow: "0 8px 18px -8px rgba(212,163,156,0.55)",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: bg,
        color: text,
        fontFamily: `"${config.fonts.body}", system-ui, sans-serif`,
      }}
    >
      {!isLuxury && (
        <>
          <FloralBouquet className="pointer-events-none fixed -right-12 top-24 z-0 h-72 w-80 opacity-45" />
          <FloralBouquet
            flip
            className="pointer-events-none fixed -left-16 bottom-32 z-0 h-64 w-72 opacity-30"
          />
        </>
      )}

      {/* NAV — ref 13 clean top */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{
          borderColor: border,
          background: isLuxury
            ? "rgba(17,17,17,0.94)"
            : "rgba(251,248,243,0.92)",
        }}
      >
        <div className="mx-auto flex h-[3.4rem] max-w-[1120px] items-center justify-between px-4 lg:px-6">
          <Logo href={`/${locale}`} dark={isLuxury} size="sm" />
          <nav
            className="hidden items-center gap-8 text-[13px] tracking-wide md:flex"
            style={{ color: muted }}
          >
            {story && <a href="#story">{labels.story}</a>}
            {schedule && <a href="#schedule">{labels.schedule}</a>}
            <a href="#details">{labels.details || "Детали"}</a>
            {faq && <a href="#faq">{labels.faq}</a>}
            {wishesBlock && <a href="#wishes">{labels.wishes}</a>}
          </nav>
          {rsvp && (
            <a href="#rsvp">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium text-white transition hover:opacity-90"
                style={softBtn}
              >
                RSVP ♥
              </button>
            </a>
          )}
        </div>
      </header>

      {/* HERO — exact ref 13: photo | names | info column */}
      {hero && (
        <section className="relative z-10 px-4 pt-5 lg:px-6 lg:pt-7">
          <div className="mx-auto max-w-[1120px]">
            <div
              className="overflow-hidden rounded-[1.35rem] border shadow-[0_28px_70px_-28px_rgba(50,40,30,0.2)]"
              style={{ background: cream, borderColor: border }}
            >
              <div className="grid lg:grid-cols-12">
                {/* Photo + florals */}
                <div className="relative min-h-[300px] lg:col-span-5 lg:min-h-[460px]">
                  {heroData.image && (
                    <Image
                      src={heroData.image}
                      alt={`${heroData.partner1} & ${heroData.partner2}`}
                      fill
                      priority
                      className="object-cover object-[center_12%]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  )}
                  {!isLuxury && (
                    <FloralBouquet className="pointer-events-none absolute -bottom-10 -left-12 h-56 w-64 drop-shadow-lg" />
                  )}
                </div>

                {/* Center names */}
                <div
                  className="relative flex flex-col items-center justify-center px-6 py-12 text-center lg:col-span-4 lg:px-8"
                  style={{ background: surface }}
                >
                  <GoldFlourish className="mb-4 h-6 w-32 opacity-70" />
                  <h1
                    className="text-[2.15rem] font-normal leading-[1.12] sm:text-[2.55rem]"
                    style={headingStyle}
                  >
                    {heroData.partner1}
                    <br />
                    <span className="mx-1" style={{ color: primary }}>
                      &
                    </span>
                    {heroData.partner2}
                  </h1>
                  <p className="mt-3.5 text-[14px]" style={{ color: muted }}>
                    {heroData.date &&
                      new Date(heroData.date).toLocaleDateString(
                        locale === "en" ? "en-US" : "ru-RU",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                  </p>
                  <p
                    className="mt-2.5 text-[17px] italic"
                    style={{ ...headingStyle, color: accent }}
                  >
                    {heroData.tagline || "Мы женимся!"} ♥
                  </p>
                  {rsvp && (
                    <a href="#rsvp" className="mt-7">
                      <button
                        type="button"
                        className="inline-flex h-11 items-center rounded-full px-8 text-[14px] font-medium text-white transition hover:opacity-92"
                        style={softBtn}
                      >
                        {heroData.cta || labels.confirm}
                      </button>
                    </a>
                  )}
                  <p className="mt-3 text-[12px]" style={{ color: muted }}>
                    {locale === "en"
                      ? "We will be happy to see you!"
                      : "Мы будем рады видеть вас!"}
                  </p>
                </div>

                {/* Right info column — ref 13 */}
                <div
                  className="space-y-3 border-t px-4 py-5 lg:col-span-3 lg:border-l lg:border-t-0 lg:px-4 lg:py-6"
                  style={{ borderColor: border, background: cream }}
                >
                  {countdown && (
                    <div
                      className="rounded-2xl border px-3 py-4 text-center"
                      style={{ background: surface, borderColor: border }}
                    >
                      <p
                        className="mb-2 text-[11px] font-medium tracking-wide"
                        style={{ color: muted }}
                      >
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
                      className="rounded-2xl border px-3.5 py-3.5"
                      style={{ background: surface, borderColor: border }}
                    >
                      <p
                        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium"
                        style={{ color: muted }}
                      >
                        <MapPin size={12} style={{ color: accent }} />{" "}
                        {labels.location}
                      </p>
                      <p className="text-[13px] font-medium leading-snug">
                        {String(location.data.name || "")}
                      </p>
                      <p
                        className="mt-1 text-[11px] leading-relaxed"
                        style={{ color: muted }}
                      >
                        {String(location.data.address || "")}
                      </p>
                      {Boolean(location.data.mapUrl) && (
                        <a
                          href={String(location.data.mapUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-[11px] font-medium"
                          style={{ color: primary }}
                        >
                          {labels.showMap} →
                        </a>
                      )}
                    </div>
                  )}
                  {transfer && (
                    <div
                      className="rounded-2xl border px-3.5 py-3.5"
                      style={{ background: surface, borderColor: border }}
                    >
                      <p
                        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium"
                        style={{ color: muted }}
                      >
                        <Car size={12} style={{ color: accent }} />{" "}
                        {labels.transfer}
                      </p>
                      <p
                        className="text-[11px] leading-relaxed"
                        style={{ color: muted }}
                      >
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

      {/* SCHEDULE — horizontal with gold icons (ref 13) */}
      {schedule && (
        <section id="schedule" className="relative z-10 mx-auto max-w-[1120px] px-4 py-14 lg:px-6">
          <div className="mb-9 flex flex-col items-center">
            <h2
              className="text-center text-[1.65rem] font-normal sm:text-[1.85rem]"
              style={headingStyle}
            >
              {labels.schedule}
            </h2>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#C4A35A]/55 to-transparent" />
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-6 sm:gap-x-1">
            {((schedule.data.items as ScheduleItem[]) || []).map((item, i, arr) => (
              <div
                key={i}
                className="relative flex w-[96px] flex-col items-center text-center sm:w-[108px]"
              >
                {i < arr.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+26px)] top-[22px] hidden h-px w-[calc(100%-12px)] sm:block"
                    style={{ background: `${accent}40` }}
                  />
                )}
                <div
                  className="relative z-[1] mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{
                    background: isLuxury ? "#1A1A1A" : "#F7F1EA",
                    color: accent,
                    boxShadow: isLuxury ? "none" : "inset 0 0 0 1px #EFE9E0",
                  }}
                >
                  <Heart size={17} strokeWidth={1.4} />
                </div>
                <p className="text-[15px] font-semibold tracking-tight" style={headingStyle}>
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

      {/* CONTENT GRID — visual cards like ref 13 */}
      <section
        id="details"
        className="relative z-10 mx-auto grid max-w-[1120px] gap-3.5 px-4 pb-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-6"
      >
        {story && (
          <div
            id="story"
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-[1.1rem] font-normal" style={headingStyle}>
              {String(story.data.title || labels.story)}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: muted }}>
              {String(story.data.text || "")}
            </p>
            <div className="mt-4 flex gap-2">
              <div className="relative h-20 w-20 rotate-[-4deg] overflow-hidden rounded-lg border-2 border-white shadow-md">
                <Image
                  src={String(story.data.image || STORY_IMAGE)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="relative h-20 w-20 rotate-[3deg] overflow-hidden rounded-lg border-2 border-white shadow-md">
                <Image
                  src={heroData.image || STORY_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </div>
            <span className="mt-3 inline-block text-[12px] font-medium" style={{ color: primary }}>
              {locale === "en" ? "Read story →" : "Читать историю →"}
            </span>
          </div>
        )}

        {afterparty && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-[1.1rem]" style={headingStyle}>
              {String(afterparty.data.title || "После свадьбы")}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: muted }}>
              {String(afterparty.data.text || "")}
            </p>
            <div className="relative mt-4 h-24 overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>
        )}

        {seating && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-[1.1rem]" style={headingStyle}>
              {String(seating.data.title || "План рассадки")}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: muted }}>
              {String(seating.data.text || "")}
            </p>
            <div className="mt-4 grid grid-cols-3 place-items-center gap-2 opacity-70">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <span
                  key={n}
                  className="flex h-11 w-11 items-center justify-center rounded-full border text-[11px]"
                  style={{ borderColor: `${accent}66`, color: accent }}
                >
                  {n}
                </span>
              ))}
            </div>
            <span className="mt-3 inline-block text-[12px] font-medium" style={{ color: primary }}>
              {locale === "en" ? "Open plan →" : "Открыть план →"}
            </span>
          </div>
        )}

        {dresscode && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Shirt size={17} strokeWidth={1.4} style={{ color: accent }} />
              <h3 className="text-[1.1rem]" style={headingStyle}>
                {labels.dresscode}
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: muted }}>
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
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Music size={17} strokeWidth={1.4} style={{ color: accent }} />
              <h3 className="text-[1.1rem]" style={headingStyle}>
                {labels.music}
              </h3>
            </div>
            <p className="text-[13px]" style={{ color: muted }}>
              {config.music?.trackName ||
                String(musicBlock?.data.trackName || "Фоновая музыка")}
            </p>
            <span className="mt-3 inline-block text-[12px] font-medium" style={{ color: primary }}>
              {locale === "en" ? "Add tracks →" : "Добавить треки →"}
            </span>
          </div>
        )}

        {wishesBlock && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Gift size={17} strokeWidth={1.4} style={{ color: accent }} />
              <h3 className="text-[1.1rem]" style={headingStyle}>
                {String(wishesBlock.data.title || labels.wishes)}
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: muted }}>
              {String(wishesBlock.data.text || "")}
            </p>
            <a href="#wishes" className="mt-3 inline-block text-[12px] font-medium" style={{ color: primary }}>
              {locale === "en" ? "Leave a wish →" : "Оставить пожелание →"}
            </a>
          </div>
        )}

        {faq && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: cream, color: accent }}>
              ?
            </div>
            <h3 className="text-[1.1rem]" style={headingStyle}>
              {labels.faq}
            </h3>
            <p className="mt-2 text-[13px]" style={{ color: muted }}>
              {locale === "en"
                ? "Answers to common questions about the day"
                : "Ответы на частые вопросы о свадьбе"}
            </p>
            <a href="#faq" className="mt-3 inline-block text-[12px] font-medium" style={{ color: primary }}>
              {locale === "en" ? "Go to FAQ →" : "Перейти к FAQ →"}
            </a>
          </div>
        )}

        {gifts && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Gift size={17} strokeWidth={1.4} style={{ color: accent }} />
              <h3 className="text-[1.1rem]" style={headingStyle}>
                {String(gifts.data.title || labels.gifts)}
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: muted }}>
              {String(gifts.data.text || "")}
            </p>
          </div>
        )}

        {payment && (
          <div
            className="rounded-[1.15rem] border p-5 shadow-[0_4px_20px_-10px_rgba(40,30,20,0.08)]"
            style={{ background: surface, borderColor: border }}
          >
            <h3 className="text-[1.1rem]" style={headingStyle}>
              {String(payment.data.title || "Для гостей")}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: muted }}>
              {String(payment.data.text || "")}
            </p>
            {Boolean(payment.data.recipient) && (
              <p className="mt-2 text-[13px] font-medium" style={{ color: accent }}>
                {String(payment.data.recipient)}
              </p>
            )}
          </div>
        )}
      </section>

      {rsvp && (
        <section id="rsvp" className="relative z-10 mx-auto max-w-lg px-4 py-12">
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
        <section id="faq" className="relative z-10 mx-auto max-w-2xl px-4 py-10">
          <h2 className="mb-6 text-center text-[1.65rem]" style={headingStyle}>
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
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-[13.5px] font-medium"
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
                    className="border-t px-5 py-3 text-[13px]"
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
        <section id="wishes" className="relative z-10 mx-auto max-w-2xl px-4 py-10">
          <h2 className="mb-2 text-center text-[1.65rem]" style={headingStyle}>
            {String(wishesBlock.data.title || labels.wishes)}
          </h2>
          <p className="mb-6 text-center text-[13px]" style={{ color: muted }}>
            {String(wishesBlock.data.text || "")}
          </p>
          <div className="mb-6 space-y-3">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border p-4"
                style={{ background: surface, borderColor: border }}
              >
                <p className="text-[13.5px] leading-relaxed opacity-85">
                  «{w.text}»
                </p>
                <p className="mt-2 text-xs font-medium" style={{ color: accent }}>
                  — {w.authorName}
                </p>
              </div>
            ))}
          </div>
          <div
            className="space-y-3 rounded-[1.15rem] border p-5"
            style={{ background: surface, borderColor: border }}
          >
            <input
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder={labels.yourName || "Ваше имя"}
              className="h-11 w-full rounded-full border px-4 text-sm outline-none focus:ring-2"
              style={{
                borderColor: border,
                background: cream,
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
                background: cream,
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
        className="relative z-10 border-t py-10 text-center text-xs"
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
            : "rgba(251,248,243,0.96)",
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
              <Icon size={18} strokeWidth={1.4} style={{ color: accent }} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="h-16 md:hidden" />
    </div>
  );
}
