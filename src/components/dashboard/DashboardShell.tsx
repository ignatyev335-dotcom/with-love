"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  LogOut,
  Search,
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
  const wedding = useAppStore((s) => s.wedding);

  useEffect(() => {
    if (user === null) {
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
      <div className="flex min-h-screen items-center justify-center bg-[#FDFCFA] text-[#8a8580]">
        {tc("loading")}
      </div>
    );
  }

  const isEditor = pathname.includes("/dashboard/editor");
  if (isEditor) {
    return <div className="min-h-screen bg-[#F5F0E8]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      {/* Sidebar */}
      <aside className="hidden w-[15.5rem] shrink-0 flex-col border-r border-[#EDE7DD] bg-white lg:flex">
        <div className="flex h-[4.25rem] items-center px-5">
          <Logo href={`/${locale}`} size="sm" />
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-3">
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
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] transition-colors",
                  active
                    ? "bg-[#F8E8E8] font-medium text-[#E8A09A]"
                    : "text-[#8a8580] hover:bg-[#FAF7F2] hover:text-charcoal"
                )}
              >
                <Icon size={17} strokeWidth={1.6} />
                {t(l.key)}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#EDE7DD] p-4">
          <div className="mb-3 flex items-center gap-3">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#F8E8E8]"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8E8E8] text-sm font-medium text-[#E8A09A]">
                {user.name[0]}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-charcoal">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-[#a39e97]">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[#8a8580]"
            onClick={() => {
              logout();
              router.push(`/${locale}`);
            }}
          >
            <LogOut size={15} strokeWidth={1.5} />
            {tc("logout")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar like ref 04 */}
        <header className="flex h-[4.25rem] items-center justify-between gap-3 border-b border-[#EDE7DD] bg-white/90 px-4 backdrop-blur lg:px-8">
          <div className="flex min-w-0 items-center gap-3 lg:hidden">
            <Logo href={`/${locale}`} size="sm" />
          </div>
          <div className="hidden min-w-0 flex-1 items-center gap-6 lg:flex">
            <nav className="flex items-center gap-5 text-[13px] text-[#8a8580]">
              <Link
                href={`/${locale}/dashboard`}
                className="font-medium text-charcoal"
              >
                {locale === "en" ? "Event" : "Мероприятие"}
              </Link>
              <Link
                href={`/${locale}/dashboard/guests`}
                className="hover:text-charcoal"
              >
                {t("guests")}
              </Link>
              <Link
                href={`/${locale}/dashboard/analytics`}
                className="hover:text-charcoal"
              >
                {t("analytics")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-[#8a8580] hover:bg-[#FAF7F2] sm:flex"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#8a8580] hover:bg-[#FAF7F2]"
            >
              <Bell size={16} strokeWidth={1.5} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#E8A09A]" />
            </button>
            <div className="hidden items-center gap-2 pl-1 sm:flex">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : null}
              <div className="text-right">
                <p className="text-xs font-medium text-charcoal">{user.name}</p>
                <p className="text-[10px] text-[#a39e97]">
                  {locale === "en" ? "Organizer" : "Организатор"}
                </p>
              </div>
            </div>
            <Link href={`/${locale}/dashboard/editor`}>
              <Button size="sm" className="ml-1">
                {t("editor")}
              </Button>
            </Link>
          </div>
        </header>

        {/* Role chips */}
        <div className="hidden border-b border-[#EDE7DD] bg-white px-8 py-2.5 lg:block">
          <div className="flex flex-wrap items-center gap-2">
            {(
              locale === "en"
                ? ["Organizer", "Coordinator", "Host", "Venue manager"]
                : ["Организатор", "Координатор", "Ведущий", "Менеджер площадки"]
            ).map((role, i) => (
              <span
                key={role}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium",
                  i === 0
                    ? "bg-[#E8A09A] text-white"
                    : "bg-[#FAF7F2] text-[#8a8580] ring-1 ring-[#EDE7DD]"
                )}
              >
                {role}
              </span>
            ))}
            {wedding && (
              <span className="ml-auto text-xs text-[#a39e97]">
                {wedding.coupleNames}
              </span>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-[#EDE7DD] bg-white px-2 py-2 lg:hidden">
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
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs",
                  active
                    ? "bg-[#F8E8E8] text-[#E8A09A]"
                    : "text-[#8a8580]"
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
