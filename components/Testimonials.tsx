"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[index];

  return (
    <section className="relative overflow-hidden bg-ink-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="container relative">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Parent Stories"
            title="Trusted by families at the park."
            className="mb-0"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 transition-colors hover:border-gold-500/50 hover:text-gold-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 transition-colors hover:border-gold-500/50 hover:text-gold-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-14 min-h-[320px] overflow-hidden sm:min-h-[260px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-10 rounded-3xl border border-cream-100/10 bg-white/[0.02] p-8 sm:p-12 lg:grid-cols-[auto,1fr]"
            >
              <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-700 font-display text-xl font-bold text-ink-950">
                  {active.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="lg:mt-2">
                  <p className="font-display font-semibold text-cream-50">{active.name}</p>
                  <p className="text-sm text-cream-100/50">{active.role}</p>
                </div>
              </div>

              <div>
                <Quote className="h-8 w-8 text-gold-500/40" />
                <p className="mt-4 text-xl leading-relaxed text-cream-100/85 sm:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gold-500" : "w-1.5 bg-cream-100/20 hover:bg-cream-100/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
