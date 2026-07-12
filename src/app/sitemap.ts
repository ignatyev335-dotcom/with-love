import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://with-love-teal.vercel.app";
  const locales = ["ru", "en"];
  const pages = ["", "/templates", "/pricing", "/faq", "/login", "/register"];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${base}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
      });
    }
  }

  entries.push({
    url: `${base}/ru/invite/aleksandr-ekaterina`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  return entries;
}
