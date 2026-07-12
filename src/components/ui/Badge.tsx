import { cn } from "@/lib/utils";

const styles = {
  default: "bg-[#FAF7F2] text-charcoal",
  success: "bg-[#E8EDE5] text-[#4a6344]",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-[#F8E8E8] text-[#B76E6E]",
  blush: "bg-[#F8E8E8] text-[#E8A09A]",
  gold: "bg-[#F8F0DC] text-[#D4A537]",
  muted: "bg-[#F0EBE3] text-[#8a8580]",
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
