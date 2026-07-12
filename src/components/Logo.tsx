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
    sm: "text-[15px] gap-1",
    md: "text-lg gap-1.5",
    lg: "text-2xl gap-2",
  };
  const iconSizes = { sm: 13, md: 15, lg: 18 };
  const heart = dark ? "text-[#B8956C]" : "text-[#B8956C]";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center font-heading font-medium tracking-tight",
        dark ? "text-white" : "text-[#1C1917]",
        sizes[size],
        className
      )}
    >
      <Heart
        size={iconSizes[size]}
        className={cn(heart, "fill-current opacity-80")}
        strokeWidth={1.5}
      />
      <span>
        With <span className={heart}>Love</span>
      </span>
    </Link>
  );
}
