"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PLANS } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import type { PlanTier } from "@/types";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Pricing({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";
  const user = useAppStore((s) => s.user);
  const router = useRouter();

  const selectPlan = (planId: PlanTier) => {
    if (!user) {
      router.push(`/${locale}/register?plan=${planId}`);
      return;
    }
    if (planId === "free") {
      router.push(`/${locale}/dashboard`);
      return;
    }
    router.push(`/${locale}/checkout?plan=${planId}`);
  };

  return (
    <section id="pricing" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 text-center font-heading text-3xl text-charcoal sm:text-4xl">
          {t("pricingTitle")}
        </h2>
        <p className="mb-10 text-center text-sm text-muted">
          {isEn
            ? "Freemium + one-time payments. No subscription required."
            : "Freemium + разовые платежи. Без обязательной подписки."}
        </p>
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border bg-white p-5 shadow-card ${
                plan.popular
                  ? "border-blush/40 shadow-soft-lg ring-1 ring-blush/20 lg:-mt-2 lg:mb-0"
                  : "border-border/80"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="blush">{t("popular")}</Badge>
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-heading text-xl text-charcoal">
                  {isEn ? plan.nameEn : plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-heading text-3xl text-charcoal">
                    {plan.price === 0
                      ? isEn
                        ? "Free"
                        : "0 ₽"
                      : formatPrice(plan.price, isEn ? "en-US" : "ru-RU")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {plan.guestLimit}{" "}
                  {isEn ? "guests max" : "гостей макс."}
                </p>
              </div>
              <ul className="mb-5 flex-1 space-y-2">
                {(isEn ? plan.featuresEn : plan.features).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-muted sm:text-sm"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-sage" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "primary" : "secondary"}
                className="w-full"
                onClick={() => selectPlan(plan.id)}
              >
                {plan.price === 0
                  ? isEn
                    ? "Start free"
                    : "Начать бесплатно"
                  : t("selectPlan")}
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          {isEn ? (
            <>
              Premium templates sold separately.{" "}
              <Link href={`/${locale}/templates`} className="text-blush hover:underline">
                Browse templates
              </Link>
            </>
          ) : (
            <>
              Премиум-шаблоны — разовой оплатой.{" "}
              <Link href={`/${locale}/templates`} className="text-blush hover:underline">
                Смотреть шаблоны
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
