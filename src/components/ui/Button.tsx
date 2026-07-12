import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "gold" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#D4A39C] text-white hover:bg-[#c9948d] border border-transparent shadow-[0_4px_14px_-4px_rgba(212,163,156,0.55)]",
  secondary:
    "bg-white text-charcoal border border-[#EDE7DD] hover:bg-[#FAF7F2] shadow-sm",
  ghost: "bg-transparent text-charcoal hover:bg-[#FAF7F2]",
  outline:
    "bg-transparent text-charcoal border border-[#EDE7DD] hover:border-[#E8A09A]/50 hover:text-[#E8A09A]",
  gold: "bg-[#D4A537] text-white hover:bg-[#c49530] shadow-sm border border-transparent",
  danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-full gap-1.5",
  md: "h-11 px-5 text-sm rounded-full gap-2",
  lg: "h-12 px-8 text-[15px] rounded-full gap-2",
  icon: "h-10 w-10 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A09A]/35 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
