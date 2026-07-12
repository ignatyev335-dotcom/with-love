"use client";

import { Button } from "@/components/ui/Button";
import { LANDING_FAQ } from "@/lib/seed";
import { cn } from "@/lib/utils";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function FAQ({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-8 font-heading text-3xl text-charcoal sm:text-4xl">
              {t("faqTitle")}
            </h2>
            <div className="space-y-3">
              {LANDING_FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/80 bg-white shadow-card"
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="text-sm font-medium text-charcoal sm:text-base">
                        {isEn ? item.qEn : item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "shrink-0 text-muted transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted">
                        {isEn ? item.aEn : item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-soft-pink/60 to-warm-beige p-6 shadow-card lg:sticky lg:top-24">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blush shadow-soft">
                <MessageCircle size={22} />
              </div>
              <h3 className="font-heading text-xl text-charcoal">
                {t("faqContact")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t("faqContactHint")}
              </p>
              <Button className="mt-5 w-full" variant="primary">
                {t("faqContactCta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
