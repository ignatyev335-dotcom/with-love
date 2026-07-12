import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { setRequestLocale } from "next-intl/server";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCFA]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-12 text-center sm:px-6">
          <h1 className="font-heading text-3xl font-medium text-charcoal sm:text-4xl">
            {locale === "en" ? "FAQ" : "Частые вопросы"}
          </h1>
        </div>
        <FAQ locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
