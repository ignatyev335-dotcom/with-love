import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

export function Logo({
  href = "/",
  className,
  dark,
  size = "md",
}: {
  href?: string;
  className?: string;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-base gap-1",
    md: "text-lg gap-1.5",
    lg: "text-2xl gap-2",
  };
  const iconSizes = { sm: 14, md: 16, lg: 20 };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center font-heading font-semibold tracking-tight",
        dark ? "text-white" : "text-charcoal",
        sizes[size],
        className
      )}
    >
      <Heart
        size={iconSizes[size]}
        className={cn(dark ? "text-gold" : "text-blush", "fill-current opacity-80")}
      />
      <span>
        With <span className={dark ? "text-gold" : "text-blush"}>Love</span>
      </span>
      <Heart
        size={iconSizes[size]}
        className={cn(dark ? "text-gold" : "text-blush", "fill-current opacity-80")}
      />
    </Link>
  );
}
