"use client";

import { FloralCorner } from "@/components/decor/Floral";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const search = useSearchParams();
  const login = useAppStore((s) => s.login);
  const [email, setEmail] = useState("anna@example.com");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setError("Неверный email");
      return;
    }
    const user = useAppStore.getState().user;
    const next = search.get("next");
    if (next && next.startsWith("/")) {
      router.push(next.startsWith(`/${locale}`) ? next : `/${locale}${next}`);
      return;
    }
    if (user?.role === "admin") router.push(`/${locale}/admin`);
    else router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-[#EDE7DD] bg-white p-8 shadow-[0_20px_50px_-20px_rgba(40,43,43,0.15)]">
      <FloralCorner className="pointer-events-none absolute -right-8 -top-6 h-32 w-32 opacity-40" />
      <h1 className="relative text-center font-heading text-2xl font-medium text-charcoal">
        {t("loginTitle")}
      </h1>
      <p className="relative mt-2 text-center text-sm text-[#8a8580]">
        {t("loginSubtitle")}
      </p>

      <form onSubmit={onSubmit} className="relative mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#8a8580]">
            {t("email")}
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#8a8580]">
            {t("password")}
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" size="lg">
          {tc("login")}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-[#a39e97]">{t("demoHint")}</p>
      <p className="mt-1 text-center text-xs text-[#a39e97]">{t("adminHint")}</p>

      <p className="mt-6 text-center text-sm text-[#8a8580]">
        {t("noAccount")}{" "}
        <Link
          href={`/${locale}/register`}
          className="font-medium text-[#E8A09A] hover:underline"
        >
          {tc("register")}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  const locale = useLocale();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8E8E8]/60 via-[#FDFCFA] to-[#E8EDE5]/50 px-4">
      <FloralCorner className="pointer-events-none absolute -left-10 bottom-10 h-56 w-56 opacity-50" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-8 top-10 h-48 w-48 opacity-40"
      />
      <div className="relative mb-8">
        <Logo href={`/${locale}`} size="lg" />
      </div>
      <Suspense fallback={<div className="text-sm text-[#8a8580]">…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
