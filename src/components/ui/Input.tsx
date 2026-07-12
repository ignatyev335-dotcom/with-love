import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-full border border-[#EDE7DD] bg-white px-4 text-sm text-charcoal",
      "placeholder:text-[#a39e97] transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-[#E8A09A]/25 focus:border-[#E8A09A]/40",
      "disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[100px] w-full rounded-2xl border border-[#EDE7DD] bg-white px-4 py-3 text-sm text-charcoal",
      "placeholder:text-[#a39e97] transition-colors resize-y",
      "focus:outline-none focus:ring-2 focus:ring-[#E8A09A]/25 focus:border-[#E8A09A]/40",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
