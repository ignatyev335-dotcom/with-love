"use client";

import { useEffect, useState } from "react";

function getParts(target: Date) {
  const now = Date.now();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown({
  targetDate,
  labels = { days: "Дней", hours: "Часов", minutes: "Минут", seconds: "Секунд" },
  className = "",
  compact = false,
}: {
  targetDate: string;
  labels?: { days: string; hours: string; minutes: string; seconds: string };
  className?: string;
  compact?: boolean;
}) {
  const target = new Date(targetDate);
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const cells = [
    { value: parts.days, label: labels.days },
    { value: parts.hours, label: labels.hours },
    { value: parts.minutes, label: labels.minutes },
    { value: parts.seconds, label: labels.seconds },
  ];

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {cells.map((c, i) => (
        <div key={c.label} className="flex items-center gap-2 sm:gap-3">
          <div className="text-center">
            <div
              className={`font-heading font-semibold tabular-nums text-charcoal ${
                compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted sm:text-xs">
              {c.label}
            </div>
          </div>
          {i < cells.length - 1 && (
            <span className="font-heading text-xl text-gold/60 sm:text-2xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
