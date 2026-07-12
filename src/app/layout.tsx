import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://with-love-teal.vercel.app"),
  title: {
    default: "With Love — RSVP-приглашения на свадьбу",
    template: "%s · With Love",
  },
  description:
    "Создайте красивое RSVP-приглашение на свадьбу за 10–15 минут. Шаблоны, конструктор, гости в реальном времени.",
  keywords: [
    "свадьба",
    "приглашение",
    "RSVP",
    "wedding invitation",
    "With Love",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "With Love",
    title: "With Love — RSVP-приглашения на свадьбу",
    description:
      "Элегантные свадебные приглашения с RSVP, таймером, музыкой и управлением гостями.",
  },
  twitter: {
    card: "summary_large_image",
    title: "With Love — RSVP-приглашения на свадьбу",
    description:
      "Создайте красивое приглашение за 10–15 минут.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
