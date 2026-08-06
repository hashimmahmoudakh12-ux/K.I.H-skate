"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="container grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr,1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Good to know before you book."
            description="Can't find your answer? Reach out — we respond to every message within a day."
          />
        </div>

        <div className="divide-y divide-cream-100/10 border-t border-cream-100/10">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-medium text-cream-50 sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 transition-all duration-300 ease-premium",
                        isOpen && "rotate-45 border-flame-500/50 bg-flame-500/10 text-flame-500"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-14 text-[0.95rem] leading-relaxed text-cream-100/60">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
