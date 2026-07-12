"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, Share2, Sparkles, Users } from "lucide-react";

const steps = [
  {
    icon: LayoutTemplate,
    title: "Выберите шаблон",
    titleEn: "Pick a template",
    desc: "Более 40 стилей — от классики до роскоши и путешествий",
    descEn: "40+ styles — classic, luxury, travel and more",
  },
  {
    icon: Sparkles,
    title: "Соберите в конструкторе",
    titleEn: "Build in the editor",
    desc: "Блоки, тексты, фото, музыка и цвета — без кода",
    descEn: "Blocks, text, photos, music and colors — no code",
  },
  {
    icon: Share2,
    title: "Опубликуйте и поделитесь",
    titleEn: "Publish & share",
    desc: "Уникальная ссылка и QR-код для гостей за один клик",
    descEn: "Unique link and QR code for guests in one click",
  },
  {
    icon: Users,
    title: "Собирайте RSVP",
    titleEn: "Collect RSVPs",
    desc: "Ответы гостей в реальном времени в личном кабинете",
    descEn: "Guest responses in real time in your dashboard",
  },
];

export function HowItWorks({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <section id="how" className="relative py-16 lg:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soft-pink/20 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gold">
            {isEn ? "How it works" : "Как это работает"}
          </p>
          <h2 className="font-heading text-3xl text-charcoal sm:text-4xl">
            {isEn ? "Ready site in 10–15 minutes" : "Готовый сайт за 10–15 минут"}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="relative rounded-3xl border border-border/80 bg-white p-6 shadow-card"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-beige text-gold">
                    <Icon size={22} />
                  </div>
                  <span className="font-heading text-3xl text-blush/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-charcoal">
                  {isEn ? step.titleEn : step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {isEn ? step.descEn : step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
