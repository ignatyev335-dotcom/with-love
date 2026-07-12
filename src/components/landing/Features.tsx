import { FEATURES } from "@/lib/seed";
import {
  BookOpen,
  Car,
  Clock,
  CreditCard,
  Heart,
  Layout,
  Music,
  Users,
} from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  heart: <Heart size={22} />,
  clock: <Clock size={22} />,
  car: <Car size={22} />,
  book: <BookOpen size={22} />,
  music: <Music size={22} />,
  users: <Users size={22} />,
  layout: <Layout size={22} />,
  "credit-card": <CreditCard size={22} />,
};

export function Features({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section id="features" className="border-y border-border/50 bg-white/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-transparent px-2 py-4 text-center transition-all hover:border-border hover:bg-ivory hover:shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warm-beige text-gold transition-colors group-hover:bg-soft-pink group-hover:text-blush">
                {icons[f.icon]}
              </div>
              <span className="text-xs font-medium text-charcoal sm:text-sm">
                {isEn ? f.titleEn : f.title}
              </span>
              <span className="hidden text-[11px] leading-snug text-muted sm:block">
                {isEn ? f.descEn : f.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
