"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import type { RsvpStatus } from "@/types";
import { Plus, Search, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const statusVariant: Record<RsvpStatus, "success" | "danger" | "warning" | "muted"> = {
  confirmed: "success",
  declined: "danger",
  pending: "muted",
  maybe: "warning",
};

export default function GuestsPage() {
  const t = useTranslations("guests");
  const guests = useAppStore((s) => s.guests);
  const addGuest = useAppStore((s) => s.addGuest);
  const updateGuest = useAppStore((s) => s.updateGuest);
  const removeGuest = useAppStore((s) => s.removeGuest);
  const wedding = useAppStore((s) => s.wedding);

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<RsvpStatus | "all">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      if (filter !== "all" && g.status !== filter) return false;
      if (q && !g.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [guests, filter, q]);

  const statusLabel = (s: RsvpStatus) => {
    const map = {
      confirmed: t("confirmed"),
      declined: t("declined"),
      pending: t("pending"),
      maybe: t("maybe"),
    };
    return map[s];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {guests.length} гостей · {filtered.length} показано
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus size={16} />
          {t("add")}
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <Input
            className="pl-10"
            placeholder={t("name")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as RsvpStatus | "all")}
          className="h-11 rounded-2xl border border-border bg-white px-4 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-blush/25"
        >
          <option value="all">{t("filterAll")}</option>
          <option value="confirmed">{t("confirmed")}</option>
          <option value="declined">{t("declined")}</option>
          <option value="pending">{t("pending")}</option>
          <option value="maybe">{t("maybe")}</option>
        </select>
      </div>

      {showAdd && (
        <div className="flex flex-col gap-2 rounded-3xl border border-border bg-white p-4 shadow-card sm:flex-row">
          <Input
            placeholder={t("name")}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={() => {
              if (!newName.trim() || !wedding) return;
              addGuest({
                weddingId: wedding.id,
                name: newName.trim(),
                status: "pending",
                plusOnes: 0,
                children: 0,
              });
              setNewName("");
              setShowAdd(false);
            }}
          >
            {t("add")}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>
            Отмена
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-warm-beige/40 text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-medium">{t("name")}</th>
                <th className="px-4 py-3 font-medium">{t("status")}</th>
                <th className="px-4 py-3 font-medium">{t("plusOnes")}</th>
                <th className="px-4 py-3 font-medium">{t("table")}</th>
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
                    <select
                      value={g.status}
                      onChange={(e) =>
                        updateGuest(g.id, {
                          status: e.target.value as RsvpStatus,
                          respondedAt: new Date().toISOString(),
                        })
                      }
                      className="rounded-xl border-0 bg-transparent text-sm focus:outline-none"
                    >
                      <option value="confirmed">{t("confirmed")}</option>
                      <option value="declined">{t("declined")}</option>
                      <option value="pending">{t("pending")}</option>
                      <option value="maybe">{t("maybe")}</option>
                    </select>
                    <Badge variant={statusVariant[g.status]} className="ml-1">
                      {statusLabel(g.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{g.plusOnes}</td>
                  <td className="px-4 py-3 text-muted">{g.table || "—"}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-muted">
                    {g.message || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeGuest(g.id)}
                      className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
