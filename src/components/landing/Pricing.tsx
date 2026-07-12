"use client";

import { Button } from "@/components/ui/Button";
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

  const plans = PLANS.filter((p) => p.id !== "basic");

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
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
            {isEn ? "Pricing" : "Тарифы"}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-[#1C1917] sm:text-4xl">
            {isEn ? "Start free. Upgrade once." : "Начните бесплатно. Апгрейд — разово."}
          </h2>
          <p className="mt-3 text-[15px] text-[#6B6560]">
            {isEn
              ? "No monthly fees. Pay only when you need more guests or a premium look."
              : "Без ежемесячных платежей. Платите, когда нужны больше гостей или премиум-вид."}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {plans.map((plan) => {
            const popular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[1.75rem] border p-7 transition ${
                  popular
                    ? "border-[#1C1917] bg-[#1C1917] text-white shadow-2xl md:-translate-y-3"
                    : "border-[#EDE8E1] bg-[#FAF8F5] hover:border-[#D4C5A8]/60 hover:shadow-md"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#B8956C] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
                    {t("popular")}
                  </span>
                )}
                <h3
                  className={`font-heading text-xl ${
                    popular ? "text-white" : "text-[#1C1917]"
                  }`}
                >
                  {isEn ? plan.nameEn : plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`font-heading text-4xl tracking-tight ${
                      popular ? "text-white" : "text-[#1C1917]"
                    }`}
                  >
                    {plan.price === 0
                      ? isEn
                        ? "Free"
                        : "0 ₽"
                      : formatPrice(plan.price, isEn ? "en-US" : "ru-RU")}
                  </span>
                </div>
                <p
                  className={`mt-1.5 text-xs ${
                    popular ? "text-white/55" : "text-[#9C948C]"
                  }`}
                >
                  {plan.guestLimit} {isEn ? "guests max" : "гостей макс."}
                  {plan.price > 0 && (isEn ? " · one-time" : " · разово")}
                </p>
                <ul className="my-7 flex-1 space-y-2.5">
                  {(isEn ? plan.featuresEn : plan.features).map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-sm ${
                        popular ? "text-white/80" : "text-[#6B6560]"
                      }`}
                    >
                      <Check
                        size={15}
                        className={
                          popular
                            ? "mt-0.5 shrink-0 text-[#B8956C]"
                            : "mt-0.5 shrink-0 text-emerald-600"
                        }
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full ${
                    popular
                      ? "bg-white text-[#1C1917] hover:bg-white/90"
                      : "bg-[#1C1917] text-white hover:bg-[#2d2926]"
                  }`}
                  onClick={() => selectPlan(plan.id)}
                >
                  {plan.price === 0
                    ? isEn
                      ? "Start free"
                      : "Начать бесплатно"
                    : t("selectPlan")}
                </Button>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-[#9C948C]">
          {isEn ? (
            <>
              Premium templates available separately.{" "}
              <Link href={`/${locale}/templates`} className="underline underline-offset-2">
                Browse gallery
              </Link>
            </>
          ) : (
            <>
              Премиум-шаблоны — отдельно.{" "}
              <Link href={`/${locale}/templates`} className="underline underline-offset-2">
                Смотреть галерею
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
