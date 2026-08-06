"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-premium",
          scrolled ? "mt-3 max-w-5xl px-3" : "mt-0 max-w-8xl px-6"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full border transition-all duration-500 ease-premium",
            scrolled
              ? "border-cream-100/10 bg-ink-950/80 px-4 py-2.5 shadow-premium backdrop-blur-xl"
              : "border-transparent bg-transparent px-4 py-5"
          )}
        >
          <a href="#home" className="focus-ring rounded-full">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring rounded-full px-4 py-2 font-display text-sm font-medium text-cream-100/70 transition-colors duration-200 hover:text-cream-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#contact" className="btn-primary !px-6 !py-2.5 !text-xs">
              Book Now
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-3 mt-2 rounded-3xl border border-cream-100/10 bg-ink-950/95 p-4 shadow-premium backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="focus-ring rounded-2xl px-4 py-3.5 font-display text-base font-medium text-cream-100/80 transition-colors hover:bg-white/5 hover:text-cream-50"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                Book Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
