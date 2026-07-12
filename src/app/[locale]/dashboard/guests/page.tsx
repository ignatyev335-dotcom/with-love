"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import type { RsvpStatus } from "@/types";
import { Download, Plus, Search, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const statusVariant: Record<
  RsvpStatus,
  "success" | "danger" | "warning" | "muted"
> = {
  confirmed: "success",
  declined: "danger",
  pending: "muted",
  maybe: "warning",
};

export default function GuestsPage() {
  const t = useTranslations("guests");
  const locale = useLocale();
  const guests = useAppStore((s) => s.guests);
  const addGuest = useAppStore((s) => s.addGuest);
  const updateGuest = useAppStore((s) => s.updateGuest);
  const removeGuest = useAppStore((s) => s.removeGuest);
  const wedding = useAppStore((s) => s.wedding);

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<RsvpStatus | "all">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      if (filter !== "all" && g.status !== filter) return false;
      if (
        q &&
        !g.name.toLowerCase().includes(q.toLowerCase()) &&
        !(g.email || "").toLowerCase().includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [guests, filter, q]);

  const counts = useMemo(
    () => ({
      all: guests.length,
      confirmed: guests.filter((g) => g.status === "confirmed").length,
      declined: guests.filter((g) => g.status === "declined").length,
      pending: guests.filter(
        (g) => g.status === "pending" || g.status === "maybe"
      ).length,
    }),
    [guests]
  );

  const statusLabel = (s: RsvpStatus) => {
    const map = {
      confirmed: t("confirmed"),
      declined: t("declined"),
      pending: t("pending"),
      maybe: t("maybe"),
    };
    return map[s];
  };

  const exportCsv = () => {
    const header = [
      "name",
      "email",
      "status",
      "plus_ones",
      "children",
      "table",
      "dietary",
      "message",
      "responded_at",
    ];
    const rows = guests.map((g) =>
      [
        g.name,
        g.email || "",
        g.status,
        g.plusOnes,
        g.children,
        g.table || "",
        g.dietary || "",
        (g.message || "").replace(/"/g, '""'),
        g.respondedAt || "",
      ]
        .map((v) => `"${v}"`)
        .join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guests-${wedding?.coupleNames || "wedding"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {counts.all} · ✓ {counts.confirmed} · ✕ {counts.declined} · ?{" "}
            {counts.pending}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={exportCsv}>
            <Download size={16} />
            {t("export")}
          </Button>
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <Plus size={16} />
            {t("add")}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "all" as const, label: t("filterAll"), n: counts.all },
            {
              id: "confirmed" as const,
              label: t("confirmed"),
              n: counts.confirmed,
            },
            {
              id: "declined" as const,
              label: t("declined"),
              n: counts.declined,
            },
            { id: "pending" as const, label: t("pending"), n: counts.pending },
          ] as const
        ).map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() =>
              setFilter(chip.id === "pending" ? "pending" : chip.id)
            }
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === chip.id ||
              (chip.id === "pending" &&
                (filter === "pending" || filter === "maybe"))
                ? "bg-blush text-white"
                : "border border-border bg-white text-muted hover:border-blush/30"
            }`}
          >
            {chip.label} ({chip.n})
          </button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <Input
          className="pl-10"
          placeholder={
            locale === "en" ? "Search by name or email" : "Поиск по имени или email"
          }
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {showAdd && (
        <div className="flex flex-col gap-2 rounded-3xl border border-border bg-white p-4 shadow-card sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-muted">{t("name")}</label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t("name")}
            />
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-muted">Email</label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <Button
            size="sm"
            onClick={() => {
              if (!newName.trim() || !wedding) return;
              addGuest({
                weddingId: wedding.id,
                name: newName.trim(),
                email: newEmail.trim() || undefined,
                status: "pending",
                plusOnes: 0,
                children: 0,
              });
              setNewName("");
              setNewEmail("");
              setShowAdd(false);
            }}
          >
            {t("add")}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>
            {locale === "en" ? "Cancel" : "Отмена"}
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-warm-beige/40 text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-medium">{t("name")}</th>
                <th className="px-4 py-3 font-medium">{t("status")}</th>
                <th className="px-4 py-3 font-medium">{t("plusOnes")}</th>
                <th className="px-4 py-3 font-medium">{t("table")}</th>
                <th className="px-4 py-3 font-medium">
                  {locale === "en" ? "Dietary" : "Меню"}
                </th>
                <th className="px-4 py-3 font-medium">{t("message")}</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr
                  key={g.id}
                  className="border-b border-border/40 last:border-0 hover:bg-warm-beige/20"
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {g.name}
                    {g.email && (
                      <span className="mt-0.5 block text-xs font-normal text-muted">
                        {g.email}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <select
                        value={g.status}
                        onChange={(e) =>
                          updateGuest(g.id, {
                            status: e.target.value as RsvpStatus,
                            respondedAt: new Date().toISOString(),
                          })
                        }
                        className="rounded-xl border border-border bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blush/25"
                      >
                        <option value="confirmed">{t("confirmed")}</option>
                        <option value="declined">{t("declined")}</option>
                        <option value="pending">{t("pending")}</option>
                        <option value="maybe">{t("maybe")}</option>
                      </select>
                      <Badge variant={statusVariant[g.status]} className="w-fit">
                        {statusLabel(g.status)}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={g.plusOnes}
                      onChange={(e) =>
                        updateGuest(g.id, {
                          plusOnes: Number(e.target.value) || 0,
                        })
                      }
                      className="w-14 rounded-lg border border-border px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={g.table || ""}
                      onChange={(e) =>
                        updateGuest(g.id, { table: e.target.value })
                      }
                      placeholder="—"
                      className="w-24 rounded-lg border border-border px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="max-w-[120px] truncate px-4 py-3 text-muted">
                    {g.dietary || "—"}
                  </td>
                  <td className="max-w-[180px] truncate px-4 py-3 text-muted">
                    {g.message || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeGuest(g.id)}
                      className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-muted"
                  >
                    {locale === "en" ? "No guests found" : "Гости не найдены"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
