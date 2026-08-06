import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/data";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-100/20 bg-white/[0.03] transition-colors duration-300 group-hover:border-flame-500/60">
        <span className="absolute h-1.5 w-1.5 rounded-full bg-flame-500" />
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-cream-100" fill="none">
          <path
            d="M4 15h16M7 15l3-6h4l3 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="17.5" r="1.4" fill="currentColor" />
          <circle cx="15.5" cy="17.5" r="1.4" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-cream-50">
          {BRAND.name}
        </span>
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-cream-100/45">
          Skate School
        </span>
      </span>
    </span>
  );
}
