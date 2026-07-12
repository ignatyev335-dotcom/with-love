"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Wand2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, key: "dashboard" as const },
  { href: "/dashboard/guests", icon: Users, key: "guests" as const },
  { href: "/dashboard/editor", icon: Wand2, key: "editor" as const },
  { href: "/dashboard/analytics", icon: BarChart3, key: "analytics" as const },
  { href: "/dashboard/settings", icon: Settings, key: "settings" as const },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);

  useEffect(() => {
    if (user === null) {
      // wait for hydration
      const unsub = useAppStore.persist.onFinishHydration(() => {
        if (!useAppStore.getState().user) {
          router.replace(`/${locale}/login`);
        }
      });
      if (useAppStore.persist.hasHydrated() && !user) {
        router.replace(`/${locale}/login`);
      }
      return unsub;
    }
  }, [user, locale, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-muted">
        {tc("loading")}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border/60 bg-white lg:flex">
        <div className="flex h-16 items-center px-5">
          <Logo href={`/${locale}`} size="sm" />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map((l) => {
            const href = `/${locale}${l.href}`;
            const active =
              l.href === "/dashboard"
                ? pathname === href
                : pathname.startsWith(href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-soft-pink text-blush font-medium"
                    : "text-muted hover:bg-warm-beige hover:text-charcoal"
                )}
              >
                <Icon size={18} />
                {t(l.key)}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/60 p-4">
          <div className="mb-3 flex items-center gap-3">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-pink text-sm font-medium text-blush">
                {user.name[0]}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-charcoal">
                {user.name}
              </p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted"
            onClick={() => {
              logout();
              router.push(`/${locale}`);
            }}
          >
            <LogOut size={16} />
            {tc("logout")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border/60 bg-white/80 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Logo href={`/${locale}`} size="sm" />
          </div>
          <div className="hidden text-sm text-muted lg:block">
            {user.name} · {user.plan}
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/${locale}/dashboard/editor`}>
              <Button size="sm">{t("editor")}</Button>
            </Link>
          </div>
        </header>

        {/* mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-border/60 bg-white px-2 py-2 lg:hidden">
          {links.map((l) => {
            const href = `/${locale}${l.href}`;
            const active =
              l.href === "/dashboard"
                ? pathname === href
                : pathname.startsWith(href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs",
                  active ? "bg-soft-pink text-blush" : "text-muted"
                )}
              >
                <Icon size={14} />
                {t(l.key)}
              </Link>
            );
          })}
        </div>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
