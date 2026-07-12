"use client";

import { LiveCanvas } from "@/components/editor/LiveCanvas";
import { SettingsPanel } from "@/components/editor/SettingsPanel";
import { BlockIcon } from "@/components/editor/blockIcons";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { BLOCK_LABELS } from "@/lib/editor-meta";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  Eye,
  LayoutTemplate,
  Monitor,
  Share2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type Device = "desktop" | "tablet" | "mobile";
type RightTab = "block" | "style" | "settings";

export default function EditorPage() {
  const locale = useLocale();
  const invitation = useAppStore((s) => s.invitation);
  const toggleBlock = useAppStore((s) => s.toggleBlock);
  const updateConfig = useAppStore((s) => s.updateConfig);
  const updateBlockData = useAppStore((s) => s.updateBlockData);
  const moveBlock = useAppStore((s) => s.moveBlock);
  const reorderBlocks = useAppStore((s) => s.reorderBlocks);
  const publishInvitation = useAppStore((s) => s.publishInvitation);

  const [selectedId, setSelectedId] = useState<string | null>("b-hero");
  const [device, setDevice] = useState<Device>("desktop");
  const [rightTab, setRightTab] = useState<RightTab>("block");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("saved");
  const [lastSaved, setLastSaved] = useState(() => new Date());
  const [publishedFlash, setPublishedFlash] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"blocks" | "canvas" | "settings">(
    "canvas"
  );

  // Autosave feedback when invitation changes
  useEffect(() => {
    if (!invitation) return;
    setSaveState("saving");
    const t = setTimeout(() => {
      setSaveState("saved");
      setLastSaved(new Date());
    }, 600);
    return () => clearTimeout(t);
  }, [invitation]);

  // Ensure new blocks exist for users with old persisted store
  useEffect(() => {
    if (!invitation) return;
    const types = new Set(invitation.config.blocks.map((b) => b.type));
    const missing: Array<{
      id: string;
      type: (typeof invitation.config.blocks)[0]["type"];
      enabled: boolean;
      order: number;
      data: Record<string, unknown>;
    }> = [];
    if (!types.has("music")) {
      missing.push({
        id: "b-music",
        type: "music",
        enabled: true,
        order: 11,
        data: {
          title: "Музыка",
          text: "Поделитесь треками для нашего плейлиста",
          trackName: invitation.config.music?.trackName || "Фоновая музыка",
        },
      });
    }
    if (!types.has("afterparty")) {
      missing.push({
        id: "b-afterparty",
        type: "afterparty",
        enabled: false,
        order: 12,
        data: {
          title: "После свадьбы",
          text: "After party / brunch на следующий день",
        },
      });
    }
    if (!types.has("seating")) {
      missing.push({
        id: "b-seating",
        type: "seating",
        enabled: false,
        order: 13,
        data: {
          title: "Рассадка",
          text: "Схема рассадки появится ближе к дате",
        },
      });
    }
    if (!types.has("payment")) {
      missing.push({
        id: "b-payment",
        type: "payment",
        enabled: false,
        order: 14,
        data: {
          title: "Оплата",
          text: "Поддержите наш праздник",
          recipient: "",
        },
      });
    }
    if (missing.length) {
      updateConfig({
        ...invitation.config,
        blocks: [...invitation.config.blocks, ...missing],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedBlock = useMemo(() => {
    if (!invitation || !selectedId) return null;
    return invitation.config.blocks.find((b) => b.id === selectedId) ?? null;
  }, [invitation, selectedId]);

  const selectBlock = useCallback((id: string) => {
    setSelectedId(id);
    setRightTab("block");
    setRightOpen(true);
    setMobilePanel("settings");
  }, []);

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setLastSaved(new Date());
    }, 400);
  };

  const handlePublish = () => {
    publishInvitation();
    setPublishedFlash(true);
    setTimeout(() => setPublishedFlash(false), 2500);
  };

  const inviteUrl =
    typeof window !== "undefined" && invitation
      ? `${window.location.origin}/${locale}/invite/${invitation.slug}`
      : invitation
        ? `/${locale}/invite/${invitation.slug}`
        : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  if (!invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#8a8580]">
        Загрузка конструктора…
      </div>
    );
  }

  const { config } = invitation;
  const sortedBlocks = [...config.blocks].sort((a, b) => a.order - b.order);
  const savedLabel =
    saveState === "saving"
      ? "Сохранение…"
      : saveState === "saved"
        ? `Сохранено ${formatRelative(lastSaved)}`
        : "Не сохранено";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F3EEE6]">
      {/* TOP BAR — ref 02 */}
      <header className="z-30 flex h-[3.5rem] shrink-0 items-center justify-between gap-2 border-b border-[#EDE7DD] bg-white px-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[#8a8580] hover:bg-[#FAF7F2] hover:text-charcoal"
            title="В кабинет"
          >
            <Undo2 size={15} strokeWidth={1.5} />
            <span className="hidden text-xs sm:inline">Кабинет</span>
          </Link>
          <div className="hidden h-4 w-px bg-[#EDE7DD] sm:block" />
          <Logo href={`/${locale}`} size="sm" className="hidden sm:inline-flex" />
          <Link
            href={`/${locale}/templates`}
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-[#8a8580] hover:bg-[#FAF7F2] md:flex"
          >
            <LayoutTemplate size={13} strokeWidth={1.5} />
            Шаблоны
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1.5 text-[11px] text-[#8a8580] lg:flex">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                saveState === "saving"
                  ? "animate-pulse bg-[#D4A537]"
                  : "bg-[#A7B8A1]"
              )}
            />
            Автосохранение: {savedLabel}
          </div>

          <div className="flex rounded-full border border-[#EDE7DD] bg-[#FAF7F2] p-0.5">
            {(
              [
                { id: "desktop" as const, icon: Monitor },
                { id: "tablet" as const, icon: Tablet },
                { id: "mobile" as const, icon: Smartphone },
              ] as const
            ).map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDevice(d.id)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    device === d.id
                      ? "bg-white text-charcoal shadow-sm"
                      : "text-[#8a8580] hover:text-charcoal"
                  )}
                  title={d.id}
                >
                  <Icon size={14} strokeWidth={1.5} />
                </button>
              );
            })}
          </div>

          <Link
            href={`/${locale}/invite/${invitation.slug}`}
            target="_blank"
            className="hidden sm:block"
          >
            <Button variant="ghost" size="sm">
              <Eye size={14} strokeWidth={1.5} />
              <span className="hidden md:inline">Предпросмотр</span>
            </Button>
          </Link>
          <Button variant="secondary" size="sm" onClick={handleSave}>
            {saveState === "saving" ? "…" : "Сохранить"}
          </Button>
          <Button size="sm" onClick={handlePublish}>
            {publishedFlash ? (
              <>
                <Check size={14} /> Опубликовано
              </>
            ) : (
              "Опубликовать"
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setShareOpen(true)}
          >
            <Share2 size={14} strokeWidth={1.5} />
            <span className="hidden lg:inline">Поделиться</span>
          </Button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex min-h-0 flex-1">
        {/* LEFT: block palette */}
        <aside
          className={cn(
            "hidden shrink-0 flex-col border-r border-[#EDE7DD] bg-white transition-all lg:flex",
            leftOpen ? "w-[13.5rem]" : "w-11"
          )}
        >
          <div className="flex items-center justify-between border-b border-[#EDE7DD] px-3 py-3">
            {leftOpen && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8580]">
                  Блоки
                </h3>
                <p className="mt-0.5 text-[10px] text-[#a39e97]">
                  Перетащите блок на страницу
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => setLeftOpen((v) => !v)}
              className="rounded-full p-1.5 text-[#8a8580] hover:bg-[#FAF7F2]"
            >
              {leftOpen ? "«" : "»"}
            </button>
          </div>
          {leftOpen && (
            <div className="flex-1 overflow-y-auto p-2.5">
              <div className="grid grid-cols-2 gap-1.5">
                {sortedBlocks.map((block) => {
                  const meta = BLOCK_LABELS[block.type];
                  const active = selectedId === block.id;
                  return (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => {
                        if (!block.enabled) toggleBlock(block.id);
                        selectBlock(block.id);
                      }}
                      onDoubleClick={() => toggleBlock(block.id)}
                      className={cn(
                        "group relative flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all",
                        active
                          ? "border-[#E8A09A]/50 bg-[#F8E8E8] shadow-sm"
                          : block.enabled
                            ? "border-[#EDE7DD] bg-[#FAF7F2] hover:border-[#E8A09A]/40"
                            : "border-dashed border-[#EDE7DD] bg-white opacity-55 hover:opacity-90"
                      )}
                      title="Клик — выбрать, двойной клик — вкл/выкл"
                    >
                      <span
                        className={cn(
                          "transition-colors",
                          active || block.enabled
                            ? "text-[#D4A537]"
                            : "text-[#a39e97]"
                        )}
                      >
                        <BlockIcon type={block.type} size={18} />
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium leading-tight",
                          active ? "text-[#E8A09A]" : "text-charcoal"
                        )}
                      >
                        {meta.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[10px] leading-relaxed text-[#a39e97]">
                Нужен уникальный блок?
                <br />
                <span className="text-[#E8A09A]">Скоро · запросите</span>
              </p>
            </div>
          )}
        </aside>

        {/* CENTER: canvas */}
        <div
          className={cn(
            "min-w-0 flex-1 overflow-y-auto",
            mobilePanel !== "canvas" && "hidden lg:block"
          )}
        >
          <div className="min-h-full bg-[radial-gradient(ellipse_at_top,#F8E8E8_0%,#F3EEE6_45%,#E8EDE5_100%)] px-3 py-6 sm:px-6 lg:py-8">
            <div className="mb-4 flex items-center justify-center">
              <span className="rounded-full border border-white/70 bg-white/85 px-3.5 py-1 text-[11px] text-[#8a8580] shadow-sm backdrop-blur">
                Клик по блоку → редактирование справа
              </span>
            </div>
            <LiveCanvas
              config={config}
              selectedId={selectedId}
              onSelect={selectBlock}
              device={device}
            />
            <p className="mt-6 text-center text-[11px] text-[#a39e97]">
              Изменения сохраняются автоматически ·{" "}
              {invitation.published ? (
                <span className="text-[#A7B8A1]">Опубликовано</span>
              ) : (
                <span className="text-[#D4A537]">Черновик</span>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT: settings */}
        <aside
          className={cn(
            "hidden shrink-0 border-l border-[#EDE7DD] bg-white transition-all xl:flex xl:flex-col",
            rightOpen ? "w-[18.5rem]" : "w-11"
          )}
        >
          {rightOpen ? (
            <SettingsPanel
              tab={rightTab}
              setTab={setRightTab}
              config={config}
              selectedBlock={selectedBlock}
              onUpdateConfig={updateConfig}
              onUpdateBlock={updateBlockData}
              onToggle={toggleBlock}
              onMove={moveBlock}
              onReorder={reorderBlocks}
              onSelectBlock={selectBlock}
            />
          ) : (
            <button
              type="button"
              onClick={() => setRightOpen(true)}
              className="p-3 text-[#8a8580] hover:text-charcoal"
            >
              «
            </button>
          )}
        </aside>

        {/* Mobile panels */}
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col overflow-hidden lg:hidden",
            mobilePanel === "canvas" && "hidden"
          )}
        >
          {mobilePanel === "blocks" && (
            <div className="flex-1 overflow-y-auto bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-charcoal">Блоки</h3>
              <div className="grid grid-cols-3 gap-2">
                {sortedBlocks.map((block) => (
                  <button
                    key={block.id}
                    type="button"
                    onClick={() => {
                      if (!block.enabled) toggleBlock(block.id);
                      selectBlock(block.id);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-2xl border p-3",
                      selectedId === block.id
                        ? "border-[#E8A09A] bg-[#F8E8E8]"
                        : "border-[#EDE7DD] bg-[#FAF7F2]"
                    )}
                  >
                    <BlockIcon type={block.type} size={18} className="text-[#D4A537]" />
                    <span className="text-[10px] font-medium">
                      {BLOCK_LABELS[block.type].label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {mobilePanel === "settings" && (
            <div className="flex-1 overflow-hidden bg-white">
              <SettingsPanel
                tab={rightTab}
                setTab={setRightTab}
                config={config}
                selectedBlock={selectedBlock}
                onUpdateConfig={updateConfig}
                onUpdateBlock={updateBlockData}
                onToggle={toggleBlock}
                onMove={moveBlock}
                onReorder={reorderBlocks}
                onSelectBlock={selectBlock}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="flex shrink-0 border-t border-[#EDE7DD] bg-white lg:hidden">
        {(
          [
            { id: "blocks" as const, label: "Блоки" },
            { id: "canvas" as const, label: "Превью" },
            { id: "settings" as const, label: "Правка" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobilePanel(tab.id)}
            className={cn(
              "flex-1 py-3 text-xs font-medium",
              mobilePanel === tab.id ? "text-[#E8A09A]" : "text-[#8a8580]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Share modal */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 p-4 backdrop-blur-sm"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-[#EDE7DD] bg-white p-6 shadow-soft-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-xl text-charcoal">
              Поделиться приглашением
            </h3>
            <p className="mt-1 text-sm text-[#8a8580]">
              Отправьте ссылку гостям — ответы появятся в кабинете.
            </p>
            <div className="mt-4 break-all rounded-2xl bg-[#FAF7F2]/60 px-3 py-2.5 font-mono text-xs text-charcoal">
              {inviteUrl}
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={copyLink}>
                {copied ? (
                  <>
                    <Check size={14} /> Скопировано
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Копировать
                  </>
                )}
              </Button>
              <Link href={`/${locale}/invite/${invitation.slug}`} target="_blank">
                <Button variant="secondary">
                  <Eye size={14} /> Открыть
                </Button>
              </Link>
            </div>
            <button
              type="button"
              className="mt-4 w-full text-center text-sm text-[#8a8580] hover:text-charcoal"
              onClick={() => setShareOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatRelative(date: Date) {
  const sec = Math.round((Date.now() - date.getTime()) / 1000);
  if (sec < 5) return "только что";
  if (sec < 60) return `${sec} сек. назад`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин. назад`;
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
