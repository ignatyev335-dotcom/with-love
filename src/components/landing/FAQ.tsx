"use client";

import { GoldLine } from "@/components/decor/Floral";
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
    <section id="faq" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-heading text-3xl font-medium text-charcoal sm:text-4xl">
              {t("faqTitle")}
            </h2>
            <GoldLine className="mt-4 mb-8" />
            <div className="space-y-2.5">
              {LANDING_FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    className="rounded-[1.1rem] border border-[#EDE7DD] bg-[#FDFCFA] shadow-sm"
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="text-sm font-medium text-charcoal sm:text-[15px]">
                        {isEn ? item.qEn : item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "shrink-0 text-[#a39e97] transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#EDE7DD] px-5 py-4 text-sm leading-relaxed text-[#8a8580]">
                        {isEn ? item.aEn : item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-[1.5rem] border border-[#EDE7DD] bg-gradient-to-br from-[#F8E8E8]/80 via-[#FDF9F3] to-[#E8EDE5]/50 p-6 shadow-sm lg:sticky lg:top-24">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#E8A09A] shadow-sm">
                <MessageCircle size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl text-charcoal">
                {t("faqContact")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                {t("faqContactHint")}
              </p>
              <Button className="mt-5 w-full">{t("faqContactCta")}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
