"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PLANS } from "@/lib/seed";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Pricing({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";

  return (
    <section id="pricing" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-heading text-3xl text-charcoal sm:text-4xl">
          {t("pricingTitle")}
        </h2>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-card ${
                plan.popular
                  ? "border-blush/40 shadow-soft-lg ring-1 ring-blush/20"
                  : "border-border/80"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="blush">{t("popular")}</Badge>
                </div>
              )}
              <div className="mb-5">
                <h3 className="font-heading text-xl text-charcoal">
                  {isEn ? plan.nameEn : plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-heading text-3xl text-charcoal">
                    {formatPrice(plan.price, isEn ? "en-US" : "ru-RU")}
                  </span>
                </div>
              </div>
              <ul className="mb-6 flex-1 space-y-2.5">
                {(isEn ? plan.featuresEn : plan.features).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-sage" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/register`} className="mt-auto">
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  {t("selectPlan")}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
