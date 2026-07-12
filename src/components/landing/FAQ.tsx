"use client";

import { Button } from "@/components/ui/Button";
import { LANDING_FAQ } from "@/lib/seed";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function FAQ({ locale }: { locale: string }) {
  const t = useTranslations("landing");
  const isEn = locale === "en";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956C]">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl text-[#1C1917] sm:text-4xl">
            {t("faqTitle")}
          </h2>
        </div>

        <div className="space-y-2.5">
          {LANDING_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border bg-white transition",
                  isOpen
                    ? "border-[#D4C5A8]/80 shadow-sm"
                    : "border-[#EDE8E1]"
                )}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-[#1C1917] sm:text-[15px]">
                    {isEn ? item.qEn : item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-[#9C948C] transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[#F0EBE3] px-5 py-4 text-sm leading-relaxed text-[#6B6560]">
                    {isEn ? item.aEn : item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-[#EDE8E1] bg-white p-8 text-center sm:p-10">
          <h3 className="font-heading text-xl text-[#1C1917] sm:text-2xl">
            {t("faqContact")}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[#6B6560]">
            {t("faqContactHint")}
          </p>
          <Link href={`/${locale}/register`}>
            <Button className="mt-5 rounded-full bg-[#1C1917] px-7 text-white hover:bg-[#2d2926]">
              {isEn ? "Create free invitation" : "Создать бесплатно"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
