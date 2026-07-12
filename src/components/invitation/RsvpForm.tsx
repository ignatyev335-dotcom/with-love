"use client";

import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { rsvpConfirmationEmail, sendEmail } from "@/lib/email";
import { useAppStore } from "@/lib/store";
import type { RsvpStatus } from "@/types";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

export function RsvpForm({ deadline }: { deadline?: string }) {
  const t = useTranslations("invite");
  const submitRsvp = useAppStore((s) => s.submitRsvp);
  const wedding = useAppStore((s) => s.wedding);
  const [status, setStatus] = useState<RsvpStatus>("confirmed");
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [comment, setComment] = useState("");
  const [dietary, setDietary] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    submitRsvp({
      name: name.trim(),
      status,
      plusOnes: Math.max(0, count - 1),
      message: comment || undefined,
      dietary: dietary || undefined,
    });
    const mail = rsvpConfirmationEmail({
      guestName: name.trim(),
      coupleNames: wedding?.coupleNames || "With Love",
      status,
      date: wedding?.date
        ? new Date(wedding.date).toLocaleDateString("ru-RU")
        : "",
    });
    void sendEmail({
      to: "guest@example.com",
      subject: mail.subject,
      html: mail.html,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-sage/40 bg-light-sage/40 p-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-soft">
          ❤️
        </div>
        <p className="font-heading text-xl text-charcoal">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border/80 bg-white p-6 shadow-card sm:p-8"
    >
      <h3 className="text-center font-heading text-xl text-charcoal sm:text-2xl">
        {t("rsvpTitle")}
      </h3>
      {deadline && (
        <p className="mt-2 text-center text-sm text-muted">
          Ответьте до{" "}
          {new Date(deadline).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium text-charcoal">
            {t("willYouCome")}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {(
              [
                { value: "confirmed" as const, label: t("yes") },
                { value: "declined" as const, label: t("no") },
                { value: "maybe" as const, label: t("maybe") },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`rounded-2xl border px-3 py-3 text-sm transition-all ${
                  status === opt.value
                    ? "border-blush bg-soft-pink text-blush font-medium"
                    : "border-border bg-ivory text-muted hover:border-blush/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {status !== "declined" && (
          <div>
            <p className="mb-2 text-sm font-medium text-charcoal">
              {t("guestsCount")}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition-all ${
                    count === n
                      ? "border-blush bg-blush text-white"
                      : "border-border bg-white text-muted hover:border-blush/30"
                  }`}
                >
                  {n === 4 ? "4+" : n}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm text-muted">{t("yourName")}</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={t("yourName")}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-muted">{t("comment")}</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="..."
            rows={3}
          />
        </div>

        {status === "confirmed" && (
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              {t("dietary")}
            </label>
            <Input
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="Вегетарианское, аллергии..."
            />
          </div>
        )}

        <Button type="submit" className="w-full" size="lg">
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
