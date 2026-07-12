/** Decorative florals / gold lines matching WED design system */

export function FloralCorner({
  className = "",
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <path
        d="M20 180C40 140 30 100 50 70C70 40 100 30 120 50C140 70 130 100 100 120C70 140 40 160 20 180Z"
        fill="#F8E8E8"
        opacity="0.9"
      />
      <path
        d="M50 170C60 140 80 120 100 110C120 100 140 110 150 130"
        stroke="#A7B8A1"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="55" cy="90" r="14" fill="#C98B88" opacity="0.55" />
      <circle cx="80" cy="70" r="18" fill="#F8E8E8" stroke="#E8D5D5" />
      <circle cx="100" cy="95" r="12" fill="#D4A537" opacity="0.35" />
      <circle cx="70" cy="110" r="10" fill="#FAF7F2" stroke="#E8E2D9" />
      <ellipse cx="130" cy="80" rx="8" ry="14" fill="#A7B8A1" opacity="0.45" transform="rotate(-30 130 80)" />
      <ellipse cx="145" cy="100" rx="7" ry="12" fill="#A7B8A1" opacity="0.35" transform="rotate(20 145 100)" />
    </svg>
  );
}

export function GoldFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={className} aria-hidden>
      <path
        d="M10 20C30 8 50 8 60 20C70 32 90 32 110 20"
        stroke="#D4A537"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="60" cy="20" r="2.5" fill="#D4A537" opacity="0.7" />
    </svg>
  );
}

export function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#D4A537]/60 to-transparent ${className}`}
    />
  );
}
