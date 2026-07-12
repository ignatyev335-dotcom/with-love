/** Watercolor-style florals matching WED references */

export function FloralBouquet({
  className = "",
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 280 240"
      fill="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      {/* greenery stems */}
      <path
        d="M40 220C55 180 70 150 95 120C110 100 130 90 150 95"
        stroke="#8FA68A"
        strokeWidth="2"
        opacity="0.55"
      />
      <path
        d="M70 220C80 175 100 140 130 115"
        stroke="#A7B8A1"
        strokeWidth="1.8"
        opacity="0.5"
      />
      {/* eucalyptus leaves */}
      <ellipse cx="88" cy="130" rx="10" ry="22" fill="#A7B8A1" opacity="0.45" transform="rotate(-35 88 130)" />
      <ellipse cx="112" cy="108" rx="9" ry="20" fill="#8FA68A" opacity="0.4" transform="rotate(25 112 108)" />
      <ellipse cx="145" cy="95" rx="11" ry="24" fill="#B8C7B2" opacity="0.5" transform="rotate(-15 145 95)" />
      <ellipse cx="165" cy="120" rx="8" ry="18" fill="#A7B8A1" opacity="0.4" transform="rotate(40 165 120)" />
      <ellipse cx="60" cy="160" rx="9" ry="19" fill="#9BB095" opacity="0.42" transform="rotate(-50 60 160)" />
      {/* roses */}
      <g opacity="0.92">
        <circle cx="100" cy="155" r="28" fill="#F2D4D0" />
        <circle cx="100" cy="155" r="20" fill="#E8B8B2" />
        <circle cx="100" cy="155" r="12" fill="#DFA39B" />
        <circle cx="97" cy="152" r="5" fill="#F8E8E8" opacity="0.7" />
      </g>
      <g opacity="0.9">
        <circle cx="145" cy="140" r="32" fill="#F5E0DC" />
        <circle cx="145" cy="140" r="23" fill="#EBC4BE" />
        <circle cx="145" cy="140" r="14" fill="#E0A8A0" />
        <circle cx="142" cy="136" r="6" fill="#FAF7F2" opacity="0.65" />
      </g>
      <g opacity="0.88">
        <circle cx="175" cy="170" r="22" fill="#F0D0CB" />
        <circle cx="175" cy="170" r="15" fill="#E4B0A9" />
        <circle cx="175" cy="170" r="8" fill="#D89890" />
      </g>
      <g opacity="0.85">
        <circle cx="70" cy="185" r="18" fill="#F3D8D4" />
        <circle cx="70" cy="185" r="12" fill="#E5B6AF" />
        <circle cx="70" cy="185" r="6" fill="#D99C94" />
      </g>
      {/* cream rose */}
      <g opacity="0.9">
        <circle cx="195" cy="130" r="20" fill="#F7F0E8" />
        <circle cx="195" cy="130" r="13" fill="#EDE2D4" />
        <circle cx="195" cy="130" r="7" fill="#E0D0BC" />
      </g>
      {/* tiny buds */}
      <circle cx="125" cy="185" r="8" fill="#E8B8B2" opacity="0.75" />
      <circle cx="210" cy="160" r="7" fill="#F5E0DC" opacity="0.7" />
      {/* soft gold dust */}
      <circle cx="160" cy="100" r="2" fill="#D4A537" opacity="0.35" />
      <circle cx="90" cy="110" r="1.5" fill="#D4A537" opacity="0.3" />
    </svg>
  );
}

export function FloralCorner({
  className = "",
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return <FloralBouquet className={className} flip={flip} />;
}

export function GoldFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" fill="none" className={className} aria-hidden>
      <path
        d="M8 18C28 6 48 6 60 14C68 19 72 19 80 14C92 6 112 6 152 18"
        stroke="#D4A537"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M72 10C76 14 76 22 72 26C68 22 68 14 72 10Z"
        fill="#D4A537"
        opacity="0.45"
      />
      <circle cx="80" cy="18" r="2" fill="#D4A537" opacity="0.55" />
    </svg>
  );
}

export function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full max-w-[140px] bg-gradient-to-r from-transparent via-[#D4A537]/55 to-transparent ${className}`}
    />
  );
}

/** Soft paper texture wash behind sections */
export function PaperWash({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.35] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 10% 20%, #F8E8E8 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 90% 80%, #E8EDE5 0%, transparent 45%), radial-gradient(ellipse 50% 30% at 70% 10%, #F5EFE6 0%, transparent 40%)",
      }}
    />
  );
}
