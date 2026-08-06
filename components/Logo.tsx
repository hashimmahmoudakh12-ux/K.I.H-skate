import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/data";
import logoImg from "@/public/brand/logo.png";

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-cream-100/15 transition-all duration-300 group-hover:ring-gold-500/60">
        <Image
          src={logoImg}
          alt={`${BRAND.name} logo`}
          fill
          sizes="40px"
          className="object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight text-cream-50">
            {BRAND.name}
          </span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-cream-100/45">
            Skate School
          </span>
        </span>
      )}
    </span>
  );
}
