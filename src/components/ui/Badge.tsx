import { cn } from "@/lib/utils";

const styles = {
  default: "bg-warm-beige text-charcoal",
  success: "bg-light-sage text-[#4a6344]",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-600",
  blush: "bg-soft-pink text-deep-rose",
  gold: "bg-[#f8f0dc] text-gold",
  muted: "bg-gray-100 text-muted",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
