import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const title =
    slug === "aleksandr-ekaterina" || slug === "demo"
      ? "Александр & Екатерина — свадебное приглашение"
      : "Свадебное приглашение · With Love";
  const description =
    locale === "en"
      ? "You are invited. Confirm your attendance, see the schedule, location and details."
      : "Вас приглашают на свадьбу. Подтвердите присутствие, посмотрите программу, локацию и детали.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "en" ? "en_US" : "ru_RU",
      siteName: "With Love",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
