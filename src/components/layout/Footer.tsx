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
        {
          href: `/${locale}/invite/aleksandr-ekaterina`,
          label: isEn ? "Live demo" : "Демо",
        },
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
    <footer className="border-t border-[#EDE8E1] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo href={`/${locale}`} />
            <p className="max-w-xs text-sm leading-relaxed text-[#6B6560]">
              {t("tagline")}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#6B6560] transition hover:text-[#1C1917]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#F0EBE3] pt-8 text-xs text-[#9C948C] sm:flex-row">
          <p>
            © {year} With Love. {t("rights")}
          </p>
          <p>
            {isEn
              ? "Wedding RSVP sites, done right"
              : "Свадебные RSVP-сайты без лишнего"}
          </p>
        </div>
      </div>
    </footer>
  );
}
