import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCFA]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-12 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-medium text-charcoal sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-[#8a8580]">{t("subtitle")}</p>
          <p className="mt-1 text-sm text-[#D4A537]">{t("oneTime")}</p>
        </div>
        <Pricing locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
