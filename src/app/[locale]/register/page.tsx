"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const register = useAppStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    register(name, email, password);
    router.push(`/${locale}/dashboard/editor`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-soft-pink/40 via-ivory to-light-sage/30 px-4">
      <div className="mb-8">
        <Logo href={`/${locale}`} size="lg" />
      </div>
      <div className="w-full max-w-md rounded-3xl border border-border/80 bg-white p-8 shadow-soft-lg">
        <h1 className="text-center font-heading text-2xl text-charcoal">
          {t("registerTitle")}
        </h1>
        <p className="mt-2 text-center text-sm text-muted">{t("registerSubtitle")}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">{t("name")}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">{t("email")}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">{t("password")}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {tc("createInvitation")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {t("hasAccount")}{" "}
          <Link href={`/${locale}/login`} className="font-medium text-blush hover:underline">
            {tc("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
