"use client";

import { Countdown } from "@/components/invitation/Countdown";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import type { BlockType } from "@/types";
import {
  BookOpen,
  Car,
  Clock,
  CreditCard,
  Eye,
  Gift,
  Heart,
  HelpCircle,
  ImageIcon,
  MapPin,
  Music,
  Palette,
  Settings2,
  Shirt,
  Users,
  Wand2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BLOCK_META: Record<
  BlockType,
  { label: string; icon: React.ReactNode }
> = {
  hero: { label: "Обложка", icon: <ImageIcon size={18} /> },
  countdown: { label: "Таймер", icon: <Clock size={18} /> },
  story: { label: "О нас", icon: <BookOpen size={18} /> },
  rsvp: { label: "RSVP форма", icon: <Heart size={18} /> },
  schedule: { label: "Программа", icon: <Clock size={18} /> },
  transfer: { label: "Трансфер", icon: <Car size={18} /> },
  location: { label: "Карта", icon: <MapPin size={18} /> },
  wishes: { label: "Пожелания", icon: <Gift size={18} /> },
  dresscode: { label: "Дресс-код", icon: <Shirt size={18} /> },
  faq: { label: "FAQ", icon: <HelpCircle size={18} /> },
  gifts: { label: "Подарки", icon: <Gift size={18} /> },
  music: { label: "Музыка", icon: <Music size={18} /> },
  afterparty: { label: "После свадьбы", icon: <Wand2 size={18} /> },
  seating: { label: "Рассадка", icon: <Users size={18} /> },
  payment: { label: "Оплата", icon: <CreditCard size={18} /> },
};

const PALETTE = ["#F76E62", "#C98B88", "#D4A537", "#A7B8A1", "#282B2B", "#FAF7F2"];

export default function EditorPage() {
  const t = useTranslations("editor");
  const tc = useTranslations("common");
  const locale = useLocale();
  const invitation = useAppStore((s) => s.invitation);
  const toggleBlock = useAppStore((s) => s.toggleBlock);
  const publishInvitation = useAppStore((s) => s.publishInvitation);
  const updateConfig = useAppStore((s) => s.updateConfig);
  const [tab, setTab] = useState<"settings" | "style">("settings");
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);

  if (!invitation) return null;

  const { config } = invitation;
  const hero = config.blocks.find((b) => b.type === "hero");
  const heroData = (hero?.data ?? {}) as {
    partner1?: string;
    partner2?: string;
    date?: string;
    tagline?: string;
    image?: string;
  };
  const countdown = config.blocks.find((b) => b.type === "countdown");
  const location = config.blocks.find((b) => b.type === "location");
  const transfer = config.blocks.find((b) => b.type === "transfer");
  const rsvp = config.blocks.find((b) => b.type === "rsvp");

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const publish = () => {
    publishInvitation();
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] flex-col lg:-m-8 lg:h-[calc(100vh-4rem)]">
      {/* top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-white px-3 lg:px-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="hidden sm:inline">{t("autosave")}:</span>
          <span className="text-sage">{saved ? t("saved") : "2 мин. назад"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/invite/${invitation.slug}`} target="_blank">
            <Button variant="ghost" size="sm">
              <Eye size={14} />
              <span className="hidden sm:inline">{tc("preview")}</span>
            </Button>
          </Link>
          <Button variant="secondary" size="sm" onClick={save}>
            {tc("save")}
          </Button>
          <Button size="sm" onClick={publish}>
            {published ? t("publishSuccess") : tc("publish")}
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* left: blocks palette */}
        <aside className="hidden w-52 shrink-0 overflow-y-auto border-r border-border/60 bg-white p-3 lg:block">
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {t("blocks")}
          </h3>
          <p className="mb-3 px-1 text-[11px] text-muted">{t("addBlock")}</p>
          <div className="grid grid-cols-2 gap-2">
            {config.blocks.map((block) => {
              const meta = BLOCK_META[block.type];
              return (
                <button
                  key={block.id}
                  onClick={() => toggleBlock(block.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                    block.enabled
                      ? "border-blush/30 bg-soft-pink/50 text-blush"
                      : "border-border bg-ivory text-muted opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="text-gold">{meta.icon}</span>
                  <span className="text-[10px] font-medium leading-tight">
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* center: preview */}
        <div className="flex-1 overflow-y-auto bg-warm-beige/40 p-3 lg:p-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border/80 bg-ivory shadow-soft-lg">
            {/* hero preview */}
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
                {heroData.image && (
                  <Image
                    src={heroData.image}
                    alt="Cover"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-6 text-center md:p-8">
                <h2 className="font-heading text-2xl text-charcoal sm:text-3xl">
                  {heroData.partner1}
                  <br />
                  <span className="text-blush">&</span> {heroData.partner2}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {heroData.date
                    ? new Date(heroData.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
                <p className="mt-1 font-heading italic text-gold">
                  {heroData.tagline}
                </p>
                <Button size="sm" className="mx-auto mt-4">
                  Подтвердить участие
                </Button>
              </div>
            </div>

            {/* info cards */}
            <div className="grid gap-3 border-t border-border/50 p-4 sm:grid-cols-3">
              {countdown?.enabled && (
                <div className="rounded-2xl border border-border/60 bg-white p-4 text-center">
                  <p className="mb-2 text-xs font-medium text-muted">
                    Таймер до свадьбы
                  </p>
                  <Countdown
                    targetDate={
                      (countdown.data.targetDate as string) ||
                      "2025-06-20T15:00:00"
                    }
                    compact
                  />
                </div>
              )}
              {location?.enabled && (
                <div className="rounded-2xl border border-border/60 bg-white p-4">
                  <p className="mb-1 flex items-center gap-1 text-xs font-medium text-muted">
                    <MapPin size={12} className="text-gold" /> Адрес торжества
                  </p>
                  <p className="text-sm font-medium text-charcoal">
                    {String(location.data.name ?? "")}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {String(location.data.address ?? "")}
                  </p>
                </div>
              )}
              {transfer?.enabled && (
                <div className="rounded-2xl border border-border/60 bg-white p-4">
                  <p className="mb-1 flex items-center gap-1 text-xs font-medium text-muted">
                    <Car size={12} className="text-gold" /> Трансфер
                  </p>
                  <p className="text-xs leading-relaxed text-muted">
                    {String(transfer.data.text ?? "")}
                  </p>
                </div>
              )}
            </div>

            {rsvp?.enabled && (
              <div className="border-t border-border/50 p-4">
                <div className="rounded-2xl border border-dashed border-blush/30 bg-soft-pink/30 p-5 text-center">
                  <p className="text-sm font-medium text-charcoal">
                    {String(rsvp.data.title ?? "Подтвердите присутствие")}
                  </p>
                  <Button size="sm" className="mt-3">
                    Подтвердить участие
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-3 border-t border-border/50 p-4 sm:grid-cols-3">
              {config.blocks
                .filter(
                  (b) =>
                    b.enabled &&
                    !["hero", "countdown", "location", "transfer", "rsvp"].includes(
                      b.type
                    )
                )
                .slice(0, 6)
                .map((b) => (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-border/60 bg-white p-4"
                  >
                    <div className="mb-2 text-gold">
                      {BLOCK_META[b.type]?.icon}
                    </div>
                    <p className="text-sm font-medium text-charcoal">
                      {BLOCK_META[b.type]?.label}
                    </p>
                    <p className="mt-1 text-xs text-muted">Блок активен</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* right: settings */}
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-l border-border/60 bg-white p-4 xl:block">
          <div className="mb-4 flex gap-1 rounded-xl bg-warm-beige p-1">
            <button
              onClick={() => setTab("settings")}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium ${
                tab === "settings" ? "bg-white text-charcoal shadow-soft" : "text-muted"
              }`}
            >
              <Settings2 size={12} /> {t("settings")}
            </button>
            <button
              onClick={() => setTab("style")}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium ${
                tab === "style" ? "bg-white text-charcoal shadow-soft" : "text-muted"
              }`}
            >
              <Palette size={12} /> {t("style")}
            </button>
          </div>

          {tab === "settings" && (
            <div className="space-y-5">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {t("general")}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="rounded-xl bg-warm-beige/50 px-3 py-2">
                    <span className="text-xs text-muted">Шрифт заголовков</span>
                    <p className="font-medium">{config.fonts.heading}</p>
                  </div>
                  <div className="rounded-xl bg-warm-beige/50 px-3 py-2">
                    <span className="text-xs text-muted">Шрифт текста</span>
                    <p className="font-medium">{config.fonts.body}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {t("visibility")}
                </h4>
                <div className="space-y-1.5">
                  {config.blocks.map((b) => (
                    <label
                      key={b.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-1.5 hover:bg-warm-beige/50"
                    >
                      <span className="text-xs text-charcoal">
                        {BLOCK_META[b.type]?.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={b.enabled}
                        onChange={() => toggleBlock(b.id)}
                        className="accent-blush"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {t("music")}
                </h4>
                <div className="rounded-xl bg-warm-beige/50 px-3 py-2 text-xs">
                  <p className="font-medium text-charcoal">
                    {config.music?.trackName || "Трек не выбран"}
                  </p>
                  <label className="mt-2 flex items-center justify-between">
                    <span className="text-muted">Автовоспроизведение</span>
                    <input
                      type="checkbox"
                      checked={config.music?.autoplay ?? false}
                      onChange={(e) =>
                        updateConfig({
                          ...config,
                          music: {
                            enabled: true,
                            trackName: config.music?.trackName,
                            trackUrl: config.music?.trackUrl,
                            autoplay: e.target.checked,
                          },
                        })
                      }
                      className="accent-blush"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {tab === "style" && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {t("colors")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      updateConfig({
                        ...config,
                        colors: { ...config.colors, primary: c },
                      })
                    }
                    className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      config.colors.primary === c
                        ? "border-charcoal scale-110"
                        : "border-transparent"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="rounded-xl bg-warm-beige/50 p-3 text-xs text-muted">
                Тема: <span className="font-medium text-charcoal">{config.theme}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
