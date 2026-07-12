import { REVIEWS } from "@/lib/seed";
import { Star } from "lucide-react";
import Image from "next/image";

export function Reviews({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section className="bg-white/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-heading text-3xl text-charcoal sm:text-4xl">
          {isEn ? "With love from our couples" : "С любовью от наших пар"}
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-3xl border border-border/80 bg-white p-6 shadow-card"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted">
                «{isEn ? r.textEn : r.text}»
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-charcoal">
                  {r.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
