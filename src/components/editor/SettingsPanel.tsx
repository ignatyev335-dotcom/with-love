"use client";

import { BlockIcon } from "@/components/editor/blockIcons";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import {
  BODY_FONTS,
  COLOR_SWATCHES,
  COVER_PRESETS,
  HEADING_FONTS,
  MUSIC_LIBRARY,
  SPACING_OPTIONS,
  THEME_PRESETS,
  BLOCK_LABELS,
} from "@/lib/editor-meta";
import type { InvitationBlock, InvitationConfig, ScheduleItem } from "@/types";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";

type Tab = "block" | "style" | "settings";

export function SettingsPanel({
  tab,
  setTab,
  config,
  selectedBlock,
  onUpdateConfig,
  onUpdateBlock,
  onToggle,
  onMove,
  onSelectBlock,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  config: InvitationConfig;
  selectedBlock: InvitationBlock | null;
  onUpdateConfig: (config: InvitationConfig) => void;
  onUpdateBlock: (id: string, data: Record<string, unknown>) => void;
  onToggle: (id: string) => void;
  onMove: (id: string, dir: "up" | "down") => void;
  onSelectBlock: (id: string) => void;
}) {
  const sorted = [...config.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1 border-b border-border/60 p-2">
        {(
          [
            { id: "block" as const, label: "Блок" },
            { id: "style" as const, label: "Стиль" },
            { id: "settings" as const, label: "Настройки" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-xl py-2 text-xs font-medium transition-colors ${
              tab === t.id
                ? "bg-soft-pink text-blush"
                : "text-muted hover:bg-warm-beige"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "block" && (
          <BlockTab
            block={selectedBlock}
            onUpdate={onUpdateBlock}
            onToggle={onToggle}
            emptyHint="Кликните блок на превью или в палитре слева"
          />
        )}

        {tab === "style" && (
          <StyleTab config={config} onUpdateConfig={onUpdateConfig} />
        )}

        {tab === "settings" && (
          <div className="space-y-6">
            <section>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Порядок и видимость
              </h4>
              <div className="space-y-1">
                {sorted.map((b, i) => (
                  <div
                    key={b.id}
                    className={`flex items-center gap-1 rounded-xl border px-2 py-1.5 ${
                      b.enabled
                        ? "border-border/70 bg-white"
                        : "border-transparent bg-warm-beige/40 opacity-60"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      onClick={() => onSelectBlock(b.id)}
                    >
                      <span className="text-gold">
                        <BlockIcon type={b.type} size={14} />
                      </span>
                      <span className="truncate text-xs font-medium text-charcoal">
                        {BLOCK_LABELS[b.type].label}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-muted hover:bg-warm-beige disabled:opacity-30"
                      disabled={i === 0}
                      onClick={() => onMove(b.id, "up")}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-muted hover:bg-warm-beige disabled:opacity-30"
                      disabled={i === sorted.length - 1}
                      onClick={() => onMove(b.id, "down")}
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-muted hover:bg-warm-beige"
                      onClick={() => onToggle(b.id)}
                      title={b.enabled ? "Скрыть" : "Показать"}
                    >
                      {b.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Музыка
              </h4>
              <div className="space-y-2">
                {MUSIC_LIBRARY.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() =>
                      onUpdateConfig({
                        ...config,
                        music: {
                          enabled: true,
                          trackName: track.name,
                          trackUrl: track.url,
                          autoplay: config.music?.autoplay ?? true,
                        },
                      })
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                      config.music?.trackUrl === track.url
                        ? "border-blush/40 bg-soft-pink/50 text-charcoal"
                        : "border-border bg-white text-muted hover:border-blush/20"
                    }`}
                  >
                    {track.name}
                  </button>
                ))}
                <label className="mt-2 flex items-center justify-between rounded-xl bg-warm-beige/50 px-3 py-2.5 text-xs">
                  <span className="text-charcoal">Автовоспроизведение</span>
                  <input
                    type="checkbox"
                    className="accent-blush"
                    checked={config.music?.autoplay ?? false}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        music: {
                          enabled: true,
                          trackName: config.music?.trackName,
                          trackUrl: config.music?.trackUrl,
                          autoplay: e.target.checked,
                        },
                      })
                    }
                  />
                </label>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}

function BlockTab({
  block,
  onUpdate,
  onToggle,
  emptyHint,
}: {
  block: InvitationBlock | null;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onToggle: (id: string) => void;
  emptyHint: string;
}) {
  if (!block) {
    return (
      <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-warm-beige/30 px-4 text-center">
        <p className="text-sm text-muted">{emptyHint}</p>
      </div>
    );
  }

  const set = (data: Record<string, unknown>) => onUpdate(block.id, data);
  const meta = BLOCK_LABELS[block.type];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-gold">
            <BlockIcon type={block.type} size={18} />
            <h3 className="font-heading text-lg text-charcoal">{meta.label}</h3>
          </div>
          <p className="mt-0.5 text-xs text-muted">{meta.hint}</p>
        </div>
        <button
          type="button"
          onClick={() => onToggle(block.id)}
          className={`rounded-xl px-2.5 py-1 text-[11px] font-medium ${
            block.enabled
              ? "bg-light-sage text-[#4a6344]"
              : "bg-warm-beige text-muted"
          }`}
        >
          {block.enabled ? "Включён" : "Выключен"}
        </button>
      </div>

      {block.type === "hero" && (
        <div className="space-y-3">
          <Field label="Имя 1">
            <Input
              value={String(block.data.partner1 || "")}
              onChange={(e) => set({ partner1: e.target.value })}
            />
          </Field>
          <Field label="Имя 2">
            <Input
              value={String(block.data.partner2 || "")}
              onChange={(e) => set({ partner2: e.target.value })}
            />
          </Field>
          <Field label="Дата">
            <Input
              type="date"
              value={String(block.data.date || "").slice(0, 10)}
              onChange={(e) => set({ date: e.target.value })}
            />
          </Field>
          <Field label="Слоган">
            <Input
              value={String(block.data.tagline || "")}
              onChange={(e) => set({ tagline: e.target.value })}
            />
          </Field>
          <Field label="Текст кнопки">
            <Input
              value={String(block.data.cta || "")}
              onChange={(e) => set({ cta: e.target.value })}
            />
          </Field>
          <Field label="Обложка">
            <div className="grid grid-cols-3 gap-2">
              {COVER_PRESETS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set({ image: c.url })}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${
                    block.data.image === c.url
                      ? "border-blush ring-2 ring-blush/30"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <Image src={c.url} alt={c.label} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}

      {block.type === "countdown" && (
        <Field label="Дата и время свадьбы">
          <Input
            type="datetime-local"
            value={toLocalInput(String(block.data.targetDate || ""))}
            onChange={(e) =>
              set({ targetDate: new Date(e.target.value).toISOString() })
            }
          />
        </Field>
      )}

      {block.type === "location" && (
        <div className="space-y-3">
          <Field label="Название места">
            <Input
              value={String(block.data.name || "")}
              onChange={(e) => set({ name: e.target.value })}
            />
          </Field>
          <Field label="Адрес">
            <Textarea
              value={String(block.data.address || "")}
              onChange={(e) => set({ address: e.target.value })}
              rows={3}
            />
          </Field>
          <Field label="Ссылка на карту">
            <Input
              value={String(block.data.mapUrl || "")}
              onChange={(e) => set({ mapUrl: e.target.value })}
              placeholder="https://yandex.ru/maps/..."
            />
          </Field>
        </div>
      )}

      {block.type === "transfer" && (
        <Field label="Текст о трансфере">
          <Textarea
            value={String(block.data.text || "")}
            onChange={(e) => set({ text: e.target.value })}
            rows={4}
          />
        </Field>
      )}

      {block.type === "story" && (
        <div className="space-y-3">
          <Field label="Заголовок">
            <Input
              value={String(block.data.title || "")}
              onChange={(e) => set({ title: e.target.value })}
            />
          </Field>
          <Field label="Текст истории">
            <Textarea
              value={String(block.data.text || "")}
              onChange={(e) => set({ text: e.target.value })}
              rows={5}
            />
          </Field>
          <Field label="Фото">
            <div className="grid grid-cols-3 gap-2">
              {COVER_PRESETS.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set({ image: c.url })}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                    block.data.image === c.url
                      ? "border-blush"
                      : "border-transparent"
                  }`}
                >
                  <Image src={c.url} alt="" fill className="object-cover" sizes="60px" />
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}

      {block.type === "rsvp" && (
        <div className="space-y-3">
          <Field label="Заголовок формы">
            <Input
              value={String(block.data.title || "")}
              onChange={(e) => set({ title: e.target.value })}
            />
          </Field>
          <Field label="Дедлайн ответа">
            <Input
              type="date"
              value={String(block.data.deadline || "").slice(0, 10)}
              onChange={(e) => set({ deadline: e.target.value })}
            />
          </Field>
        </div>
      )}

      {block.type === "dresscode" && (
        <div className="space-y-3">
          <Field label="Описание">
            <Textarea
              value={String(block.data.text || "")}
              onChange={(e) => set({ text: e.target.value })}
              rows={4}
            />
          </Field>
          <Field label="Палитра цветов">
            <div className="flex flex-wrap gap-2">
              {COLOR_SWATCHES.map((c) => {
                const colors = (block.data.colors as string[]) || [];
                const active = colors.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      const next = active
                        ? colors.filter((x) => x !== c)
                        : [...colors, c].slice(0, 6);
                      set({ colors: next });
                    }}
                    className={`h-8 w-8 rounded-full border-2 ${
                      active ? "border-charcoal scale-110" : "border-transparent"
                    }`}
                    style={{ background: c }}
                  />
                );
              })}
            </div>
          </Field>
        </div>
      )}

      {block.type === "schedule" && (
        <ScheduleEditor
          items={(block.data.items as ScheduleItem[]) || []}
          onChange={(items) => set({ items })}
        />
      )}

      {block.type === "faq" && (
        <FaqEditor
          items={
            (block.data.items as { question: string; answer: string }[]) || []
          }
          onChange={(items) => set({ items })}
        />
      )}

      {(block.type === "wishes" ||
        block.type === "gifts" ||
        block.type === "afterparty" ||
        block.type === "seating" ||
        block.type === "payment" ||
        block.type === "music") && (
        <div className="space-y-3">
          <Field label="Заголовок">
            <Input
              value={String(block.data.title || meta.label)}
              onChange={(e) => set({ title: e.target.value })}
            />
          </Field>
          <Field label="Текст">
            <Textarea
              value={String(block.data.text || "")}
              onChange={(e) => set({ text: e.target.value })}
              rows={4}
            />
          </Field>
          {block.type === "music" && (
            <Field label="Название трека">
              <Input
                value={String(block.data.trackName || "")}
                onChange={(e) => set({ trackName: e.target.value })}
              />
            </Field>
          )}
          {block.type === "payment" && (
            <Field label="Получатель">
              <Input
                value={String(block.data.recipient || "")}
                onChange={(e) => set({ recipient: e.target.value })}
              />
            </Field>
          )}
        </div>
      )}
    </div>
  );
}

function ScheduleEditor({
  items,
  onChange,
}: {
  items: ScheduleItem[];
  onChange: (items: ScheduleItem[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
          События
        </h4>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() =>
            onChange([...items, { time: "00:00", title: "Новое событие" }])
          }
        >
          <Plus size={14} /> Добавить
        </Button>
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-2 rounded-xl border border-border bg-white p-2"
        >
          <Input
            className="h-9 w-20 shrink-0 px-2 text-xs"
            value={item.time}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, time: e.target.value };
              onChange(next);
            }}
          />
          <Input
            className="h-9 flex-1 px-2 text-xs"
            value={item.title}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, title: e.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function FaqEditor({
  items,
  onChange,
}: {
  items: { question: string; answer: string }[];
  onChange: (items: { question: string; answer: string }[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Вопросы
        </h4>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() =>
            onChange([...items, { question: "Новый вопрос?", answer: "" }])
          }
        >
          <Plus size={14} /> Добавить
        </Button>
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className="space-y-1.5 rounded-xl border border-border bg-white p-2.5"
        >
          <Input
            className="h-9 text-xs"
            value={item.question}
            placeholder="Вопрос"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, question: e.target.value };
              onChange(next);
            }}
          />
          <Textarea
            className="min-h-[60px] text-xs"
            value={item.answer}
            placeholder="Ответ"
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, answer: e.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="text-[11px] text-red-500 hover:underline"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

function StyleTab({
  config,
  onUpdateConfig,
}: {
  config: InvitationConfig;
  onUpdateConfig: (c: InvitationConfig) => void;
}) {
  return (
    <div className="space-y-6">
      <section>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Тема
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() =>
                onUpdateConfig({
                  ...config,
                  theme: theme.id,
                  colors: theme.colors,
                })
              }
              className={`rounded-2xl border p-3 text-left transition-all ${
                config.theme === theme.id
                  ? "border-blush bg-soft-pink/40 ring-1 ring-blush/30"
                  : "border-border bg-white hover:border-blush/30"
              }`}
            >
              <div className="mb-2 flex gap-1">
                {[theme.colors.primary, theme.colors.accent, theme.colors.background].map(
                  (c) => (
                    <span
                      key={c}
                      className="h-4 w-4 rounded-full border border-black/5"
                      style={{ background: c }}
                    />
                  )
                )}
              </div>
              <p className="text-xs font-medium text-charcoal">{theme.name}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Шрифты
        </h4>
        <Field label="Заголовки">
          <select
            className="h-11 w-full rounded-2xl border border-border bg-white px-3 text-sm"
            value={config.fonts.heading}
            onChange={(e) =>
              onUpdateConfig({
                ...config,
                fonts: { ...config.fonts, heading: e.target.value },
              })
            }
          >
            {HEADING_FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>
        <div className="mt-3">
          <Field label="Основной текст">
            <select
              className="h-11 w-full rounded-2xl border border-border bg-white px-3 text-sm"
              value={config.fonts.body}
              onChange={(e) =>
                onUpdateConfig({
                  ...config,
                  fonts: { ...config.fonts, body: e.target.value },
                })
              }
            >
              {BODY_FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Цветовая палитра
        </h4>
        <p className="mb-2 text-[11px] text-muted">Акцентный цвет</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                onUpdateConfig({
                  ...config,
                  colors: { ...config.colors, primary: c },
                })
              }
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                config.colors.primary === c
                  ? "scale-110 border-charcoal"
                  : "border-transparent"
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="mb-2 mt-4 text-[11px] text-muted">Золото / вторичный</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={`a-${c}`}
              type="button"
              onClick={() =>
                onUpdateConfig({
                  ...config,
                  colors: { ...config.colors, accent: c },
                })
              }
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                config.colors.accent === c
                  ? "scale-110 border-charcoal"
                  : "border-transparent"
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Отступы
        </h4>
        <div className="flex gap-2">
          {SPACING_OPTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="flex-1 rounded-xl border border-border bg-white py-2 text-[11px] font-medium text-charcoal hover:border-blush/40"
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function toLocalInput(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

