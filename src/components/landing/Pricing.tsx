"use client";

import { GoldLine } from "@/components/decor/Floral";
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

  // Show free + 3 paid like ref (4 cards is ok, but ref has 3 paid - show all 4 with free smaller)
  const plans = PLANS;

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
    <section id="pricing" className="bg-[#FDFCFA] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-heading text-3xl font-medium text-charcoal sm:text-4xl">
            {t("pricingTitle")}
          </h2>
          <GoldLine className="mt-4" />
          <p className="mt-3 text-sm text-[#8a8580]">
            {isEn
              ? "Freemium + one-time payments"
              : "Freemium + разовые платежи"}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-[1.25rem] border bg-white p-5 transition-shadow ${
                plan.popular
                  ? "border-[#E8A09A]/40 shadow-[0_12px_40px_-12px_rgba(232,160,154,0.35)] ring-1 ring-[#E8A09A]/20 lg:-translate-y-1"
                  : "border-[#EDE7DD] shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    variant="blush"
                    className="rounded-full bg-[#E8A09A] px-3 text-white"
                  >
                    {t("popular")}
                  </Badge>
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
              </div>
              <ul className="mb-5 flex-1 space-y-2">
                {(isEn ? plan.featuresEn : plan.features).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-[#8a8580] sm:text-[13px]"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-[#A7B8A1]"
                      strokeWidth={2}
                    />
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
        <p className="mt-8 text-center text-xs text-[#a39e97]">
          {isEn ? (
            <>
              Premium templates sold separately.{" "}
              <Link
                href={`/${locale}/templates`}
                className="text-[#E8A09A] hover:underline"
              >
                Browse templates
              </Link>
            </>
          ) : (
            <>
              Премиум-шаблоны — разовой оплатой.{" "}
              <Link
                href={`/${locale}/templates`}
                className="text-[#E8A09A] hover:underline"
              >
                Смотреть шаблоны
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
