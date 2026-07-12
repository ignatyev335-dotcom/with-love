"use client";

import { FloralCorner } from "@/components/decor/Floral";
import { Countdown } from "@/components/invitation/Countdown";
import { BlockIcon } from "@/components/editor/blockIcons";
import { BLOCK_LABELS } from "@/lib/editor-meta";
import { cn } from "@/lib/utils";
import type { InvitationBlock, InvitationConfig, ScheduleItem } from "@/types";
import {
  Car,
  ChevronDown,
  Heart,
  MapPin,
  Music,
  Shirt,
} from "lucide-react";
import Image from "next/image";

type Device = "desktop" | "tablet" | "mobile";

export function LiveCanvas({
  config,
  selectedId,
  onSelect,
  device,
}: {
  config: InvitationConfig;
  selectedId: string | null;
  onSelect: (id: string) => void;
  device: Device;
}) {
  const blocks = [...config.blocks]
    .filter((b) => b.enabled)
    .sort((a, b) => a.order - b.order);

  const isLuxury = config.theme === "luxury";
  const primary = config.colors.primary;
  const accent = config.colors.accent;
  const bg = config.colors.background;
  const text = config.colors.text;

  const widthClass =
    device === "mobile"
      ? "max-w-[390px]"
      : device === "tablet"
        ? "max-w-[720px]"
        : "max-w-[960px]";

  const hero = blocks.find((b) => b.type === "hero");
  const countdown = blocks.find((b) => b.type === "countdown");
  const location = blocks.find((b) => b.type === "location");
  const transfer = blocks.find((b) => b.type === "transfer");
  const rsvp = blocks.find((b) => b.type === "rsvp");
  const rest = blocks.filter(
    (b) =>
      !["hero", "countdown", "location", "transfer", "rsvp"].includes(b.type)
  );

  return (
    <div
      className={cn(
        "mx-auto w-full overflow-hidden rounded-[1.75rem] border shadow-soft-lg transition-all duration-300",
        widthClass,
        isLuxury ? "border-white/10" : "border-[#EDE7DD]"
      )}
      style={{ background: bg, color: text }}
    >
      {/* HERO */}
      {hero && (
        <Selectable
          block={hero}
          selected={selectedId === hero.id}
          onSelect={onSelect}
        >
          <div
            className={cn(
              "grid gap-0",
              device === "mobile" ? "grid-cols-1" : "md:grid-cols-2"
            )}
          >
            <div className="relative min-h-[220px] aspect-[4/3] md:aspect-auto md:min-h-[300px]">
              {String(hero.data.image || "") && (
                <Image
                  src={String(hero.data.image)}
                  alt="Cover"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="500px"
                />
              )}
              {!isLuxury && (
                <FloralCorner className="pointer-events-none absolute -bottom-3 -left-3 h-28 w-28 drop-shadow" />
              )}
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-charcoal shadow-sm">
                Изменить обложку
              </div>
            </div>
            <div
              className="flex flex-col justify-center px-6 py-8 text-center"
              style={{
                background: isLuxury
                  ? "#1A1A1A"
                  : "color-mix(in srgb, white 70%, transparent)",
              }}
            >
              <h2
                className="font-heading text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                {String(hero.data.partner1 || "Имя")}
                <br />
                <span style={{ color: primary }}>&</span>{" "}
                {String(hero.data.partner2 || "Имя")}
              </h2>
              <p className="mt-3 text-sm opacity-60">
                {hero.data.date
                  ? new Date(String(hero.data.date)).toLocaleDateString(
                      "ru-RU",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Дата"}
              </p>
              <p
                className="mt-2 font-heading text-lg italic"
                style={{ color: accent }}
              >
                {String(hero.data.tagline || "Мы женимся!")} ♥
              </p>
              <button
                type="button"
                className="mx-auto mt-5 rounded-2xl px-5 py-2.5 text-sm font-medium text-white shadow-soft"
                style={{ background: primary }}
              >
                {String(hero.data.cta || "Подтвердить участие")}
              </button>
            </div>
          </div>
        </Selectable>
      )}

      {/* INFO ROW */}
      {(countdown || location || transfer) && (
        <div
          className={cn(
            "grid gap-3 border-t p-4",
            device === "mobile" ? "grid-cols-1" : "sm:grid-cols-3",
            isLuxury ? "border-white/10" : "border-black/5"
          )}
        >
          {countdown && (
            <Selectable
              block={countdown}
              selected={selectedId === countdown.id}
              onSelect={onSelect}
              className="rounded-2xl"
            >
              <div
                className="rounded-2xl p-4 text-center"
                style={{
                  background: isLuxury ? "#1A1A1A" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isLuxury ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wide opacity-50">
                  Таймер до свадьбы
                </p>
                <Countdown
                  targetDate={String(
                    countdown.data.targetDate || "2025-06-20T15:00:00"
                  )}
                  compact
                />
              </div>
            </Selectable>
          )}
          {location && (
            <Selectable
              block={location}
              selected={selectedId === location.id}
              onSelect={onSelect}
            >
              <div
                className="h-full rounded-2xl p-4"
                style={{
                  background: isLuxury ? "#1A1A1A" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isLuxury ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <p className="mb-1 flex items-center gap-1 text-[11px] font-medium opacity-50">
                  <MapPin size={12} style={{ color: accent }} /> Адрес
                  торжества
                </p>
                <p className="text-sm font-medium">
                  {String(location.data.name || "")}
                </p>
                <p className="mt-1 text-xs opacity-60 leading-relaxed">
                  {String(location.data.address || "")}
                </p>
              </div>
            </Selectable>
          )}
          {transfer && (
            <Selectable
              block={transfer}
              selected={selectedId === transfer.id}
              onSelect={onSelect}
            >
              <div
                className="h-full rounded-2xl p-4"
                style={{
                  background: isLuxury ? "#1A1A1A" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isLuxury ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <p className="mb-1 flex items-center gap-1 text-[11px] font-medium opacity-50">
                  <Car size={12} style={{ color: accent }} /> Трансфер
                </p>
                <p className="text-xs leading-relaxed opacity-70">
                  {String(transfer.data.text || "")}
                </p>
              </div>
            </Selectable>
          )}
        </div>
      )}

      {/* RSVP */}
      {rsvp && (
        <Selectable
          block={rsvp}
          selected={selectedId === rsvp.id}
          onSelect={onSelect}
        >
          <div
            className={cn(
              "border-t p-4",
              isLuxury ? "border-white/10" : "border-black/5"
            )}
          >
            <div
              className="rounded-2xl border border-dashed p-6 text-center"
              style={{
                borderColor: `${primary}55`,
                background: `${primary}12`,
              }}
            >
              <p className="text-sm font-medium">
                {String(
                  rsvp.data.title ||
                    "Подтвердите, пожалуйста, ваше присутствие"
                )}
              </p>
              {Boolean(rsvp.data.deadline) && (
                <p className="mt-1 text-xs opacity-50">
                  Ответьте до{" "}
                  {new Date(String(rsvp.data.deadline)).toLocaleDateString(
                    "ru-RU",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </p>
              )}
              <button
                type="button"
                className="mt-4 rounded-2xl px-5 py-2 text-sm font-medium text-white"
                style={{ background: primary }}
              >
                Подтвердить участие
              </button>
            </div>
          </div>
        </Selectable>
      )}

      {/* SCHEDULE full width */}
      {rest
        .filter((b) => b.type === "schedule")
        .map((block) => (
          <Selectable
            key={block.id}
            block={block}
            selected={selectedId === block.id}
            onSelect={onSelect}
          >
            <div
              className={cn(
                "border-t px-4 py-8",
                isLuxury ? "border-white/10" : "border-black/5"
              )}
            >
              <h3
                className="mb-6 text-center font-heading text-xl"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                Программа дня
              </h3>
              <div className="flex flex-wrap items-start justify-center gap-4">
                {((block.data.items as ScheduleItem[]) || []).map((item, i) => (
                  <div key={i} className="flex w-[88px] flex-col items-center text-center">
                    <div
                      className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{
                        background: isLuxury ? "#1A1A1A" : `${accent}22`,
                        color: accent,
                      }}
                    >
                      <Heart size={16} />
                    </div>
                    <p className="font-heading text-base font-semibold">
                      {item.time}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug opacity-60">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Selectable>
        ))}

      {/* GRID of content blocks */}
      <div
        className={cn(
          "grid gap-3 border-t p-4",
          device === "mobile" ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3",
          isLuxury ? "border-white/10" : "border-black/5"
        )}
      >
        {rest
          .filter((b) => b.type !== "schedule")
          .map((block) => (
            <Selectable
              key={block.id}
              block={block}
              selected={selectedId === block.id}
              onSelect={onSelect}
            >
              <ContentCard
                block={block}
                isLuxury={isLuxury}
                accent={accent}
                headingFont={config.fonts.heading}
              />
            </Selectable>
          ))}
      </div>

      <div
        className={cn(
          "border-t px-4 py-6 text-center text-xs opacity-40",
          isLuxury ? "border-white/10" : "border-black/5"
        )}
      >
        С любовью · With Love
      </div>
    </div>
  );
}

function Selectable({
  block,
  selected,
  onSelect,
  children,
  className,
}: {
  block: InvitationBlock;
  selected: boolean;
  onSelect: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(block.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(block.id);
        }
      }}
      className={cn(
        "relative cursor-pointer outline-none transition-all",
        selected && "z-10 ring-2 ring-[#E8A09A] ring-offset-2 ring-offset-[#F3EEE6]",
        className
      )}
    >
      {selected && (
        <div className="absolute -top-2.5 left-3 z-20 flex items-center gap-1 rounded-full bg-[#E8A09A] px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
          <BlockIcon type={block.type} size={10} />
          {BLOCK_LABELS[block.type].label}
        </div>
      )}
      {children}
    </div>
  );
}

function ContentCard({
  block,
  isLuxury,
  accent,
  headingFont,
}: {
  block: InvitationBlock;
  isLuxury: boolean;
  accent: string;
  headingFont: string;
}) {
  const label = BLOCK_LABELS[block.type].label;
  const cardStyle = {
    background: isLuxury ? "#1A1A1A" : "rgba(255,255,255,0.75)",
    border: `1px solid ${isLuxury ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
  };

  if (block.type === "story") {
    return (
      <div className="h-full rounded-2xl p-4" style={cardStyle}>
        <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
          <BlockIcon type="story" size={16} />
          <span
            className="font-heading text-sm"
            style={{ fontFamily: `"${headingFont}", serif` }}
          >
            {String(block.data.title || label)}
          </span>
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed opacity-70">
          {String(block.data.text || "")}
        </p>
        {Boolean(block.data.image) && (
          <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={String(block.data.image)}
              alt=""
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        )}
      </div>
    );
  }

  if (block.type === "dresscode") {
    return (
      <div className="h-full rounded-2xl p-4" style={cardStyle}>
        <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
          <Shirt size={16} />
          <span className="font-heading text-sm">{label}</span>
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed opacity-70">
          {String(block.data.text || "")}
        </p>
        <div className="mt-3 flex gap-1.5">
          {((block.data.colors as string[]) || []).slice(0, 5).map((c) => (
            <span
              key={c}
              className="h-6 w-6 rounded-full border border-black/5 shadow-sm"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "faq") {
    const items = (block.data.items as { question: string }[]) || [];
    return (
      <div className="h-full rounded-2xl p-4" style={cardStyle}>
        <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
          <BlockIcon type="faq" size={16} />
          <span className="font-heading text-sm">{label}</span>
        </div>
        <div className="space-y-1.5">
          {items.slice(0, 2).map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs opacity-70"
              style={{ background: isLuxury ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}
            >
              <span className="truncate">{item.question}</span>
              <ChevronDown size={12} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "music") {
    return (
      <div className="h-full rounded-2xl p-4" style={cardStyle}>
        <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
          <Music size={16} />
          <span className="font-heading text-sm">{label}</span>
        </div>
        <p className="text-xs opacity-70">
          {String(block.data.trackName || "Фоновая музыка")}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl p-4" style={cardStyle}>
      <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
        <BlockIcon type={block.type} size={16} />
        <span className="font-heading text-sm">
          {String(block.data.title || label)}
        </span>
      </div>
      <p className="line-clamp-3 text-xs leading-relaxed opacity-70">
        {String(block.data.text || BLOCK_LABELS[block.type].hint)}
      </p>
    </div>
  );
}
