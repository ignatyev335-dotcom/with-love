"use client";

import { FloralBouquet } from "@/components/decor/Floral";
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
  const primary = ["#F76E62", "#E8A09A"].includes(config.colors.primary)
    ? "#D4A39C"
    : config.colors.primary || "#D4A39C";
  const accent = config.colors.accent || "#C4A35A";
  const bg = isLuxury ? "#111111" : "#F7F1EA";
  const text = isLuxury ? "#FAF7F2" : "#2C2926";
  const surface = isLuxury ? "#1A1A1A" : "#FFFCFA";
  const borderCol = isLuxury ? "rgba(255,255,255,0.1)" : "#EFE9E0";
  const wide = device === "desktop";

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
        "mx-auto w-full overflow-hidden rounded-[1.35rem] border shadow-[0_24px_60px_-20px_rgba(50,40,30,0.18)] transition-all duration-300",
        widthClass
      )}
      style={{ background: bg, color: text, borderColor: borderCol }}
    >
      {hero && (
        <Selectable
          block={hero}
          selected={selectedId === hero.id}
          onSelect={onSelect}
        >
          <div
            className={cn(
              "grid gap-0",
              device === "mobile"
                ? "grid-cols-1"
                : wide
                  ? "grid-cols-12"
                  : "grid-cols-2"
            )}
          >
            <div
              className={cn(
                "relative min-h-[200px] aspect-[4/3]",
                wide && "col-span-5 aspect-auto min-h-[280px]"
              )}
            >
              {Boolean(hero.data.image) && (
                <Image
                  src={String(hero.data.image)}
                  alt="Cover"
                  fill
                  className="object-cover object-[center_12%]"
                  sizes="500px"
                />
              )}
              {!isLuxury && (
                <FloralBouquet className="pointer-events-none absolute -bottom-8 -left-10 h-40 w-48 drop-shadow" />
              )}
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-charcoal shadow-sm">
                Изменить обложку
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col justify-center px-5 py-7 text-center",
                wide && "col-span-4"
              )}
              style={{ background: surface }}
            >
              <h2
                className="font-heading text-2xl leading-tight sm:text-3xl"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                {String(hero.data.partner1 || "Имя")}
                <br />
                <span style={{ color: primary }}>&</span>{" "}
                {String(hero.data.partner2 || "Имя")}
              </h2>
              <p className="mt-2.5 text-[13px] opacity-55">
                {hero.data.date
                  ? new Date(String(hero.data.date)).toLocaleDateString(
                      "ru-RU",
                      { day: "numeric", month: "long", year: "numeric" }
                    )
                  : "Дата"}
              </p>
              <p
                className="mt-1.5 font-heading text-base italic"
                style={{ color: accent }}
              >
                {String(hero.data.tagline || "Мы женимся!")} ♥
              </p>
              <button
                type="button"
                className="mx-auto mt-4 rounded-full px-5 py-2 text-[13px] font-medium text-white"
                style={{ background: primary }}
              >
                {String(hero.data.cta || "Подтвердить участие")}
              </button>
            </div>

            {wide && (countdown || location || transfer) && (
              <div
                className="col-span-3 space-y-2 border-l p-3"
                style={{ borderColor: borderCol, background: bg }}
              >
                {countdown && (
                  <Selectable
                    block={countdown}
                    selected={selectedId === countdown.id}
                    onSelect={onSelect}
                  >
                    <div
                      className="rounded-xl border p-3 text-center"
                      style={{ background: surface, borderColor: borderCol }}
                    >
                      <p className="mb-1.5 text-[10px] opacity-50">
                        До нашей свадьбы
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
                      className="rounded-xl border p-3"
                      style={{ background: surface, borderColor: borderCol }}
                    >
                      <p className="mb-1 flex items-center gap-1 text-[10px] opacity-50">
                        <MapPin size={11} style={{ color: accent }} /> Локация
                      </p>
                      <p className="text-xs font-medium">
                        {String(location.data.name || "")}
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
                      className="rounded-xl border p-3"
                      style={{ background: surface, borderColor: borderCol }}
                    >
                      <p className="mb-1 flex items-center gap-1 text-[10px] opacity-50">
                        <Car size={11} style={{ color: accent }} /> Трансфер
                      </p>
                      <p className="line-clamp-3 text-[10px] leading-relaxed opacity-65">
                        {String(transfer.data.text || "")}
                      </p>
                    </div>
                  </Selectable>
                )}
              </div>
            )}
          </div>
        </Selectable>
      )}

      {!wide && (countdown || location || transfer) && (
        <div
          className={cn(
            "grid gap-2.5 border-t p-3",
            device === "mobile" ? "grid-cols-1" : "grid-cols-3"
          )}
          style={{ borderColor: borderCol }}
        >
          {countdown && (
            <Selectable
              block={countdown}
              selected={selectedId === countdown.id}
              onSelect={onSelect}
            >
              <div
                className="rounded-xl border p-3 text-center"
                style={{ background: surface, borderColor: borderCol }}
              >
                <p className="mb-1.5 text-[10px] opacity-50">Таймер</p>
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
                className="h-full rounded-xl border p-3"
                style={{ background: surface, borderColor: borderCol }}
              >
                <p className="mb-1 flex items-center gap-1 text-[10px] opacity-50">
                  <MapPin size={11} style={{ color: accent }} /> Адрес
                </p>
                <p className="text-xs font-medium">
                  {String(location.data.name || "")}
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
                className="h-full rounded-xl border p-3"
                style={{ background: surface, borderColor: borderCol }}
              >
                <p className="mb-1 flex items-center gap-1 text-[10px] opacity-50">
                  <Car size={11} style={{ color: accent }} /> Трансфер
                </p>
                <p className="line-clamp-3 text-[10px] leading-relaxed opacity-65">
                  {String(transfer.data.text || "")}
                </p>
              </div>
            </Selectable>
          )}
        </div>
      )}

      {rsvp && (
        <Selectable
          block={rsvp}
          selected={selectedId === rsvp.id}
          onSelect={onSelect}
        >
          <div className="border-t p-4" style={{ borderColor: borderCol }}>
            <div
              className="rounded-2xl border border-dashed p-5 text-center"
              style={{
                borderColor: `${primary}55`,
                background: `${primary}14`,
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
                className="mt-3 rounded-full px-5 py-2 text-sm font-medium text-white"
                style={{ background: primary }}
              >
                Подтвердить участие
              </button>
            </div>
          </div>
        </Selectable>
      )}

      {rest
        .filter((b) => b.type === "schedule")
        .map((block) => (
          <Selectable
            key={block.id}
            block={block}
            selected={selectedId === block.id}
            onSelect={onSelect}
          >
            <div className="border-t px-4 py-7" style={{ borderColor: borderCol }}>
              <h3
                className="mb-5 text-center font-heading text-lg"
                style={{ fontFamily: `"${config.fonts.heading}", serif` }}
              >
                Программа дня
              </h3>
              <div className="flex flex-wrap items-start justify-center gap-3">
                {((block.data.items as ScheduleItem[]) || []).map((item, i) => (
                  <div
                    key={i}
                    className="flex w-[84px] flex-col items-center text-center"
                  >
                    <div
                      className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{
                        background: isLuxury ? "#1A1A1A" : "#F7F1EA",
                        color: accent,
                        boxShadow: isLuxury
                          ? "none"
                          : "inset 0 0 0 1px #EFE9E0",
                      }}
                    >
                      <Heart size={15} strokeWidth={1.4} />
                    </div>
                    <p className="font-heading text-sm font-semibold">
                      {item.time}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-snug opacity-60">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Selectable>
        ))}

      <div
        className={cn(
          "grid gap-2.5 border-t p-3.5",
          device === "mobile" ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
        )}
        style={{ borderColor: borderCol }}
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
                surface={surface}
                borderCol={borderCol}
              />
            </Selectable>
          ))}
      </div>

      <div
        className="border-t px-4 py-5 text-center text-xs opacity-40"
        style={{ borderColor: borderCol }}
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
        selected &&
          "z-10 ring-2 ring-[#D4A39C] ring-offset-2 ring-offset-[#F3EEE6]",
        className
      )}
    >
      {selected && (
        <div className="absolute -top-2.5 left-3 z-20 flex items-center gap-1 rounded-full bg-[#D4A39C] px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
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
  surface,
  borderCol,
}: {
  block: InvitationBlock;
  isLuxury: boolean;
  accent: string;
  headingFont: string;
  surface: string;
  borderCol: string;
}) {
  const label = BLOCK_LABELS[block.type].label;
  const cardStyle = {
    background: surface,
    border: `1px solid ${borderCol}`,
  };

  if (block.type === "story") {
    return (
      <div className="h-full rounded-2xl p-4" style={cardStyle}>
        <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
          <BlockIcon type="story" size={15} />
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
          <Shirt size={15} strokeWidth={1.4} />
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
          <BlockIcon type="faq" size={15} />
          <span className="font-heading text-sm">{label}</span>
        </div>
        <div className="space-y-1.5">
          {items.slice(0, 2).map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs opacity-70"
              style={{
                background: isLuxury
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
              }}
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
          <Music size={15} strokeWidth={1.4} />
          <span className="font-heading text-sm">{label}</span>
        </div>
        <p className="text-xs opacity-70">
          {String(block.data.trackName || "Фоновая музыка")}
        </p>
      </div>
    );
  }

  if (block.type === "seating") {
    return (
      <div className="h-full rounded-2xl p-4" style={cardStyle}>
        <span
          className="font-heading text-sm"
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {String(block.data.title || label)}
        </span>
        <p className="mt-1 line-clamp-2 text-xs opacity-70">
          {String(block.data.text || "")}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5 opacity-60">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className="flex h-8 w-8 items-center justify-center rounded-full border text-[10px]"
              style={{ borderColor: `${accent}66`, color: accent }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl p-4" style={cardStyle}>
      <div className="mb-2 flex items-center gap-2" style={{ color: accent }}>
        <BlockIcon type={block.type} size={15} />
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
