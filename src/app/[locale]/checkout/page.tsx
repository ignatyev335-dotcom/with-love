"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PLANS } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import type { PlanTier } from "@/types";
import { Check, CreditCard, Shield } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function CheckoutInner() {
  const locale = useLocale();
  const isEn = locale === "en";
  const router = useRouter();
  const params = useSearchParams();
  const planId = (params.get("plan") || "premium") as PlanTier;
  const user = useAppStore((s) => s.user);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const plan = useMemo(
    () => PLANS.find((p) => p.id === planId) || PLANS.find((p) => p.id === "premium")!,
    [planId]
  );

  const pay = () => {
    if (!user) {
      router.push(`/${locale}/login?next=/checkout?plan=${plan.id}`);
      return;
    }
    setLoading(true);
    // Mock Stripe Checkout — swap for real Stripe session later
    setTimeout(() => {
      const store = useAppStore.getState();
      if (store.user) {
        useAppStore.setState({
          user: { ...store.user, plan: plan.id },
        });
      }
      if (store.invitation && (plan.id === "premium" || plan.id === "lux")) {
        store.updateInvitation({ watermark: false });
      }
      setLoading(false);
      setDone(true);
    }, 1400);
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-soft-pink/30 via-ivory to-light-sage/20 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-4 pt-8 pb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-light-sage text-2xl">
              ✓
            </div>
            <h1 className="font-heading text-2xl text-charcoal">
              {isEn ? "Payment successful" : "Оплата прошла успешно"}
            </h1>
            <p className="text-sm text-muted">
              {isEn
                ? `Plan «${plan.nameEn}» is active on your account.`
                : `Тариф «${plan.name}» активирован на вашем аккаунте.`}
            </p>
            <p className="text-xs text-muted">
              {isEn
                ? "(Demo mode — Stripe integration pending)"
                : "(Демо-режим — интеграция Stripe впереди)"}
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link href={`/${locale}/dashboard`}>
                <Button className="w-full">
                  {isEn ? "Open dashboard" : "В кабинет"}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/editor`}>
                <Button variant="secondary" className="w-full">
                  {isEn ? "Open builder" : "В конструктор"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/30 via-ivory to-light-sage/20 px-4 py-10">
      <div className="mx-auto mb-8 flex max-w-3xl items-center justify-between">
        <Logo href={`/${locale}`} />
        <Link
          href={`/${locale}/pricing`}
          className="text-sm text-muted hover:text-charcoal"
        >
          ← {isEn ? "Back to pricing" : "К тарифам"}
        </Link>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <h1 className="font-heading text-2xl text-charcoal">
              {isEn ? "Checkout" : "Оформление"}
            </h1>
            <p className="text-sm text-muted">
              {isEn
                ? "One-time payment. No recurring subscription."
                : "Разовый платёж. Без рекуррентной подписки."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-warm-beige/40 p-4">
              <CreditCard className="text-gold" size={22} />
              <div>
                <p className="text-sm font-medium text-charcoal">
                  {isEn ? "Card payment (demo)" : "Оплата картой (демо)"}
                </p>
                <p className="text-xs text-muted">
                  Visa · Mastercard · Mir · Stripe-ready
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted">
              {isEn
                ? "In production this page creates a Stripe Checkout Session and redirects to Stripe. For now the payment is simulated."
                : "В продакшене здесь создаётся Stripe Checkout Session. Сейчас оплата симулируется."}
            </div>
            <Button
              className="w-full"
              size="lg"
              disabled={loading}
              onClick={pay}
            >
              {loading
                ? isEn
                  ? "Processing…"
                  : "Обработка…"
                : isEn
                  ? `Pay ${formatPrice(plan.price, "en-US")}`
                  : `Оплатить ${formatPrice(plan.price)}`}
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
              <Shield size={12} />{" "}
              {isEn
                ? "Secure payment · encrypted"
                : "Безопасная оплата · шифрование"}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-heading text-lg">
              {isEn ? plan.nameEn : plan.name}
            </h2>
            <p className="font-heading text-2xl text-charcoal">
              {formatPrice(plan.price, isEn ? "en-US" : "ru-RU")}
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(isEn ? plan.featuresEn : plan.features).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <Check size={14} className="mt-0.5 shrink-0 text-sage" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-ivory text-muted">
          …
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
