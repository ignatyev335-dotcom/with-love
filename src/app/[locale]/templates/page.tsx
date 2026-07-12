"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TEMPLATES } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function TemplatesPage() {
  const t = useTranslations("templates");
  const locale = useLocale();
  const isEn = locale === "en";
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const applyTemplate = useAppStore((s) => s.applyTemplate);
  const [filter, setFilter] = useState("all");

  const useTemplate = (id: string) => {
    if (!user) {
      router.push(`/${locale}/register`);
      return;
    }
    applyTemplate(id);
    router.push(`/${locale}/dashboard/editor`);
  };

  const categories = useMemo(() => {
    const set = new Set(TEMPLATES.map((x) => x.category));
    return ["all", ...Array.from(set)];
  }, []);

  const list =
    filter === "all" ? TEMPLATES : TEMPLATES.filter((x) => x.category === filter);

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="font-heading text-3xl text-charcoal sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  filter === c
                    ? "bg-blush text-white"
                    : "bg-white text-muted border border-border hover:border-blush/30"
                }`}
              >
                {c === "all" ? t("allStyles") : c}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((tpl) => (
              <div
                key={tpl.id}
                className="group overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={tpl.preview}
                    alt={tpl.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => useTemplate(tpl.id)}
                    >
                      {t("use")}
                    </Button>
                  </div>
                  <div className="absolute right-3 top-3">
                    {tpl.premium ? (
                      <Badge variant="gold">
                        {formatPrice(tpl.price)}
                      </Badge>
                    ) : (
                      <Badge variant="success">{t("free")}</Badge>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-charcoal">
                    {isEn ? tpl.nameEn : tpl.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2">
                    {isEn ? tpl.descriptionEn : tpl.description}
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    {tpl.colors.map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
