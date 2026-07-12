import { CTABanner } from "@/components/landing/CTABanner";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Reviews } from "@/components/landing/Reviews";
import { StylesGallery } from "@/components/landing/StylesGallery";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />
      <main className="flex-1">
        <Hero locale={locale} />
        <Features locale={locale} />
        <HowItWorks locale={locale} />
        <StylesGallery locale={locale} />
        <Reviews locale={locale} />
        <Pricing locale={locale} />
        <FAQ locale={locale} />
        <CTABanner locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
