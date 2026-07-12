"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Globe, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const [open, setOpen] = useState(false);

  const nav = [
    { href: `/${locale}#features`, label: t("nav.features") },
    { href: `/${locale}/templates`, label: t("nav.templates") },
    { href: `/${locale}/pricing`, label: t("nav.pricing") },
    { href: `/${locale}/faq`, label: t("nav.faq") },
  ];

  const switchLocale = () => {
    const next = locale === "ru" ? "en" : "ru";
    const rest = pathname.replace(/^\/(ru|en)/, "") || "";
    router.push(`/${next}${rest}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#EDE7DD]/80 bg-[#FDFCFA]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo href={`/${locale}`} />

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-wide text-[#8a8580] transition-colors hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <button
            onClick={switchLocale}
            className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs text-[#8a8580] hover:bg-[#FAF7F2] hover:text-charcoal"
            aria-label="Switch language"
          >
            <Globe size={14} strokeWidth={1.5} />
            {locale.toUpperCase()}
          </button>
          {user ? (
            <Link href={`/${locale}/dashboard`}>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-[13px]"
              >
                {t("nav.dashboard")}
              </Button>
            </Link>
          ) : (
            <Link href={`/${locale}/login`}>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-[13px] text-[#8a8580]"
              >
                {t("common.login")}
              </Button>
            </Link>
          )}
          <Link
            href={user ? `/${locale}/dashboard/editor` : `/${locale}/register`}
          >
            <Button
              size="sm"
              className="rounded-full bg-[#E8A09A] px-5 text-[13px] shadow-none hover:bg-[#d9928c]"
            >
              {t("common.createInvitation")}
            </Button>
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#FAF7F2] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-[#EDE7DD] bg-[#FDFCFA] md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-charcoal hover:bg-[#FAF7F2]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-[#EDE7DD] pt-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-[#8a8580]"
            >
              <Globe size={15} /> {locale === "ru" ? "English" : "Русский"}
            </button>
            {!user && (
              <Link href={`/${locale}/login`} onClick={() => setOpen(false)}>
                <Button variant="secondary" className="w-full rounded-full">
                  {t("common.login")}
                </Button>
              </Link>
            )}
            <Link
              href={user ? `/${locale}/dashboard/editor` : `/${locale}/register`}
              onClick={() => setOpen(false)}
            >
              <Button className="w-full rounded-full bg-[#E8A09A] hover:bg-[#d9928c]">
                {t("common.createInvitation")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
