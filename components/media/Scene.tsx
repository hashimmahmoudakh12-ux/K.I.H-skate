"use client";

const GRADIENTS: Record<string, string> = {
  ember: "from-flame-600/40 via-ink-900 to-ink-950",
  dusk: "from-ink-700 via-ink-900 to-ink-950",
  cream: "from-cream-200/20 via-ink-900 to-ink-950",
  deep: "from-ink-800 via-ink-900 to-black",
};

type SceneProps = {
  variant?: keyof typeof GRADIENTS;
  art?: "carve" | "ollie" | "ramp" | "wheels" | "grind" | "flip" | "none";
  className?: string;
  label?: string;
};

function CarveArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
      <path
        d="M40 300 Q120 100 200 200 T360 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" opacity="0.12" />
    </svg>
  );
}

function OllieArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
      <rect x="130" y="190" width="140" height="16" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.55" transform="rotate(-18 200 198)" />
      <circle cx="150" cy="235" r="9" fill="currentColor" opacity="0.4" />
      <circle cx="255" cy="205" r="9" fill="currentColor" opacity="0.4" />
      <path d="M60 320 L340 320" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function RampArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
      <path d="M20 340 Q20 180 180 160" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M380 340 Q380 180 220 160" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M20 340 L380 340" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function WheelsArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
      {[110, 200, 290].map((cx, i) => (
        <circle key={cx} cx={cx} cy={200} r={40 - i * 2} stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      ))}
    </svg>
  );
}

function GrindArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
      <path d="M40 220 L360 220" stroke="currentColor" strokeWidth="3" opacity="0.5" />
      <path d="M150 220 L150 130 L250 130" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

function FlipArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
      <g transform="rotate(35 200 200)">
        <rect x="130" y="192" width="140" height="16" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </g>
      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" opacity="0.15" strokeDasharray="4 10" />
    </svg>
  );
}

const ART = {
  carve: CarveArt,
  ollie: OllieArt,
  ramp: RampArt,
  wheels: WheelsArt,
  grind: GrindArt,
  flip: FlipArt,
  none: null,
};

export function Scene({ variant = "dusk", art = "carve", className = "", label }: SceneProps) {
  const Art = art !== "none" ? ART[art] : null;
  return (
    <div className={`relative overflow-hidden bg-ink-900 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[variant]}`} />
      <div className="absolute inset-0 bg-grain mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
      {Art && (
        <div className="absolute inset-0 flex items-center justify-center text-cream-100/70">
          <div className="h-3/4 w-3/4">
            <Art />
          </div>
        </div>
      )}
      {label && (
        <span className="absolute bottom-4 left-4 font-display text-[0.65rem] uppercase tracking-[0.25em] text-cream-100/40">
          {label}
        </span>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
    </div>
  );
}
