import { Comparison } from "@/components/landing/Comparison";
import { CTABanner } from "@/components/landing/CTABanner";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Reviews } from "@/components/landing/Reviews";
import { StylesGallery } from "@/components/landing/StylesGallery";
import { TrustBar } from "@/components/landing/TrustBar";
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
    <div className="flex min-h-screen flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1">
        <Hero locale={locale} />
        <TrustBar locale={locale} />
        <Comparison locale={locale} />
        <HowItWorks locale={locale} />
        <ProductShowcase locale={locale} />
        <StylesGallery locale={locale} />
        <Features locale={locale} />
        <Reviews locale={locale} />
        <Pricing locale={locale} />
        <FAQ locale={locale} />
        <CTABanner locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
