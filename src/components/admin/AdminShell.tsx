"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CreditCard,
  FileText,
  HeadphonesIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  { href: "/admin/users", icon: Users, label: "Пользователи" },
  { href: "/admin/invitations", icon: FileText, label: "Приглашения" },
  { href: "/admin/payments", icon: CreditCard, label: "Платежи" },
  { href: "/admin/templates", icon: FileText, label: "Шаблоны" },
  { href: "/admin/support", icon: HeadphonesIcon, label: "Поддержка" },
  { href: "/admin/analytics", icon: BarChart3, label: "Аналитика" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);

  useEffect(() => {
    const check = () => {
      const u = useAppStore.getState().user;
      if (!u || u.role !== "admin") {
        router.replace(`/${locale}/login`);
      }
    };
    if (useAppStore.persist.hasHydrated()) check();
    return useAppStore.persist.onFinishHydration(check);
  }, [locale, router]);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-muted">
        {tc("loading")}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border/60 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2 px-4">
          <Logo href={`/${locale}/admin`} size="sm" />
          <span className="rounded-md bg-soft-pink px-1.5 py-0.5 text-[10px] font-semibold uppercase text-blush">
            Admin
          </span>
        </div>
        <nav className="flex-1 space-y-0.5 px-2 py-3">
          {links.map((l) => {
            const href = `/${locale}${l.href}`;
            const active =
              l.href === "/admin"
                ? pathname === href
                : pathname.startsWith(href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-soft-pink font-medium text-blush"
                    : "text-muted hover:bg-warm-beige hover:text-charcoal"
                )}
              >
                <Icon size={16} />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/60 p-3">
          <div className="mb-2 flex items-center gap-2 px-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="text-[10px] text-muted">Администратор</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              logout();
              router.push(`/${locale}`);
            }}
          >
            <LogOut size={14} />
            {tc("logout")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border/60 bg-white px-4 lg:px-6">
          <div className="lg:hidden">
            <Logo href={`/${locale}/admin`} size="sm" />
          </div>
          <p className="hidden text-sm text-muted lg:block">
            Панель управления платформой
          </p>
          <Link href={`/${locale}`}>
            <Button variant="ghost" size="sm">
              На сайт
            </Button>
          </Link>
        </header>
        <div className="flex gap-1 overflow-x-auto border-b border-border/60 bg-white px-2 py-2 lg:hidden">
          {links.slice(0, 5).map((l) => {
            const href = `/${locale}${l.href}`;
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={href}
                className="flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted hover:bg-warm-beige"
              >
                <Icon size={12} />
                {l.label}
              </Link>
            );
          })}
        </div>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
