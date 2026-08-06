import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BRAND, NAV_LINKS, SOCIALS } from "@/lib/data";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.16-1.4V15.4a5.15 5.15 0 1 1-4.43-5.1v2.28a2.9 2.9 0 1 0 2.04 2.77V2h2.4a4.28 4.28 0 0 0 3.15 4.13V5.82z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: Instagram,
  tiktok: TikTokIcon,
  youtube: Youtube,
};

export function Footer() {
  return (
    <footer className="relative border-t border-cream-100/10 bg-ink-950">
      <div className="container py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr,0.7fr,0.7fr,1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/55">
              {BRAND.full} — private, small group, and camp skateboarding
              lessons built to make confident riders.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/10 text-cream-100/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-gold-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream-50">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring rounded text-sm text-cream-100/55 transition-colors hover:text-cream-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream-50">
              Programs
            </h3>
            <ul className="mt-5 space-y-3">
              {["Private Lessons", "Small Groups", "Skate Camps", "Gift Cards"].map((item) => (
                <li key={item}>
                  <a
                    href="#lessons"
                    className="focus-ring rounded text-sm text-cream-100/55 transition-colors hover:text-cream-50"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream-50">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-cream-100/55">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {BRAND.phone}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {BRAND.email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {BRAND.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-8 text-xs text-cream-100/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="focus-ring rounded hover:text-cream-100/70">
              Privacy Policy
            </a>
            <a href="#" className="focus-ring rounded hover:text-cream-100/70">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
