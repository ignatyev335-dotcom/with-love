"use client";

import { Logo } from "@/components/Logo";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const isEn = locale === "en";

  const cols = [
    {
      title: t("service"),
      links: [
        { href: `/${locale}#features`, label: isEn ? "Features" : "Возможности" },
        { href: `/${locale}/templates`, label: isEn ? "Templates" : "Шаблоны" },
        { href: `/${locale}/pricing`, label: isEn ? "Pricing" : "Тарифы" },
      ],
    },
    {
      title: t("help"),
      links: [
        { href: `/${locale}/faq`, label: "FAQ" },
        { href: `/${locale}/login`, label: isEn ? "Support" : "Поддержка" },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: `/${locale}`, label: t("privacy") },
        { href: `/${locale}`, label: t("terms") },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#EDE7DD] bg-[#FDFCFA]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo href={`/${locale}`} />
            <p className="max-w-xs text-sm leading-relaxed text-[#8a8580]">
              {t("tagline")}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#8a8580] transition-colors hover:text-[#E8A09A]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4A537]/35 to-transparent" />
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-[#a39e97] sm:flex-row">
          <p>
            © {year} With Love. {t("rights")}
          </p>
          <p className="flex items-center gap-1">
            {isEn ? "Made with" : "Сделано с"}{" "}
            <span className="text-[#E8A09A]">♥</span>{" "}
            {isEn ? "for beautiful weddings" : "к красивым свадьбам"}
          </p>
        </div>
      </div>
    </footer>
  );
}
