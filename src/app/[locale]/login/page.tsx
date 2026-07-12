"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
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
    if (user?.role === "admin") router.push(`/${locale}/admin`);
    else router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-soft-pink/40 via-ivory to-light-sage/30 px-4">
      <div className="mb-8">
        <Logo href={`/${locale}`} size="lg" />
      </div>
      <div className="w-full max-w-md rounded-3xl border border-border/80 bg-white p-8 shadow-soft-lg">
        <h1 className="text-center font-heading text-2xl text-charcoal">
          {t("loginTitle")}
        </h1>
        <p className="mt-2 text-center text-sm text-muted">{t("loginSubtitle")}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">{t("email")}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">{t("password")}</label>
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

        <p className="mt-4 text-center text-xs text-muted">{t("demoHint")}</p>
        <p className="mt-1 text-center text-xs text-muted">{t("adminHint")}</p>

        <p className="mt-6 text-center text-sm text-muted">
          {t("noAccount")}{" "}
          <Link href={`/${locale}/register`} className="font-medium text-blush hover:underline">
            {tc("register")}
          </Link>
        </p>
      </div>
    </div>
  );
}
