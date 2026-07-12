"use client";

import { FloralCorner } from "@/components/decor/Floral";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/lib/store";
import type { PlanTier } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function RegisterForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const search = useSearchParams();
  const plan = (search.get("plan") || "free") as PlanTier;
  const register = useAppStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    register(name, email, password);
    const user = useAppStore.getState().user;
    const paid: PlanTier[] = ["basic", "premium", "lux"];
    const selected: PlanTier = paid.includes(plan) ? plan : "free";

    if (user && selected !== "free") {
      useAppStore.setState({
        user: { ...user, plan: selected },
      });
      if (selected === "premium" || selected === "lux") {
        router.push(`/${locale}/checkout?plan=${selected}`);
        return;
      }
    }
    router.push(`/${locale}/dashboard/editor`);
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-[#EDE7DD] bg-white p-8 shadow-[0_20px_50px_-20px_rgba(40,43,43,0.15)]">
      <FloralCorner
        flip
        className="pointer-events-none absolute -left-8 -bottom-6 h-32 w-32 opacity-40"
      />
      <h1 className="relative text-center font-heading text-2xl font-medium text-charcoal">
        {t("registerTitle")}
      </h1>
      <p className="relative mt-2 text-center text-sm text-[#8a8580]">
        {t("registerSubtitle")}
      </p>
      {plan !== "free" && (
        <p className="relative mt-3 text-center text-xs text-[#D4A537]">
          {locale === "en" ? "Selected plan:" : "Выбран тариф:"} {plan}
        </p>
      )}

      <form onSubmit={onSubmit} className="relative mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#8a8580]">
            {t("name")}
          </label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#8a8580]">
            {t("email")}
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            minLength={4}
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          {tc("createInvitation")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#8a8580]">
        {t("hasAccount")}{" "}
        <Link
          href={`/${locale}/login`}
          className="font-medium text-[#E8A09A] hover:underline"
        >
          {tc("login")}
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const locale = useLocale();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8E8E8]/60 via-[#FDFCFA] to-[#E8EDE5]/50 px-4">
      <FloralCorner className="pointer-events-none absolute -left-10 top-16 h-52 w-52 opacity-45" />
      <div className="relative mb-8">
        <Logo href={`/${locale}`} size="lg" />
      </div>
      <Suspense fallback={<div className="text-sm text-[#8a8580]">…</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
