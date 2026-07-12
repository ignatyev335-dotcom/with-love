"use client";

import { Logo } from "@/components/Logo";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("service"),
      links: [
        { href: `/${locale}#features`, label: "Возможности" },
        { href: `/${locale}/templates`, label: "Шаблоны" },
        { href: `/${locale}/pricing`, label: "Тарифы" },
      ],
    },
    {
      title: t("help"),
      links: [
        { href: `/${locale}#faq`, label: "FAQ" },
        { href: `/${locale}/login`, label: "Поддержка" },
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
    <footer className="border-t border-border/60 bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo href={`/${locale}`} />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-charcoal">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-blush"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gold-line my-8" />
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>
            © {year} With Love. {t("rights")}
          </p>
          <p className="flex items-center gap-1">
            Сделано с <span className="text-blush">♥</span> к красивым свадьбам
          </p>
        </div>
      </div>
    </footer>
  );
}
