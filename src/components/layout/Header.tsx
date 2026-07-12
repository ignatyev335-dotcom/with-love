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
    { href: `/${locale}#faq`, label: t("nav.faq") },
  ];

  const switchLocale = () => {
    const next = locale === "ru" ? "en" : "ru";
    const rest = pathname.replace(/^\/(ru|en)/, "") || "";
    router.push(`/${next}${rest}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo href={`/${locale}`} />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={switchLocale}
            className="flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-sm text-muted hover:bg-warm-beige hover:text-charcoal"
            aria-label="Switch language"
          >
            <Globe size={15} />
            {locale.toUpperCase()}
          </button>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href={`/${locale}/admin`}>
                  <Button variant="ghost" size="sm">
                    {t("nav.admin")}
                  </Button>
                </Link>
              )}
              <Link href={`/${locale}/dashboard`}>
                <Button variant="secondary" size="sm">
                  {t("nav.dashboard")}
                </Button>
              </Link>
            </>
          ) : (
            <Link href={`/${locale}/login`}>
              <Button variant="ghost" size="sm">
                {t("common.login")}
              </Button>
            </Link>
          )}
          <Link href={user ? `/${locale}/dashboard/editor` : `/${locale}/register`}>
            <Button size="sm">{t("common.createInvitation")}</Button>
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-warm-beige md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border/60 bg-ivory md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-charcoal hover:bg-warm-beige"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted"
            >
              <Globe size={15} /> {locale === "ru" ? "English" : "Русский"}
            </button>
            {!user && (
              <Link href={`/${locale}/login`} onClick={() => setOpen(false)}>
                <Button variant="secondary" className="w-full">
                  {t("common.login")}
                </Button>
              </Link>
            )}
            <Link
              href={user ? `/${locale}/dashboard/editor` : `/${locale}/register`}
              onClick={() => setOpen(false)}
            >
              <Button className="w-full">{t("common.createInvitation")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
